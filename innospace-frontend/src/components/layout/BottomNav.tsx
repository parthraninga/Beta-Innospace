import { 
  PhotoIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface BottomNavProps {
  onCall: () => void;
  onWhatsApp: () => void;
  onQuote: () => void;
  onConsultation: () => void;
}

const BottomNav = ({ onCall, onWhatsApp, onQuote }: BottomNavProps) => {
  const navItems = [
    {
      name: 'Designs',
      icon: PhotoIcon,
      action: () => window.location.href = '/gallery',
      type: 'link' as const,
    },
    {
      name: 'Call Now',
      icon: PhoneIcon,
      action: onCall,
      type: 'action' as const,
    },
    {
      name: 'Get Quote',
      icon: DocumentTextIcon,
      action: onQuote,
      type: 'action' as const,
    },
    {
      name: 'WhatsApp',
      icon: ChatBubbleLeftRightIcon,
      action: onWhatsApp,
      type: 'action' as const,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-green-700 safe-area-inset-bottom">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => (
          <motion.button
            key={item.name}
            onClick={item.action}
            className="flex flex-col items-center justify-center space-y-1 text-xs font-medium text-amber-200 hover:text-amber-100 transition-colors duration-200"
            whileTap={{ scale: 0.95 }}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;