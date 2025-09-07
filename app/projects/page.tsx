import { Suspense } from 'react';
import { ProjectRole, useProjectsFilter } from '../components/ProjectsFilter';
import ProjectsFilter from '../components/ProjectsFilter';
import ProjectCard, { ProjectCardSkeleton } from '../components/ProjectCard';
import { getAllProjects, transformSanityImage, type ProjectListItem } from '@/lib/cms';

/**
 * Projects page with CMS integration
 * Features:
 * - Server-side data fetching from Sanity
 * - CSS Masonry with fallback to CSS Grid
 * - Role-based filtering with URL sync
 * - Performance optimized with lazy loading
 * - Accessibility compliant
 */

interface ProjectsPageProps {
  searchParams: {
    roles?: string;
  };
}

// Client component for filtering logic
function ProjectsGrid({ projects }: { projects: ProjectListItem[] }) {
  const { selectedRoles } = useProjectsFilter();

  // Filter projects based on selected roles
  const filteredProjects = projects.filter(project =>
    selectedRoles.length === 0 || selectedRoles.some(role => project.roles.includes(role))
  );

  // Handle filter changes
  const handleFilterChange = (newSelectedRoles: ProjectRole[]) => {
    console.log('Filter changed:', newSelectedRoles);
  };

  return (
    <>
      {/* Filter Component */}
      <ProjectsFilter 
        onFilterChange={handleFilterChange}
        className="mb-8"
      />

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Showing {filteredProjects.length} of {projects.length} projects
          {selectedRoles.length > 0 && (
            <span className="ml-1">
              filtered by {selectedRoles.join(', ')}
            </span>
          )}
        </p>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="projects-grid">
          {filteredProjects.map((project, index) => {
            const coverImage = transformSanityImage(project.cover, 400, 300);
            
            return (
              <ProjectCard
                key={project._id}
                project={{
                  id: project._id,
                  slug: project.slug,
                  title: project.title,
                  cover: coverImage?.src || '/placeholder.jpg',
                  roles: project.roles,
                  description: project.summary,
                  year: project.year,
                }}
                priority={index < 4} // Prioritize first 4 images for LCP
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No projects found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters to see more projects.
          </p>
          <a
            href="/projects"
            className="text-blue-600 hover:text-blue-700 focus:outline-none focus:underline"
          >
            Clear all filters
          </a>
        </div>
      )}
    </>
  );
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  // Fetch projects from Sanity CMS
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Projects
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Explore my creative work across illustration, design, cartoon, and authoring. 
            Use the filters below to find projects by role.
          </p>
        </div>

        {/* Projects Grid with Suspense */}
        <Suspense fallback={
          <div className="projects-grid">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
          </div>
        }>
          <ProjectsGrid projects={projects} />
        </Suspense>
      </div>
    </div>
  );
}
