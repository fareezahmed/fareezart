import Image from 'next/image';
import { ProjectRole } from '../ProjectsFilter';

/**
 * Case Study Hero component
 * Features:
 * - Large cover image optimized for LCP
 * - Role chips with proper contrast
 * - SEO-optimized with proper heading hierarchy
 * - Responsive design from mobile to desktop
 */
interface CaseStudyHeroProps {
  title: string;
  roles: ProjectRole[];
  cover: string;
  year?: number;
  client?: string;
  duration?: string;
  className?: string;
}

// Role configuration with colors and icons
const ROLE_CONFIG: Record<ProjectRole, { color: string; icon: string; label: string }> = {
  illustration: { color: 'bg-purple-100 text-purple-800 border-purple-200', icon: '🎨', label: 'Illustration' },
  design: { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: '✨', label: 'Design' },
  cartoon: { color: 'bg-green-100 text-green-800 border-green-200', icon: '🎭', label: 'Cartoon' },
  authoring: { color: 'bg-orange-100 text-orange-800 border-orange-200', icon: '📝', label: 'Authoring' },
};

export default function CaseStudyHero({
  title,
  roles,
  cover,
  year,
  client,
  duration,
  className = ''
}: CaseStudyHeroProps) {
  return (
    <header className={`relative ${className}`} role="banner">
      {/* Cover Image */}
      <div className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-gray-100">
        <Image
          src={cover}
          alt={`${title} project cover`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
        
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-end">
        <div className="w-full px-4 sm:px-6 lg:px-8 pb-8 lg:pb-12">
          <div className="max-w-4xl mx-auto">
            {/* Project Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-white/90">
              {year && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  {year}
                </span>
              )}
              {client && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                  {client}
                </span>
              )}
              {duration && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {duration}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>

            {/* Role Chips */}
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => {
                const config = ROLE_CONFIG[role];
                return (
                  <span
                    key={role}
                    className={`
                      inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium border
                      ${config.color}
                    `}
                    aria-label={`${config.label} role`}
                  >
                    <span aria-hidden="true">{config.icon}</span>
                    <span>{config.label}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
