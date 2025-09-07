/**
 * Sanity Project Schema
 * Defines the content model for projects/case studies
 */

export const projectSchema = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required().max(100),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'roles',
      title: 'Roles',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Illustration', value: 'illustration' },
              { title: 'Design', value: 'design' },
              { title: 'Cartoon', value: 'cartoon' },
              { title: 'Authoring', value: 'authoring' },
            ],
          },
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'cover',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true, // Enable crop/hotspot functionality
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required().max(200),
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(2020).max(new Date().getFullYear() + 1),
    },
    {
      name: 'client',
      title: 'Client',
      type: 'string',
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      placeholder: 'e.g., 3 months, 6 weeks',
    },
    {
      name: 'brief',
      title: 'Project Brief',
      type: 'object',
      fields: [
        {
          name: 'context',
          title: 'Context',
          type: 'text',
          rows: 3,
        },
        {
          name: 'problem',
          title: 'Problem Statement',
          type: 'text',
          rows: 4,
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'goals',
          title: 'Goals & Objectives',
          type: 'array',
          of: [{ type: 'string' }],
          validation: (Rule: any) => Rule.required().min(1),
        },
        {
          name: 'constraints',
          title: 'Constraints & Challenges',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    },
    {
      name: 'process',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Step Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'media',
              title: 'Media',
              type: 'object',
              fields: [
                {
                  name: 'type',
                  title: 'Media Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Image', value: 'image' },
                      { title: 'Video', value: 'video' },
                      { title: 'Lottie Animation', value: 'lottie' },
                    ],
                  },
                },
                {
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    {
                      name: 'alt',
                      title: 'Alt Text',
                      type: 'string',
                    },
                    {
                      name: 'caption',
                      title: 'Caption',
                      type: 'string',
                    },
                  ],
                  hidden: ({ parent }: any) => parent?.type !== 'image',
                },
                {
                  name: 'videoUrl',
                  title: 'Video URL',
                  type: 'url',
                  hidden: ({ parent }: any) => parent?.type !== 'video',
                },
                {
                  name: 'lottieUrl',
                  title: 'Lottie URL',
                  type: 'url',
                  hidden: ({ parent }: any) => parent?.type !== 'lottie',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Media Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Image', value: 'image' },
                  { title: 'Video', value: 'video' },
                  { title: 'Lottie Animation', value: 'lottie' },
                ],
              },
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'caption',
                  title: 'Caption',
                  type: 'string',
                },
              ],
              hidden: ({ parent }: any) => parent?.type !== 'image',
            },
            {
              name: 'videoUrl',
              title: 'Video URL',
              type: 'url',
              hidden: ({ parent }: any) => parent?.type !== 'video',
            },
            {
              name: 'lottieUrl',
              title: 'Lottie URL',
              type: 'url',
              hidden: ({ parent }: any) => parent?.type !== 'lottie',
            },
          ],
        },
      ],
    },
    {
      name: 'results',
      title: 'Results & Impact',
      type: 'object',
      fields: [
        {
          name: 'summary',
          title: 'Results Summary',
          type: 'text',
          rows: 3,
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'metrics',
          title: 'Key Metrics',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  title: 'Metric Label',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'value',
                  title: 'Value',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'string',
                },
                {
                  name: 'improvement',
                  title: 'Improvement',
                  type: 'string',
                  placeholder: 'e.g., +25% vs. previous',
                },
              ],
            },
          ],
        },
        {
          name: 'testimonial',
          title: 'Client Testimonial',
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 3,
            },
            {
              name: 'author',
              title: 'Author Name',
              type: 'string',
            },
            {
              name: 'role',
              title: 'Role/Title',
              type: 'string',
            },
            {
              name: 'company',
              title: 'Company',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Show this project prominently on the homepage',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'cover',
    },
  },
  orderings: [
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
  ],
};
