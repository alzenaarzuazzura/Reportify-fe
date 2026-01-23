import { ReactNode } from 'react';
import TeacherDashboard from '@reportify/pages/teacher/Dashboard';
import AttendancePage from '@reportify/pages/teacher/attendance';
import AttendanceCreate from '@reportify/pages/teacher/attendance/Create';
import AttendanceView from '@reportify/pages/teacher/attendance/View';
import AttendanceUpdate from '@reportify/pages/teacher/attendance/Update';
import AssignmentPage from '@reportify/pages/teacher/tasks';
import AssignmentCreate from '@reportify/pages/teacher/tasks/Create';
import AssignmentView from '@reportify/pages/teacher/tasks/View';
import AssignmentUpdate from '@reportify/pages/teacher/tasks/Update';
import AnnouncementList from '@reportify/pages/teacher/announcements/List';
import AnnouncementForm from '@reportify/pages/teacher/announcements/Form';

interface RouteConfig {
  path: string;
  element: ReactNode;
}

export const teacherRoutes: RouteConfig[] = [
  { path: '/teacher', element: <TeacherDashboard /> },
  { path: '/teacher/attendance', element: <AttendancePage /> },
  { path: '/teacher/attendance/create', element: <AttendanceCreate /> },
  { path: '/teacher/attendance/view/:id', element: <AttendanceView /> },
  { path: '/teacher/attendance/update/:id', element: <AttendanceUpdate /> },
  { path: '/teacher/tasks', element: <AssignmentPage /> },
  { path: '/teacher/tasks/create', element: <AssignmentCreate /> },
  { path: '/teacher/tasks/view/:id', element: <AssignmentView /> },
  { path: '/teacher/tasks/update/:id', element: <AssignmentUpdate /> },
  { path: '/teacher/announcements', element: <AnnouncementList /> },
  { path: '/teacher/announcements/new', element: <AnnouncementForm /> },
  { path: '/teacher/announcements/:id/edit', element: <AnnouncementForm /> },
];
