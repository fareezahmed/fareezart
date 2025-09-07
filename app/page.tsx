import Hero, { HeroWithCTA } from './components/Hero';
import HeroBite from './components/HeroBite';
import Testimonials from './components/testimonials/Testimonials';
import ContactForm from './components/ContactForm';

/**
 * Homepage with example sections demonstrating smooth scroll navigation
 * Each section has a unique ID for anchor navigation
 */
export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with micro-animation */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100"
        aria-labelledby="hero-heading"
      >
        <Hero
          headline="Welcome to FareezArt"
          subtext="A modern Next.js 15 application with smooth scrolling, sticky navigation, and exceptional performance."
          className="relative z-20"
        />
        
        {/* Micro-animation that triggers on scroll */}
        <HeroBite 
          position="top-right"
          scrollThreshold={0.05}
          showReplayButton={true}
          testMode={true}
        />
          
          {/* Hero image for preloader to wait for */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/next.svg"
              alt="Next.js Logo"
              data-hero
              className="w-32 h-32 opacity-20"
              loading="eager"
            />
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-white px-4 sm:px-6 lg:px-8"
        aria-labelledby="about-heading"
      >
        <div className="max-w-4xl mx-auto">
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12"
          >
            About Our Platform
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Built with Modern Technology
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Our application leverages Next.js 15, TypeScript, and Tailwind CSS 
                to deliver a fast, accessible, and maintainable user experience.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Smooth scrolling with Lenis
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Sticky navigation header
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Full keyboard accessibility
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Mobile-responsive design
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">95+</div>
                <div className="text-gray-600">Lighthouse Performance Score</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8"
        aria-labelledby="services-heading"
      >
        <div className="max-w-6xl mx-auto">
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12"
          >
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Frontend Development',
                description: 'Modern React and Next.js applications with TypeScript and Tailwind CSS.',
                icon: '⚛️'
              },
              {
                title: 'Performance Optimization',
                description: 'Lighthouse scores of 95+ with optimized bundle sizes and Core Web Vitals.',
                icon: '⚡'
              },
              {
                title: 'Accessibility',
                description: 'WCAG compliant applications with full keyboard navigation and screen reader support.',
                icon: '♿'
              }
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-white px-4 sm:px-6 lg:px-8"
        aria-labelledby="contact-heading"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8"
          >
            Get in Touch
          </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to build something amazing? Let&apos;s discuss your next project 
            and create a solution that exceeds your expectations.
          </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Send us a Message
              </h3>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  Contact Information
              </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <p className="text-gray-600">hello@fareezart.com</p>
                      <p className="text-sm text-gray-500">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Response Time</h4>
                      <p className="text-gray-600">Within 24 hours</p>
                      <p className="text-sm text-gray-500">Monday to Friday</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Free Consultation</h4>
                      <p className="text-gray-600">Initial project discussion</p>
                      <p className="text-sm text-gray-500">No obligation, just advice</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3">What to Expect</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Quick response within 24 hours
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Detailed project proposal
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Transparent pricing and timeline
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Regular updates throughout the project
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
