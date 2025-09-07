'use client';

import { useEffect, useState } from 'react';

/**
 * Performance Monitor Component
 * Features:
 * - Real-time performance metrics display
 * - Core Web Vitals monitoring
 * - Bundle size analysis
 * - Development-only component
 */

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
  bundleSize?: number;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    const updateMetrics = () => {
      const newMetrics: PerformanceMetrics = {};

      // Get Core Web Vitals from Performance API
      if (typeof window !== 'undefined' && 'performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          newMetrics.ttfb = Math.round(navigation.responseStart - navigation.requestStart);
          newMetrics.fcp = Math.round(navigation.domContentLoadedEventEnd - navigation.navigationStart);
        }

        // Get LCP
        const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
        if (lcpEntries.length > 0) {
          newMetrics.lcp = Math.round(lcpEntries[lcpEntries.length - 1].startTime);
        }

        // Get CLS
        const clsEntries = performance.getEntriesByType('layout-shift');
        if (clsEntries.length > 0) {
          newMetrics.cls = Math.round(
            clsEntries.reduce((sum, entry) => sum + entry.value, 0) * 1000
          );
        }
      }

      setMetrics(newMetrics);
    };

    // Update metrics after page load
    if (document.readyState === 'complete') {
      updateMetrics();
    } else {
      window.addEventListener('load', updateMetrics);
    }

    // Update metrics periodically
    const interval = setInterval(updateMetrics, 5000);

    return () => {
      window.removeEventListener('load', updateMetrics);
      clearInterval(interval);
    };
  }, []);

  // Only render in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const getMetricColor = (metric: string, value: number) => {
    switch (metric) {
      case 'lcp':
        return value <= 2500 ? 'text-green-600' : value <= 4000 ? 'text-yellow-600' : 'text-red-600';
      case 'fid':
        return value <= 100 ? 'text-green-600' : value <= 300 ? 'text-yellow-600' : 'text-red-600';
      case 'cls':
        return value <= 100 ? 'text-green-600' : value <= 250 ? 'text-yellow-600' : 'text-red-600';
      case 'fcp':
        return value <= 1800 ? 'text-green-600' : value <= 3000 ? 'text-yellow-600' : 'text-red-600';
      case 'ttfb':
        return value <= 800 ? 'text-green-600' : value <= 1800 ? 'text-yellow-600' : 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getMetricStatus = (metric: string, value: number) => {
    switch (metric) {
      case 'lcp':
        return value <= 2500 ? 'Good' : value <= 4000 ? 'Needs Improvement' : 'Poor';
      case 'fid':
        return value <= 100 ? 'Good' : value <= 300 ? 'Needs Improvement' : 'Poor';
      case 'cls':
        return value <= 100 ? 'Good' : value <= 250 ? 'Needs Improvement' : 'Poor';
      case 'fcp':
        return value <= 1800 ? 'Good' : value <= 3000 ? 'Needs Improvement' : 'Poor';
      case 'ttfb':
        return value <= 800 ? 'Good' : value <= 1800 ? 'Needs Improvement' : 'Poor';
      default:
        return 'Unknown';
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200"
        title="Performance Monitor"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </button>

      {/* Performance Panel */}
      {isVisible && (
        <div className="fixed bottom-20 right-4 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Performance Monitor</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-3">
            {/* Core Web Vitals */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Core Web Vitals</h4>
              <div className="space-y-2">
                {metrics.lcp && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">LCP</span>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${getMetricColor('lcp', metrics.lcp)}`}>
                        {metrics.lcp}ms
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        {getMetricStatus('lcp', metrics.lcp)}
                      </span>
                    </div>
                  </div>
                )}
                {metrics.fid && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">FID</span>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${getMetricColor('fid', metrics.fid)}`}>
                        {metrics.fid}ms
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        {getMetricStatus('fid', metrics.fid)}
                      </span>
                    </div>
                  </div>
                )}
                {metrics.cls && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">CLS</span>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${getMetricColor('cls', metrics.cls)}`}>
                        {metrics.cls / 1000}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        {getMetricStatus('cls', metrics.cls)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Other Metrics */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Other Metrics</h4>
              <div className="space-y-2">
                {metrics.fcp && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">FCP</span>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${getMetricColor('fcp', metrics.fcp)}`}>
                        {metrics.fcp}ms
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        {getMetricStatus('fcp', metrics.fcp)}
                      </span>
                    </div>
                  </div>
                )}
                {metrics.ttfb && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">TTFB</span>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${getMetricColor('ttfb', metrics.ttfb)}`}>
                        {metrics.ttfb}ms
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        {getMetricStatus('ttfb', metrics.ttfb)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Performance Tips */}
            <div className="pt-3 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Tips</h4>
              <div className="text-xs text-gray-600 space-y-1">
                <p>• LCP: Optimize images and fonts</p>
                <p>• FID: Reduce JavaScript execution time</p>
                <p>• CLS: Set image dimensions</p>
                <p>• TTFB: Optimize server response</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

