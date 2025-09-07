'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProjectRole } from './ProjectsFilter';

/**
 * ProjectCard component with hover animations and accessibility
 * Features:
 * - Framer Motion hover effects (scale + shadow)
 * - Next.js Image optimization
 * - Keyboard navigation
 * - Screen reader support
 * - Role badges
 */
interface Project {
  id: string;
  slug: string;
  title: string;
  cover: string;
  roles: ProjectRole[];
  description?: string;
  year?: number;
}

interface ProjectCardProps {
  project: Project;
  className?: string;
  priority?: boolean; // For LCP optimization
}

// Role configuration with colors and icons
const ROLE_CONFIG: Record<ProjectRole, { color: string; icon: string; label: string }> = {
  illustration: { color: 'bg-purple-100 text-purple-800', icon: '🎨', label: 'Illustration' },
  design: { color: 'bg-blue-100 text-blue-800', icon: '✨', label: 'Design' },
  cartoon: { color: 'bg-green-100 text-green-800', icon: '🎭', label: 'Cartoon' },
  authoring: { color: 'bg-orange-100 text-orange-800', icon: '📝', label: 'Authoring' },
};

// Motion variants for hover effects
const cardVariants = {
  initial: { 
    scale: 1,
    y: 0,
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
  },
  hover: { 
    scale: 1.02,
    y: -4,
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1] as const
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1
    }
  }
};

const imageVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1] as const
    }
  }
};

export default function ProjectCard({ 
  project, 
  className = '',
  priority = false 
}: ProjectCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      className={`group ${className}`}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
        aria-label={`View project: ${project.title}`}
      >
        <article className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 h-full flex flex-col">
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
            <motion.div
              variants={imageVariants}
              className="w-full h-full"
            >
              <Image
                src={project.cover}
                alt={`${project.title} project cover`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                priority={priority}
                loading={priority ? 'eager' : 'lazy'}
              />
            </motion.div>
            
            {/* Overlay gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>

          {/* Content */}
          <div className="p-4 flex-1 flex flex-col">
            {/* Title and Year */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                {project.title}
              </h3>
              {project.year && (
                <span className="text-sm text-gray-500 flex-shrink-0">
                  {project.year}
                </span>
              )}
            </div>

            {/* Description */}
            {project.description && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
                {project.description}
              </p>
            )}

            {/* Role Badges */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.roles.map((role) => {
                const config = ROLE_CONFIG[role];
                return (
                  <span
                    key={role}
                    className={`
                      inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                      ${config.color}
                    `}
                    aria-label={`${config.label} role`}
                  >
                    <span aria-hidden="true">{config.icon}</span>
                    <span className="sr-only">{config.label}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

/**
 * Skeleton loader for ProjectCard
 */
export function ProjectCardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 ${className}`}>
      <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
      <div className="p-4">
        <div className="h-5 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-3/4" />
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
