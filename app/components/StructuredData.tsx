/**
 * JSON-LD structured data for SEO
 * Defines Person schema with proper XSS protection
 */
export default function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "FareezArt",
    "url": "https://fareezart.vercel.app",
    "image": "https://fareezart.vercel.app/og-image.svg",
    "description": "Frontend developer specializing in Next.js, React, TypeScript, and modern web technologies",
    "jobTitle": "Frontend Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "FareezArt"
    },
    "sameAs": [
      "https://github.com/fareezart",
      "https://linkedin.com/in/fareezart",
      "https://twitter.com/fareezart"
    ],
    "knowsAbout": [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Web Accessibility",
      "SEO",
      "Performance Optimization"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Web Development"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(personSchema).replace(/</g, '\\u003c')
      }}
    />
  );
}

