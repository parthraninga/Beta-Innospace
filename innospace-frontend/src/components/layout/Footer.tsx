import { Link } from 'react-router-dom';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Projects', href: '/projects' },
    { name: 'Services', href: '/services' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
  ];

  const services = [
    'Modular Kitchen',
    'Living Room Design',
    'Bedroom Interior',
    'Home Office',
    'Complete Home Interior',
    '3D Visualization',
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: '📘' },
    { name: 'Instagram', href: '#', icon: '📷' },
    { name: 'YouTube', href: '#', icon: '📺' },
    { name: 'LinkedIn', href: '#', icon: '💼' },
    { name: 'Pinterest', href: '#', icon: '📌' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">IS</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">INNOSPACE</h3>
                <p className="text-sm text-gray-400">Interiors</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              We innovate every corner of your space with creative interior design solutions.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <PhoneIcon className="h-4 w-4 text-primary-400" />
                <span className="text-sm">+91-9876543210</span>
              </div>
              <div className="flex items-center space-x-2">
                <EnvelopeIcon className="h-4 w-4 text-primary-400" />
                <span className="text-sm">info@innospace.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPinIcon className="h-4 w-4 text-primary-400 mt-0.5" />
                <span className="text-sm">Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-400 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media & CTA */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex flex-wrap gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                  title={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>

            {/* Chat with Us */}
            <button className="w-full bg-accent-600 hover:bg-accent-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200">
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
              <span>Chat with Us</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Innospace Interiors. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-primary-400 text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-primary-400 text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;