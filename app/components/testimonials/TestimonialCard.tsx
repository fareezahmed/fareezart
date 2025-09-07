import Image from 'next/image';

/**
 * Testimonial Card Component
 * Features:
 * - High-contrast, minimal design inspired by Diegoliv
 * - Fixed dimensions to prevent CLS
 * - Accessible structure with proper semantic HTML
 * - Avatar support with fallback
 */

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
  className?: string;
}

export default function TestimonialCard({
  quote,
  author,
  role,
  company,
  avatar,
  className = ''
}: TestimonialCardProps) {
  // Truncate long quotes to maintain consistent card heights
  const truncatedQuote = quote.length > 280 
    ? `${quote.substring(0, 280)}...` 
    : quote;

  return (
    <div 
      className={`
        bg-white border border-gray-200 rounded-lg p-6 h-full
        shadow-sm hover:shadow-md transition-shadow duration-200
        flex flex-col justify-between
        ${className}
      `}
      role="group"
      aria-label={`Testimonial from ${author}`}
    >
      {/* Quote */}
      <blockquote className="flex-1 mb-6">
        <p className="text-gray-700 leading-relaxed text-base">
          "{truncatedQuote}"
        </p>
      </blockquote>

      {/* Author Info */}
      <footer className="flex items-center gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {avatar ? (
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100">
              <Image
                src={avatar}
                alt={`${author} avatar`}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {author.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Author Details */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-900 text-sm">
            {author}
          </div>
          <div className="text-gray-600 text-sm">
            {role}
            {company && (
              <span className="text-gray-500"> at {company}</span>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}

