'use client';

import { useLottie } from '../hooks/useLottie';

/**
 * HeroBite component - A delightful micro-animation that triggers on scroll
 * Features:
 * - Scroll-triggered animation (plays once on slight scroll)
 * - Respects prefers-reduced-motion
 * - Pauses when offscreen or tab is hidden
 * - Optional replay button for user interaction
 * - Lazy loading to not block hero text render
 */
interface HeroBiteProps {
  className?: string;
  scrollThreshold?: number; // Scroll percentage to trigger (0-1)
  showReplayButton?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  testMode?: boolean; // For testing - shows animation immediately
}

// More visible "bite" animation data - a bouncing circle with scale and color changes
const biteAnimationData = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 90, // 3 seconds at 30fps
  w: 200,
  h: 200,
  nm: "Bite Animation",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Bite Circle",
      sr: 1,
      ks: {
        o: { a: 1, k: [
          { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [0] },
          { t: 15, s: [100] },
          { t: 75, s: [100] },
          { t: 90, s: [0] }
        ]},
        r: { a: 1, k: [
          { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [0] },
          { t: 90, s: [720] }
        ]},
        p: { a: 1, k: [
          { i: { x: 0.833, y: 0.833 }, o: { x: 0.167, y: 0.167 }, t: 0, s: [100, 100, 0] },
          { t: 30, s: [100, 80, 0] },
          { t: 60, s: [100, 100, 0] },
          { t: 90, s: [100, 100, 0] }
        ]},
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [
          { i: { x: [0.833, 0.833, 0.833], y: [0.833, 0.833, 0.833] }, o: { x: [0.167, 0.167, 0.167], y: [0.167, 0.167, 0.167] }, t: 0, s: [30, 30, 100] },
          { t: 15, s: [100, 100, 100] },
          { t: 30, s: [120, 120, 100] },
          { t: 45, s: [100, 100, 100] },
          { t: 60, s: [120, 120, 100] },
          { t: 75, s: [100, 100, 100] },
          { t: 90, s: [30, 30, 100] }
        ]}
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
              ty: "fl",
              c: { a: 1, k: [
                { i: { x: [0.833, 0.833, 0.833], y: [0.833, 0.833, 0.833] }, o: { x: [0.167, 0.167, 0.167], y: [0.167, 0.167, 0.167] }, t: 0, s: [1, 0.2, 0.2, 1] },
                { t: 30, s: [0.2, 0.8, 1, 1] },
                { t: 60, s: [1, 0.2, 0.2, 1] },
                { t: 90, s: [1, 0.2, 0.2, 1] }
              ]},
              o: { a: 0, k: 100 },
              r: 1,
              bm: 0,
              nm: "Fill 1",
              mn: "ADBE Vector Graphic - Fill",
              hd: false
            },
            {
              ty: "st",
              c: { a: 1, k: [
                { i: { x: [0.833, 0.833, 0.833], y: [0.833, 0.833, 0.833] }, o: { x: [0.167, 0.167, 0.167], y: [0.167, 0.167, 0.167] }, t: 0, s: [0.1, 0.1, 0.1, 1] },
                { t: 30, s: [0.1, 0.4, 0.8, 1] },
                { t: 60, s: [0.1, 0.1, 0.1, 1] },
                { t: 90, s: [0.1, 0.1, 0.1, 1] }
              ]},
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
          nm: "Bite Shape",
          np: 3,
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

export default function HeroBite({ 
  className = '',
  scrollThreshold = 0.05, // 5% scroll
  showReplayButton = true,
  position = 'top-right',
  testMode = false
}: HeroBiteProps) {
  const animation = useLottie({
    animationData: biteAnimationData,
    loop: false,
    autoplay: testMode, // Auto-play in test mode
    scrollTrigger: !testMode, // Disable scroll trigger in test mode
    scrollThreshold,
    playOnce: true,
    replayButton: showReplayButton,
    fallbackImage: '/static-bite-frame.png', // Fallback for reduced motion
    className: `w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 ${className}`,
    onComplete: () => {
      console.log('Bite animation completed');
    },
  });

  // Position classes
  const positionClasses = {
    'top-left': 'absolute top-4 left-4',
    'top-right': 'absolute top-4 right-4',
    'bottom-left': 'absolute bottom-4 left-4',
    'bottom-right': 'absolute bottom-4 right-4',
    'center': 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
  };

  return (
    <div 
      className={`${positionClasses[position]} z-10 pointer-events-none`}
      aria-hidden="true"
      role="presentation"
    >
      {/* Add a subtle background to make animation more visible */}
      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 shadow-lg">
        {animation}
      </div>
    </div>
  );
}

/**
 * Alternative HeroBite with custom animation data
 */
interface HeroBiteCustomProps extends HeroBiteProps {
  animationData: unknown;
  fallbackImage?: string;
}

export function HeroBiteCustom({ 
  animationData,
  fallbackImage = '/static-bite-frame.png',
  ...props 
}: HeroBiteCustomProps) {
  const animation = useLottie({
    animationData,
    loop: false,
    autoplay: false,
    scrollTrigger: true,
    scrollThreshold: props.scrollThreshold || 0.05,
    playOnce: true,
    replayButton: props.showReplayButton || true,
    fallbackImage,
    className: `w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 ${props.className || ''}`,
    onComplete: () => {
      console.log('Custom bite animation completed');
    },
  });

  const positionClasses = {
    'top-left': 'absolute top-4 left-4',
    'top-right': 'absolute top-4 right-4',
    'bottom-left': 'absolute bottom-4 left-4',
    'bottom-right': 'absolute bottom-4 right-4',
    'center': 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
  };

  return (
    <div 
      className={`${positionClasses[props.position || 'top-right']} z-10 pointer-events-none`}
      aria-hidden="true"
      role="presentation"
    >
      {animation}
    </div>
  );
}

/**
 * Instructions for replacing the animation asset:
 * 
 * 1. Create your Lottie animation in After Effects or similar tool
 * 2. Export as JSON (≤300KB recommended)
 * 3. Replace the `biteAnimationData` object above with your animation data
 * 4. Or use HeroBiteCustom component with your own animation data
 * 5. Provide a static fallback image for reduced motion users
 * 
 * Example usage with custom animation:
 * 
 * import biteAnimationData from './animations/my-bite-animation.json';
 * 
 * <HeroBiteCustom 
 *   animationData={biteAnimationData}
 *   fallbackImage="/my-static-bite.png"
 *   position="top-right"
 *   scrollThreshold={0.1}
 * />
 */
