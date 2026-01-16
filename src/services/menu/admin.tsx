import { MenuItem } from "@reportify/types";
import { 
  UserOutlined,
  DashboardOutlined,
  TeamOutlined,
  BookOutlined,
  HomeOutlined,
  ScheduleOutlined,
  CalendarOutlined
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
        label: 'menu.assignments', 
        icon: <ScheduleOutlined />, 
        path: '/assignments' 
    },
    { 
        key: 'schedules', 
        label: 'menu.schedules', 
        icon: <CalendarOutlined />, 
        path: '/schedules' 
    },
]