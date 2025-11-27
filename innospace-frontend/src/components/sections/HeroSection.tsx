import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, PhoneIcon } from '@heroicons/react/24/outline';

const HeroSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
    // TODO: Implement video player or replace with actual video
  };

  const handleBookConsultation = () => {
    // This will be handled by the parent Layout component
    const event = new CustomEvent('openConsultationModal');
    window.dispatchEvent(event);
  };

  const handleCall = () => {
    window.location.href = 'tel:+91-9876543210';
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Background Video/Animation */}
      <div className="absolute inset-0 z-0">
        {isVideoPlaying ? (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <div className="text-white text-center">
              <h3 className="text-xl mb-4">Interior Design Showcase Video</h3>
              <p className="text-gray-300">
                (Video player would be integrated here)
              </p>
              <button
                onClick={() => setIsVideoPlaying(false)}
                className="mt-4 px-6 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Close Video
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-20">
              <motion.div
                className="absolute top-20 left-10 w-32 h-32 bg-primary-200 rounded-full"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute top-40 right-20 w-24 h-24 bg-accent-200 rounded-lg"
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -180, -360],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              <motion.div
                className="absolute bottom-20 left-20 w-40 h-40 bg-secondary-200 rounded-full"
                animate={{
                  y: [0, -30, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
            </div>

            {/* Hero Image/3D Model Placeholder */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-full">
              <motion.div
                className="w-full h-full bg-gradient-to-l from-primary-100 to-transparent rounded-l-full flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
              >
                <div className="text-center">
                  <motion.div
                    className="w-64 h-64 bg-primary-600 rounded-3xl mx-auto mb-8 flex items-center justify-center text-white text-6xl shadow-2xl"
                    animate={{ 
                      rotateY: [0, 15, -15, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    IS
                  </motion.div>
                  <p className="text-gray-600 text-lg">3D Room Visualization</p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo */}
            <motion.div
              className="flex items-center justify-center lg:justify-start space-x-3 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">IS</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">INNOSPACE</h1>
                <p className="text-sm text-gray-600 -mt-1">Interiors</p>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transform Your
              <span className="gradient-text block">
                Dream Space
              </span>
            </motion.h2>

            {/* Tagline */}
            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-8 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              We innovate every corner of your space
            </motion.p>

            <motion.p
              className="text-lg text-gray-700 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Experience world-class interior design with our expert team. From concept to completion, 
              we create spaces that inspire and delight.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <button
                onClick={handleBookConsultation}
                className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                Book Free Consultation
              </button>
              
              <button
                onClick={handleCall}
                className="px-8 py-4 bg-white hover:bg-gray-50 text-primary-600 text-lg font-semibold rounded-xl border-2 border-primary-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <PhoneIcon className="h-5 w-5" />
                <span>Call Now</span>
              </button>
            </motion.div>

            {/* Play Video Button */}
            <motion.button
              onClick={handlePlayVideo}
              className="mt-8 flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors duration-200 mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-200">
                <PlayIcon className="h-5 w-5 ml-1" />
              </div>
              <span className="font-medium">Watch Our Work</span>
            </motion.button>
          </motion.div>

          {/* Right Side - 3D Space (placeholder for now) */}
          <div className="hidden lg:block">
            {/* This space is reserved for the 3D model/image on larger screens */}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;