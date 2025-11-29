import React from 'react';

interface CardSectionProps {
  section: {
    title?: string;
    subtitle?: string;
    items?: Array<{
      id: string;
      title: string;
      description?: string;
      image?: {
        url: string;
        alt: string;
      };
      icon?: string;
    }>;
    settings?: {
      columns?: number;
      alignment?: 'left' | 'center' | 'right';
    };
  };
}

const CardSection: React.FC<CardSectionProps> = ({ section }) => {
  const getGridColumns = (columns?: number) => {
    switch (columns) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 3:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  const getIconSvg = (iconName?: string) => {
    switch (iconName) {
      case 'lightbulb':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        );
      case 'heart':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        );
      case 'check-circle':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        );
      case 'users':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        );
      case 'phone':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        );
      case 'mail':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        );
      case 'location':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        );
      default:
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        );
    }
  };

  const getIconColor = (iconName?: string) => {
    switch (iconName) {
      case 'lightbulb':
        return 'bg-blue-100 text-blue-600';
      case 'heart':
        return 'bg-green-100 text-green-600';
      case 'check-circle':
        return 'bg-purple-100 text-purple-600';
      case 'users':
        return 'bg-orange-100 text-orange-600';
      case 'phone':
        return 'bg-blue-100 text-blue-600';
      case 'mail':
        return 'bg-green-100 text-green-600';
      case 'location':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="mb-20">
      {section.title && (
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{section.title}</h2>
          {section.subtitle && (
            <p className="text-gray-600 max-w-2xl mx-auto">{section.subtitle}</p>
          )}
        </div>
      )}
      
      {section.items && section.items.length > 0 && (
        <div className={`grid ${getGridColumns(section.settings?.columns)} gap-8`}>
          {section.items.map((item) => (
            <div 
              key={item.id} 
              className={`
                ${section.settings?.columns === 2 ? 'bg-blue-50 p-8 rounded-xl' : 
                  section.settings?.columns === 4 ? 'text-center' : 
                  'bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow'}
              `}
            >
              {/* Icon for center-aligned cards */}
              {section.settings?.alignment === 'center' && item.icon && (
                <div className={`w-16 h-16 ${getIconColor(item.icon)} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {getIconSvg(item.icon)}
                  </svg>
                </div>
              )}

              {/* Image if provided */}
              {item.image && (
                <div className="mb-4">
                  <img
                    src={item.image.url}
                    alt={item.image.alt}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Title */}
              <h3 className={`
                ${section.settings?.columns === 2 ? 'text-2xl' : 
                  section.settings?.columns === 4 ? 'text-lg' : 'text-xl'} 
                font-bold text-gray-900 mb-3
              `}>
                {item.title}
              </h3>

              {/* Description */}
              {item.description && (
                <p className={`
                  text-gray-600 leading-relaxed
                  ${section.settings?.columns === 4 ? 'text-sm' : ''}
                `}>
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardSection;