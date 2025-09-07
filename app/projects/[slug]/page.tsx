import { notFound } from 'next/navigation';
import { ProjectRole } from '../../components/ProjectsFilter';
import CaseStudyHero from '../../components/case/Hero';
import Brief from '../../components/case/Brief';
import Process from '../../components/case/Process';
import Gallery from '../../components/case/Gallery';
import Results from '../../components/case/Results';
import Cta from '../../components/case/Cta';
import { getProjectBySlug, transformSanityImage, type ProjectDetail } from '@/lib/cms';

/**
 * Case Study Data Types
 */
interface CaseStudyData {
  id: string;
  slug: string;
  title: string;
  roles: ProjectRole[];
  cover: string;
  year: number;
  client?: string;
  duration?: string;
  brief: {
    problem: string;
    goals: string[];
    constraints?: string[];
    context?: string;
  };
  process: Array<{
    id: string;
    title: string;
    description: string;
    media?: {
      type: 'image' | 'video' | 'lottie';
      src: string;
      alt?: string;
      caption?: string;
    };
  }>;
  gallery: Array<{
    id: string;
    type: 'image' | 'video' | 'lottie';
    src: string;
    alt: string;
    caption?: string;
    thumbnail?: string;
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

// Mock case study data - replace with actual data fetching
const MOCK_CASE_STUDIES: CaseStudyData[] = [
  {
    id: '1',
    slug: 'digital-illustration-series',
    title: 'Digital Illustration Series',
    roles: ['illustration', 'design'],
    cover: '/next.svg',
    year: 2024,
    client: 'Creative Agency',
    duration: '3 months',
    brief: {
      context: 'A leading creative agency needed a series of illustrations that would serve as the visual foundation for their new brand identity and marketing materials.',
      problem: 'The client required a cohesive set of illustrations that would work across multiple platforms while maintaining visual consistency and brand recognition.',
      goals: [
        'Create 12 unique illustrations exploring nature-technology themes',
        'Develop a consistent visual language and color palette',
        'Ensure scalability across print and digital formats',
        'Deliver high-quality assets for immediate use'
      ],
      constraints: [
        'Tight 3-month timeline with multiple review cycles',
        'Must work in both color and monochrome versions',
        'File size limitations for web optimization',
        'Brand guidelines compliance requirements'
      ]
    },
    process: [
      {
        id: 'research',
        title: 'Research & Discovery',
        description: 'Conducted extensive research into natural patterns, technological forms, and existing brand guidelines to establish the visual foundation.',
        media: {
          type: 'image',
          src: '/next.svg',
          alt: 'Research mood board',
          caption: 'Initial research and mood board development'
        }
      },
      {
        id: 'sketching',
        title: 'Concept Development',
        description: 'Created multiple sketch iterations exploring different approaches to the nature-technology intersection theme.',
        media: {
          type: 'image',
          src: '/vercel.svg',
          alt: 'Concept sketches',
          caption: 'Early concept sketches and iterations'
        }
      },
      {
        id: 'refinement',
        title: 'Digital Refinement',
        description: 'Translated selected concepts into high-quality digital illustrations using professional design tools.',
        media: {
          type: 'image',
          src: '/file.svg',
          alt: 'Digital illustration process',
          caption: 'Digital painting and refinement process'
        }
      }
    ],
    gallery: [
      {
        id: 'gallery-1',
        type: 'image',
        src: '/next.svg',
        alt: 'Nature meets technology illustration',
        caption: 'Organic forms reimagined through digital lens'
      },
      {
        id: 'gallery-2',
        type: 'image',
        src: '/vercel.svg',
        alt: 'Abstract geometric patterns',
        caption: 'Geometric patterns inspired by natural structures'
      },
      {
        id: 'gallery-3',
        type: 'image',
        src: '/file.svg',
        alt: 'Color palette exploration',
        caption: 'Color palette development and testing'
      }
    ],
    results: {
      summary: 'The illustration series successfully established a unique visual identity that resonated with the target audience and provided versatile assets for multiple marketing channels.',
      metrics: [
        {
          label: 'Illustrations Delivered',
          value: '12',
          description: 'Unique pieces created',
          improvement: '+100% vs. initial scope'
        },
        {
          label: 'Client Satisfaction',
          value: '98%',
          description: 'Based on final review',
          improvement: '+15% vs. previous projects'
        },
        {
          label: 'Brand Recognition',
          value: '+45%',
          description: 'Increase in brand recall',
          improvement: 'Measured after 6 months'
        }
      ],
      testimonial: {
        quote: 'The illustrations perfectly captured our vision of blending natural elements with modern technology. They\'ve become the cornerstone of our brand identity.',
        author: 'Sarah Johnson',
        role: 'Creative Director',
        company: 'Creative Agency'
      }
    }
  }
];

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  // Fetch project from Sanity CMS
  const caseStudy = await getProjectBySlug(params.slug);

  if (!caseStudy) {
    notFound();
  }

  // Transform Sanity images for components
  const coverImage = transformSanityImage(caseStudy.cover, 1200, 630);
  
  // Transform process steps
  const processSteps = caseStudy.process.map(step => ({
    id: step.title.toLowerCase().replace(/\s+/g, '-'),
    title: step.title,
    description: step.description,
    media: step.media ? {
      type: step.media.type,
      src: step.media.type === 'image' && step.media.image 
        ? transformSanityImage(step.media.image, 600, 400)?.src || ''
        : step.media.videoUrl || step.media.lottieUrl || '',
      alt: step.media.image?.alt || step.title,
      caption: step.media.image?.caption,
    } : undefined,
  }));

  // Transform gallery items
  const galleryItems = caseStudy.gallery.map((item, index) => ({
    id: `gallery-${index}`,
    type: item.type,
    src: item.type === 'image' && item.image 
      ? transformSanityImage(item.image, 800, 600)?.src || ''
      : item.videoUrl || item.lottieUrl || '',
    alt: item.image?.alt || `Gallery item ${index + 1}`,
    caption: item.image?.caption,
    thumbnail: item.type === 'image' && item.image 
      ? transformSanityImage(item.image, 400, 300)?.src || ''
      : undefined,
  }));

  return (
    <main className="min-h-screen">
      {/* Case Study Hero */}
      <CaseStudyHero
        title={caseStudy.title}
        roles={caseStudy.roles}
        cover={coverImage?.src || '/placeholder.jpg'}
        year={caseStudy.year}
        client={caseStudy.client}
        duration={caseStudy.duration}
      />

      {/* Project Brief */}
      <Brief
        problem={caseStudy.brief.problem}
        goals={caseStudy.brief.goals}
        constraints={caseStudy.brief.constraints}
        context={caseStudy.brief.context}
      />

      {/* Process & Approach */}
      <Process steps={processSteps} />

      {/* Project Gallery */}
      <Gallery items={galleryItems} />

      {/* Results & Impact */}
      <Results
        metrics={caseStudy.results.metrics}
        testimonial={caseStudy.results.testimonial}
        summary={caseStudy.results.summary}
      />

      {/* Call to Action */}
      <Cta projectTitle={caseStudy.title} />
    </main>
  );
}

// Generate static params for static generation
export async function generateStaticParams() {
  const { getAllProjectSlugs } = await import('@/lib/cms');
  const slugs = await getAllProjectSlugs();
  
  return slugs.map(({ slug }) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProjectPageProps) {
  const caseStudy = await getProjectBySlug(params.slug);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    };
  }

  const coverImage = transformSanityImage(caseStudy.cover, 1200, 630);
  const description = `Case study: ${caseStudy.title}. ${caseStudy.brief.problem.substring(0, 150)}...`;

  return {
    title: `${caseStudy.title} | FareezArt Case Study`,
    description,
    keywords: [
      caseStudy.title,
      ...caseStudy.roles,
      'case study',
      'portfolio',
      'design',
      'illustration'
    ],
    authors: [{ name: 'FareezArt' }],
    openGraph: {
      title: `${caseStudy.title} | Case Study`,
      description,
      type: 'article',
      publishedTime: caseStudy.publishedAt,
      images: [
        {
          url: coverImage?.src || '/placeholder.jpg',
          width: 1200,
          height: 630,
          alt: `${caseStudy.title} case study cover`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${caseStudy.title} | Case Study`,
      description,
      images: [coverImage?.src || '/placeholder.jpg'],
    },
  };
}
