import React from 'react';
import DynamicHeroSection from './sections/DynamicHeroSection';
import TextSection from './sections/TextSection';
import CardSection from './sections/CardSection';
import ContactFormSection from './sections/ContactFormSection';
import FAQSection from './sections/FAQSection';
import ProjectsSection from './sections/ProjectsSection';
import ServicesSection from './sections/ServicesSection';

interface PageSectionProps {
  section: {
    id: string;
    type: string;
    title?: string;
    subtitle?: string;
    content?: string;
    image?: {
      url: string;
      alt: string;
    };
    items?: Array<{
      id: string;
      title: string;
      description?: string;
      image?: {
        url: string;
        alt: string;
      };
      link?: string;
      icon?: string;
      metadata?: Record<string, any>;
    }>;
    settings?: {
      backgroundColor?: string;
      textColor?: string;
      columns?: number;
      spacing?: 'small' | 'medium' | 'large';
      alignment?: 'left' | 'center' | 'right';
    };
    sortOrder: number;
  };
  theme?: 'light' | 'dark';
}

export const PageSection: React.FC<PageSectionProps> = ({ section, theme = 'dark' }) => {
  const getSpacingClass = (spacing?: string) => {
    switch (spacing) {
      case 'small':
        return 'py-8';
      case 'large':
        return 'py-24';
      case 'medium':
      default:
        return 'py-16';
    }
  };

  const getAlignmentClass = (alignment?: string) => {
    switch (alignment) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      case 'left':
      default:
        return 'text-left';
    }
  };

  const sectionClasses = `
    ${getSpacingClass(section.settings?.spacing)}
    ${section.settings?.backgroundColor || (theme === 'dark' ? 'bg-gray-900' : 'bg-white')}
    ${section.settings?.textColor || (theme === 'dark' ? 'text-amber-50' : 'text-gray-900')}
  `.trim();

  const containerClasses = `
    max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
    ${getAlignmentClass(section.settings?.alignment)}
  `.trim();

  const renderSectionContent = () => {
    switch (section.type) {
      case 'hero':
        return <DynamicHeroSection section={section} />;
      case 'text':
        return <TextSection section={section} />;
      case 'cards':
        return <CardSection section={section} />;
      case 'contact_form':
        return <ContactFormSection section={section} />;
      case 'faq':
        return <FAQSection section={section} />;
      case 'projects':
        return <ProjectsSection section={section} theme={theme} />;
      case 'services':
        return <ServicesSection section={section} theme={theme} />;
      case 'image':
        return (
          <div className="text-center">
            {section.image && (
              <img
                src={section.image.url}
                alt={section.image.alt}
                className="max-w-full h-auto rounded-lg mx-auto"
              />
            )}
          </div>
        );
      case 'list':
        return (
          <div>
            {section.title && (
              <h2 className={`text-3xl font-bold mb-6 ${
                theme === 'dark' ? 'text-amber-50' : 'text-gray-900'
              }`}>{section.title}</h2>
            )}
            {section.subtitle && (
              <p className={`text-xl mb-8 ${
                theme === 'dark' ? 'text-amber-200' : 'text-gray-600'
              }`}>{section.subtitle}</p>
            )}
            {section.items && (
              <ul className="space-y-4">
                {section.items.map((item) => (
                  <li key={item.id} className="flex items-start space-x-3">
                    <span className={`mt-1 ${
                      theme === 'dark' ? 'text-amber-400' : 'text-blue-600'
                    }`}>•</span>
                    <div>
                      <h4 className={`font-semibold ${
                        theme === 'dark' ? 'text-amber-100' : 'text-gray-900'
                      }`}>{item.title}</h4>
                      {item.description && (
                        <p className={`${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>{item.description}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      default:
        return (
          <div className={`text-center py-8 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <p className={`${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>Unknown section type: {section.type}</p>
          </div>
        );
    }
  };

  return (
    <section className={sectionClasses}>
      <div className={containerClasses}>
        {renderSectionContent()}
      </div>
    </section>
  );
};