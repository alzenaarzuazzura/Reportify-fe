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
        path: '/' 
    },
    { 
        key: 'students', 
        label: 'menu.students', 
        icon: <TeamOutlined />, 
        path: '/students' 
    },
    { 
        key: 'teachers', 
        label: 'menu.teachers', 
        icon: <UserOutlined />, 
        path: '/teachers' 
    },
    { 
        key: 'subjects', 
        label: 'menu.subjects', 
        icon: <BookOutlined />, 
        path: '/subjects' 
    },
    { 
        key: 'classes', 
        label: 'menu.classes', 
        icon: <HomeOutlined />, 
        path: '/classes' 
    },
    { 
        key: 'assignments', 
        label: 'menu.teachingassignment', 
        icon: <ScheduleOutlined />, 
        path: '/teaching-assignment' 
    },
    { 
        key: 'schedules', 
        label: 'menu.schedules', 
        icon: <CalendarOutlined />, 
        path: '/schedules' 
    },
    { 
        key: 'reports', 
        label: 'menu.reports', 
        icon: <BarChartOutlined />, 
        path: '/reports' 
    },
]