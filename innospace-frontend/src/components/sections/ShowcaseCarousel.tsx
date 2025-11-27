import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const ShowcaseCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample showcase images - these would come from backend in real app
  const showcaseImages = [
    {
      id: 1,
      title: "Modern Living Excellence",
      description: "Contemporary design meets comfort in this stunning living space transformation",
      image: "/api/placeholder/800/600",
      category: "Living Room"
    },
    {
      id: 2,
      title: "Culinary Perfection",
      description: "A modular kitchen that combines functionality with aesthetic appeal",
      image: "/api/placeholder/800/600",
      category: "Kitchen"
    },
    {
      id: 3,
      title: "Serene Bedroom Sanctuary",
      description: "Creating the perfect retreat with thoughtful design and elegant finishes",
      image: "/api/placeholder/800/600",
      category: "Bedroom"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % showcaseImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + showcaseImages.length) % showcaseImages.length);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Design <span className="gradient-text">Excellence</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how we transform ordinary spaces into extraordinary experiences 
            through innovative design and meticulous attention to detail.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                className="relative h-[600px] w-full"
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
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
                      className="inline-block px-4 py-2 bg-primary-600 rounded-full text-sm font-medium mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {showcaseImages[currentSlide].category}
                    </motion.div>
                    
                    <motion.h3
                      className="text-3xl md:text-4xl font-bold mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {showcaseImages[currentSlide].title}
                    </motion.h3>
                    
                    <motion.p
                      className="text-lg md:text-xl text-gray-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {showcaseImages[currentSlide].description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {showcaseImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide 
                    ? 'bg-white scale-125' 
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
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
          <button className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            View Complete Portfolio
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ShowcaseCarousel;