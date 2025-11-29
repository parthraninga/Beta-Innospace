import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalProvider } from './contexts/ModalContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/layout/Layout';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import CategoryPage from './pages/CategoryPage';
import DynamicPage from './pages/DynamicPage';
import ProjectsPage from './pages/ProjectsPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoriesPage from './pages/admin/CategoriesPage';
import DesignsPage from './pages/admin/DesignsPage';
import PagesPage from './pages/admin/PagesPage';
import ConsultationsPage from './pages/admin/ConsultationsPage';
import RecentProjectsPage from './pages/admin/RecentProjectsPage';
import SettingsPage from './pages/admin/SettingsPage';
import AdminLogin from './pages/admin/AdminLogin';
import ScrollToTop from './components/common/ScrollToTop';
import './App.css'

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ModalProvider>
          <Router>
          <ScrollToTop />
          <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><DynamicPage /></Layout>} />
          <Route path="/contact" element={<Layout><DynamicPage /></Layout>} />
          <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
          <Route path="/gallery/:category" element={<Layout><CategoryPage /></Layout>} />
          <Route path="/projects" element={<Layout><ProjectsPage /></Layout>} />
          <Route path="/services" element={<Layout><DynamicPage /></Layout>} />
          <Route path="/faq" element={<Layout><DynamicPage /></Layout>} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedAdminRoute />}>
            <Route index element={<AdminDashboard />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="designs" element={<DesignsPage />} />
            <Route path="projects" element={<RecentProjectsPage />} />
            <Route path="consultations" element={<ConsultationsPage />} />
            <Route path="pages" element={<PagesPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          </Routes>
        </Router>
        </ModalProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App
