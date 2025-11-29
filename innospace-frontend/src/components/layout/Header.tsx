import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../common/Logo';
import ThemeToggle from '../common/ThemeToggle';
import { useTheme } from '../../contexts/ThemeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Projects', href: '/projects' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
  ];

  const isActivePage = (href: string) => {
    return location.pathname === href;
  };

  return (
    <header className={`shadow-lg sticky top-0 z-50 ${
      theme === 'dark' 
        ? 'bg-gradient-to-r from-gray-900 via-green-900 to-gray-800' 
        : 'bg-gradient-to-r from-gray-50 via-white to-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            {/* bigger, more visible logo */}
            <Logo size="xl" showText={true} isDark={true} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActivePage(item.href)
                    ? theme === 'dark' 
                      ? 'text-amber-300 border-b-2 border-amber-300'
                      : 'text-orange-600 border-b-2 border-orange-600'
                    : theme === 'dark'
                      ? 'text-amber-100 hover:text-amber-200'
                      : 'text-gray-700 hover:text-orange-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <ThemeToggle />
          </nav>

          {/* Mobile menu button - Three lines hamburger */}
          <div className="md:hidden">
            <button
              type="button"
              className="relative p-3 rounded-lg text-amber-100 hover:text-amber-200 hover:bg-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <motion.div
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <XMarkIcon className="h-7 w-7" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col space-y-1.5"
                >
                  {/* Custom three-line hamburger */}
                  <motion.div 
                    className="w-7 h-0.5 bg-current"
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.1 }}
                  />
                  <motion.div 
                    className="w-7 h-0.5 bg-current"
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                  <motion.div 
                    className="w-7 h-0.5 bg-current"
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.3 }}
                  />
                </motion.div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="relative z-50 md:hidden bg-gray-800 border-t border-amber-500/30 shadow-xl"
          >
            <div className="px-4 py-4 space-y-2 max-h-96 overflow-y-auto">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className={`block px-4 py-3 text-lg font-medium rounded-lg transition-all duration-200 ${
                      isActivePage(item.href)
                        ? 'text-amber-300 bg-amber-500/20 border-l-4 border-amber-300 font-semibold'
                        : 'text-amber-100 hover:text-amber-200 hover:bg-amber-500/10 hover:translate-x-2'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;