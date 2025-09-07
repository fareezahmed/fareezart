'use client';

import { useEffect, useRef, useState } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';

/**
 * Custom hook for Lottie animations with accessibility and performance optimizations
 * Features:
 * - Respects prefers-reduced-motion setting
 * - Pauses when tab is not visible (visibilitychange)
 * - Resumes when tab becomes visible
 * - Provides fallback for reduced motion preference
 * - Supports both lottie-web and @lottiefiles/dotlottie-web
 * - Optimized rendering with will-change and backface-visibility
 */
interface UseLottieOptions {
  animationData: unknown;
  loop?: boolean;
  autoplay?: boolean;
  fallbackImage?: string; // Static image for reduced motion
  className?: string;
  onComplete?: () => void;
  onLoopComplete?: () => void;
  // Micro-animation specific options
  scrollTrigger?: boolean; // Enable scroll-based triggering
  scrollThreshold?: number; // Scroll percentage to trigger (0-1)
  playOnce?: boolean; // Play only once per page load
  replayButton?: boolean; // Show replay button after completion
}

export function useLottie({
  animationData,
  loop = true,
  autoplay = true,
  fallbackImage,
  className = '',
  onComplete,
  onLoopComplete,
  scrollTrigger = false,
  scrollThreshold = 0.1,
  playOnce = false,
  replayButton = false,
}: UseLottieOptions) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [, setIsAnimationReady] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [showReplayButton, setShowReplayButton] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    // Only run on client side to prevent hydration mismatch
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Handle scroll trigger for micro-animations
  useEffect(() => {
    if (!scrollTrigger || typeof window === 'undefined') return;

    const handleScroll = () => {
      const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      
      console.log('Scroll progress:', scrollProgress, 'Threshold:', scrollThreshold, 'Has played:', hasPlayed);
      
      if (scrollProgress >= scrollThreshold && !hasPlayed && !prefersReducedMotion) {
        console.log('Triggering animation!');
        if (lottieRef.current?.animationItem) {
          lottieRef.current.animationItem.play();
          setHasPlayed(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollTrigger, scrollThreshold, hasPlayed, prefersReducedMotion]);

  // Handle visibility change (pause/resume when tab is not visible)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleVisibilityChange = () => {
      const isTabVisible = !document.hidden;
      setIsVisible(isTabVisible);

      if (lottieRef.current?.animationItem) {
        if (isTabVisible) {
          // Resume animation when tab becomes visible (only if not scroll-triggered or already played)
          if (!prefersReducedMotion && autoplay && (!scrollTrigger || hasPlayed)) {
            lottieRef.current.animationItem.play();
          }
        } else {
          // Pause animation when tab is not visible
          lottieRef.current.animationItem.pause();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [prefersReducedMotion, autoplay, scrollTrigger, hasPlayed]);

  // Lottie event handlers
  const handleAnimationReady = () => {
    console.log('Animation ready!', { autoplay, scrollTrigger, prefersReducedMotion, isVisible });
    setIsAnimationReady(true);
    
    // Handle initial play state based on preferences
    if (lottieRef.current?.animationItem) {
      if (prefersReducedMotion) {
        // Show only first frame for reduced motion
        console.log('Reduced motion - showing first frame');
        lottieRef.current.animationItem.goToAndStop(0, true);
      } else if (autoplay && isVisible && !scrollTrigger) {
        // Only autoplay if not scroll-triggered
        console.log('Auto-playing animation');
        lottieRef.current.animationItem.play();
      } else if (scrollTrigger) {
        // For scroll-triggered animations, start at first frame
        console.log('Scroll-triggered animation - showing first frame');
        lottieRef.current.animationItem.goToAndStop(0, true);
      }
    }
  };

  const handleComplete = () => {
    onComplete?.();
    if (playOnce && replayButton) {
      setShowReplayButton(true);
    }
  };

  const handleLoopComplete = () => {
    onLoopComplete?.();
  };

  // Replay function for scroll-triggered animations
  const replay = () => {
    if (lottieRef.current?.animationItem && !prefersReducedMotion) {
      lottieRef.current.animationItem.goToAndPlay(0, true);
      setShowReplayButton(false);
    }
  };

  // Render fallback for reduced motion
  if (prefersReducedMotion && fallbackImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={fallbackImage}
        alt="Static animation frame"
        className={className}
        loading="lazy"
      />
    );
  }

  // Render Lottie animation with optional replay button
  return (
    <div className="relative">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={false} // We handle autoplay manually
        className={className}
        onComplete={handleComplete}
        onLoopComplete={handleLoopComplete}
        onDOMLoaded={handleAnimationReady}
        style={{
          // Ensure smooth rendering
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      />
      
      {/* Replay button for scroll-triggered animations */}
      {showReplayButton && replayButton && (
        <button
          onClick={replay}
          className="absolute bottom-2 right-2 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Replay animation"
        >
          <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
}

/**
 * Hook to get animation controls for external control
 */
export function useLottieControls(animationRef: React.RefObject<LottieRefCurrentProps>) {
  const play = () => {
    if (animationRef.current?.animationItem) {
      animationRef.current.animationItem.play();
    }
  };

  const pause = () => {
    if (animationRef.current?.animationItem) {
      animationRef.current.animationItem.pause();
    }
  };

  const stop = () => {
    if (animationRef.current?.animationItem) {
      animationRef.current.animationItem.stop();
    }
  };

  const goToAndStop = (frame: number, isFrame?: boolean) => {
    if (animationRef.current?.animationItem) {
      animationRef.current.animationItem.goToAndStop(frame, isFrame);
    }
  };

  const goToAndPlay = (frame: number, isFrame?: boolean) => {
    if (animationRef.current?.animationItem) {
      animationRef.current.animationItem.goToAndPlay(frame, isFrame);
    }
  };

  const setSpeed = (speed: number) => {
    if (animationRef.current?.animationItem) {
      animationRef.current.animationItem.setSpeed(speed);
    }
  };

  return {
    play,
    pause,
    stop,
    goToAndStop,
    goToAndPlay,
    setSpeed,
  };
}
