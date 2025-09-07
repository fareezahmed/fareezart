import { Suspense } from 'react';
import Carousel from './Carousel';
import TestimonialCard from './TestimonialCard';
import { getTestimonials, getTestimonialsByLimit, getSiteSettings, type Testimonial } from '@/lib/cms';

/**
 * Testimonials Section Component
 * Features:
 * - Server component wrapper with progressive enhancement
 * - Grid fallback for no-JS scenarios
 * - Responsive design with consistent spacing
 * - SEO-friendly structure
 */

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  useSiteSettings?: boolean;
  maxTestimonials?: number;
  className?: string;
}

// Loading skeleton for carousel
function CarouselSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-white border border-gray-200 rounded-lg p-6 h-64 mb-8">
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="flex items-center gap-4 mt-6">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-3 h-3 bg-gray-200 rounded-full"></div>
          ))}
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
}

export default async function Testimonials({
  title = "What Clients Say",
  subtitle = "Hear from the people I've had the pleasure of working with",
  useSiteSettings = true,
  maxTestimonials = 5,
  className = ''
}: TestimonialsProps) {
  // Fetch testimonials and settings from Sanity CMS
  const [testimonials, siteSettings] = await Promise.all([
    useSiteSettings 
      ? getTestimonialsByLimit(maxTestimonials)
      : getTestimonials(),
    useSiteSettings ? getSiteSettings() : null
  ]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  // Use site settings if available, otherwise use props/defaults
  const finalTitle = siteSettings?.title || title;
  const finalSubtitle = subtitle;
  const autoRotate = siteSettings?.testimonialsSettings?.autoRotate ?? true;
  const autoRotateInterval = siteSettings?.testimonialsSettings?.autoRotateInterval ?? 5000;

  return (
    <section 
      className={`py-16 lg:py-20 bg-gray-50 ${className}`}
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            id="testimonials-heading"
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            {finalTitle}
          </h2>
          {finalSubtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {finalSubtitle}
            </p>
          )}
        </div>

        {/* Testimonials Content */}
        <div className="relative">
          {/* Progressive Enhancement: Grid Fallback */}
          <noscript>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </noscript>

          {/* Enhanced Carousel (with JS) */}
          <Suspense fallback={<CarouselSkeleton />}>
            <Carousel
              testimonials={testimonials}
              autoRotate={autoRotate}
              autoRotateInterval={autoRotateInterval}
            />
          </Suspense>
        </div>

        {/* Optional: View All Link */}
        {testimonials.length > 3 && (
          <div className="text-center mt-8">
            <button className="text-blue-600 hover:text-blue-700 focus:outline-none focus:underline font-medium">
              View All Testimonials
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
