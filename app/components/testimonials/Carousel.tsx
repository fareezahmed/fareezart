'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import TestimonialCard from './TestimonialCard';
import { type Testimonial } from '@/lib/cms';

/**
 * Accessible Testimonials Carousel
 * Features:
 * - WAI-ARIA Carousel Pattern implementation
 * - Auto-rotation with pause on hover/focus
 * - Keyboard navigation (Arrow keys, Tab)
 * - Respects prefers-reduced-motion
 * - Progressive enhancement with grid fallback
 */


interface CarouselProps {
  testimonials: Testimonial[];
  autoRotate?: boolean;
  autoRotateInterval?: number;
  className?: string;
}

export default function Carousel({
  testimonials,
  autoRotate = true,
  autoRotateInterval = 5000,
  className = ''
}: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(autoRotate);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        setIsAutoRotating(false);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Auto-rotation logic
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (isAutoRotating && !isHovered && !isFocused && !prefersReducedMotion) {
      autoRotateRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      }, autoRotateInterval);
    } else {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
        autoRotateRef.current = null;
      }
    }

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, [isAutoRotating, isHovered, isFocused, prefersReducedMotion, autoRotateInterval, testimonials.length]);

  // Announce slide changes to screen readers
  useEffect(() => {
    if (statusRef.current) {
      statusRef.current.textContent = `Slide ${currentSlide + 1} of ${testimonials.length}`;
    }
  }, [currentSlide, testimonials.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const toggleAutoRotate = useCallback(() => {
    setIsAutoRotating((prev) => !prev);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        goToPrevious();
        break;
      case 'ArrowRight':
        e.preventDefault();
        goToNext();
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(testimonials.length - 1);
        break;
    }
  }, [goToPrevious, goToNext, goToSlide, testimonials.length]);

  // If reduced motion is preferred, show grid fallback
  if (prefersReducedMotion) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            quote={testimonial.quote}
            author={testimonial.name}
            role={testimonial.role}
            company={testimonial.company}
            avatar={testimonial.avatar?.url}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="relative"
        role="region"
        aria-label="Testimonials carousel"
        aria-roledescription="carousel"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {/* Current Testimonial */}
        <div className="mb-8">
          <TestimonialCard
            quote={testimonials[currentSlide]?.quote || ''}
            author={testimonials[currentSlide]?.name || ''}
            role={testimonials[currentSlide]?.role || ''}
            company={testimonials[currentSlide]?.company}
            avatar={testimonials[currentSlide]?.avatar?.url}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          {/* Previous/Next Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={goToNext}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`
                  w-3 h-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  ${index === currentSlide 
                    ? 'bg-blue-600' 
                    : 'bg-gray-300 hover:bg-gray-400'
                  }
                `}
                role="tab"
                aria-selected={index === currentSlide}
                aria-label={`Go to testimonial ${index + 1}`}
                tabIndex={index === currentSlide ? 0 : -1}
              />
            ))}
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={toggleAutoRotate}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            aria-label={isAutoRotating ? 'Pause auto-rotation' : 'Start auto-rotation'}
          >
            {isAutoRotating ? (
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-7a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
        </div>

        {/* Screen Reader Status */}
        <div
          ref={statusRef}
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
        >
          Slide 1 of {testimonials.length}
        </div>
      </div>
    </div>
  );
}
