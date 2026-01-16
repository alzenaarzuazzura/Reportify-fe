import { ReactNode } from 'react';
import TeacherDashboard from '@reportify/pages/teacher/Dashboard';
import AttendanceList from '@reportify/pages/teacher/attendance/List';
import AttendanceForm from '@reportify/pages/teacher/attendance/Form';
import TaskList from '@reportify/pages/teacher/tasks/List';
import TaskForm from '@reportify/pages/teacher/tasks/Form';
import AnnouncementList from '@reportify/pages/teacher/announcements/List';
import AnnouncementForm from '@reportify/pages/teacher/announcements/Form';

interface RouteConfig {
  path: string;
  element: ReactNode;
}

export const teacherRoutes: RouteConfig[] = [
  { path: '/teacher', element: <TeacherDashboard /> },
  { path: '/attendance', element: <AttendanceList /> },
  { path: '/attendance/new', element: <AttendanceForm /> },
  { path: '/tasks', element: <TaskList /> },
  { path: '/tasks/new', element: <TaskForm /> },
  { path: '/tasks/:id/edit', element: <TaskForm /> },
  { path: '/announcements', element: <AnnouncementList /> },
  { path: '/announcements/new', element: <AnnouncementForm /> },
  { path: '/announcements/:id/edit', element: <AnnouncementForm /> },
];
