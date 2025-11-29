import React, { useState } from 'react';

interface FAQSectionProps {
  section: {
    title?: string;
    subtitle?: string;
    items?: Array<{
      id: string;
      title: string;
      description?: string;
    }>;
  };
}

const FAQSection: React.FC<FAQSectionProps> = ({ section }) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {section.title && (
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{section.title}</h2>
          {section.subtitle && (
            <p className="text-gray-600 max-w-2xl mx-auto">{section.subtitle}</p>
          )}
        </div>
      )}

      {section.items && section.items.length > 0 && (
        <div className="space-y-4">
          {section.items.map((item) => {
            const isOpen = openItems.has(item.id);
            
            return (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  onClick={() => toggleItem(item.id)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {item.title}
                    </h3>
                    <div className="flex-shrink-0">
                      <svg
                        className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
                
                <div
                  className={`px-6 overflow-hidden transition-all duration-200 ${
                    isOpen ? 'pb-4 max-h-96' : 'max-h-0'
                  }`}
                >
                  {item.description && (
                    <div className="text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {item.description.split('\n').map((paragraph, index) => (
                        paragraph.trim() && (
                          <p key={index} className="mb-3 last:mb-0">
                            {paragraph}
                          </p>
                        )
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Contact CTA */}
      <div className="text-center mt-12 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Still have questions?
        </h3>
        <p className="text-gray-600 mb-4">
          Can't find what you're looking for? We're here to help.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default FAQSection;