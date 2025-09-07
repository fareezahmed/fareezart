/**
 * Case Study Brief component
 * Features:
 * - Problem statement with clear context
 * - Goals and objectives
 * - Constraints and challenges
 * - Semantic HTML structure for accessibility
 */
interface BriefProps {
  problem: string;
  goals: string[];
  constraints?: string[];
  context?: string;
  className?: string;
}

export default function Brief({
  problem,
  goals,
  constraints = [],
  context,
  className = ''
}: BriefProps) {
  return (
    <section 
      className={`py-16 lg:py-20 ${className}`}
      aria-labelledby="brief-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          id="brief-heading"
          className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12"
        >
          Project Brief
        </h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Problem & Context */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              The Challenge
            </h3>
            {context && (
              <p className="text-gray-600 mb-4 leading-relaxed">
                {context}
              </p>
            )}
            <p className="text-gray-700 leading-relaxed">
              {problem}
            </p>
          </div>

          {/* Goals & Constraints */}
          <div className="space-y-8">
            {/* Goals */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Goals & Objectives
              </h3>
              <ul className="space-y-3">
                {goals.map((goal, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Constraints */}
            {constraints.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Constraints & Challenges
                </h3>
                <ul className="space-y-3">
                  {constraints.map((constraint, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{constraint}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
