import { useTheme } from '../contexts/ThemeContext';

const Services = () => {
  const { theme } = useTheme();

  const services = [
    {
      title: "Interior Design Consultation",
      description: "Expert advice and planning for your interior design project",
      icon: "🏠"
    },
    {
      title: "Space Planning",
      description: "Optimize your space layout for maximum functionality and aesthetics",
      icon: "📐"
    },
    {
      title: "Color Consultation",
      description: "Professional color schemes that enhance your space",
      icon: "🎨"
    },
    {
      title: "Furniture Selection",
      description: "Curated furniture pieces that match your style and budget",
      icon: "🪑"
    },
    {
      title: "Lighting Design",
      description: "Create the perfect ambiance with strategic lighting solutions",
      icon: "💡"
    },
    {
      title: "Project Management",
      description: "Complete project oversight from concept to completion",
      icon: "📋"
    }
  ];

  return (
    <div className={`min-h-screen py-20 ${
      theme === 'dark' 
        ? 'bg-gray-900' 
        : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className={`text-4xl font-bold mb-8 ${
            theme === 'dark' ? 'text-amber-50' : 'text-gray-900'
          }`}>Our Services</h1>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-amber-100' : 'text-gray-600'
          }`}>Comprehensive interior design services for your space</p>
        </div>
        
        {/* Services Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className={`p-8 rounded-lg shadow-lg transition-transform hover:scale-105 ${
              theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
            }`}>
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className={`font-bold text-xl mb-4 ${
                theme === 'dark' ? 'text-amber-100' : 'text-gray-900'
              }`}>{service.title}</h3>
              <p className={`text-sm mb-6 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>{service.description}</p>
              <button className={`w-full px-4 py-2 rounded-lg transition-colors ${
                theme === 'dark' 
                  ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                  : 'bg-orange-600 hover:bg-orange-700 text-white'
              }`}>
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;