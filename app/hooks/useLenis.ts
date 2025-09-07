'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Custom hook for initializing Lenis smooth scroll
 * Handles proper cleanup and provides smooth scrolling functionality
 */
export function useLenis() {
  useEffect(() => {
    // Initialize Lenis with optimal settings for performance and accessibility
    const lenis = new Lenis({
      duration: 1.2, // Smooth scroll duration
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
    });

    // Make Lenis available globally for anchor link handling
    (window as unknown as { lenis: Lenis }).lenis = lenis;

    // Animation frame loop for smooth scrolling
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle anchor links for smooth scrolling
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const href = target.getAttribute('href');
        if (href) {
          lenis.scrollTo(href, { duration: 1.2 });
        }
      }
    };

    // Add event listener for anchor clicks
    document.addEventListener('click', handleAnchorClick);

    // Cleanup function
    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);
}
