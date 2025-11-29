const API_BASE_URL = '/api';

// Get auth token from localStorage
const getAuthToken = () => localStorage.getItem('adminToken');

// Generic API request function
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};

// Category API functions
export const categoryApi = {
  // Get all categories
  getAll: () => apiRequest('/admin/categories'),

  // Get category by ID
  getById: (id: string) => apiRequest(`/admin/categories/${id}`),

  // Create new category
  create: (data: any) => apiRequest('/admin/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Update category
  update: (id: string, data: any) => apiRequest(`/admin/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  // Delete category
  delete: (id: string) => apiRequest(`/admin/categories/${id}`, {
    method: 'DELETE',
  }),

  // Toggle category status
  toggleStatus: (id: string) => apiRequest(`/admin/categories/${id}/toggle`, {
    method: 'PUT',
  }),
};

// Design API functions
export const designApi = {
  // Get all designs
  getAll: (params?: Record<string, string>) => {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    return apiRequest(`/admin/designs${queryString ? `?${queryString}` : ''}`);
  },

  // Get design by ID
  getById: (id: string) => apiRequest(`/admin/designs/${id}`),

  // Create new design
  create: (data: any) => apiRequest('/admin/designs', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Update design
  update: (id: string, data: any) => apiRequest(`/admin/designs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  // Delete design
  delete: (id: string) => apiRequest(`/admin/designs/${id}`, {
    method: 'DELETE',
  }),

  // Toggle design status
  toggleStatus: (id: string) => apiRequest(`/admin/designs/${id}/toggle`, {
    method: 'PUT',
  }),
};

// Auth API functions
export const authApi = {
  // Login
  login: (credentials: { email: string; password: string }) => {
    return fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    }).then(response => {
      if (!response.ok) {
        return response.json().then(errorData => {
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        });
      }
      return response.json();
    });
  },

  // Get current user
  getMe: () => apiRequest('/auth/me'),

  // Logout (client-side only)
  logout: () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  },
};

// Public API functions (no auth required)
export const publicApi = {
  // Get public categories
  getCategories: () => apiRequest('/categories'),

  // Get designs by category
  getDesignsByCategory: (categorySlug: string, params?: Record<string, string>) => {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    return apiRequest(`/designs/${categorySlug}${queryString ? `?${queryString}` : ''}`);
  },

  // Get all public designs
  getDesigns: (params?: Record<string, string>) => {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    return apiRequest(`/designs${queryString ? `?${queryString}` : ''}`);
  },
};

export default {
  authApi,
  categoryApi,
  designApi,
  publicApi,
};