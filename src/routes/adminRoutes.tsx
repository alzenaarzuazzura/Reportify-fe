import { ReactNode } from 'react';

import AdminDashboard from '@reportify/pages/admin/Dashboard';

import ViewTeacher from '@reportify/pages/admin/teachers/View';
import TeacherPage from '@reportify/pages/admin/teachers';
import UpdateTeacher from '@reportify/pages/admin/teachers/Update';
import CreateTeacher from '@reportify/pages/admin/teachers/Create';

import ClassPage from '@reportify/pages/admin/classes';
import CreateClass from '@reportify/pages/admin/classes/Create';
import ViewClass from '@reportify/pages/admin/classes/View';
import UpdateClass from '@reportify/pages/admin/classes/Update';

import TeachingAssignmentPage from '@reportify/pages/admin/assignments';
import CreateTeachingAssignment from '@reportify/pages/admin/assignments/Create';
import ViewTeachingAssignment from '@reportify/pages/admin/assignments/View';
import UpdateTeachingAssignment from '@reportify/pages/admin/assignments/Update';

import SchedulePage from '@reportify/pages/admin/schedules';
import CreateSchedule from '@reportify/pages/admin/schedules/Create';
import ViewSchedule from '@reportify/pages/admin/schedules/View';
import UpdateSchedule from '@reportify/pages/admin/schedules/Update';

import SubjectPage from '@reportify/pages/admin/subjects';

import StudentPage from '@reportify/pages/admin/students';
import CreateStudent from '@reportify/pages/admin/students/Create';
import ViewStudent from '@reportify/pages/admin/students/View';
import UpdateStudent from '@reportify/pages/admin/students/Update';

import ReportsPage from '@reportify/pages/admin/reports';

import ProfilePage from '@reportify/pages/admin/profile';

interface RouteConfig {
  path: string;
  element: ReactNode;
}

export const adminRoutes: RouteConfig[] = [
  { 
    path: '/', 
    element: <AdminDashboard /> 
  },
  { 
    path: '/subjects', 
    element: <SubjectPage /> 
  },
  { 
    path: '/teachers', 
    element: <TeacherPage /> 
  },
  { 
    path: '/teachers/create', 
    element: <CreateTeacher /> 
  },
  { 
    path: '/teachers/view/:id', 
    element: <ViewTeacher /> 
  },
  { 
    path: '/teachers/update/:id', 
    element: <UpdateTeacher /> 
  },
  { 
    path: '/classes', 
    element: <ClassPage /> 
  },
  { 
    path: '/classes/create', 
    element: <CreateClass /> 
  },  
  { 
    path: '/classes/view/:id', 
    element: <ViewClass /> 
  },  
  { 
    path: '/classes/update/:id', 
    element: <UpdateClass /> 
  },  
  { 
    path: '/students', 
    element: <StudentPage /> 
  },  
  { 
    path: '/students/create', 
    element: <CreateStudent /> 
  },  
  { 
    path: '/students/view/:id', 
    element: <ViewStudent /> 
  },
  { 
    path: '/students/update/:id', 
    element: <UpdateStudent /> 
  },  
  { 
    path: '/teaching-assignment', 
    element: <TeachingAssignmentPage /> 
  },
  { 
    path: '/teaching-assignments/create', 
    element: <CreateTeachingAssignment /> 
  },  
  { 
    path: '/teaching-assignments/view/:id', 
    element: <ViewTeachingAssignment /> 
  },  
  { 
    path: '/teaching-assignments/update/:id', 
    element: <UpdateTeachingAssignment /> 
  },
  { 
    path: '/schedules', 
    element: <SchedulePage /> 
  },
  { 
    path: '/schedules/create', 
    element: <CreateSchedule /> 
  },  
  { 
    path: '/schedules/view/:id', 
    element: <ViewSchedule /> 
  },  
  { 
    path: '/schedules/update/:id', 
    element: <UpdateSchedule /> 
  },
  { 
    path: '/reports', 
    element: <ReportsPage /> 
  },
  { 
    path: '/profile', 
    element: <ProfilePage /> 
  },      
];