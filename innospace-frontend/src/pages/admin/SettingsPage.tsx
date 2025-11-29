import { useState } from 'react';
import { 
  CogIcon, 
  UserIcon, 
  KeyIcon, 
  PaintBrushIcon,
  GlobeAltIcon,
  BellIcon
} from '@heroicons/react/24/outline';

interface Settings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
  };
  business: {
    workingHours: string;
    servicesOffered: string[];
    aboutUs: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
}

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState<Settings>({
    siteName: 'Innospace Interiors',
    siteDescription: 'We innovate every corner of your space',
    contactEmail: 'info@innospace.com',
    contactPhone: '+91-9876543210',
    address: 'Mumbai, Maharashtra, India',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: ''
    },
    business: {
      workingHours: 'Mon-Sat: 9:00 AM - 7:00 PM',
      servicesOffered: [
        'Interior Design',
        'Home Renovation', 
        'Space Planning',
        'Furniture Selection'
      ],
      aboutUs: 'We are a leading interior design company specializing in creating beautiful, functional spaces that reflect your personality and lifestyle.'
    },
    seo: {
      metaTitle: 'Innospace - Interior Design & Renovation Services',
      metaDescription: 'Transform your space with our expert interior design services. We create beautiful, functional interiors tailored to your style and budget.',
      keywords: 'interior design, home renovation, space planning, furniture, decor, Mumbai'
    }
  });
  const [saving, setSaving] = useState(false);

  const tabs = [
    { id: 'general', name: 'General', icon: CogIcon },
    { id: 'contact', name: 'Contact Info', icon: UserIcon },
    { id: 'social', name: 'Social Media', icon: GlobeAltIcon },
    { id: 'business', name: 'Business', icon: PaintBrushIcon },
    { id: 'seo', name: 'SEO', icon: BellIcon },
    { id: 'account', name: 'Account', icon: KeyIcon },
  ];

  const handleSave = async () => {
    setSaving(true);
    // TODO: Implement API call to save settings
    setTimeout(() => {
      setSaving(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  const updateSetting = (path: string, value: any) => {
    setSettings(prev => {
      const keys = path.split('.');
      const updated = { ...prev };
      let current: any = updated;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Site Name
        </label>
        <input
          type="text"
          value={settings.siteName}
          onChange={(e) => updateSetting('siteName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Site Description
        </label>
        <textarea
          value={settings.siteDescription}
          onChange={(e) => updateSetting('siteDescription', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderContactSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Email
          </label>
          <input
            type="email"
            value={settings.contactEmail}
            onChange={(e) => updateSetting('contactEmail', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Phone
          </label>
          <input
            type="tel"
            value={settings.contactPhone}
            onChange={(e) => updateSetting('contactPhone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Business Address
        </label>
        <textarea
          value={settings.address}
          onChange={(e) => updateSetting('address', e.target.value)}
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderSocialSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Facebook URL
          </label>
          <input
            type="url"
            value={settings.socialMedia.facebook}
            onChange={(e) => updateSetting('socialMedia.facebook', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="https://facebook.com/yourpage"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instagram URL
          </label>
          <input
            type="url"
            value={settings.socialMedia.instagram}
            onChange={(e) => updateSetting('socialMedia.instagram', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="https://instagram.com/yourprofile"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Twitter URL
          </label>
          <input
            type="url"
            value={settings.socialMedia.twitter}
            onChange={(e) => updateSetting('socialMedia.twitter', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="https://twitter.com/yourhandle"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn URL
          </label>
          <input
            type="url"
            value={settings.socialMedia.linkedin}
            onChange={(e) => updateSetting('socialMedia.linkedin', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="https://linkedin.com/company/yourcompany"
          />
        </div>
      </div>
    </div>
  );

  const renderBusinessSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Working Hours
        </label>
        <input
          type="text"
          value={settings.business.workingHours}
          onChange={(e) => updateSetting('business.workingHours', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          About Us
        </label>
        <textarea
          value={settings.business.aboutUs}
          onChange={(e) => updateSetting('business.aboutUs', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderSEOSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Meta Title
        </label>
        <input
          type="text"
          value={settings.seo.metaTitle}
          onChange={(e) => updateSetting('seo.metaTitle', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          maxLength={60}
        />
        <p className="text-xs text-gray-500 mt-1">
          {settings.seo.metaTitle.length}/60 characters
        </p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Meta Description
        </label>
        <textarea
          value={settings.seo.metaDescription}
          onChange={(e) => updateSetting('seo.metaDescription', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          maxLength={160}
        />
        <p className="text-xs text-gray-500 mt-1">
          {settings.seo.metaDescription.length}/160 characters
        </p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Keywords (comma-separated)
        </label>
        <input
          type="text"
          value={settings.seo.keywords}
          onChange={(e) => updateSetting('seo.keywords', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-800 mb-2">Account Management</h4>
        <p className="text-sm text-yellow-700 mb-4">
          Manage your admin account settings and security preferences.
        </p>
      </div>
      
      <div className="space-y-4">
        <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Change Password
        </button>
        <button className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors ml-0 sm:ml-3">
          Update Profile
        </button>
      </div>
      
      <div className="border-t pt-6">
        <h4 className="font-medium text-gray-900 mb-4">Danger Zone</h4>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-700 mb-3">
            These actions cannot be undone. Please proceed with caution.
          </p>
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            Reset All Settings
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'contact': return renderContactSettings();
      case 'social': return renderSocialSettings();
      case 'business': return renderBusinessSettings();
      case 'seo': return renderSEOSettings();
      case 'account': return renderAccountSettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
            <p className="text-gray-600 mt-1">Configure your website and business settings</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Settings Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <div className="lg:w-64 bg-gray-50 border-r border-gray-200">
            <nav className="p-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors mb-1 ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;