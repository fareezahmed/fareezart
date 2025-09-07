'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

/**
 * Hero component with headline, subtext, and partner logos
 * Features:
 * - WCAG 2.1 AA compliant contrast ratios
 * - Responsive typography with fluid scaling
 * - Partner logos that stack gracefully on mobile
 * - LCP optimized with immediate text render
 */
interface PartnerLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
  href?: string;
}

interface HeroProps {
  headline: string;
  subtext?: string;
  partnerLogos?: PartnerLogo[];
  className?: string;
}

// Sample partner logos - replace with actual partner assets
const defaultPartnerLogos: PartnerLogo[] = [
  {
    src: '/next.svg',
    alt: 'Next.js',
    width: 120,
    height: 40,
    href: 'https://nextjs.org'
  },
  {
    src: '/vercel.svg',
    alt: 'Vercel',
    width: 120,
    height: 40,
    href: 'https://vercel.com'
  },
  {
    src: '/file.svg',
    alt: 'File Icon',
    width: 120,
    height: 40
  },
  {
    src: '/globe.svg',
    alt: 'Globe Icon',
    width: 120,
    height: 40
  }
];

export default function Hero({ 
  headline = "Build Something Amazing",
  subtext = "Create exceptional web experiences with modern tools and best practices.",
  partnerLogos = defaultPartnerLogos,
  className = ""
}: HeroProps) {

  return (
    <section className={`py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
            {headline}
          </h1>
          
          {/* Subtext */}
          {subtext && (
            <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {subtext}
            </p>
          )}

          {/* Partner Logos Row */}
          {partnerLogos.length > 0 && (
            <div className="mt-16 sm:mt-20">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-8">
                Trusted by leading companies
              </p>
              
              <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 lg:gap-16">
                {partnerLogos.map((logo, index) => {
                  const LogoComponent = logo.href ? 'a' : 'div';
                  const logoProps = logo.href 
                    ? { 
                        href: logo.href, 
                        target: '_blank', 
                        rel: 'noopener noreferrer',
                        className: 'transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded'
                      }
                    : { className: 'transition-opacity hover:opacity-70' };

                  return (
                    <LogoComponent
                      key={`${logo.alt}-${index}`}
                      {...logoProps}
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={logo.width}
                        height={logo.height}
                        className="h-8 sm:h-10 lg:h-12 w-auto filter grayscale hover:grayscale-0 transition-all duration-300"
                        priority={index < 2} // Prioritize first 2 logos
                        sizes="(max-width: 640px) 80px, (max-width: 1024px) 100px, 120px"
                      />
                    </LogoComponent>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * Alternative Hero variant with CTA button
 */
interface HeroWithCTAProps extends HeroProps {
  ctaText: string;
  ctaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

export function HeroWithCTA({ 
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  ...heroProps 
}: HeroWithCTAProps) {
  return (
    <Hero {...heroProps}>
      <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href={ctaHref}
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          {ctaText}
        </a>
        {secondaryCtaText && secondaryCtaHref && (
          <a
            href={secondaryCtaHref}
            className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            {secondaryCtaText}
          </a>
        )}
      </div>
    </Hero>
  );
}
