import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ShowcaseCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sample showcase images - these would come from backend in real app
  const showcaseImages = [
    {
      id: 1,
      title: "Modern Living Excellence",
      description: "Contemporary design meets comfort in this stunning living space transformation",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      category: "Living Room"
    },
    {
      id: 2,
      title: "Culinary Perfection",
      description: "A modular kitchen that combines functionality with aesthetic appeal",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      category: "Kitchen"
    },
    {
      id: 3,
      title: "Serene Bedroom Sanctuary",
      description: "Creating the perfect retreat with thoughtful design and elegant finishes",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      category: "Bedroom"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % showcaseImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + showcaseImages.length) % showcaseImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false); // Pause auto-play when user manually navigates
  };

  // Auto-play functionality - starts immediately
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % showcaseImages.length);
    }, 2500); // Change slide every 2.5 seconds

    return () => clearInterval(interval);
  }, [showcaseImages.length, isAutoPlaying]);

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(true); //I don't want to auto-play when hovered
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        setIsAutoPlaying(false);
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        setIsAutoPlaying(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleManualNavigation = (direction: 'prev' | 'next') => {
    setIsAutoPlaying(false); // Stop auto-play when user manually navigates
    if (direction === 'prev') {
      prevSlide();
    } else {
      nextSlide();
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-amber-50 mb-6">
            Our Design <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 bg-clip-text text-transparent">Excellence</span>
          </h2>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto">
            Discover how we transform ordinary spaces into extraordinary experiences 
            through innovative design and meticulous attention to detail.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <div className="relative h-[600px] w-full">
              <AnimatePresence initial={false}>
                <motion.div
                  key={currentSlide}
                  className="absolute inset-0 w-full h-full"
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 0.6
                  }}
                >
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-gray-300"
                    style={{ 
                      backgroundImage: `url(${showcaseImages[currentSlide].image})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-40" />
                  </div>

                  {/* Content Overlay */}
                  <div className="relative z-10 flex items-end h-full p-8 md:p-12">
                    <div className="text-white max-w-2xl">
                      <motion.div
                        className="inline-block px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full text-sm font-medium mb-4 text-gray-900"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        {showcaseImages[currentSlide].category}
                      </motion.div>
                      
                      <motion.h3
                        className="text-3xl md:text-4xl font-bold mb-4"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                      >
                        {showcaseImages[currentSlide].title}
                      </motion.h3>
                      
                      <motion.p
                        className="text-lg md:text-xl text-gray-200"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.7 }}
                      >
                        {showcaseImages[currentSlide].description}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => handleManualNavigation('prev')}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-20 cursor-pointer"
            aria-label="Previous slide"
            type="button"
          >
            <svg 
              className="h-6 w-6 pointer-events-none" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
          </button>
          
          <button
            onClick={() => handleManualNavigation('next')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-20 cursor-pointer"
            aria-label="Next slide"
            type="button"
          >
            <svg 
              className="h-6 w-6 pointer-events-none" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {showcaseImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 hover:scale-125 ${
                  index === currentSlide 
                    ? 'bg-white scale-125' 
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <button 
            onClick={() => window.location.href = '/gallery'}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            View Complete Portfolio
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ShowcaseCarousel;