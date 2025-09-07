'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Preloader component that prevents CLS and shows until critical resources are ready
 * Features:
 * - Waits for web fonts to load (document.fonts.ready)
 * - Waits for hero image/LCP element to be ready
 * - Fades out within 1 second with smooth easing
 * - Prevents layout shift by reserving full viewport space
 * - Supports preloading critical images for LCP optimization
 */
interface PreloaderProps {
  onComplete?: () => void;
  heroImageSelector?: string; // CSS selector for hero image to wait for
  minDisplayTime?: number; // Minimum time to show preloader (ms)
  preloadImages?: string[]; // Array of image URLs to preload for LCP
}

export default function Preloader({ 
  onComplete, 
  heroImageSelector = 'img[data-hero]',
  minDisplayTime = 500,
  preloadImages = []
}: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const startTime = useRef(Date.now());
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let isMounted = true;

    const checkReadiness = async () => {
      try {
        // Preload critical images for LCP optimization
        if (preloadImages.length > 0) {
          const preloadPromises = preloadImages.map((src) => {
            return new Promise<void>((resolve) => {
              const img = new Image();
              img.onload = () => resolve();
              img.onerror = () => resolve(); // Continue even if preload fails
              img.src = src;
            });
          });
          await Promise.all(preloadPromises);
        }

        // Wait for web fonts to be ready
        await document.fonts.ready;
        
        // Wait for hero image to be loaded
        if (heroImageSelector) {
          const heroImage = document.querySelector(heroImageSelector) as HTMLImageElement;
          if (heroImage) {
            if (!heroImage.complete) {
              await new Promise((resolve) => {
                const handleLoad = () => {
                  heroImage.removeEventListener('load', handleLoad);
                  heroImage.removeEventListener('error', handleLoad);
                  resolve(void 0);
                };
                heroImage.addEventListener('load', handleLoad);
                heroImage.addEventListener('error', handleLoad);
              });
            }
          }
        }

        // Ensure minimum display time has passed
        const elapsed = Date.now() - startTime.current;
        const remainingTime = Math.max(0, minDisplayTime - elapsed);

        if (isMounted) {
          setTimeout(() => {
            if (isMounted) {
              setIsFading(true);
              
              // Complete fade out within 1 second
              fadeTimeoutRef.current = setTimeout(() => {
                if (isMounted) {
                  setIsVisible(false);
                  onComplete?.();
                }
              }, 1000);
            }
          }, remainingTime);
        }
      } catch (error) {
        console.warn('Preloader: Error checking readiness', error);
        // Fallback: hide after minimum time
        if (isMounted) {
          setTimeout(() => {
            if (isMounted) {
              setIsFading(true);
              fadeTimeoutRef.current = setTimeout(() => {
                if (isMounted) {
                  setIsVisible(false);
                  onComplete?.();
                }
              }, 1000);
            }
          }, minDisplayTime);
        }
      }
    };

    // Start checking readiness after a brief delay to ensure DOM is ready
    const checkTimeout = setTimeout(checkReadiness, 100);

    return () => {
      isMounted = false;
      clearTimeout(checkTimeout);
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, [onComplete, heroImageSelector, minDisplayTime, preloadImages]);

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-white transition-opacity duration-1000 ease-out
        ${isFading ? 'opacity-0' : 'opacity-100'}
      `}
      role="status"
      aria-label="Loading page content"
    >
      {/* Prevents CLS by reserving full viewport space */}
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner animation */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
        </div>
        
        {/* Loading text */}
        <p className="text-gray-600 text-sm font-medium">
          Loading...
        </p>
      </div>
    </div>
  );
}
