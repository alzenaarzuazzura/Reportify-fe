import { Routes, Route, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import { useAuth } from '@reportify/contexts/AuthContext';
import Login from '@reportify/pages/auth/login/Login';
import ForgotPassword from '@reportify/pages/auth/forgotpw/ForgotPassword';
import ResetPassword from '@reportify/pages/auth/resetpw/ResetPassword';
import AdminLayout from '@reportify/layouts/AdminLayout';
import TeacherLayout from '@reportify/layouts/TeacherLayout';
import { adminRoutes } from './adminRoutes';
import { teacherRoutes } from './teacherRoutes';

const AppRoutes = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <Spin size="large" />
      </div>
    );
  }

  // Not authenticated - show login and auth pages
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // Admin routes
  if (user?.role === 'admin') {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin/*" element={<AdminLayout />}>
          {adminRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    );
  }

  // Teacher routes
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/teacher" replace />} />
      <Route path="/teacher/*" element={<TeacherLayout />}>
        {teacherRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<Navigate to="/teacher" replace />} />
    </Routes>
  );
};

export default AppRoutes;
