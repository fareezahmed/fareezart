'use client';

import { useEffect } from 'react';

/**
 * Analytics Component
 * Features:
 * - Google Analytics 4 integration
 * - Performance monitoring
 * - Error tracking
 * - User interaction tracking
 * - Privacy-compliant implementation
 */

interface AnalyticsProps {
  gaId?: string;
  enablePerformance?: boolean;
  enableErrorTracking?: boolean;
}

export default function Analytics({ 
  gaId = process.env.NEXT_PUBLIC_GA_ID,
  enablePerformance = true,
  enableErrorTracking = true 
}: AnalyticsProps) {
  useEffect(() => {
    if (typeof window === 'undefined' || !gaId) return;

    // Load Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', gaId, {
      page_title: document.title,
      page_location: window.location.href,
      send_page_view: true,
    });

    // Performance monitoring
    if (enablePerformance) {
      // Core Web Vitals tracking
      const trackWebVitals = () => {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          gtag('event', 'web_vitals', {
            name: 'LCP',
            value: Math.round(lastEntry.startTime),
            event_category: 'Performance',
          });
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry) => {
            gtag('event', 'web_vitals', {
              name: 'FID',
              value: Math.round(entry.processingStart - entry.startTime),
              event_category: 'Performance',
            });
          });
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          gtag('event', 'web_vitals', {
            name: 'CLS',
            value: Math.round(clsValue * 1000),
            event_category: 'Performance',
          });
        }).observe({ entryTypes: ['layout-shift'] });
      };

      // Track when page is fully loaded
      if (document.readyState === 'complete') {
        trackWebVitals();
      } else {
        window.addEventListener('load', trackWebVitals);
      }
    }

    // Error tracking
    if (enableErrorTracking) {
      window.addEventListener('error', (event) => {
        gtag('event', 'exception', {
          description: event.error?.message || 'Unknown error',
          fatal: false,
          event_category: 'Error',
        });
      });

      window.addEventListener('unhandledrejection', (event) => {
        gtag('event', 'exception', {
          description: event.reason?.message || 'Unhandled promise rejection',
          fatal: false,
          event_category: 'Error',
        });
      });
    }

    // User interaction tracking
    const trackInteraction = (eventName: string, category: string, label?: string) => {
      gtag('event', eventName, {
        event_category: category,
        event_label: label,
      });
    };

    // Track navigation clicks
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');
      
      if (link) {
        const href = link.getAttribute('href');
        if (href?.startsWith('#')) {
          trackInteraction('scroll_to_section', 'Navigation', href);
        } else if (href?.startsWith('http')) {
          trackInteraction('external_link_click', 'Navigation', href);
        } else {
          trackInteraction('internal_link_click', 'Navigation', href);
        }
      }
    });

    // Track form interactions
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      trackInteraction('form_submit', 'Form', form.id || 'unknown');
    });

    // Track scroll depth
    let maxScrollDepth = 0;
    const trackScrollDepth = () => {
      const scrollDepth = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        // Track at 25%, 50%, 75%, and 100%
        if ([25, 50, 75, 100].includes(scrollDepth)) {
          gtag('event', 'scroll_depth', {
            event_category: 'Engagement',
            value: scrollDepth,
          });
        }
      }
    };

    window.addEventListener('scroll', trackScrollDepth, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('load', trackWebVitals);
      window.removeEventListener('scroll', trackScrollDepth);
    };
  }, [gaId, enablePerformance, enableErrorTracking]);

  // Return null since this is a head component
  return null;
}

// Declare global gtag function
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

