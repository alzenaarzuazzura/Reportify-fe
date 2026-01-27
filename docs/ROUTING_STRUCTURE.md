# Routing Structure Documentation

## 📋 Overview

Aplikasi menggunakan struktur routing yang terpisah untuk setiap role dengan prefix yang jelas:
- `/` → Login page (public)
- `/admin/*` → Admin pages (protected)
- `/teacher/*` → Teacher pages (protected)

## 🗺️ Route Structure

### Public Routes (Not Authenticated)
```
/                    → Login page
/forgot-password     → Forgot password page
/reset-password      → Reset password page (with token)
```

### Admin Routes (Role: admin)
```
/admin                              → Dashboard
/admin/students                     → Students list
/admin/students/create              → Create student
/admin/students/view/:id            → View student
/admin/students/update/:id          → Update student

/admin/teachers                     → Teachers list
/admin/teachers/create              → Create teacher
/admin/teachers/view/:id            → View teacher
/admin/teachers/update/:id          → Update teacher

/admin/subjects                     → Subjects list

/admin/classes                      → Classes list
/admin/classes/create               → Create class
/admin/classes/view/:id             → View class
/admin/classes/update/:id           → Update class

/admin/teaching-assignments         → Teaching assignments list
/admin/teaching-assignments/create  → Create teaching assignment
/admin/teaching-assignments/view/:id → View teaching assignment
/admin/teaching-assignments/update/:id → Update teaching assignment

/admin/schedules                    → Schedules list
/admin/schedules/create             → Create schedule
/admin/schedules/view/:id           → View schedule
/admin/schedules/update/:id         → Update schedule

/admin/reports                      → Reports page
/admin/profile                      → Profile page
```

### Teacher Routes (Role: teacher)
```
/teacher                            → Dashboard
/teacher/attendance                 → Attendance list
/teacher/attendance/create          → Create attendance
/teacher/attendance/view/:id        → View attendance
/teacher/attendance/update/:id      → Update attendance

/teacher/tasks                      → Tasks/Assignments list
/teacher/tasks/create               → Create task
/teacher/tasks/view/:id             → View task
/teacher/tasks/update/:id           → Update task

/teacher/announcements              → Announcements list
/teacher/announcements/create       → Create announcement
/teacher/announcements/view/:id     → View announcement
/teacher/announcements/update/:id   → Update announcement
```

## 🔒 Route Protection

### Authentication Flow
```
1. User visits any URL
   ↓
2. Check if authenticated (JWT token exists)
   ↓
3. If NOT authenticated → Redirect to /
   ↓
4. If authenticated → Check role
   ↓
5. If admin → Show admin routes (/admin/*)
   If teacher → Show teacher routes (/teacher/*)
```

### Redirect Rules

**Not Authenticated**:
- Any URL → Redirect to `/` (login)

**Admin Authenticated**:
- `/` → Redirect to `/admin`
- `/teacher/*` → Redirect to `/admin`
- Unknown routes → Redirect to `/admin`

**Teacher Authenticated**:
- `/` → Redirect to `/teacher`
- `/admin/*` → Redirect to `/teacher`
- Unknown routes → Redirect to `/teacher`

## 📁 File Structure

```
fe/src/routes/
├── index.tsx           # Main routing logic with role-based routing
├── adminRoutes.tsx     # Admin route definitions
└── teacherRoutes.tsx   # Teacher route definitions
```

### index.tsx
Main routing file that handles:
- Authentication check
- Role-based routing
- Redirects based on authentication status

### adminRoutes.tsx
Defines all admin routes with relative paths (without `/admin` prefix).

### teacherRoutes.tsx
Defines all teacher routes with relative paths (without `/teacher` prefix).

## 🔧 Implementation Details

### Route Definition Pattern

**adminRoutes.tsx**:
```typescript
export const adminRoutes: RouteConfig[] = [
  { path: '', element: <AdminDashboard /> },        // /admin
  { path: 'students', element: <StudentPage /> },   // /admin/students
  { path: 'students/create', element: <CreateStudent /> }, // /admin/students/create
  // ...
];
```

**teacherRoutes.tsx**:
```typescript
export const teacherRoutes: RouteConfig[] = [
  { path: '', element: <TeacherDashboard /> },      // /teacher
  { path: 'attendance', element: <AttendancePage /> }, // /teacher/attendance
  { path: 'tasks', element: <TasksPage /> },        // /teacher/tasks
  // ...
];
```

### Route Rendering in index.tsx

```typescript
// Admin
<Route path="/admin/*" element={<AdminLayout />}>
  {adminRoutes.map((route) => (
    <Route key={route.path} path={route.path} element={route.element} />
  ))}
</Route>

// Teacher
<Route path="/teacher/*" element={<TeacherLayout />}>
  {teacherRoutes.map((route) => (
    <Route key={route.path} path={route.path} element={route.element} />
  ))}
</Route>
```

## 🎯 Navigation in Components

### Using navigate() in Hooks

**Admin hooks**:
```typescript
// Always use full path with /admin prefix
navigate('/admin/students')
navigate('/admin/teachers/view/1')
```

**Teacher hooks**:
```typescript
// Always use full path with /teacher prefix
navigate('/teacher/attendance')
navigate('/teacher/tasks/view/1')
```

### Menu Configuration

**Admin menu** (`fe/src/services/menu/admin.tsx`):
```typescript
export const menuAdmin: MenuItem[] = [
  { key: 'dashboard', label: 'menu.dashboard', path: '/admin' },
  { key: 'students', label: 'menu.students', path: '/admin/students' },
  // ...
];
```

**Teacher menu** (`fe/src/services/menu/teacher.tsx`):
```typescript
export const menuTeacher: MenuItem[] = [
  { key: 'dashboard', label: 'menu.dashboard', path: '/teacher' },
  { key: 'attendance', label: 'menu.attendance', path: '/teacher/attendance' },
  // ...
];
```

## ✅ Benefits

### 1. Clear Separation
- ✅ Admin routes clearly separated with `/admin` prefix
- ✅ Teacher routes clearly separated with `/teacher` prefix
- ✅ Easy to identify which section user is in

### 2. Better Security
- ✅ Role-based routing at top level
- ✅ Impossible to access admin routes as teacher
- ✅ Impossible to access teacher routes as admin

### 3. Easier Maintenance
- ✅ All admin routes in one place
- ✅ All teacher routes in one place
- ✅ Easy to add new routes

### 4. Better UX
- ✅ URL clearly shows user role
- ✅ Bookmarkable URLs
- ✅ Browser back/forward works correctly

## 🧪 Testing Checklist

### Login Flow
- [ ] Visit `/` → Shows login page
- [ ] Login as admin → Redirects to `/admin`
- [ ] Login as teacher → Redirects to `/teacher`

### Admin Routes
- [ ] Admin can access `/admin/*` routes
- [ ] Admin cannot access `/teacher/*` routes (redirects to `/admin`)
- [ ] All admin menu items navigate correctly
- [ ] All admin CRUD operations navigate correctly

### Teacher Routes
- [ ] Teacher can access `/teacher/*` routes
- [ ] Teacher cannot access `/admin/*` routes (redirects to `/teacher`)
- [ ] All teacher menu items navigate correctly
- [ ] All teacher CRUD operations navigate correctly

### Logout Flow
- [ ] Logout from admin → Redirects to `/`
- [ ] Logout from teacher → Redirects to `/`
- [ ] After logout, cannot access protected routes

## 🔍 Troubleshooting

### Problem: Redirect loop
**Solution**: Check if Navigate component has correct `to` prop and `replace` flag.

### Problem: 404 on refresh
**Solution**: Ensure server is configured to serve `index.html` for all routes (SPA configuration).

### Problem: Wrong redirect after login
**Solution**: Check role in JWT token and redirect logic in `index.tsx`.

### Problem: Menu not highlighting active route
**Solution**: Check if menu `path` matches current route exactly.

## 📝 Summary

**Before**:
- ❌ Mixed routes without clear prefix
- ❌ Confusing URL structure
- ❌ Hard to maintain

**After**:
- ✅ `/` → Login
- ✅ `/admin/*` → Admin pages
- ✅ `/teacher/*` → Teacher pages
- ✅ Clear separation by role
- ✅ Easy to maintain and extend

All routes are now properly organized with clear prefixes based on user role! 🎉
