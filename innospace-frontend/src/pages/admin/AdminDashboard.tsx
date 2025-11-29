import { useState, useEffect } from 'react';
import { 
  FolderIcon, 
  PhotoIcon, 
  EyeIcon,
  ChartBarIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

interface DashboardStats {
  totalCategories: number;
  activeCategories: number;
  totalDesigns: number;
  activeDesigns: number;
  featuredDesigns: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalCategories: 0,
    activeCategories: 0,
    totalDesigns: 0,
    activeDesigns: 0,
    featuredDesigns: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      // Fetch categories
      const categoriesResponse = await fetch('/api/admin/categories?includeInactive=true', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      // Fetch designs
      const designsResponse = await fetch('/api/admin/designs', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (categoriesResponse.ok && designsResponse.ok) {
        const categoriesData = await categoriesResponse.json();
        const designsData = await designsResponse.json();

        const categories = categoriesData.data || [];
        const designs = designsData.data || [];

        setStats({
          totalCategories: categories.length,
          activeCategories: categories.filter((c: any) => c.isActive).length,
          totalDesigns: designs.length,
          activeDesigns: designs.filter((d: any) => d.isActive).length,
          featuredDesigns: designs.filter((d: any) => d.isFeatured).length,
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Categories',
      value: stats.totalCategories,
      subtitle: `${stats.activeCategories} active`,
      icon: FolderIcon,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Designs',
      value: stats.totalDesigns,
      subtitle: `${stats.activeDesigns} active`,
      icon: PhotoIcon,
      color: 'bg-green-500',
    },
    {
      title: 'Featured Designs',
      value: stats.featuredDesigns,
      subtitle: 'Highlighted designs',
      icon: EyeIcon,
      color: 'bg-yellow-500',
    },
    {
      title: 'Conversion Rate',
      value: '2.4%',
      subtitle: 'Last 30 days',
      icon: ChartBarIcon,
      color: 'bg-purple-500',
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-800 to-gray-800 rounded-lg shadow-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2 text-amber-100">
          Welcome to Innospace CMS
        </h1>
        <p className="text-amber-200 text-lg">
          Manage your interior design portfolio, categories, and content from this dashboard.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gray-800 rounded-lg shadow-sm border border-green-700 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-amber-300 uppercase tracking-wider">
                    {stat.title}
                  </h3>
                  <p className="text-2xl font-bold text-amber-100 mt-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-amber-200 mt-1">
                    {stat.subtitle}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-lg shadow-sm border border-green-700 p-6">
        <h2 className="text-xl font-bold text-amber-100 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="/admin/categories"
            className="group p-6 border border-green-600 rounded-xl hover:border-amber-400 hover:shadow-md transition-all duration-200 bg-gray-900"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-blue-800 rounded-lg mb-4 group-hover:bg-blue-700 transition-colors">
              <FolderIcon className="h-6 w-6 text-blue-300" />
            </div>
            <h3 className="font-semibold text-amber-100 mb-2">Manage Categories</h3>
            <p className="text-sm text-amber-200">Add, edit, or organize design categories</p>
          </a>
          
          <a
            href="/admin/designs"
            className="group p-6 border border-green-600 rounded-xl hover:border-amber-400 hover:shadow-md transition-all duration-200 bg-gray-900"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-green-800 rounded-lg mb-4 group-hover:bg-green-700 transition-colors">
              <PhotoIcon className="h-6 w-6 text-green-300" />
            </div>
            <h3 className="font-semibold text-amber-100 mb-2">Manage Designs</h3>
            <p className="text-sm text-amber-200">Upload and organize your design portfolio</p>
          </a>
          
          <a
            href="/admin/consultations"
            className="group p-6 border border-green-600 rounded-xl hover:border-amber-400 hover:shadow-md transition-all duration-200 bg-gray-900"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-purple-800 rounded-lg mb-4 group-hover:bg-purple-700 transition-colors">
              <PhoneIcon className="h-6 w-6 text-purple-300" />
            </div>
            <h3 className="font-semibold text-amber-100 mb-2">Consultation Requests</h3>
            <p className="text-sm text-amber-200">Manage customer consultation bookings</p>
          </a>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-green-900/50 border border-green-700 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-amber-100 mb-2">
          Getting Started with Your CMS
        </h2>
        <div className="space-y-2 text-sm text-amber-200">
          <p>1. <strong>Create Categories:</strong> Start by setting up design categories (e.g., "Living Room", "Kitchen", "Bedroom")</p>
          <p>2. <strong>Add Designs:</strong> Upload your interior design projects with images and descriptions</p>
          <p>3. <strong>Organize Content:</strong> Use drag-and-drop to reorder categories and designs</p>
          <p>4. <strong>Manage Visibility:</strong> Toggle active/inactive status to control what visitors see</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;