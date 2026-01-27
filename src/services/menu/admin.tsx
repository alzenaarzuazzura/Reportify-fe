import { MenuItem } from "@reportify/types";
import { 
  UserOutlined,
  DashboardOutlined,
  TeamOutlined,
  BookOutlined,
  HomeOutlined,
  ScheduleOutlined,
  CalendarOutlined,
  BarChartOutlined
} from '@ant-design/icons';

export const menuAdmin: MenuItem[] = [
    { 
        key: 'dashboard', 
        label: 'menu.dashboard', 
        icon: <DashboardOutlined />, 
        path: '/admin' 
    },
    { 
        key: 'students', 
        label: 'menu.students', 
        icon: <TeamOutlined />, 
        path: '/admin/students' 
    },
    { 
        key: 'teachers', 
        label: 'menu.teachers', 
        icon: <UserOutlined />, 
        path: '/admin/teachers' 
    },
    { 
        key: 'subjects', 
        label: 'menu.subjects', 
        icon: <BookOutlined />, 
        path: '/admin/subjects' 
    },
    { 
        key: 'classes', 
        label: 'menu.classes', 
        icon: <HomeOutlined />, 
        path: '/admin/classes' 
    },
    { 
        key: 'assignments', 
        label: 'menu.teachingassignment', 
        icon: <ScheduleOutlined />, 
        path: '/admin/teaching-assignments' 
    },
    { 
        key: 'schedules', 
        label: 'menu.schedules', 
        icon: <CalendarOutlined />, 
        path: '/admin/schedules' 
    },
    { 
        key: 'reports', 
        label: 'menu.reports', 
        icon: <BarChartOutlined />, 
        path: '/admin/reports' 
    },
]