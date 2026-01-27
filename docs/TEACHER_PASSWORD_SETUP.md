# Teacher Password Setup - Frontend Implementation

## Overview
Fitur untuk mengirim link set password ke WhatsApp guru saat admin membuat akun teacher baru.

## Features

### 1. Auto-Send saat Create Teacher
Ketika admin membuat teacher baru melalui form `/teachers/create`:
- Sistem otomatis mengirim link set password ke nomor WhatsApp yang diinput
- Notifikasi sukses muncul: "Link set password telah dikirim ke WhatsApp guru"
- Link berlaku 1 jam

**File terkait:**
- `fe/src/pages/admin/teachers/hooks/useTeacherCreate.ts`
- `fe/src/services/api/teacher.ts`

### 2. Resend Link dari List Teacher
Admin dapat mengirim ulang link set password dari halaman list teacher:
- Tombol WhatsApp (hijau) muncul di kolom Action untuk setiap teacher
- Hanya muncul jika:
  - Role = teacher
  - Nomor phone tersedia
- Klik tombol → link dikirim ulang ke WhatsApp
- Loading state saat proses pengiriman

**File terkait:**
- `fe/src/pages/admin/teachers/List.tsx`

## API Integration

### Create Teacher
```typescript
POST /reportify/users
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "081234567890",
  "role": "teacher"
}
```

**Response:**
```typescript
{
  "status": true,
  "message": "User berhasil dibuat",
  "data": {
    "id": 5,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "081234567890",
    "role": "teacher"
  }
}
```

Backend otomatis mengirim WhatsApp setelah create.

### Resend Password Setup Link
```typescript
POST /reportify/users/:id/send-password-setup
```

**Response:**
```typescript
{
  "status": true,
  "message": "Link set password berhasil dikirim",
  "data": {
    "teacherId": 5,
    "teacherName": "John Doe",
    "phone": "081234567890",
    "tokenExpired": "2024-01-24T15:30:00.000Z"
  }
}
```

## UI Components

### WhatsApp Button
- Icon: `<WhatsAppOutlined />`
- Color: #25D366 (WhatsApp green)
- Size: small
- Tooltip: "Kirim Link Set Password"
- Loading state saat proses pengiriman

### Notifications
- Success: "Link set password berhasil dikirim ke WhatsApp {nama guru}"
- Error: "Gagal mengirim link set password"
- Duration: 5 detik (untuk success message saat create)

## User Flow

### Create Teacher Flow
1. Admin buka `/teachers/create`
2. Isi form (nama, email, phone, role=teacher)
3. Klik Save
4. Backend create user + auto send WhatsApp
5. Frontend tampilkan 2 notifikasi:
   - "User berhasil dibuat"
   - "Link set password telah dikirim ke WhatsApp guru"
6. Form reset, siap input teacher baru

### Resend Link Flow
1. Admin buka `/teachers`
2. Lihat list teacher
3. Klik tombol WhatsApp (hijau) di kolom Action
4. Button loading
5. WhatsApp terkirim
6. Notifikasi sukses/error
7. Button kembali normal

## Error Handling

### Frontend
- Catch error dari API call
- Tampilkan error message dari backend
- Fallback message: "Gagal mengirim link set password"
- Loading state di-reset setelah error

### Backend
- Validasi teacher exists
- Validasi role = teacher
- Validasi phone tersedia
- Generate/reuse token
- Send WhatsApp
- Return detailed error message

## Security

1. **Authorization:** Hanya admin yang dapat akses endpoint
2. **Token:** Generate secure random token (32 bytes) dan hash dengan SHA256
3. **Expiry:** Token berlaku 1 jam
4. **No Password:** Password tidak pernah dikirim via WhatsApp
5. **Validation:** Validasi role dan phone sebelum kirim
6. **Public Route:** Route `/reset-password` dapat diakses tanpa login untuk set password pertama kali

## Testing

### Manual Test
1. Login sebagai admin
2. Buat teacher baru dengan nomor WhatsApp valid
3. Cek WhatsApp → harus terima pesan dengan link
4. Klik link → redirect ke halaman reset password
5. Set password baru
6. Login dengan email dan password baru

### Resend Test
1. Login sebagai admin
2. Buka list teacher
3. Klik tombol WhatsApp pada salah satu teacher
4. Cek WhatsApp → harus terima pesan baru
5. Token lama masih valid jika belum expired

## Notes

- Fitur ini hanya untuk role `teacher`, bukan `admin`
- Nomor WhatsApp wajib diisi saat create teacher
- Link dapat dikirim ulang kapan saja
- Token di-reuse jika masih valid (tidak generate ulang)
- Format nomor otomatis dikonversi (08xxx → 628xxx)
