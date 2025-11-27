import { useState } from 'react';
import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import BottomNav from './BottomNav';
import ConsultationModal from '../ui/ConsultationModal';
import QuoteModal from '../ui/QuoteModal';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const handleCall = () => {
    window.location.href = 'tel:+91-9876543210';
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hi! I\'m interested in your interior design services.');
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  const handleQuote = () => {
    setIsQuoteModalOpen(true);
  };

  const handleConsultation = () => {
    setIsConsultationModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
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

      {/* Modals */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />
      
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
};

export default Layout;