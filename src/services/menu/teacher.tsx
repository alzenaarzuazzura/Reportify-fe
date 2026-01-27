import { MenuItem } from "@reportify/types";
import {
  DashboardOutlined,
  CheckSquareOutlined,
  FileTextOutlined,
  NotificationOutlined
} from '@ant-design/icons';

export const menuTeacher: MenuItem[] = [
    { 
        key: 'dashboard', 
        label: 'menu.dashboard', 
        icon: <DashboardOutlined />, 
        path: '/teacher' 
    },
    { 
        key: 'attendance', 
        label: 'menu.attendance', 
        icon: <CheckSquareOutlined />, 
        path: '/teacher/attendances' 
    },
    { 
        key: 'tasks', 
        label: 'menu.tasks', 
        icon: <FileTextOutlined />, 
        path: '/teacher/tasks' 
    },
    { 
        key: 'announcements', 
        label: 'menu.announcements', 
        icon: <NotificationOutlined />, 
        path: '/teacher/announcements' 
    },
  ];