import React, { createContext, useContext, useState, useCallback } from 'react';
import ConsultationModal from '../components/modals/ConsultationModal';

interface ModalContextType {
  isConsultationModalOpen: boolean;
  openConsultationModal: () => void;
  closeConsultationModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  const openConsultationModal = useCallback(() => {
    setIsConsultationModalOpen(true);
  }, []);

  const closeConsultationModal = useCallback(() => {
    setIsConsultationModalOpen(false);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        isConsultationModalOpen,
        openConsultationModal,
        closeConsultationModal,
      }}
    >
      {children}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={closeConsultationModal}
      />
    </ModalContext.Provider>
  );
};

export default ModalProvider;