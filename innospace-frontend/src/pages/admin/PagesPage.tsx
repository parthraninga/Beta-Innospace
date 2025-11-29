import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon, 
  CogIcon
} from '@heroicons/react/24/outline';

interface PageSection {
  id: string;
  type: 'hero' | 'text' | 'cards' | 'list' | 'image' | 'contact_form' | 'faq' | 'projects' | 'services';
  title?: string;
  subtitle?: string;
  content?: string;
  image?: {
    url: string;
    alt: string;
    publicId?: string;
  };
  items?: Array<{
    id: string;
    title: string;
    description?: string;
    image?: {
      url: string;
      alt: string;
      publicId?: string;
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
}



interface Page {
  _id: string;
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  isActive: boolean;
  sections: PageSection[];
  seo?: {
    keywords?: string[];
    ogImage?: string;
    ogDescription?: string;
  };
  updatedAt: string;
}

interface PageData {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  isActive: boolean;
}

type SectionType = 'hero' | 'text' | 'cards' | 'list' | 'image' | 'contact_form' | 'faq' | 'projects' | 'services';

const SECTION_TYPES = [
  { value: 'hero', label: 'Hero Section' },
  { value: 'text', label: 'Text Section' },
  { value: 'image', label: 'Image Section' },
  { value: 'cards', label: 'Card Section' },
  { value: 'list', label: 'List Section' },
  { value: 'services', label: 'Services Section' },
  { value: 'projects', label: 'Projects Section' },
  { value: 'faq', label: 'FAQ Section' },
  { value: 'contact_form', label: 'Contact Form' },
];

const PagesPage: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [editingSection, setEditingSection] = useState<PageSection | null>(null);
  


  const fetchPages = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/pages', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch pages');
      }

      const result = await response.json();
      if (result.success) {
        setPages(result.data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleDeletePage = async (pageId: string) => {
    if (!confirm('Are you sure you want to delete this page?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/pages/${pageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete page');
      }

      await fetchPages(); // Refresh the list
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleToggleActive = async (page: Page) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/pages/${page._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          isActive: !page.isActive,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update page');
      }

      await fetchPages(); // Refresh the list
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleSaveSection = async (section: PageSection) => {
    if (!selectedPage) return;

    try {
      const token = localStorage.getItem('adminToken');
      const isEditing = editingSection !== null;
      
      // Prepare the updated sections array
      let updatedSections;
      if (isEditing) {
        // Update existing section
        updatedSections = selectedPage.sections.map(s => 
          s.id === section.id ? section : s
        );
      } else {
        // Add new section
        updatedSections = [...selectedPage.sections, section];
      }

      const response = await fetch(`/api/admin/pages/${selectedPage._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          sections: updatedSections,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEditing ? 'update' : 'add'} section`);
      }

      // Refresh the pages list and update selected page
      await fetchPages();
      
      // Update the selected page with the new sections
      const updatedPage = { ...selectedPage, sections: updatedSections };
      setSelectedPage(updatedPage);
      
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    if (!selectedPage) return;
    
    if (!confirm('Are you sure you want to delete this section?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const updatedSections = selectedPage.sections.filter(s => s.id !== sectionId);

      const response = await fetch(`/api/admin/pages/${selectedPage._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          sections: updatedSections,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete section');
      }

      // Refresh the pages list and update selected page
      await fetchPages();
      const updatedPage = { ...selectedPage, sections: updatedSections };
      setSelectedPage(updatedPage);
      
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleSavePage = async (pageData: PageData) => {
    try {
      const token = localStorage.getItem('adminToken');
      const isEditing = editingPage !== null;
      const url = isEditing 
        ? `/api/admin/pages/${editingPage!._id}`
        : '/api/admin/pages';
      
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(pageData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEditing ? 'update' : 'create'} page`);
      }

      // Close modal and refresh pages
      setShowCreateModal(false);
      setEditingPage(null);
      await fetchPages();
      
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Page <span className="gradient-text">Management</span>
          </h1>
          <p className="mt-2 text-gray-600">
            Create and manage website pages with dynamic content sections
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-semibold"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Create Page</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-6 py-4 rounded-xl shadow-lg">
          {error}
        </div>
      )}

      {/* Pages List */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden border border-gray-200/50">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200/70">
            <thead className="bg-gradient-to-r from-primary-50 to-primary-100/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Page
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Sections
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No pages found. Create your first page to get started.
                  </td>
                </tr>
              ) : (
                pages.map((page) => (
                  <tr key={page._id} className="hover:bg-primary-50/30 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          {page.title}
                        </div>
                        {page.metaTitle && (
                          <div className="text-sm text-gray-600 truncate max-w-xs">
                            Meta: {page.metaTitle}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-primary-600 font-mono font-medium">
                        /{page.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {page.sections?.length || 0} sections
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleActive(page)}
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                          page.isActive
                            ? 'bg-accent-100 text-accent-800 hover:bg-accent-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {page.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(page.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => window.open(`/${page.slug}`, '_blank')}
                          className="text-gray-500 hover:text-primary-600 transition-colors p-1 rounded-lg hover:bg-primary-50"
                          title="Preview"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setSelectedPage(page)}
                          className="text-accent-500 hover:text-accent-600 transition-colors p-1 rounded-lg hover:bg-accent-50"
                          title="Edit Sections"
                        >
                          <CogIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setEditingPage(page)}
                          className="text-primary-500 hover:text-primary-600 transition-colors p-1 rounded-lg hover:bg-primary-50"
                          title="Edit Page"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeletePage(page._id)}
                          className="text-red-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sections Manager */}
      {selectedPage && (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 mt-6">
          <div className="px-6 py-4 border-b border-gray-200/70 bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-t-xl">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Sections for "<span className="gradient-text">{selectedPage.title}</span>"
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingSection(null);
                    setShowSectionModal(true);
                  }}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 flex items-center font-semibold shadow-lg"
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Add Section
                </button>
                <button
                  onClick={() => setSelectedPage(null)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 transition-all duration-300 font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {selectedPage.sections.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-600 mb-4 text-lg">No sections found</div>
                <button
                  onClick={() => {
                    setEditingSection(null);
                    setShowSectionModal(true);
                  }}
                  className="bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
                >
                  Add First Section
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedPage.sections
                  .sort((a, b) => a.sortOrder - b.sortOrder)
                  .map((section) => (
                    <div
                      key={section.id}
                      className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                              {section.type}
                            </span>
                            <span className="text-gray-600 text-sm font-medium">
                              Order: {section.sortOrder}
                            </span>
                          </div>
                          <h4 className="text-gray-900 font-semibold mb-2 text-lg">
                            {section.title || 'Untitled Section'}
                          </h4>
                          {section.subtitle && (
                            <p className="text-gray-600 text-sm mb-2 font-medium">
                              {section.subtitle}
                            </p>
                          )}
                          {section.content && (
                            <p className="text-gray-700 text-sm">
                              {section.content.length > 100
                                ? section.content.substring(0, 100) + '...'
                                : section.content}
                            </p>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingSection(section);
                              setShowSectionModal(true);
                            }}
                            className="text-primary-500 hover:text-primary-600 transition-colors p-2 rounded-lg hover:bg-primary-50"
                            title="Edit Section"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteSection(section.id)}
                            className="text-red-500 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
                            title="Delete Section"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Page Editor Modal */}
      {(showCreateModal || editingPage) && (
        <PageEditorModal
          page={editingPage}
          isOpen={showCreateModal || !!editingPage}
          onClose={() => {
            setShowCreateModal(false);
            setEditingPage(null);
          }}
          onSave={handleSavePage}
        />
      )}

      {/* Section Editor Modal */}
      {showSectionModal && (
        <SectionEditorModal
          page={selectedPage}
          section={editingSection}
          isOpen={showSectionModal}
          onClose={() => {
            setShowSectionModal(false);
            setEditingSection(null);
          }}
          onSave={async (section) => {
            await handleSaveSection(section);
            setShowSectionModal(false);
            setEditingSection(null);
          }}
        />
      )}
    </div>
  );
};

// Modal component for editing page details
const PageEditorModal: React.FC<{
  page: Page | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (page: PageData) => void;
}> = ({ page, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<PageData>({
    title: '',
    slug: '',
    metaTitle: '',
    metaDescription: '',
    isActive: true,
  });

  useEffect(() => {
    if (page) {
      setFormData({
        title: page.title,
        slug: page.slug,
        metaTitle: page.metaTitle || '',
        metaDescription: page.metaDescription || '',
        isActive: page.isActive,
      });
    } else {
      setFormData({
        title: '',
        slug: '',
        metaTitle: '',
        metaDescription: '',
        isActive: true,
      });
    }
  }, [page]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl w-full max-w-md shadow-2xl border border-gray-200/50">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {page ? 'Edit Page' : 'Create Page'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meta Title
            </label>
            <input
              type="text"
              value={formData.metaTitle}
              onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meta Description
            </label>
            <textarea
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              rows={3}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="mr-2 w-4 h-4 text-primary-600 bg-white border-gray-300 rounded focus:ring-primary-500"
            />
            <label className="text-sm text-gray-700 font-medium">Active</label>
          </div>

          <div className="flex space-x-3 pt-6">
            <button
              type="submit"
              className="flex-1 bg-primary-600 text-white py-3 px-4 rounded-xl hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
            >
              {page ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-300 transition-all duration-300 font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Modal component for editing sections
const SectionEditorModal: React.FC<{
  page: Page | null;
  section: PageSection | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (section: PageSection) => void;
}> = ({ page, section, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<PageSection>({
    id: '',
    type: 'text',
    title: '',
    subtitle: '',
    content: '',
    sortOrder: 0,
  });

  useEffect(() => {
    if (section) {
      setFormData(section);
    } else {
      setFormData({
        id: Date.now().toString(),
        type: 'text',
        title: '',
        subtitle: '',
        content: '',
        sortOrder: page?.sections?.length || 0,
      });
    }
  }, [section, page]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const renderContentFields = () => {
    switch (formData.type) {
      case 'hero':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Subtitle
              </label>
              <input
                type="text"
                value={formData.subtitle || ''}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Content
              </label>
              <textarea
                value={formData.content || ''}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                rows={4}
                placeholder="Hero section description"
              />
            </div>
          </>
        );
      
      case 'text':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Content
            </label>
            <textarea
              value={formData.content || ''}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              rows={4}
              placeholder="Enter text content"
            />
          </div>
        );

      case 'image':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={formData.image?.url || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  image: { ...formData.image, url: e.target.value, alt: formData.image?.alt || '' }
                })}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Alt Text
              </label>
              <input
                type="text"
                value={formData.image?.alt || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  image: { ...formData.image, alt: e.target.value, url: formData.image?.url || '' }
                })}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="Image description"
              />
            </div>
          </>
        );

      default:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              value={formData.content || ''}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              rows={4}
              placeholder={`Content for ${formData.type} section`}
            />
          </div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200/50">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {section ? 'Edit Section' : 'Add Section'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ 
                ...formData, 
                type: e.target.value as SectionType,
                content: '', // Reset content when type changes
                subtitle: '',
                image: undefined
              })}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              {SECTION_TYPES.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder="Section title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort Order
            </label>
            <input
              type="number"
              value={formData.sortOrder}
              onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) })}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              min="0"
            />
          </div>

          {renderContentFields()}

          <div className="flex space-x-3 pt-6">
            <button
              type="submit"
              className="flex-1 bg-primary-600 text-white py-3 px-4 rounded-xl hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
            >
              {section ? 'Update' : 'Add'} Section
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-300 transition-all duration-300 font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PagesPage;