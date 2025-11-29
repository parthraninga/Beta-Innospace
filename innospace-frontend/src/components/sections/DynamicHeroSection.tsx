import React from 'react';

interface DynamicHeroSectionProps {
  section: {
    title?: string;
    subtitle?: string;
    content?: string;
    image?: {
      url: string;
      alt: string;
    };
  };
}

const DynamicHeroSection: React.FC<DynamicHeroSectionProps> = ({ section }) => {
  return (
    <div className="text-center mb-16">
      {section.title && (
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {section.title}
        </h1>
      )}
      {section.subtitle && (
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          {section.subtitle}
        </p>
      )}
      {section.content && (
        <div className="mt-8 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {section.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      )}
      {section.image && (
        <div className="mt-12">
          <img
            src={section.image.url}
            alt={section.image.alt}
            className="max-w-full h-auto rounded-lg mx-auto shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default DynamicHeroSection;