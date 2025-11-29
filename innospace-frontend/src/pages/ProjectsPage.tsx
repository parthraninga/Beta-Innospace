import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import ProjectDetailsModal from '../components/modals/ProjectDetailsModal';
import type { Project, Category } from '../types';

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch projects and categories in parallel
        const [projectsResponse, categoriesResponse] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/categories')
        ]);

        if (!projectsResponse.ok || !categoriesResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [projectsData, categoriesData] = await Promise.all([
          projectsResponse.json(),
          categoriesResponse.json()
        ]);

        setProjects(projectsData.data || []);
        setCategories(categoriesData.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter projects based on search term and category
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !selectedCategory || project.category._id === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-amber-50 mb-6">
            Our <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto">
            Explore our portfolio of stunning interior design projects. From modern homes to commercial spaces, 
            see how we transform visions into reality.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-amber-50 placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />
            </div>

            {/* Filter Toggle and Category Filter */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-amber-50 hover:bg-gray-700 transition-colors"
              >
                <FunnelIcon className="h-5 w-5" />
                Filters
              </button>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-amber-50 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 ${showFilters || 'hidden lg:block'}`}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-amber-200">
            {loading ? (
              <span>Loading projects...</span>
            ) : (
              <span>
                Showing {filteredProjects.length} of {projects.length} projects
              </span>
            )}
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-300"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <div className="bg-red-900/50 border border-red-700 rounded-xl p-8 max-w-md mx-auto">
              <p className="text-red-300 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                variants={itemVariants}
                className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border border-gray-700 hover:border-amber-400/50"
              >
                {/* Featured Badge */}
                {project.isFeatured && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Featured
                    </span>
                  </div>
                )}
                
                {/* Project Image */}
                <div className="relative h-64 bg-gray-700 overflow-hidden">
                  <img
                    src={project.images[0]?.thumbnail || project.images[0]?.url || '/api/placeholder/400/300'}
                    alt={project.images[0]?.alt || project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/api/placeholder/400/300';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                  
                  {/* Price Badge */}
                  {project.price && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-gray-900/80 text-amber-300 px-3 py-1 rounded-full text-sm font-semibold">
                        ₹{(project.price.min / 1000).toFixed(0)}K - ₹{(project.price.max / 1000).toFixed(0)}K
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Project Content */}
                <div className="p-6">
                  {/* Category and Location */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-amber-300 text-sm font-medium uppercase tracking-wide">
                      {project.category.name}
                    </span>
                    {project.projectDetails?.location && (
                      <span className="text-gray-400 text-xs">
                        {project.projectDetails.location}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-amber-50 mb-3 group-hover:text-amber-300 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Project Details */}
                  {project.projectDetails && (
                    <div className="mb-4 text-xs text-gray-400 space-y-1">
                      {project.projectDetails.area && (
                        <div>Area: {project.projectDetails.area}</div>
                      )}
                      {project.projectDetails.duration && (
                        <div>Duration: {project.projectDetails.duration}</div>
                      )}
                    </div>
                  )}
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* View Project Button */}
                  <button 
                    onClick={() => openProjectModal(project)}
                    className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-amber-600 hover:to-amber-700 text-amber-300 hover:text-gray-900 font-semibold py-3 px-4 rounded-xl transition-all duration-300 border border-gray-600 hover:border-transparent group-hover:shadow-lg"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-12 max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-amber-50 mb-2">No Projects Found</h3>
              <p className="text-gray-400 mb-6">
                {searchTerm || selectedCategory 
                  ? "Try adjusting your search or filter criteria"
                  : "We're working on adding more amazing projects to showcase"
                }
              </p>
              {(searchTerm || selectedCategory) && (
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('');
                  }}
                  className="bg-amber-600 hover:bg-amber-700 text-gray-900 font-semibold py-2 px-6 rounded-xl transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeProjectModal}
      />
    </div>
  );
};

export default ProjectsPage;