import { Menu, Layout } from 'antd';
import { useIntl } from 'react-intl';
import { useNavigate, useLocation } from 'react-router-dom';

import { MenuItem } from '@reportify/types';

const { Sider } = Layout;

type SidebarProps = {
  menuItems: MenuItem[];
  collapsed: boolean;
}

const Sidebar = ({ menuItems, collapsed }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const intl = useIntl();

  const items = menuItems.map((item) => ({
    key: item.key,
    icon: item.icon,
    label: intl.formatMessage({ id: item.label }),
    onClick: () => navigate(item.path),
  }));

  const selectedKey = menuItems.find((item) => 
    location.pathname === item.path || 
    (item.path !== '/' && location.pathname.startsWith(item.path))
  )?.key || menuItems[0]?.key;

  return (
    <Sider 
      collapsible 
      collapsed={collapsed}
      width={239}
      collapsedWidth={80}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        background: 'linear-gradient(180deg, #1a1f3a 0%, #2d3561 50%, #1a1f3a 100%)',
        boxShadow: '4px 0 24px rgba(0, 0, 0, 0.12)',
      }}
      trigger={null}
    >
      <div style={{ 
        height: 64, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        {!collapsed && (
          <img
            src="/logo-reportify.png"
            alt="Reportify Logo"
            style={{
              height: 30,
              objectFit: 'contain',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
            }}
          />
        )}
      </div>
      <Menu
        className="custom-sidebar-menu"
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        items={items}
        style={{ 
          background: 'transparent',
          border: 'none',
        }}
      />
      <style>{`
        .custom-sidebar-menu .ant-menu-item {
          margin: 4px 8px;
          border-radius: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .custom-sidebar-menu .ant-menu-item:hover {
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%) !important;
          transform: translateX(4px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .custom-sidebar-menu .ant-menu-item-selected {
          background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%) !important;
          box-shadow: 0 4px 16px rgba(79, 70, 229, 0.4);
        }
        .custom-sidebar-menu .ant-menu-item-selected:hover {
          background: linear-gradient(135deg, #5b52e8 0%, #7478f3 100%) !important;
        }
        .custom-sidebar-menu .ant-menu-item::after {
          border-right: none;
        }
      `}</style>
    </Sider>
  );
};

export default Sidebar;
