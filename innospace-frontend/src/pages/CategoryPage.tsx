import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { publicApi } from '../services/api';
import { useModal } from '../contexts/ModalContext';
import { 
  EyeIcon, 
  ArrowLeftIcon,
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import DesignDetailModal from '../components/modals/DesignDetailModal';

interface Design {
  _id: string;
  title: string;
  description: string;
  images: {
    url: string;
    thumbnail: string;
    alt: string;
  }[];
  tags: string[];
  price?: {
    min: number;
    max: number;
    currency: string;
  };
  isFeatured: boolean;
  isActive: boolean;
}

interface CategoryData {
  name: string;
  description: string;
  designs: Design[];
  pagination: {
    current: number;
    pages: number;
    total: number;
  };
}

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { openConsultationModal } = useModal();
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDesigns, setFilteredDesigns] = useState<Design[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [showDesignModal, setShowDesignModal] = useState(false);

  useEffect(() => {
    if (category) {
      fetchCategoryDesigns();
    }
  }, [category]);

  useEffect(() => {
    if (categoryData) {
      const filtered = categoryData.designs.filter(design =>
        design.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        design.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        design.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredDesigns(filtered);
    }
  }, [categoryData, searchTerm]);

  const fetchCategoryDesigns = async () => {
    try {
      if (!category) return;
      const response = await publicApi.getDesignsByCategory(category);
      setCategoryData(response.data);
      setFilteredDesigns(response.data.designs || []);
    } catch (error) {
      console.error('Error fetching category designs:', error);
      setError('Failed to load designs for this category');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price?: { min: number; max: number; currency: string }) => {
    if (!price) return 'Contact for pricing';
    
    if (price.min === price.max) {
      return `₹${price.min.toLocaleString()}`;
    }
    
    return `₹${price.min.toLocaleString()} - ₹${price.max.toLocaleString()}`;
  };

  const handleViewDetails = (design: Design) => {
    setSelectedDesign(design);
    setShowDesignModal(true);
  };

  const handleCloseModal = () => {
    setShowDesignModal(false);
    setSelectedDesign(null);
  };

  const handleGetQuote = () => {
    setShowDesignModal(false);
    setSelectedDesign(null);
    openConsultationModal();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !categoryData) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Gallery
            </Link>
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <h2 className="text-xl font-semibold text-red-800 mb-2">Category Not Found</h2>
              <p className="text-red-600">{error || 'This category does not exist or has no designs yet.'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/gallery"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Gallery
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {categoryData.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {categoryData.description}
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Search designs..."
            />
          </div>
        </div>

        {/* Designs Grid */}
        {filteredDesigns.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-50 rounded-lg p-8">
              <EyeIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm ? 'No matching designs found' : 'No designs available'}
              </h3>
              <p className="text-gray-600">
                {searchTerm 
                  ? 'Try adjusting your search terms or browse all designs.'
                  : 'Designs will appear here once they are added through the admin panel.'
                }
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-8">
              <p className="text-gray-600">
                Showing {filteredDesigns.length} of {categoryData.designs.length} designs
                {searchTerm && <span> for "{searchTerm}"</span>}
              </p>
            </div>

            {/* Design Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDesigns.map((design) => (
                <div
                  key={design._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Design Image */}
                  <div className="aspect-w-16 aspect-h-12 overflow-hidden relative">
                    <img
                      src={design.images[0]?.thumbnail || design.images[0]?.url || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500'}
                      alt={design.images[0]?.alt || design.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500';
                      }}
                    />
                    
                    {/* Featured Badge */}
                    {design.isFeatured && (
                      <div className="absolute top-3 right-3">
                        <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                          <StarSolidIcon className="h-3 w-3 mr-1" />
                          Featured
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Design Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {design.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {design.description}
                    </p>

                    {/* Tags */}
                    {design.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {design.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {design.tags.length > 3 && (
                          <span className="text-gray-500 text-xs">
                            +{design.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(design.price)}
                      </span>
                      <button 
                        onClick={() => handleViewDetails(design)}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Love What You See?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Ready to bring these designs to life in your own space? Let's discuss your project and create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openConsultationModal}
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200"
              >
                Get Quote
              </button>
              <Link
                to="/gallery"
                className="bg-white hover:bg-gray-50 text-gray-900 font-medium px-8 py-3 rounded-lg border border-gray-300 transition-colors duration-200"
              >
                Browse More Categories
              </Link>
            </div>
          </div>
        </div>

        {/* Design Detail Modal */}
        <DesignDetailModal
          design={selectedDesign}
          isOpen={showDesignModal}
          onClose={handleCloseModal}
          onGetQuote={handleGetQuote}
        />
      </div>
    </div>
  );
};

export default CategoryPage;