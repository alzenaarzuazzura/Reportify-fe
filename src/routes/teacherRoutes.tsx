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
  { path: '/', element: <TeacherDashboard /> },
  { path: '/attendance', element: <AttendancePage /> },
  { path: '/attendance/create', element: <AttendanceCreate /> },
  { path: '/attendance/view/:id', element: <AttendanceView /> },
  { path: '/attendance/update/:id', element: <AttendanceUpdate /> },
  { path: '/tasks', element: <AssignmentPage /> },
  { path: '/tasks/create', element: <AssignmentCreate /> },
  { path: '/tasks/view/:id', element: <AssignmentView /> },
  { path: '/tasks/update/:id', element: <AssignmentUpdate /> },
  { path: '/announcements', element: <AnnouncementList /> },
  { path: '/announcements/new', element: <AnnouncementForm /> },
  { path: '/announcements/:id/edit', element: <AnnouncementForm /> },
];
