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
import AnnouncementPage from '@reportify/pages/teacher/announcements';
import AnnouncementCreate from '@reportify/pages/teacher/announcements/Create';
import AnnouncementView from '@reportify/pages/teacher/announcements/View';
import AnnouncementUpdate from '@reportify/pages/teacher/announcements/Update';

interface RouteConfig {
  path: string;
  element: ReactNode;
}

export const teacherRoutes: RouteConfig[] = [
  { path: '', element: <TeacherDashboard /> },
  { path: 'attendances', element: <AttendancePage /> },
  { path: 'attendances/create', element: <AttendanceCreate /> },
  { path: 'attendances/view/:id', element: <AttendanceView /> },
  { path: 'attendances/update/:id', element: <AttendanceUpdate /> },
  { path: 'tasks', element: <AssignmentPage /> },
  { path: 'tasks/create', element: <AssignmentCreate /> },
  { path: 'tasks/view/:id', element: <AssignmentView /> },
  { path: 'tasks/update/:id', element: <AssignmentUpdate /> },
  { path: 'announcements', element: <AnnouncementPage /> },
  { path: 'announcements/create', element: <AnnouncementCreate /> },
  { path: 'announcements/view/:id', element: <AnnouncementView /> },
  { path: 'announcements/update/:id', element: <AnnouncementUpdate /> },
];
