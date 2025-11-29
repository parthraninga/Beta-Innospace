import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { publicApi } from '../services/api';

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  isActive: boolean;
  designCount?: number;
}

const Gallery = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await publicApi.getCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
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

  if (error) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Design Gallery</h1>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="w-full px-2 sm:px-3 lg:px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-50 mb-6">
            Design <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 bg-clip-text text-transparent">Gallery</span>
          </h1>
          <p className="text-xl text-amber-100 max-w-4xl mx-auto">
            Explore our portfolio of stunning interior designs across different categories. 
            Each project showcases our commitment to creating beautiful, functional spaces.
          </p>
        </div>

        {/* Categories Grid */}
        {categories.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700 p-8">
              <h3 className="text-xl font-semibold text-amber-50 mb-2">No Categories Available</h3>
              <p className="text-amber-100">Categories will appear here once they are added through the admin panel.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {categories.map((category) => (
              <Link
                key={category._id}
                to={`/gallery/${category.slug}`}
                className="group bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-gray-700/50"
              >
                {/* Category Image */}
                <div className="relative aspect-w-16 aspect-h-12 overflow-hidden">
                  <img
                    src={category.thumbnail || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500'}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Category Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-amber-50 mb-2 group-hover:text-amber-300 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-amber-100 mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  
                  {/* Design Count */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-amber-200">
                      {category.designCount || 0} designs
                    </span>
                    <span className="text-amber-400 font-medium group-hover:text-amber-300 transition-colors">
                      View Gallery →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-800/50 to-green-900/50 rounded-2xl p-8 shadow-lg border border-gray-700 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-amber-50 mb-4">
              Ready to Transform Your <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 bg-clip-text text-transparent">Space</span>?
            </h3>
            <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
              Get inspired by our designs and let us create something beautiful for your home or office.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Start Your Project
              </Link>
              <Link
                to="/services"
                className="bg-gray-800/80 backdrop-blur-sm hover:bg-gray-800 text-amber-100 font-semibold px-8 py-3 rounded-xl border-2 border-amber-400/30 hover:border-amber-400 transition-all duration-300 transform hover:scale-105"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;