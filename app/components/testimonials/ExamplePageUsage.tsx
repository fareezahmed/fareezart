import Testimonials from './Testimonials';

/**
 * Example of how to use the Testimonials component in a page
 * This shows different configuration options
 */

export default function ExamplePageUsage() {
  return (
    <div>
      {/* Basic usage with default settings */}
      <Testimonials />

      {/* Custom configuration */}
      <Testimonials
        title="Client Feedback"
        subtitle="What our clients have to say about our work"
        useSiteSettings={false}
        maxTestimonials={3}
      />

      {/* Using site settings (recommended) */}
      <Testimonials
        useSiteSettings={true}
        maxTestimonials={6}
      />
    </div>
  );
}

