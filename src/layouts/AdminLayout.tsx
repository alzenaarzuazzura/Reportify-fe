import { useState } from 'react';
import { Layout, Button, Dropdown, Avatar } from 'antd';
import { Outlet } from 'react-router-dom';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import Sidebar from '@reportify/components/Sidebar/Sidebar';

import { useAuth } from '@reportify/contexts/AuthContext';

import { authService } from '@reportify/services/authService';
import { getMenuByRole } from '@reportify/utils/getMenuByRole';

const { Header, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();

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
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar menuItems={menuItems} collapsed={collapsed} />
      <Layout style={{ marginLeft: collapsed ? 80 : 239, transition: 'all 0.2s', backgroundColor: '#edeff7ff' }}>
        <Header style={{ 
          padding: '0 24px', 
          background: '#edeff7ff', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 18 }}
          />
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} style={{ marginRight: 8 }} />
              <span>{user?.name}</span>
            </div>
          </Dropdown>
        </Header>
        <Content style={{ margin: 24, padding: 24, background: '#edeff7ff', minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
