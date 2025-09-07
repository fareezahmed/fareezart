/**
 * Case Study Results component
 * Features:
 * - Key metrics and outcomes
 * - Visual impact indicators
 * - Client testimonials
 * - Performance improvements
 * - Accessibility with proper semantic structure
 */
interface Metric {
  label: string;
  value: string;
  description?: string;
  improvement?: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
}

interface ResultsProps {
  metrics: Metric[];
  testimonial?: Testimonial;
  summary: string;
  className?: string;
}

export default function Results({
  metrics,
  testimonial,
  summary,
  className = ''
}: ResultsProps) {
  return (
    <section 
      className={`py-16 lg:py-20 bg-gray-50 ${className}`}
      aria-labelledby="results-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          id="results-heading"
          className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center"
        >
          Results & Impact
        </h2>

        {/* Summary */}
        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-xl text-gray-700 leading-relaxed text-center">
            {summary}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                {metric.value}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {metric.label}
              </h3>
              {metric.description && (
                <p className="text-gray-600 text-sm mb-3">
                  {metric.description}
                </p>
              )}
              {metric.improvement && (
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {metric.improvement}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Testimonial */}
        {testimonial && (
          <div className="max-w-4xl mx-auto">
            <blockquote className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    "{testimonial.quote}"
                  </p>
                  <footer className="text-sm text-gray-600">
                    <cite className="font-semibold text-gray-900 not-italic">
                      {testimonial.author}
                    </cite>
                    {testimonial.role && (
                      <>
                        , {testimonial.role}
                        {testimonial.company && ` at ${testimonial.company}`}
                      </>
                    )}
                  </footer>
                </div>
              </div>
            </blockquote>
          </div>
        )}
      </div>
    </section>
  );
}
