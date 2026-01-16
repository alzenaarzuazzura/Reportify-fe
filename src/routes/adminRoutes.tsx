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

import SubjectPage from '@reportify/pages/admin/subjects';

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
];