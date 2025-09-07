import { getClient, getOptimizedImageUrl } from './sanity';
import { 
  projectsListQuery, 
  projectBySlugQuery, 
  featuredProjectsQuery,
  projectsByRoleQuery,
  relatedProjectsQuery,
  allProjectSlugsQuery,
  testimonialsQuery,
  featuredTestimonialsQuery,
  testimonialsByPriorityQuery,
  siteSettingsQuery
} from './queries';
import { ProjectRole } from '../app/components/ProjectsFilter';

/**
 * CMS Data Fetching Functions
 * Handles data fetching from Sanity with preview mode support
 */

// Type definitions for Sanity data
export interface SanityImage {
  asset: {
    _id: string;
    url: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
      };
    };
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  alt: string;
  caption?: string;
}

export interface ProjectListItem {
  _id: string;
  title: string;
  slug: string;
  roles: ProjectRole[];
  cover: SanityImage;
  summary: string;
  year: number;
  client?: string;
  duration?: string;
  publishedAt: string;
  featured: boolean;
}

export interface ProjectDetail extends ProjectListItem {
  brief: {
    context?: string;
    problem: string;
    goals: string[];
    constraints?: string[];
  };
  process: Array<{
    title: string;
    description: string;
    media?: {
      type: 'image' | 'video' | 'lottie';
      image?: SanityImage;
      videoUrl?: string;
      lottieUrl?: string;
    };
  }>;
  gallery: Array<{
    type: 'image' | 'video' | 'lottie';
    image?: SanityImage;
    videoUrl?: string;
    lottieUrl?: string;
  }>;
  results: {
    summary: string;
    metrics: Array<{
      label: string;
      value: string;
      description?: string;
      improvement?: string;
    }>;
    testimonial?: {
      quote: string;
      author: string;
      role: string;
      company?: string;
    };
  };
}

// Testimonial types
export interface Testimonial {
  id: string;
  name: string;
  company?: string;
  role: string;
  quote: string;
  avatar?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  priority?: number;
  featured: boolean;
  publishedAt: string;
}

export interface SiteSettings {
  title: string;
  featuredTestimonials: Testimonial[];
  testimonialsSettings: {
    autoRotate: boolean;
    autoRotateInterval: number;
    maxTestimonials: number;
  };
}

// Helper function to transform Sanity image to Next.js Image format
export function transformSanityImage(image: SanityImage, width?: number, height?: number) {
  if (!image?.asset?.url) return null;

  const baseUrl = image.asset.url;
  const params = new URLSearchParams();

  if (width) params.set('w', width.toString());
  if (height) params.set('h', height.toString());
  if (image.crop) {
    params.set('rect', `${image.crop.left},${image.crop.top},${image.crop.right},${image.crop.bottom}`);
  }
  if (image.hotspot) {
    params.set('fp-x', image.hotspot.x.toString());
    params.set('fp-y', image.hotspot.y.toString());
  }

  const queryString = params.toString();
  return {
    src: queryString ? `${baseUrl}?${queryString}` : baseUrl,
    alt: image.alt,
    width: image.asset.metadata.dimensions.width,
    height: image.asset.metadata.dimensions.height,
  };
}

// Fetch all projects for the projects page
export async function getAllProjects(preview = false): Promise<ProjectListItem[]> {
  if (!isSanityConfigured()) {
    return getMockProjects();
  }
  
  try {
    const client = getClient(preview);
    const data = await client.fetch(projectsListQuery);
    
    return data || [];
  } catch (error) {
    console.warn('Sanity CMS not available, using mock data:', error);
    return getMockProjects();
  }
}

// Fetch a single project by slug
export async function getProjectBySlug(slug: string, preview = false): Promise<ProjectDetail | null> {
  const client = getClient(preview);
  const data = await client.fetch(projectBySlugQuery, { slug });
  
  return data || null;
}

// Fetch featured projects for homepage
export async function getFeaturedProjects(preview = false): Promise<ProjectListItem[]> {
  const client = getClient(preview);
  const data = await client.fetch(featuredProjectsQuery);
  
  return data || [];
}

// Fetch projects by role (for filtering)
export async function getProjectsByRole(role: ProjectRole, preview = false): Promise<ProjectListItem[]> {
  const client = getClient(preview);
  const data = await client.fetch(projectsByRoleQuery, { role });
  
  return data || [];
}

// Fetch related projects
export async function getRelatedProjects(
  excludeId: string, 
  roles: ProjectRole[], 
  preview = false
): Promise<ProjectListItem[]> {
  const client = getClient(preview);
  const data = await client.fetch(relatedProjectsQuery, { excludeId, roles });
  
  return data || [];
}

// Fetch all project slugs for static generation
export async function getAllProjectSlugs(): Promise<{ slug: string }[]> {
  const client = getClient(false); // Always use published data for static generation
  const data = await client.fetch(allProjectSlugsQuery);
  
  return data || [];
}

// Preview mode helpers
export function enablePreviewMode() {
  // This would set a cookie or session to enable preview mode
  // Implementation depends on your preview setup
  console.log('Preview mode enabled');
}

export function disablePreviewMode() {
  // This would clear the preview mode cookie/session
  console.log('Preview mode disabled');
}

// Revalidation helpers
export async function revalidateProjects() {
  // This would trigger revalidation of the projects pages
  // Implementation depends on your deployment platform
  console.log('Revalidating projects pages');
}

export async function revalidateProject(slug: string) {
  // This would trigger revalidation of a specific project page
  console.log(`Revalidating project: ${slug}`);
}

// Testimonial data fetching functions
export async function getTestimonials(preview = false): Promise<Testimonial[]> {
  // Check if Sanity is properly configured
  if (!isSanityConfigured()) {
    return getMockTestimonials();
  }
  
  try {
    const client = getClient(preview);
    const data = await client.fetch(testimonialsQuery);
    
    return data?.map(transformTestimonial) || [];
  } catch (error) {
    console.warn('Sanity CMS not available, using mock data:', error);
    return getMockTestimonials();
  }
}

export async function getFeaturedTestimonials(preview = false): Promise<Testimonial[]> {
  if (!isSanityConfigured()) {
    return getMockTestimonials().filter(t => t.featured);
  }
  
  try {
    const client = getClient(preview);
    const data = await client.fetch(featuredTestimonialsQuery);
    
    return data?.map(transformTestimonial) || [];
  } catch (error) {
    console.warn('Sanity CMS not available, using mock data:', error);
    return getMockTestimonials().filter(t => t.featured);
  }
}

export async function getTestimonialsByLimit(limit: number, preview = false): Promise<Testimonial[]> {
  if (!isSanityConfigured()) {
    return getMockTestimonials().slice(0, limit);
  }
  
  try {
    const client = getClient(preview);
    const data = await client.fetch(testimonialsByPriorityQuery, { limit });
    
    return data?.map(transformTestimonial) || [];
  } catch (error) {
    console.warn('Sanity CMS not available, using mock data:', error);
    return getMockTestimonials().slice(0, limit);
  }
}

export async function getSiteSettings(preview = false): Promise<SiteSettings | null> {
  if (!isSanityConfigured()) {
    return {
      title: 'What Clients Say',
      featuredTestimonials: getMockTestimonials().filter(t => t.featured),
      testimonialsSettings: {
        autoRotate: true,
        autoRotateInterval: 5000,
        maxTestimonials: 5,
      },
    };
  }
  
  try {
    const client = getClient(preview);
    const data = await client.fetch(siteSettingsQuery);
    
    if (!data) return null;
    
    return {
      title: data.title || 'Site Settings',
      featuredTestimonials: data.featuredTestimonials?.map(transformTestimonial) || [],
      testimonialsSettings: {
        autoRotate: data.testimonialsSettings?.autoRotate ?? true,
        autoRotateInterval: (data.testimonialsSettings?.autoRotateInterval ?? 5) * 1000, // Convert to milliseconds
        maxTestimonials: data.testimonialsSettings?.maxTestimonials ?? 5,
      },
    };
  } catch (error) {
    console.warn('Sanity CMS not available, using mock settings:', error);
    return {
      title: 'What Clients Say',
      featuredTestimonials: getMockTestimonials().filter(t => t.featured),
      testimonialsSettings: {
        autoRotate: true,
        autoRotateInterval: 5000,
        maxTestimonials: 5,
      },
    };
  }
}

// Helper function to transform Sanity testimonial data
function transformTestimonial(data: any): Testimonial {
  return {
    id: data._id,
    name: sanitizeString(data.name),
    company: data.company ? sanitizeString(data.company) : undefined,
    role: sanitizeString(data.role),
    quote: sanitizeString(data.quote),
    avatar: data.avatar ? {
      url: getOptimizedImageUrl(data.avatar, 96, 96),
      width: data.avatar.asset?.metadata?.dimensions?.width || 96,
      height: data.avatar.asset?.metadata?.dimensions?.height || 96,
      alt: sanitizeString(data.avatar.alt || `${data.name} avatar`),
    } : undefined,
    priority: data.priority,
    featured: data.featured || false,
    publishedAt: data.publishedAt,
  };
}

// Helper function to check if Sanity is properly configured
function isSanityConfigured(): boolean {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  
  return !!(projectId && dataset && projectId !== 'your-project-id' && dataset !== 'production');
}

// Mock projects data for development
function getMockProjects(): ProjectListItem[] {
  return [
    {
      _id: 'mock-project-1',
      title: 'E-commerce Platform Redesign',
      slug: 'ecommerce-platform-redesign',
      roles: ['design', 'illustration'],
      cover: {
        asset: {
          _id: 'mock-asset-1',
          url: '/next.svg',
          metadata: {
            dimensions: {
              width: 800,
              height: 600
            }
          }
        },
        alt: 'E-commerce platform redesign cover',
        caption: 'Modern e-commerce interface design'
      },
      summary: 'Complete redesign of a modern e-commerce platform with focus on user experience and conversion optimization.',
      year: 2024,
      client: 'TechCorp',
      duration: '3 months',
      publishedAt: new Date().toISOString(),
      featured: true
    },
    {
      _id: 'mock-project-2',
      title: 'Brand Identity & Illustration',
      slug: 'brand-identity-illustration',
      roles: ['illustration', 'design'],
      cover: {
        asset: {
          _id: 'mock-asset-2',
          url: '/vercel.svg',
          metadata: {
            dimensions: {
              width: 800,
              height: 600
            }
          }
        },
        alt: 'Brand identity illustration cover',
        caption: 'Creative brand identity with custom illustrations'
      },
      summary: 'Comprehensive brand identity design including logo, illustrations, and visual guidelines for a startup.',
      year: 2024,
      client: 'StartupXYZ',
      duration: '2 months',
      publishedAt: new Date().toISOString(),
      featured: true
    },
    {
      _id: 'mock-project-3',
      title: 'Interactive Web Application',
      slug: 'interactive-web-application',
      roles: ['design', 'authoring'],
      cover: {
        asset: {
          _id: 'mock-asset-3',
          url: '/file.svg',
          metadata: {
            dimensions: {
              width: 800,
              height: 600
            }
          }
        },
        alt: 'Interactive web application cover',
        caption: 'Modern web application with interactive features'
      },
      summary: 'Development of an interactive web application with advanced animations and user interactions.',
      year: 2023,
      client: 'Agency Pro',
      duration: '4 months',
      publishedAt: new Date().toISOString(),
      featured: false
    }
  ];
}

// Mock testimonials data for development
function getMockTestimonials(): Testimonial[] {
  return [
    {
      id: 'mock-1',
      name: 'Sarah Johnson',
      company: 'TechCorp',
      role: 'Product Manager',
      quote: 'Fareez delivered an exceptional user interface that exceeded our expectations. The attention to detail and user experience was outstanding.',
      avatar: {
        url: '/next.svg', // Using placeholder image
        width: 96,
        height: 96,
        alt: 'Sarah Johnson avatar'
      },
      priority: 1,
      featured: true,
      publishedAt: new Date().toISOString(),
    },
    {
      id: 'mock-2',
      name: 'Michael Chen',
      company: 'Design Studio',
      role: 'Creative Director',
      quote: 'Working with Fareez was a pleasure. His technical expertise and creative vision brought our design concepts to life perfectly.',
      avatar: {
        url: '/vercel.svg',
        width: 96,
        height: 96,
        alt: 'Michael Chen avatar'
      },
      priority: 2,
      featured: true,
      publishedAt: new Date().toISOString(),
    },
    {
      id: 'mock-3',
      name: 'Emily Rodriguez',
      company: 'StartupXYZ',
      role: 'Founder',
      quote: 'Fareez helped us build a scalable frontend that grew with our business. His code quality and performance optimization were impressive.',
      avatar: {
        url: '/file.svg',
        width: 96,
        height: 96,
        alt: 'Emily Rodriguez avatar'
      },
      priority: 3,
      featured: false,
      publishedAt: new Date().toISOString(),
    },
    {
      id: 'mock-4',
      name: 'David Kim',
      company: 'Agency Pro',
      role: 'Lead Developer',
      quote: 'The animations and micro-interactions Fareez implemented made our website feel premium and engaging. Highly recommended!',
      avatar: {
        url: '/globe.svg',
        width: 96,
        height: 96,
        alt: 'David Kim avatar'
      },
      priority: 4,
      featured: false,
      publishedAt: new Date().toISOString(),
    },
    {
      id: 'mock-5',
      name: 'Lisa Thompson',
      company: 'E-commerce Plus',
      role: 'UX Designer',
      quote: 'Fareez understood our complex requirements and delivered a solution that was both beautiful and functional. Great collaboration!',
      avatar: {
        url: '/window.svg',
        width: 96,
        height: 96,
        alt: 'Lisa Thompson avatar'
      },
      priority: 5,
      featured: false,
      publishedAt: new Date().toISOString(),
    }
  ];
}

// Helper function to sanitize strings for safe rendering
function sanitizeString(str: string): string {
  if (!str || typeof str !== 'string') return '';
  
  // Remove any potential HTML tags and escape special characters
  return str
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&/g, '&amp;') // Escape ampersands
    .replace(/</g, '&lt;') // Escape less than
    .replace(/>/g, '&gt;') // Escape greater than
    .replace(/"/g, '&quot;') // Escape quotes
    .replace(/'/g, '&#x27;') // Escape apostrophes
    .trim();
}
