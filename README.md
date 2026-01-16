# Reportify Frontend

Sistem frontend untuk aplikasi Reportify - Sistem Manajemen Sekolah

## Fitur

### Admin
- Dashboard dengan statistik
- CRUD Data Siswa (NIS, Nama, Kelas, No Telp Ortu, No Telp Siswa)
- CRUD Data Guru (Nama, Email, Password, Role)
- CRUD Mata Pelajaran
- CRUD Kelas (Tingkat, Jurusan, Rombel)
- CRUD Penugasan Guru (Guru, Kelas, Mata Pelajaran)
- CRUD Jadwal (Penugasan Guru, Hari, Waktu Mulai, Waktu Selesai)

### Guru
- Dashboard dengan jam real-time dan kelas aktif
- Input Absensi Siswa (Hadir, Izin, Alfa)
- CRUD Tugas dengan checklist selesai
- CRUD Pengumuman

## Teknologi

- React 18 + TypeScript
- Vite
- Ant Design (UI Components)
- React Router DOM (Routing)
- React Intl (Internationalization)
- Axios (API Client)
- Day.js (Date Handling)

## Struktur Folder

```
src/
├── components/          # Komponen reusable
│   └── Sidebar.tsx     # Sidebar component
├── contexts/           # React contexts
│   └── AuthContext.tsx
├── layouts/            # Layout components
│   ├── AdminLayout.tsx
│   └── TeacherLayout.tsx
├── locales/            # Internationalization
│   └── id.json
├── pages/              # Halaman aplikasi
│   ├── admin/          # Halaman admin
│   │   ├── students/
│   │   │   ├── hooks/
│   │   │   │   ├── useStudentList.ts
│   │   │   │   └── useStudentView.ts
│   │   │   ├── components/
│   │   │   │   └── General.tsx
│   │   │   ├── List.tsx
│   │   │   ├── Form.tsx
│   │   │   └── View.tsx
│   │   ├── teachers/
│   │   ├── subjects/
│   │   ├── classes/
│   │   ├── assignments/
│   │   ├── schedules/
│   │   └── Dashboard.tsx
│   ├── teacher/        # Halaman guru
│   │   ├── attendance/
│   │   ├── tasks/
│   │   ├── announcements/
│   │   └── Dashboard.tsx
│   └── Login.tsx
├── routes/             # Konfigurasi routing
│   ├── index.tsx
│   ├── adminRoutes.tsx
│   └── teacherRoutes.tsx
├── services/           # API services
│   ├── api.ts
│   └── authService.ts
├── types/              # TypeScript types
│   └── index.ts
├── App.tsx
└── main.tsx
```

## Instalasi

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build
```

## Konfigurasi

Buat file `.env` dari `.env.example`:

```
VITE_API_URL=http://localhost:3000/api
```

## Fitur Utama

### Reusable Components
- Sidebar component yang dapat digunakan untuk admin dan guru dengan menu yang berbeda
- Routing yang terstruktur dan mudah dikonfigurasi

### Struktur File Konsisten
Setiap modul mengikuti pola:
- `hooks/` - Custom hooks untuk data fetching
- `components/` - Komponen spesifik untuk modul
- `List.tsx` - Halaman list dengan tabel
- `Form.tsx` - Halaman form untuk create/update
- `View.tsx` - Halaman detail (jika diperlukan)

### Internationalization
Semua teks menggunakan react-intl untuk memudahkan penambahan bahasa lain di masa depan.

### Theme
Menggunakan warna yang kontras dan elegan:
- Primary: #1a237e (Indigo)
- Success: #2e7d32 (Green)
- Warning: #f57c00 (Orange)
- Error: #c62828 (Red)
