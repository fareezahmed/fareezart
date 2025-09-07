/**
 * GROQ Queries for Sanity CMS
 * Optimized queries for projects and case studies
 */

// Base image projection with crop/hotspot support
const imageProjection = `
  asset->{
    _id,
    url,
    metadata {
      dimensions {
        width,
        height
      }
    }
  },
  hotspot,
  crop,
  alt,
  caption
`;

// Project list query (for /projects page)
export const projectsListQuery = `
  *[_type == "project" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    roles,
    cover {
      ${imageProjection}
    },
    summary,
    year,
    client,
    duration,
    publishedAt,
    featured
  }
`;

// Single project query (for /projects/[slug] page)
export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    roles,
    cover {
      ${imageProjection}
    },
    summary,
    year,
    client,
    duration,
    brief {
      context,
      problem,
      goals,
      constraints
    },
    process[] {
      title,
      description,
      media {
        type,
        image {
          ${imageProjection}
        },
        videoUrl,
        lottieUrl
      }
    },
    gallery[] {
      type,
      image {
        ${imageProjection}
      },
      videoUrl,
      lottieUrl
    },
    results {
      summary,
      metrics[] {
        label,
        value,
        description,
        improvement
      },
      testimonial {
        quote,
        author,
        role,
        company
      }
    },
    publishedAt,
    featured
  }
`;

// Featured projects query (for homepage)
export const featuredProjectsQuery = `
  *[_type == "project" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    roles,
    cover {
      ${imageProjection}
    },
    summary,
    year
  }
`;

// Projects by role query (for filtering)
export const projectsByRoleQuery = `
  *[_type == "project" && $role in roles] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    roles,
    cover {
      ${imageProjection}
    },
    summary,
    year,
    client,
    duration,
    publishedAt
  }
`;

// Related projects query (same roles, excluding current)
export const relatedProjectsQuery = `
  *[_type == "project" && _id != $excludeId && count(roles[@ in $roles]) > 0] | order(publishedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    roles,
    cover {
      ${imageProjection}
    },
    summary,
    year
  }
`;

// All project slugs (for static generation)
export const allProjectSlugsQuery = `
  *[_type == "project" && defined(slug.current)] {
    "slug": slug.current
  }
`;

// Testimonials queries
export const testimonialsQuery = `
  *[_type == "testimonial" && defined(publishedAt)] | order(priority asc, publishedAt desc) {
    _id,
    name,
    company,
    role,
    quote,
    avatar {
      ${imageProjection}
    },
    priority,
    featured,
    publishedAt
  }
`;

export const featuredTestimonialsQuery = `
  *[_type == "testimonial" && featured == true && defined(publishedAt)] | order(priority asc, publishedAt desc) [0...6] {
    _id,
    name,
    company,
    role,
    quote,
    avatar {
      ${imageProjection}
    },
    priority,
    featured,
    publishedAt
  }
`;

export const testimonialsByPriorityQuery = `
  *[_type == "testimonial" && defined(publishedAt)] | order(priority asc, publishedAt desc) [0...$limit] {
    _id,
    name,
    company,
    role,
    quote,
    avatar {
      ${imageProjection}
    },
    priority,
    featured,
    publishedAt
  }
`;

// Site settings query for testimonials configuration
export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    title,
    featuredTestimonials[]-> {
      _id,
      name,
      company,
      role,
      quote,
      avatar {
        ${imageProjection}
      },
      priority,
      featured,
      publishedAt
    },
    testimonialsSettings {
      autoRotate,
      autoRotateInterval,
      maxTestimonials
    }
  }
`;
