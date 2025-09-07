'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

/**
 * ProjectsFilter component with URL synchronization
 * Features:
 * - Multi-select role filtering
 * - URL search params sync for shareable links
 * - Keyboard accessible
 * - Responsive design
 */
export type ProjectRole = 'illustration' | 'design' | 'cartoon' | 'authoring';

interface ProjectsFilterProps {
  className?: string;
  onFilterChange?: (selectedRoles: ProjectRole[]) => void;
}

const ROLE_OPTIONS: { value: ProjectRole; label: string; icon: string }[] = [
  { value: 'illustration', label: 'Illustration', icon: '🎨' },
  { value: 'design', label: 'Design', icon: '✨' },
  { value: 'cartoon', label: 'Cartoon', icon: '🎭' },
  { value: 'authoring', label: 'Authoring', icon: '📝' },
];

export default function ProjectsFilter({ 
  className = '',
  onFilterChange 
}: ProjectsFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedRoles, setSelectedRoles] = useState<ProjectRole[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Set client flag to prevent hydration mismatches
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize from URL params
  useEffect(() => {
    if (!isClient) return;
    
    const rolesParam = searchParams.get('roles');
    if (rolesParam) {
      const roles = rolesParam.split(',').filter((role): role is ProjectRole => 
        ROLE_OPTIONS.some(option => option.value === role)
      );
      setSelectedRoles(roles);
    }
  }, [searchParams, isClient]);

  // Update URL when filters change
  const updateURL = useCallback((roles: ProjectRole[]) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (roles.length > 0) {
      params.set('roles', roles.join(','));
    } else {
      params.delete('roles');
    }
    
    const newURL = params.toString() ? `?${params.toString()}` : '';
    router.replace(`/projects${newURL}`, { scroll: false });
  }, [router, searchParams]);

  // Handle role toggle
  const toggleRole = useCallback((role: ProjectRole) => {
    const newRoles = selectedRoles.includes(role)
      ? selectedRoles.filter(r => r !== role)
      : [...selectedRoles, role];
    
    setSelectedRoles(newRoles);
    updateURL(newRoles);
    onFilterChange?.(newRoles);
  }, [selectedRoles, updateURL, onFilterChange]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSelectedRoles([]);
    updateURL([]);
    onFilterChange?.([]);
  }, [updateURL, onFilterChange]);

  return (
    <div className={`w-full ${className}`}>
      {/* Filter Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Filter by Role
          </h2>
          <p className="text-sm text-gray-600">
            {!isClient ? (
              'Loading filters...'
            ) : selectedRoles.length > 0 ? (
              `${selectedRoles.length} filter${selectedRoles.length > 1 ? 's' : ''} applied`
            ) : (
              'No filters applied'
            )}
          </p>
        </div>
        
        {isClient && selectedRoles.length > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 focus:outline-none focus:underline"
            aria-label="Clear all filters"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {ROLE_OPTIONS.map((option) => {
          const isSelected = isClient && selectedRoles.includes(option.value);
          
          return (
            <button
              key={option.value}
              onClick={() => toggleRole(option.value)}
              className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${isSelected
                  ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }
              `}
              aria-pressed={isSelected}
              aria-describedby={`${option.value}-description`}
            >
              <span className="text-base" aria-hidden="true">
                {option.icon}
              </span>
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>

      {/* Screen reader descriptions */}
      <div className="sr-only">
        {ROLE_OPTIONS.map((option) => (
          <div key={option.value} id={`${option.value}-description`}>
            Filter projects by {option.label} role. Currently {selectedRoles.includes(option.value) ? 'selected' : 'not selected'}.
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Hook to get current filter state
 */
export function useProjectsFilter() {
  const searchParams = useSearchParams();
  
  const selectedRoles = (() => {
    if (typeof window === 'undefined') return [];
    
    const rolesParam = searchParams.get('roles');
    if (!rolesParam) return [];
    
    return rolesParam.split(',').filter((role): role is ProjectRole => 
      ROLE_OPTIONS.some(option => option.value === role)
    );
  })();

  return { selectedRoles };
}
