import { useState, useEffect } from 'react';
import { Layout, Button, Dropdown, Avatar } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  LogoutOutlined,
  ProfileOutlined,
} from '@ant-design/icons';

import Sidebar from '@reportify/components/Sidebar/Sidebar';

import { useAuth } from '@reportify/contexts/AuthContext';

import { authService } from '@reportify/services/authService';
import { getMenuByRole } from '@reportify/utils/getMenuByRole';
import { getInitials } from '@reportify/utils/Help';

const { Header, Content } = Layout;

const AdminLayout = () => {
  const navigate = useNavigate()

  const [collapsed, setCollapsed] = useState(window.innerWidth <= 800);
  const { user } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 800) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = getMenuByRole(user?.role)

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  const userMenuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Keluar',
      onClick: handleLogout,
    },
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: 'Profile',
      onClick: () => navigate('/profile'),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf4 100%)' }}>
      <Sidebar menuItems={menuItems} collapsed={collapsed} />
      <Layout style={{ 
        marginLeft: collapsed ? 80 : 239, 
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
        background: 'transparent'
      }}>
        <Header style={{ 
          padding: '0 32px', 
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.8)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ 
              fontSize: 18,
              color: '#4f46e5',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '12px',
              transition: 'all 0.3s',
              background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <Avatar
                style={{
                  marginRight: 12,
                  background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
                  fontWeight: 600,
                }}
              >
                {getInitials(user?.name)}
              </Avatar>
              <span style={{ 
                fontWeight: 500,
                color: '#1e293b',
              }}>{user?.name}</span>
            </div>
          </Dropdown>
        </Header>
        <Content style={{ 
          margin: 24, 
          padding: 24, 
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          minHeight: 280,
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.8)',
        }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
