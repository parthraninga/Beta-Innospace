import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface Design {
  _id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  images: {
    url: string;
    thumbnail: string;
    alt: string;
  }[];
  tags: string[];
  price?: {
    min: number;
    max: number;
    currency: string;
  };
  projectDetails?: {
    area?: string;
    duration?: string;
    location?: string;
    client?: string;
    style?: string;
    budget?: string;
    completedDate?: string;
  };
  features?: string[];
  materials?: string[];
  colors?: string[];
  isFeatured: boolean;
  isActive: boolean;
}

interface DesignDetailModalProps {
  design: Design | null;
  isOpen: boolean;
  onClose: () => void;
  onGetQuote?: () => void;
}

const DesignDetailModal: React.FC<DesignDetailModalProps> = ({
  design,
  isOpen,
  onClose,
  onGetQuote
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!design) return null;

  const images = design.images.length > 0 ? design.images : [
    { 
      url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
      alt: design.title 
    }
  ];

  const formatPrice = (price?: { min: number; max: number; currency: string }) => {
    if (!price) return 'Contact for pricing';
    
    if (price.min === price.max) {
      return `₹${price.min.toLocaleString()}`;
    }
    
    return `₹${price.min.toLocaleString()} - ₹${price.max.toLocaleString()}`;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="flex items-center justify-center min-h-screen p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>

              <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
                {/* Image Section */}
                <div className="lg:w-3/5 relative">
                  <div className="aspect-w-16 aspect-h-12 lg:aspect-none lg:h-full">
                    <img
                      src={images[currentImageIndex]?.url}
                      alt={images[currentImageIndex]?.alt || design.title}
                      className="w-full h-64 lg:h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800';
                      }}
                    />
                  </div>

                  {/* Image Navigation */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-colors"
                      >
                        <ArrowLeftIcon className="h-6 w-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-colors"
                      >
                        <ArrowRightIcon className="h-6 w-6" />
                      </button>

                      {/* Image Indicators */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${
                              index === currentImageIndex
                                ? 'bg-white'
                                : 'bg-white bg-opacity-50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Featured Badge */}
                  {design.isFeatured && (
                    <div className="absolute top-4 left-4">
                      <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <StarSolidIcon className="h-4 w-4 mr-1" />
                        Featured Design
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="lg:w-2/5 p-6 lg:p-8 overflow-y-auto">
                  <div className="space-y-6">
                    {/* Title and Price */}
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                        {design.title}
                      </h2>
                      <div className="text-2xl font-bold text-primary-600">
                        {formatPrice(design.price)}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                      <p className="text-gray-600 leading-relaxed mb-3">
                        {design.description}
                      </p>
                      {design.detailedDescription && (
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {design.detailedDescription}
                        </p>
                      )}
                    </div>

                    {/* Project Details */}
                    {design.projectDetails && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Details</h3>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          {design.projectDetails.area && (
                            <div>
                              <span className="text-gray-500">Area:</span>
                              <span className="ml-2 font-medium text-gray-900">{design.projectDetails.area}</span>
                            </div>
                          )}
                          {design.projectDetails.duration && (
                            <div>
                              <span className="text-gray-500">Duration:</span>
                              <span className="ml-2 font-medium text-gray-900">{design.projectDetails.duration}</span>
                            </div>
                          )}
                          {design.projectDetails.location && (
                            <div>
                              <span className="text-gray-500">Location:</span>
                              <span className="ml-2 font-medium text-gray-900">{design.projectDetails.location}</span>
                            </div>
                          )}
                          {design.projectDetails.style && (
                            <div>
                              <span className="text-gray-500">Style:</span>
                              <span className="ml-2 font-medium text-gray-900">{design.projectDetails.style}</span>
                            </div>
                          )}
                          {design.projectDetails.budget && (
                            <div>
                              <span className="text-gray-500">Budget:</span>
                              <span className="ml-2 font-medium text-gray-900">{design.projectDetails.budget}</span>
                            </div>
                          )}
                          {design.projectDetails.completedDate && (
                            <div>
                              <span className="text-gray-500">Completed:</span>
                              <span className="ml-2 font-medium text-gray-900">
                                {new Date(design.projectDetails.completedDate).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    {design.tags.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {design.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Features */}
                    {design.features && design.features.length > 0 ? (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                        <ul className="space-y-2 text-gray-600">
                          {design.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-primary-600 rounded-full mr-3 mt-2"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                            Premium quality materials
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                            Professional installation
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                            Customizable design options
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                            1-year warranty included
                          </li>
                        </ul>
                      </div>
                    )}

                    {/* Materials */}
                    {design.materials && design.materials.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Materials Used</h3>
                        <div className="flex flex-wrap gap-2">
                          {design.materials.map((material, index) => (
                            <span
                              key={index}
                              className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {material}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Colors */}
                    {design.colors && design.colors.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Color Palette</h3>
                        <div className="flex flex-wrap gap-2">
                          {design.colors.map((color, index) => (
                            <span
                              key={index}
                              className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-3 pt-4">
                      <button
                        onClick={onGetQuote}
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                      >
                        Get Quote for This Design
                      </button>
                      <button
                        onClick={onClose}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                      >
                        Continue Browsing
                      </button>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-600 mb-2">
                        Questions about this design?
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        Call us at <a href="tel:+919876543210" className="text-primary-600 hover:text-primary-700">+91-9876543210</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DesignDetailModal;