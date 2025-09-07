'use client';

import { useLottie } from '../hooks/useLottie';

/**
 * Example HeroAnimation component demonstrating Lottie usage
 * Shows how to integrate the useLottie hook with proper accessibility
 * 
 * Usage Notes:
 * - For lottie-web: Use animationData with JSON
 * - For @lottiefiles/dotlottie-web: Use path prop with .lottie file
 * - Always provide fallbackImage for reduced motion users
 * - Use data-hero attribute for preloader integration
 */
interface HeroAnimationProps {
  className?: string;
}

// Sample animation data - in real app, this would be imported from a JSON file
const sampleAnimationData = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 90,
  w: 400,
  h: 400,
  nm: "Sample Animation",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 1, k: [
          { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [0] },
          { t: 90, s: [360] }
        ]},
        p: { a: 0, k: [200, 200, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [100, 100] },
              p: { a: 0, k: [0, 0] },
              nm: "Ellipse Path 1",
              mn: "ADBE Vector Shape - Ellipse",
              hd: false
            },
            {
              ty: "st",
              c: { a: 0, k: [0.2, 0.6, 1, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 4 },
              lc: 1,
              lj: 1,
              ml: 4,
              bm: 0,
              d: [
                { n: "d", nm: "dash", v: { a: 0, k: 0 } },
                { n: "g", nm: "gap", v: { a: 0, k: 0 } },
                { n: "o", nm: "offset", v: { a: 0, k: 0 } }
              ],
              nm: "Stroke 1",
              mn: "ADBE Vector Graphic - Stroke",
              hd: false
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0], ix: 2 },
              a: { a: 0, k: [0, 0], ix: 1 },
              s: { a: 0, k: [100, 100], ix: 3 },
              r: { a: 0, k: 0, ix: 6 },
              o: { a: 0, k: 100, ix: 7 },
              sk: { a: 0, k: 0, ix: 4 },
              sa: { a: 0, k: 0, ix: 5 },
              nm: "Transform"
            }
          ],
          nm: "Ellipse 1",
          np: 2,
          cix: 2,
          bm: 0,
          ix: 1,
          mn: "ADBE Vector Group",
          hd: false
        }
      ],
      ip: 0,
      op: 90,
      st: 0,
      bm: 0
    }
  ],
  markers: []
};

export default function HeroAnimation({ className = '' }: HeroAnimationProps) {
  const animation = useLottie({
    animationData: sampleAnimationData,
    loop: true,
    autoplay: true,
    fallbackImage: '/static-hero-frame.png', // Fallback for reduced motion
    className: `w-full h-full ${className}`,
    onComplete: () => {
      console.log('Hero animation completed');
    },
    onLoopComplete: () => {
      console.log('Hero animation loop completed');
    },
  });

  return (
    <div 
      className={`relative w-full h-full ${className}`}
      role="img"
      aria-label="Animated hero illustration"
    >
      {animation}
      
      {/* Optional: Add a loading state */}
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
      </div>
    </div>
  );
}

/**
 * Alternative: Simple loading animation component
 * For cases where you don't have a Lottie animation file
 */
export function SimpleLoadingAnimation({ className = '' }: HeroAnimationProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
        
        {/* Inner ring */}
        <div className="absolute top-2 left-2 w-12 h-12 border-4 border-transparent border-r-blue-400 rounded-full animate-spin" 
             style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      </div>
    </div>
  );
}

