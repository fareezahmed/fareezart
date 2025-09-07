/**
 * Sanity Testimonial Schema
 * Defines the content model for testimonials with validation and safety measures
 */

export const testimonialSchema = {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required().max(100).error('Name must be 100 characters or less'),
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (Rule: any) => Rule.max(100).error('Company name must be 100 characters or less'),
    },
    {
      name: 'role',
      title: 'Role/Title',
      type: 'string',
      validation: (Rule: any) => Rule.required().max(100).error('Role must be 100 characters or less'),
    },
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => 
        Rule.required()
          .max(280)
          .error('Quote must be 280 characters or less for optimal display'),
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true, // Enable crop/hotspot functionality
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the person in the photo for accessibility',
          validation: (Rule: any) => Rule.required().error('Alt text is required for accessibility'),
        },
      ],
    },
    {
      name: 'priority',
      title: 'Display Priority',
      type: 'number',
      description: 'Lower numbers appear first. Leave empty for alphabetical ordering.',
      validation: (Rule: any) => Rule.min(0).max(999).integer(),
    },
    {
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      description: 'Show this testimonial prominently',
      initialValue: false,
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'company',
      media: 'avatar',
    },
    prepare(selection: any) {
      const { title, subtitle, media } = selection;
      return {
        title: title || 'Untitled Testimonial',
        subtitle: subtitle ? `${subtitle}` : 'No company',
        media: media,
      };
    },
  },
  orderings: [
    {
      title: 'Priority, Low to High',
      name: 'priorityAsc',
      by: [{ field: 'priority', direction: 'asc' }],
    },
    {
      title: 'Priority, High to Low',
      name: 'priorityDesc',
      by: [{ field: 'priority', direction: 'desc' }],
    },
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
    {
      title: 'Name, A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
};

// Optional: Site Settings schema for curated testimonial ordering
export const siteSettingsSchema = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'featuredTestimonials',
      title: 'Featured Testimonials',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'testimonial' }],
        },
      ],
      description: 'Curated list of testimonials to display prominently',
      validation: (Rule: any) => Rule.max(6).error('Maximum 6 featured testimonials allowed'),
    },
    {
      name: 'testimonialsSettings',
      title: 'Testimonials Settings',
      type: 'object',
      fields: [
        {
          name: 'autoRotate',
          title: 'Auto-rotate Carousel',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'autoRotateInterval',
          title: 'Auto-rotate Interval (seconds)',
          type: 'number',
          initialValue: 5,
          validation: (Rule: any) => Rule.min(3).max(10).integer(),
        },
        {
          name: 'maxTestimonials',
          title: 'Maximum Testimonials to Display',
          type: 'number',
          initialValue: 5,
          validation: (Rule: any) => Rule.min(3).max(10).integer(),
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection: any) {
      return {
        title: selection.title || 'Site Settings',
      };
    },
  },
};

