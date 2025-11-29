import React from 'react';

interface TextSectionProps {
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

const TextSection: React.FC<TextSectionProps> = ({ section }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        {section.title && (
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{section.title}</h2>
        )}
        {section.subtitle && (
          <p className="text-xl text-gray-600 mb-6">{section.subtitle}</p>
        )}
        {section.content && (
          <div className="space-y-4 text-gray-600 leading-relaxed">
            {section.content.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index}>{paragraph}</p>
              )
            ))}
          </div>
        )}
      </div>
      <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
        {section.image ? (
          <img
            src={section.image.url}
            alt={section.image.alt}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="text-center text-gray-500">
            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <p>Image Placeholder</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextSection;