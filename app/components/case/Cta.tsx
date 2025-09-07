import Link from 'next/link';

/**
 * Case Study CTA component
 * Features:
 * - Call-to-action for project inquiries
 * - Link back to projects overview
 * - Contact and booking options
 * - Accessible button design
 */
interface CtaProps {
  projectTitle: string;
  contactEmail?: string;
  bookingLink?: string;
  className?: string;
}

export default function Cta({
  projectTitle,
  contactEmail = 'hello@fareezart.com',
  bookingLink = '/contact',
  className = ''
}: CtaProps) {
  return (
    <section 
      className={`py-16 lg:py-20 bg-blue-600 ${className}`}
      aria-labelledby="cta-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 
          id="cta-heading"
          className="text-3xl lg:text-4xl font-bold text-white mb-6"
        >
          Ready to Start Your Project?
        </h2>
        
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Like what you see with {projectTitle}? Let's discuss how we can bring your vision to life with the same level of creativity and attention to detail.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href={bookingLink}
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book a Call
          </Link>

          <Link
            href={`mailto:${contactEmail}?subject=Project Inquiry - ${projectTitle}`}
            className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Send Email
          </Link>
        </div>

        <div className="border-t border-blue-500 pt-8">
          <Link
            href="/projects"
            className="inline-flex items-center text-blue-100 hover:text-white focus:outline-none focus:underline transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
