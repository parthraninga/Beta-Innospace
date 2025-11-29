import { motion } from 'framer-motion';

interface FloatingElementsProps {
  count?: number;
  className?: string;
}

const FloatingElements = ({ count = 6, className = "" }: FloatingElementsProps) => {
  const elements = [
    { icon: '🏠', color: 'text-primary-400', size: 'text-2xl' },
    { icon: '🛋️', color: 'text-accent-400', size: 'text-xl' },
    { icon: '💡', color: 'text-yellow-400', size: 'text-lg' },
    { icon: '🌿', color: 'text-green-400', size: 'text-xl' },
    { icon: '🖼️', color: 'text-purple-400', size: 'text-lg' },
    { icon: '✨', color: 'text-primary-300', size: 'text-sm' },
  ];

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {elements.slice(0, count).map((element, i) => (
        <motion.div
          key={i}
          className={`absolute ${element.color} ${element.size}`}
          style={{
            left: `${15 + (i * 15) % 70}%`,
            top: `${20 + (i * 12) % 60}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, -10, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + (i * 0.5),
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut"
          }}
        >
          {element.icon}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;