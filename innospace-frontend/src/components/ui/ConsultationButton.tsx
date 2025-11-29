import React from 'react';
import { motion } from 'framer-motion';
import { useModal } from '../../contexts/ModalContext';

const ConsultationButton: React.FC = () => {
  const { openConsultationModal } = useModal();

  return (
    <motion.button
      onClick={openConsultationModal}
      className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Book Free Consultation
    </motion.button>
  );
};

export default ConsultationButton;