import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  HomeIcon, 
  PhotoIcon, 
  FolderIcon, 
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  DocumentTextIcon,
  PhoneIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';
import Logo from '../common/Logo';

const AdminLayout = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { name: 'Categories', href: '/admin/categories', icon: FolderIcon },
    { name: 'Designs', href: '/admin/designs', icon: PhotoIcon },
    { name: 'Projects', href: '/admin/projects', icon: BriefcaseIcon },
    { name: 'Consultations', href: '/admin/consultations', icon: PhoneIcon },
    { name: 'Pages', href: '/admin/pages', icon: DocumentTextIcon },
    { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon },
  ];

  const isActivePage = (href: string) => {
    if (href === '/admin') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - Fixed */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white shadow-xl">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 bg-primary-600">
              <div className="flex items-center space-x-2">
                <Logo size="sm" showText={false} className="text-white" />
                <span className="text-white font-bold text-lg">Admin Panel</span>
              </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col flex-grow mt-5">
            <nav className="flex-1 px-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      isActivePage(item.href)
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${
                      isActivePage(item.href) ? 'text-primary-600' : 'text-gray-500'
                    }`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="flex-shrink-0 px-4 py-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="group flex items-center px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors duration-200 w-full"
              >
                <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  Innospace CMS
                </h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-700">Admin User</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 bg-gray-50">
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;