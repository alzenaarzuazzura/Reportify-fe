import { Menu, Layout } from 'antd';
import { useIntl } from 'react-intl';
import { useNavigate, useLocation } from 'react-router-dom';

import { MenuItem } from '@reportify/types';
import './Sidebar.css';

const { Sider } = Layout;

type SidebarProps = {
  menuItems: MenuItem[];
  collapsed: boolean;
  onMenuClick?: () => void;
};

const Sidebar = ({ menuItems, collapsed, onMenuClick }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const intl = useIntl();

  const items = menuItems.map((item) => ({
    key: item.key,
    icon: item.icon,
    label: intl.formatMessage({ id: item.label }),
    onClick: () => {
      navigate(item.path);
      onMenuClick?.();
    },
  }));

  const sortedMenuItems = [...menuItems].sort(
    (a, b) => b.path.length - a.path.length
  );

  const selectedKey =
    sortedMenuItems.find((item) => {
      if (location.pathname === item.path) return true;
      if (item.path !== '/' && item.path !== '/teacher' && item.path !== '/admin') {
        return location.pathname.startsWith(item.path);
      }
      return false;
    })?.key || menuItems[0]?.key;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      width={239}
      collapsedWidth={80}
      trigger={null}
      className="custom-sidebar"
    >
      <div className="sidebar-header">
        {!collapsed && (
          <img
            src="/logo-reportify.png"
            alt="Reportify Logo"
            className="sidebar-logo"
          />
        )}
      </div>

      <Menu
        className="custom-sidebar-menu"
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
