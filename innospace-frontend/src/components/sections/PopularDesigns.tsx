import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, EyeIcon } from '@heroicons/react/24/outline';

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: {
    url: string;
    alt: string;
  };
  designCount?: number;
}

const PopularDesigns = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Auto-carousel effect
  useEffect(() => {
    if (!categories.length || categories.length <= 3 || isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.max(1, categories.length - 2));
    }, 2500);

    return () => clearInterval(interval);
  }, [categories.length, isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, categories.length - 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, categories.length - 2)) % Math.max(1, categories.length - 2));
  };

  const handleViewGallery = (categorySlug: string) => {
    // Navigate to the gallery page
    navigate(`/gallery/${categorySlug}`);
    // Immediately scroll to top
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-amber-50 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Popular{" "}
            <motion.span 
              className="bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              Designs
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-xl text-amber-200 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            Browse our most popular interior design categories and find inspiration for your space.
          </motion.p>
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

        {/* Categories Carousel */}
        {!loading && !error && categories.length > 0 && (
          <div 
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Carousel Container */}
            <div className="overflow-hidden">
              <motion.div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlide * (100 / 3)}%)`,
                }}
              >
                {categories.map((category, index) => (
                  <motion.div
                    key={category._id}
                    className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.15,
                      ease: "easeOut",
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                    <div className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border border-gray-700 hover:border-amber-400/50">
                      {/* Category Image */}
                      <div className="relative h-48 bg-gray-700 overflow-hidden">
                        <img
                          src={category.image?.url || `https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                          alt={category.image?.alt || category.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                        
                        {/* Design Count Badge */}
                        {category.designCount !== undefined && (
                          <div className="absolute top-4 right-4">
                            <span className="bg-gray-900/80 text-amber-300 px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                              {category.designCount} designs
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Category Content */}
                      <div className="p-6">
                        <motion.h3 
                          className="text-xl font-bold text-amber-50 mb-3 group-hover:text-amber-300 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                        >
                          {category.name}
                        </motion.h3>
                        
                        {category.description && (
                          <motion.p 
                            className="text-gray-300 mb-4 line-clamp-2 leading-relaxed"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
                          >
                            {category.description}
                          </motion.p>
                        )}

                        {/* View Gallery Button */}
                        <motion.button
                          onClick={() => handleViewGallery(category.slug)}
                          className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-amber-600 hover:to-amber-700 text-amber-300 hover:text-gray-900 font-semibold py-3 px-4 rounded-xl transition-all duration-300 border border-gray-600 hover:border-transparent group-hover:shadow-lg flex items-center justify-center space-x-2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.15 + 0.5 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <EyeIcon className="h-5 w-5" />
                          <span>View Gallery</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Arrows */}
            {categories.length > 3 && (
              <>
                <motion.button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-gray-800/80 hover:bg-amber-600 text-amber-300 hover:text-gray-900 p-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm border border-gray-600 hover:border-amber-500"
                  aria-label="Previous slide"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </motion.button>

                <motion.button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-gray-800/80 hover:bg-amber-600 text-amber-300 hover:text-gray-900 p-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm border border-gray-600 hover:border-amber-500"
                  aria-label="Next slide"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </motion.button>
              </>
            )}

            {/* Slide Indicators */}
            {categories.length > 3 && (
              <motion.div 
                className="flex justify-center mt-8 space-x-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                {Array.from({ length: Math.max(1, categories.length - 2) }).map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-amber-400 scale-110'
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 1.2 + (index * 0.1),
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  />
                ))}
              </motion.div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && categories.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-amber-50 mb-2">No Categories Found</h3>
              <p className="text-gray-400">
                We're working on adding amazing design categories for you to explore.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularDesigns;