import { useEffect } from 'react';
import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import BottomNav from './BottomNav';
import { useModal } from '../../contexts/ModalContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { openConsultationModal } = useModal();

  const handleCall = () => {
    window.location.href = 'tel:+91-9876543210';
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hi! I\'m interested in your interior design services.');
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  const handleQuote = () => {
    openConsultationModal();
  };

  const handleConsultation = () => {
    openConsultationModal();
  };

  // Listen for custom events from components
  useEffect(() => {
    const handleConsultationEvent = () => openConsultationModal();
    window.addEventListener('openConsultationModal', handleConsultationEvent);
    
    return () => {
      window.removeEventListener('openConsultationModal', handleConsultationEvent);
    };
  }, [openConsultationModal]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-800">
      <Header />
      <main className="pb-20">
        {children}
      </main>
      <Footer />
      
      {/* Bottom Navigation - Always visible on mobile */}
      <BottomNav
        onCall={handleCall}
        onWhatsApp={handleWhatsApp}
        onQuote={handleQuote}
        onConsultation={handleConsultation}
      />

      {/* Consultation Modal is handled by ModalContext */}
    </div>
  );
};

export default Layout;