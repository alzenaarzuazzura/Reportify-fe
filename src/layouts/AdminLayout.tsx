import { useState, useEffect } from 'react'
import { Layout, Button, Dropdown, Avatar, Drawer } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from '@ant-design/icons'

import Sidebar from '@reportify/components/Sidebar/Sidebar'
import { useAuth } from '@reportify/contexts/AuthContext'
import { authService } from '@reportify/services/authService'
import { getMenuByRole } from '@reportify/utils/getMenuByRole'
import { getInitials } from '@reportify/utils/Help'

import './layout.css'

const { Header, Content } = Layout

const AdminLayout = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [collapsed, setCollapsed] = useState(window.innerWidth <= 800)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [drawerVisible, setDrawerVisible] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)

      if (mobile) {
        setCollapsed(true)
        setDrawerVisible(false)
      } else if (window.innerWidth <= 800) {
        setCollapsed(true)
      } else {
        setCollapsed(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const menuItems = getMenuByRole(user?.role)

  const handleLogout = () => {
    authService.logout()
    window.location.href = '/login'
  }

  const userMenuItems = [
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: 'Profile',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Keluar',
      danger: true,
      onClick: handleLogout,
    },
  ]

  const toggleSidebar = () => {
    isMobile ? setDrawerVisible(!drawerVisible) : setCollapsed(!collapsed)
  }

  return (
    <Layout className="admin-layout">
      {!isMobile && <Sidebar menuItems={menuItems} collapsed={collapsed} />}

      {isMobile && (
        <Drawer
          placement="left"
          open={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          closable={false}
          width={239}
          className="admin-drawer"
        >
          <Sidebar
            menuItems={menuItems}
            collapsed={false}
            onMenuClick={() => setDrawerVisible(false)}
          />
        </Drawer>
      )}

      <Layout
        className={`admin-main ${
          isMobile ? 'mobile' : collapsed ? 'collapsed' : 'expanded'
        }`}
      >
        <Header className="admin-header">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleSidebar}
            className="menu-btn"
          />

          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div className="user-box">
              <Avatar className="user-avatar">
                {getInitials(user?.name)}
              </Avatar>
              {!isMobile && <span className="user-name">{user?.name}</span>}
            </div>
          </Dropdown>
        </Header>

        <Content className="admin-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
