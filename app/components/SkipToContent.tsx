'use client';

/**
 * Skip to content link for accessibility
 * Allows keyboard users to bypass navigation and go directly to main content
 */
export default function SkipToContent() {
  return (
    <a
      href="#content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                 bg-blue-600 text-white px-4 py-2 rounded-md z-50
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 
                 focus-visible:ring-offset-2 transition-all duration-200"
      tabIndex={0}
    >
      Skip to main content
    </a>
  );
}
