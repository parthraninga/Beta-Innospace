import { motion } from 'framer-motion';
import { 
  PhoneIcon, 
  CalendarDaysIcon, 
  PencilSquareIcon, 
  CheckCircleIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';
import { useModal } from '../../contexts/ModalContext';
import { useSettings } from '../../hooks/useSettings';

const BookingSteps = () => {
  const { openConsultationModal } = useModal();
  const { settings } = useSettings();

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
    <section className="py-20 bg-gray-900">
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
            How It <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto mb-8">
            Transform your space in 4 simple steps. From concept to completion, 
            we make the entire process seamless and stress-free.
          </p>
          
          {/* How it Works Link */}
          <motion.button
            className="inline-flex items-center space-x-2 text-amber-300 hover:text-amber-200 font-medium text-lg"
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
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-amber-400/50 to-transparent z-0" />
              )}
              
              {/* Step Card */}
              <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 group-hover:border-amber-400/50 group-hover:-translate-y-2">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-500/30 transition-colors duration-300">
                  <step.icon className="h-8 w-8 text-amber-400" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-amber-50 mb-4">
                  {step.title}
                </h3>
                
                <p className="text-amber-100 leading-relaxed">
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
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700">
            <h3 className="text-2xl md:text-3xl font-bold text-amber-50 mb-4">
              Ready to <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 bg-clip-text text-transparent">Transform</span> Your Space?
            </h3>
            <p className="text-lg text-amber-100 mb-8">
              Book your free consultation today and take the first step towards your dream interior.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={openConsultationModal}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                Schedule Free Consultation
              </button>
              
              <button className="px-8 py-4 bg-transparent hover:bg-amber-500/20 text-amber-200 hover:text-amber-100 text-lg font-semibold rounded-xl border-2 border-amber-400 hover:border-amber-300 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <PhoneIcon className="h-5 w-5" />
                <span>Call: {settings?.phoneNumber || '+91-9876543211'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingSteps;