import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PageSection } from '../components/PageSection';
import { useTheme } from '../contexts/ThemeContext';

interface PageData {
  _id: string;
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  sections: Array<{
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
  }>;
}

const DynamicPage: React.FC = () => {
  const location = useLocation();
  const { theme } = useTheme();
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Map route paths to page slugs
  const getSlugFromPath = (pathname: string): string => {
    const pathMap: Record<string, string> = {
      '/about': 'about',
      '/contact': 'contact',
      '/projects': 'projects',
      '/services': 'services',
      '/faq': 'faq',
    };
    return pathMap[pathname] || pathname.slice(1); // Remove leading slash as fallback
  };

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        const slug = getSlugFromPath(location.pathname);
        console.log('Fetching page for slug:', slug);
        
        const response = await fetch(`/api/pages/${slug}`);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`Page "${slug}" not found`);
          }
          throw new Error(`Failed to load page: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Page data received:', result);
        
        if (result.success && result.data) {
          setPageData(result.data);
          
          // Update page title and meta tags
          if (result.data.metaTitle) {
            document.title = result.data.metaTitle;
          } else {
            document.title = result.data.title;
          }
          
          if (result.data.metaDescription) {
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
              metaDescription.setAttribute('content', result.data.metaDescription);
            }
          }
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err: any) {
        console.error('Error fetching page:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const slug = getSlugFromPath(location.pathname);
    if (slug) {
      fetchPage();
    }
  }, [location.pathname]);

  if (loading) {
    return (
      <div className={`min-h-screen py-20 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className={`animate-spin rounded-full h-32 w-32 border-b-2 mx-auto ${
              theme === 'dark' ? 'border-amber-400' : 'border-blue-600'
            }`}></div>
            <p className={`mt-4 ${
              theme === 'dark' ? 'text-amber-200' : 'text-gray-600'
            }`}>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className={`min-h-screen py-20 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className={`text-4xl font-bold mb-4 ${
              theme === 'dark' ? 'text-amber-50' : 'text-gray-900'
            }`}>Page Not Found</h1>
            <p className={`text-lg mb-8 ${
              theme === 'dark' ? 'text-amber-200' : 'text-gray-600'
            }`}>
              {error || 'The page you are looking for does not exist.'}
            </p>
            <button 
              onClick={() => window.history.back()}
              className={`px-6 py-3 rounded-lg transition-colors ${
                theme === 'dark' 
                  ? 'bg-amber-600 hover:bg-amber-700 text-gray-900' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Sort sections by sortOrder
  const sortedSections = [...pageData.sections].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className={`min-h-screen ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-white'
    }`}>
      {sortedSections.map((section) => (
        <PageSection key={section.id} section={section} theme={theme} />
      ))}
    </div>
  );
};

export default DynamicPage;