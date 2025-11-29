import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const ProtectedAdminRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      // No token, redirect to login
      navigate('/admin/login');
      return;
    }

    // TODO: Add token validation here
    // For now, we assume any token is valid
    
  }, [navigate]);

  const token = localStorage.getItem('adminToken');
  
  if (!token) {
    return null; // Will redirect in useEffect
  }

  return <AdminLayout />;
};

export default ProtectedAdminRoute;