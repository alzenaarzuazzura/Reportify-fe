import { Menu, Layout } from 'antd';
import { useIntl } from 'react-intl';
import { useNavigate, useLocation } from 'react-router-dom';

import { color } from '@reportify/constant/color';

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
        background: color.primary,
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
        fontWeight: 'bold'
      }}>
        {!collapsed && (
          <img
            src="/logo-reportify.png"
            alt="Reportify Logo"
            style={{
              height: 30,
              objectFit: 'contain',
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
        style={{ background: color.primary }}
      />
    </Sider>
  );
};

export default Sidebar;
