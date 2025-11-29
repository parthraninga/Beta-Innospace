import React from 'react';

interface ServicesSectionProps {
  section: {
    title?: string;
    subtitle?: string;
    items?: Array<{
      id: string;
      title: string;
      description?: string;
      metadata?: {
        features?: string[];
      };
    }>;
    settings?: {
      columns?: number;
    };
  };
  theme?: 'light' | 'dark';
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ section, theme = 'dark' }) => {
  const getGridColumns = (columns?: number) => {
    switch (columns) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      case 3:
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <div>
      {section.title && (
        <div className="text-center mb-12">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            theme === 'dark' ? 'text-amber-50' : 'text-gray-900'
          }`}>
            Our <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 bg-clip-text text-transparent">Services</span>
          </h2>
          {section.subtitle && (
            <p className={`text-xl max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-amber-200' : 'text-gray-600'
            }`}>{section.subtitle}</p>
          )}
        </div>
      )}

      {section.items && section.items.length > 0 && (
        <div className={`grid ${getGridColumns(section.settings?.columns)} gap-8`}>
          {section.items.map((service) => (
            <div
              key={service.id}
              className={`rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border group ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700 hover:border-amber-300/30' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Service Title */}
              <h3 className={`text-xl font-bold mb-3 group-hover:text-amber-400 transition-colors duration-200 ${
                theme === 'dark' ? 'text-amber-50' : 'text-gray-900'
              }`}>
                {service.title}
              </h3>

              {/* Service Description */}
              {service.description && (
                <p className={`mb-4 leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {service.description}
                </p>
              )}

              {/* Service Features */}
              {service.metadata?.features && service.metadata.features.length > 0 && (
                <ul className={`text-sm space-y-2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {service.metadata.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className={`mt-1 flex-shrink-0 ${
                        theme === 'dark' ? 'text-amber-400' : 'text-amber-600'
                      }`}>•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Learn More Button */}
              <div className="mt-6">
                <button className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 hover:bg-gray-600 text-amber-200 hover:text-amber-100 border border-gray-600 hover:border-amber-300/50' 
                    : 'bg-gray-800 hover:bg-gray-700 text-amber-100 hover:text-amber-50 border border-gray-700'
                }`}>
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contact CTA */}
      <div className={`text-center mt-16 rounded-2xl p-8 border-2 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-amber-300/20' 
          : 'bg-gray-50 border-gray-200'
      }`}>
        <h3 className={`text-2xl font-bold mb-4 ${
          theme === 'dark' ? 'text-amber-50' : 'text-gray-900'
        }`}>
          Ready to Get Started?
        </h3>
        <p className={`mb-6 max-w-xl mx-auto ${
          theme === 'dark' ? 'text-amber-200' : 'text-gray-600'
        }`}>
          Let's discuss your project and see how we can bring your vision to life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
            theme === 'dark'
              ? 'bg-amber-600 hover:bg-amber-700 text-gray-900'
              : 'bg-gray-800 hover:bg-gray-700 text-amber-100'
          }`}>
            Get Free Consultation
          </button>
          <button className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 border-2 ${
            theme === 'dark'
              ? 'border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-gray-900'
              : 'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-amber-100'
          }`}>
            View Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;