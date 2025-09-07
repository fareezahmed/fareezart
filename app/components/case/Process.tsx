import Image from 'next/image';

/**
 * Case Study Process component
 * Features:
 * - Step-by-step process breakdown
 * - Media blocks (images, videos, Lottie animations)
 * - Responsive layout with proper spacing
 * - Accessibility with proper headings and descriptions
 */
interface ProcessStep {
  id: string;
  title: string;
  description: string;
  media?: {
    type: 'image' | 'video' | 'lottie';
    src: string;
    alt?: string;
    caption?: string;
  };
}

interface ProcessProps {
  steps: ProcessStep[];
  className?: string;
}

export default function Process({
  steps,
  className = ''
}: ProcessProps) {
  return (
    <section 
      className={`py-16 lg:py-20 bg-gray-50 ${className}`}
      aria-labelledby="process-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          id="process-heading"
          className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center"
        >
          Process & Approach
        </h2>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div key={step.id} className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {step.title}
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {step.description}
                </p>
              </div>

              {/* Media */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                {step.media && (
                  <div className="relative">
                    {step.media.type === 'image' && (
                      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={step.media.src}
                          alt={step.media.alt || step.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {step.media.type === 'video' && (
                      <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-gray-100">
                        <video
                          src={step.media.src}
                          controls
                          className="w-full h-full object-cover"
                          preload="metadata"
                          aria-label={step.media.alt || step.title}
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}

                    {step.media.type === 'lottie' && (
                      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                        <div 
                          className="w-full h-full"
                          data-lottie-src={step.media.src}
                          aria-label={step.media.alt || step.title}
                        >
                          {/* Lottie animation will be loaded here */}
                          <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500">Loading animation...</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {step.media.caption && (
                      <p className="text-sm text-gray-600 mt-3 text-center">
                        {step.media.caption}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
