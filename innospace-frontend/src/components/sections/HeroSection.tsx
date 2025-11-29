import { motion } from 'framer-motion';
import { PhoneIcon } from '@heroicons/react/24/outline';
import Logo from '../common/Logo';

const HeroSection = () => {
  const handleBookConsultation = () => {
    // This will be handled by the parent Layout component
    const event = new CustomEvent('openConsultationModal');
    window.dispatchEvent(event);
  };

  const handleCall = () => {
    window.location.href = 'tel:+91-9876543210';
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-green-900 to-gray-800">
      {/* Hero Image Section - Full Height Visible */}
      <div className="absolute right-0 top-0 w-1/2 h-screen">
        <motion.div
          className="w-full h-full relative"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <img
            src="/assets/images/hero-interior.jpg"
            alt="Interior Design Showcase"
            className="w-full h-full object-cover object-center rounded-l-3xl shadow-2xl"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/40 rounded-l-3xl"></div>
        </motion.div>
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
              <Logo size="md" showText={false} isDark={true} />
              <div>
                <h1 className="text-2xl font-bold text-amber-100">INNOSPACE</h1>
                <p className="text-sm text-amber-200 -mt-1">Interiors</p>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-50 mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transform Your
              <span className="block bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 bg-clip-text text-transparent">
                Dream Space
              </span>
            </motion.h2>

            {/* Tagline */}
            <motion.p
              className="text-xl md:text-2xl text-amber-200 mb-8 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              We innovate every corner of your space
            </motion.p>

            <motion.p
              className="text-lg text-amber-100 mb-10 leading-relaxed"
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
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                Book Free Consultation
              </button>
              
              <button
                onClick={handleCall}
                className="px-8 py-4 bg-transparent hover:bg-amber-500/20 text-amber-200 hover:text-amber-100 text-lg font-semibold rounded-xl border-2 border-amber-400 hover:border-amber-300 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <PhoneIcon className="h-5 w-5" />
                <span>Call Now</span>
              </button>
            </motion.div>


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
          <div className="w-6 h-10 border-2 border-amber-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-amber-300 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;