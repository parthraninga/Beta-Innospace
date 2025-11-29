import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectDetailsModal from '../modals/ProjectDetailsModal';
import type { Project } from '../../types';

const RecentProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects/featured?limit=3');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="py-20 bg-gray-900 border-t-2 border-amber-300/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-50 mb-6">
            Recent <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-amber-200 mb-4">
            Explore our latest completed interior design projects
          </p>
          <p className="text-lg text-gray-300">
            Take a look at some of our recent successful projects
          </p>
        </div>

        {/* Featured Work Label */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-semibold text-amber-300 mb-8">Featured Work</h3>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-300"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-amber-600 hover:bg-amber-700 text-gray-900 font-semibold py-2 px-4 rounded-lg"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {projects.map((project) => (
              <div key={project._id} className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border border-gray-700">
                {/* Featured Badge */}
                {project.isFeatured && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-amber-500 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                  </div>
                )}
                
                {/* Project Image */}
                <div className="relative h-48 bg-gray-700 overflow-hidden">
                  <img
                    src={project.images[0]?.thumbnail || project.images[0]?.url || '/api/placeholder/400/300'}
                    alt={project.images[0]?.alt || project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/api/placeholder/400/300';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                </div>
                
                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-amber-300 text-sm font-medium uppercase tracking-wide">
                      {project.category.name}
                    </span>
                    {project.price && (
                      <span className="text-amber-200 text-xs">
                        ₹{(project.price.min / 1000).toFixed(0)}K - ₹{(project.price.max / 1000).toFixed(0)}K
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-amber-50 mb-2 group-hover:text-amber-300 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* View Project Button */}
                  <button 
                    onClick={() => openProjectModal(project)}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-amber-300 hover:text-amber-200 font-semibold py-3 px-4 rounded-lg transition-all duration-200 border border-gray-600 hover:border-amber-300/50"
                  >
                    View Project
                  </button>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {projects.length === 0 && !loading && !error && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400 mb-4">No projects found</p>
                <button 
                  onClick={() => navigate('/projects')}
                  className="bg-amber-600 hover:bg-amber-700 text-gray-900 font-semibold py-2 px-4 rounded-lg"
                >
                  Browse All Projects
                </button>
              </div>
            )}
          </div>
        )}

        {/* View All Projects Button */}
        {!loading && !error && projects.length > 0 && (
          <div className="text-center">
            <button 
              onClick={() => navigate('/projects')}
              className="bg-amber-600 hover:bg-amber-700 text-gray-900 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View All Projects
            </button>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeProjectModal}
      />
    </section>
  );
};

export default RecentProjects;