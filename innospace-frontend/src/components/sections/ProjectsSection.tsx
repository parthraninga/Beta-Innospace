import React, { useState, useEffect } from 'react';
import type { Project } from '../../types';

interface ProjectsSectionProps {
  section: {
    title?: string;
    subtitle?: string;
    settings?: {
      columns?: number;
    };
  };
  theme?: 'light' | 'dark';
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ section, theme = 'dark' }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/projects/featured?limit=6');
        
        if (!response.ok) {
          // If backend is not available, show placeholder content instead of error
          console.warn('Backend not available, showing placeholder projects');
          setProjects([]); // Set empty array to show "no projects" message
          setLoading(false);
          return;
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
          setProjects(result.data);
        } else {
          // Handle case where API returns success: false
          console.warn('API returned no data, showing placeholder projects');
          setProjects([]);
        }
      } catch (err: any) {
        // Network error or server unavailable
        console.warn('Network error, showing placeholder projects:', err.message);
        setProjects([]);
        setError(null); // Don't show error, just show empty state
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getGridColumns = (columns?: number) => {
    switch (columns) {
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      case 3:
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto ${
          theme === 'dark' ? 'border-amber-400' : 'border-blue-600'
        }`}></div>
        <p className={`mt-4 ${
          theme === 'dark' ? 'text-amber-200' : 'text-gray-600'
        }`}>Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className={`border rounded-lg p-6 max-w-md mx-auto ${
          theme === 'dark' 
            ? 'bg-red-900/20 border-red-700 text-red-300' 
            : 'bg-red-50 border-red-200 text-red-600'
        }`}>
          <h3 className={`text-lg font-semibold mb-2 ${
            theme === 'dark' ? 'text-red-400' : 'text-red-800'
          }`}>Error Loading Projects</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {section.title && (
        <div className="text-center mb-12">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            theme === 'dark' ? 'text-amber-50' : 'text-gray-900'
          }`}>
            Recent <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 bg-clip-text text-transparent">Projects</span>
          </h2>
          {section.subtitle && (
            <p className={`text-xl max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-amber-200' : 'text-gray-600'
            }`}>{section.subtitle}</p>
          )}
        </div>
      )}

      {projects.length > 0 ? (
        <div className={`grid ${getGridColumns(section.settings?.columns)} gap-8`}>
          {projects.map((project) => (
            <div
              key={project._id}
              className={`rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 border group ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700 hover:border-amber-300/30' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Project Image */}
              <div className={`relative h-64 overflow-hidden ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                {project.images && project.images.length > 0 ? (
                  <img
                    src={project.images[0].thumbnail || project.images[0].url}
                    alt={project.images[0].alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                  }`}>
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                {project.isFeatured && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-amber-500 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full ${
                    theme === 'dark'
                      ? 'bg-amber-900/30 text-amber-300'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {project.category?.name || 'Uncategorized'}
                  </span>
                </div>
                
                <h3 className={`text-xl font-bold mb-3 group-hover:text-amber-400 transition-colors duration-200 ${
                  theme === 'dark' ? 'text-amber-50' : 'text-gray-900'
                }`}>
                  {project.title}
                </h3>
                
                <p className={`text-sm line-clamp-3 mb-6 leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {project.description}
                </p>

                {/* View Project Button */}
                <button className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 hover:bg-gray-600 text-amber-200 hover:text-amber-100 border border-gray-600 hover:border-amber-300/50' 
                    : 'bg-gray-800 hover:bg-gray-700 text-amber-100 hover:text-amber-50 border border-gray-700'
                }`}>
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className={`rounded-lg p-8 max-w-md mx-auto ${
            theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50'
          }`}>
            <svg className={`w-16 h-16 mx-auto mb-4 ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className={`text-lg font-semibold mb-2 ${
              theme === 'dark' ? 'text-amber-100' : 'text-gray-900'
            }`}>No Projects Found</h3>
            <p className={`${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>There are no featured projects to display at the moment.</p>
          </div>
        </div>
      )}

      {/* View All Projects Link */}
      {projects.length > 0 && (
        <div className="text-center mt-16">
          <button className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
            theme === 'dark'
              ? 'bg-amber-600 hover:bg-amber-700 text-gray-900'
              : 'bg-gray-800 hover:bg-gray-700 text-amber-100'
          }`}>
            View All Projects
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;