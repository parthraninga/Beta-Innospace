import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, MapPinIcon, ClockIcon, CurrencyRupeeIcon, UserIcon, HomeIcon, CalendarIcon } from '@heroicons/react/24/outline';
import type { Project } from '../../types';

interface ProjectDetailsModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[80vh] bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700 my-4 flex flex-col"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            {/* Close Button - Fixed */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={onClose}
                className="p-2 bg-gray-900/80 hover:bg-gray-800 text-amber-300 hover:text-amber-200 rounded-full transition-colors backdrop-blur-sm"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1">
              {/* Hero Image */}
              <div className="relative h-64 bg-gray-700 overflow-hidden">
                <img
                  src={project.images[0]?.url || '/api/placeholder/800/400'}
                  alt={project.images[0]?.alt || project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                
                {/* Featured Badge */}
                {project.isFeatured && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Featured Project
                    </span>
                  </div>
                )}

                {/* Price Badge */}
                {project.price && (
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-gray-900/80 text-amber-300 px-3 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm">
                      ₹{(project.price.min / 1000).toFixed(0)}K - ₹{(project.price.max / 1000).toFixed(0)}K
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
              {/* Title and Category */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-amber-300 text-sm font-medium uppercase tracking-wide bg-amber-300/10 px-3 py-1 rounded-full">
                    {project.category.name}
                  </span>
                </div>
                
                <h2 className="text-3xl font-bold text-amber-50 mb-3">
                  {project.title}
                </h2>
                
                <p className="text-amber-100 text-lg leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Detailed Description */}
              {project.detailedDescription && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-amber-50 mb-3">Project Details</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.detailedDescription}
                  </p>
                </div>
              )}

              {/* Project Information Grid */}
              {project.projectDetails && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-amber-50 mb-4">Project Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.projectDetails.location && (
                      <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                        <MapPinIcon className="h-5 w-5 text-amber-400" />
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Location</p>
                          <p className="text-amber-100 font-medium">{project.projectDetails.location}</p>
                        </div>
                      </div>
                    )}

                    {project.projectDetails.area && (
                      <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                        <HomeIcon className="h-5 w-5 text-amber-400" />
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Area</p>
                          <p className="text-amber-100 font-medium">{project.projectDetails.area}</p>
                        </div>
                      </div>
                    )}

                    {project.projectDetails.duration && (
                      <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                        <ClockIcon className="h-5 w-5 text-amber-400" />
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Duration</p>
                          <p className="text-amber-100 font-medium">{project.projectDetails.duration}</p>
                        </div>
                      </div>
                    )}

                    {project.projectDetails.budget && (
                      <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                        <CurrencyRupeeIcon className="h-5 w-5 text-amber-400" />
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Budget</p>
                          <p className="text-amber-100 font-medium">{project.projectDetails.budget}</p>
                        </div>
                      </div>
                    )}

                    {project.projectDetails.client && (
                      <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                        <UserIcon className="h-5 w-5 text-amber-400" />
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Client</p>
                          <p className="text-amber-100 font-medium">{project.projectDetails.client}</p>
                        </div>
                      </div>
                    )}

                    {project.projectDetails.completedDate && (
                      <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                        <CalendarIcon className="h-5 w-5 text-amber-400" />
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Completed</p>
                          <p className="text-amber-100 font-medium">{formatDate(project.projectDetails.completedDate)}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {project.projectDetails.style && (
                    <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Design Style</p>
                      <p className="text-amber-100 font-medium">{project.projectDetails.style}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Features, Materials, Colors */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {project.features && project.features.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-amber-50 mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-300">
                          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0"></div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.materials && project.materials.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-amber-50 mb-3">Materials Used</h4>
                    <ul className="space-y-2">
                      {project.materials.map((material, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-300">
                          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0"></div>
                          <span className="text-sm">{material}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.colors && project.colors.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-amber-50 mb-3">Color Palette</h4>
                    <ul className="space-y-2">
                      {project.colors.map((color, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-300">
                          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0"></div>
                          <span className="text-sm">{color}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-amber-50 mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Images */}
              {project.images && project.images.length > 1 && (
                <div>
                  <h4 className="text-lg font-semibold text-amber-50 mb-3">Project Gallery</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {project.images.slice(1).map((image, index) => (
                      <div key={index} className="relative aspect-video bg-gray-700 rounded-lg overflow-hidden">
                        <img
                          src={image.thumbnail || image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;