import { motion } from 'framer-motion';
import { 
  PhoneIcon, 
  CalendarDaysIcon, 
  PencilSquareIcon, 
  CheckCircleIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

const BookingSteps = () => {
  const steps = [
    {
      icon: PhoneIcon,
      title: "Initial Consultation",
      description: "Schedule a free consultation call to discuss your vision, requirements, and budget.",
      step: "01"
    },
    {
      icon: CalendarDaysIcon,
      title: "Site Visit & Measurement",
      description: "Our experts visit your space for detailed measurements and feasibility assessment.",
      step: "02"
    },
    {
      icon: PencilSquareIcon,
      title: "Design & Planning",
      description: "Receive detailed 3D designs, material selection, and comprehensive project timeline.",
      step: "03"
    },
    {
      icon: CheckCircleIcon,
      title: "Execution & Delivery",
      description: "Professional installation with quality checks and timely project completion.",
      step: "04"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 bg-white">
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
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transform your space in 4 simple steps. From concept to completion, 
            we make the entire process seamless and stress-free.
          </p>
          
          {/* How it Works Link */}
          <motion.button
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium text-lg"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span>Learn More About Our Process</span>
            <ArrowRightIcon className="h-5 w-5" />
          </motion.button>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative group"
              variants={itemVariants}
            >
              {/* Connecting Line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-transparent z-0" />
              )}
              
              {/* Step Card */}
              <div className="relative bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-primary-200 group-hover:-translate-y-2">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                  <step.icon className="h-8 w-8 text-primary-600" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Space?
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Book your free consultation today and take the first step towards your dream interior.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                Schedule Free Consultation
              </button>
              
              <button className="px-8 py-4 bg-white hover:bg-gray-50 text-primary-600 text-lg font-semibold rounded-xl border-2 border-primary-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <PhoneIcon className="h-5 w-5" />
                <span>Call: +91-9876543210</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingSteps;