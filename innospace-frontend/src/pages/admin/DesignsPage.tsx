import React, { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon, EyeSlashIcon, StarIcon } from '@heroicons/react/24/outline';
import { designApi, categoryApi } from '../../services/api';

interface Design {
  _id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  images: Array<{
    url: string;
    thumbnail: string;
    alt: string;
    sortOrder: number;
    publicId?: string;
  }>;
  tags: string[];
  price?: {
    min: number;
    max: number;
    currency: string;
  };
  projectDetails?: {
    area: string;
    duration: string;
    location: string;
    client?: string;
    style: string;
    budget: string;
    completedDate?: string;
  };
  features?: string[];
  materials?: string[];
  colors?: string[];
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
}

const DesignsPage = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDesign, setEditingDesign] = useState<Design | null>(null);

  const fetchDesigns = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const categoryParam = selectedCategory !== 'all' ? `?category=${selectedCategory}` : '';
      const response = await fetch(`/api/admin/designs${categoryParam}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDesigns(data.data || []);
      } else {
        console.error('Failed to fetch designs');
      }
    } catch (error) {
      console.error('Error fetching designs:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/categories', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCategories(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchDesigns(), fetchCategories()]);
      setLoading(false);
    };
    loadData();
  }, [selectedCategory]);

  const handleToggleStatus = async (designId: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/designs/${designId}/toggle`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchDesigns();
      }
    } catch (error) {
      console.error('Error toggling design status:', error);
    }
  };

  const handleDelete = async (designId: string) => {
    if (!confirm('Are you sure you want to delete this design?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/designs/${designId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchDesigns();
      }
    } catch (error) {
      console.error('Error deleting design:', error);
    }
  };

  const filteredDesigns = designs.filter(design =>
    design.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    design.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    design.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Designs</h2>
            <p className="text-gray-600 mt-1">Manage your interior design portfolio</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Add Design</span>
          </button>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search designs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Designs Grid */}
      {filteredDesigns.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No designs found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm 
              ? `No designs match "${searchTerm}"` 
              : 'Get started by adding your first design to showcase your work.'
            }
          </p>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Add Your First Design
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDesigns.map((design) => (
            <div key={design._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Image */}
              <div className="aspect-video relative">
                {design.images.length > 0 ? (
                  <img
                    src={design.images[0].thumbnail || design.images[0].url}
                    alt={design.images[0].alt || design.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
                
                {/* Status badges */}
                <div className="absolute top-2 left-2 flex space-x-1">
                  {!design.isActive && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Inactive
                    </span>
                  )}
                  {design.isFeatured && (
                    <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded flex items-center">
                      <StarIcon className="h-3 w-3 mr-1" />
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 truncate">{design.title}</h3>
                  <div className="flex space-x-1 ml-2">
                    <button
                      onClick={() => handleToggleStatus(design._id)}
                      className={`p-1 rounded ${
                        design.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                      }`}
                      title={design.isActive ? 'Hide design' : 'Show design'}
                    >
                      {design.isActive ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => setEditingDesign(design)}
                      className="p-1 rounded text-indigo-600 hover:text-indigo-900"
                      title="Edit design"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(design._id)}
                      className="p-1 rounded text-red-600 hover:text-red-900"
                      title="Delete design"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{design.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{design.category.name}</span>
                  <span>{design.images.length} images</span>
                </div>

                {design.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {design.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {design.tags.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{design.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Design Modal */}
      {(showAddModal || editingDesign) && (
        <DesignModal
          design={editingDesign}
          categories={categories}
          isOpen={showAddModal || !!editingDesign}
          onClose={() => {
            setShowAddModal(false);
            setEditingDesign(null);
          }}
          onSave={() => {
            fetchDesigns();
            setShowAddModal(false);
            setEditingDesign(null);
          }}
        />
      )}
    </div>
  );
};

// Design Modal Component
interface DesignModalProps {
  design?: Design | null;
  categories: Category[];
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const DesignModal: React.FC<DesignModalProps> = ({ design, categories, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    detailedDescription: '',
    category: '',
    tags: '',
    price: '',
    area: '',
    duration: '',
    location: '',
    client: '',
    style: '',
    budget: '',
    completedDate: '',
    features: '',
    materials: '',
    colors: '',
    isFeatured: false,
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (design) {
      setFormData({
        title: design.title,
        description: design.description,
        detailedDescription: design.detailedDescription || '',
        category: design.category._id,
        tags: design.tags.join(', '),
        price: design.price?.min?.toString() || '',
        area: design.projectDetails?.area || '',
        duration: design.projectDetails?.duration || '',
        location: design.projectDetails?.location || '',
        client: design.projectDetails?.client || '',
        style: design.projectDetails?.style || '',
        budget: design.projectDetails?.budget || '',
        completedDate: design.projectDetails?.completedDate || '',
        features: design.features?.join(', ') || '',
        materials: design.materials?.join(', ') || '',
        colors: design.colors?.join(', ') || '',
        isFeatured: design.isFeatured,
        isActive: design.isActive,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        detailedDescription: '',
        category: '',
        tags: '',
        price: '',
        area: '',
        duration: '',
        location: '',
        client: '',
        style: '',
        budget: '',
        completedDate: '',
        features: '',
        materials: '',
        colors: '',
        isFeatured: false,
        isActive: true,
      });
    }
  }, [design]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('adminToken');
      const payload = {
        title: formData.title,
        description: formData.description,
        detailedDescription: formData.detailedDescription,
        category: formData.category,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        price: formData.price ? { min: parseFloat(formData.price), currency: 'INR' } : undefined,
        projectDetails: {
          area: formData.area,
          duration: formData.duration,
          location: formData.location,
          client: formData.client,
          style: formData.style,
          budget: formData.budget,
          completedDate: formData.completedDate,
        },
        features: formData.features.split(',').map(f => f.trim()).filter(Boolean),
        materials: formData.materials.split(',').map(m => m.trim()).filter(Boolean),
        colors: formData.colors.split(',').map(c => c.trim()).filter(Boolean),
        isFeatured: formData.isFeatured,
        isActive: formData.isActive,
        images: [], // For now, we'll handle images separately
      };

      const url = design 
        ? `/api/admin/designs/${design._id}`
        : '/api/admin/designs';
      
      const method = design ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        onSave();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save design');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {design ? 'Edit Design' : 'Add New Design'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter design title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Brief description of your design"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Detailed Description
            </label>
            <textarea
              rows={4}
              value={formData.detailedDescription}
              onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Detailed description, design process, inspiration, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="modern, luxury, minimalist"
            />
          </div>

          {/* Project Details Section */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Project Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Area/Size
                </label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., 1200 sq ft"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., 3 months"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Mumbai, Ahmedabad"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Design Style
                </label>
                <input
                  type="text"
                  value={formData.style}
                  onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Modern, Contemporary, Traditional"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget Range
                </label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., 5-8 Lakhs"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Price (INR)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter exact price"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Name (Optional)
                </label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Client or property name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Completion Date
                </label>
                <input
                  type="date"
                  value={formData.completedDate}
                  onChange={(e) => setFormData({ ...formData, completedDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Design Elements Section */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Design Elements</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key Features (comma separated)
              </label>
              <input
                type="text"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., Open kitchen, Walk-in closet, Home theater"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Materials Used (comma separated)
              </label>
              <input
                type="text"
                value={formData.materials}
                onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., Marble, Teak wood, Glass, Steel"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color Palette (comma separated)
              </label>
              <input
                type="text"
                value={formData.colors}
                onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., White, Beige, Gold accents, Charcoal"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">Featured Design</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">Active</span>
            </label>
          </div>

          <div className="border-t pt-4">
            <div className="text-sm text-gray-600 mb-2">
              <strong>Note:</strong> Image upload functionality will be available in the next update. 
              For now, you can create the design and add images later.
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : (design ? 'Update Design' : 'Create Design')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DesignsPage;