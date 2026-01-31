# Sistem Laporan Komprehensif

## Fitur Utama

### 1. Laporan Komprehensif (Baru)
Laporan narasi profesional yang dapat difilter berdasarkan:

#### Periode Laporan
- **Harian**: Laporan untuk satu hari tertentu
- **Mingguan**: Laporan untuk satu minggu
- **Bulanan**: Laporan untuk satu bulan

#### Sudut Pandang
- **Per Siswa**: Laporan detail untuk setiap siswa
  - Ringkasan kehadiran (hadir, izin, sakit, alfa)
  - Ringkasan tugas (sudah/belum mengerjakan)
  - Persentase kehadiran
  - Catatan penting (alfa tinggi, tugas banyak yang belum dikerjakan)
  - Rekomendasi tindak lanjut

- **Per Kelas**: Laporan ringkasan untuk satu kelas
  - Jumlah siswa
  - Rekap absensi kelas
  - Rekap penyelesaian tugas
  - Persentase kehadiran kelas
  - Sorotan siswa dengan alfa terbanyak
  - Kesimpulan dan rekomendasi

- **Per Angkatan/Level**: Laporan keseluruhan untuk satu tingkat
  - Rekap keseluruhan absensi
  - Rekap keseluruhan tugas
  - Tren yang menonjol
  - Kesimpulan dan rekomendasi sistematis

### 2. Format Laporan
- Menggunakan bahasa formal dan terstruktur
- Disajikan dalam bentuk paragraf narasi
- Tidak mengubah atau mengarang data
- Menyertakan peringatan untuk masalah kehadiran/tugas
- Memberikan rekomendasi tindak lanjut yang relevan

### 3. Fitur Tambahan
- **Cetak**: Mencetak laporan langsung
- **Export PDF**: Mengekspor laporan ke format PDF (coming soon)
- **Filter Fleksibel**: Dapat memilih kelas dan siswa tertentu

## Komponen

### ComprehensiveReport.tsx
Halaman utama untuk generate laporan dengan kontrol filter dan periode.

### NarrativeReport.tsx
Komponen yang menghasilkan laporan narasi berdasarkan data dan filter yang dipilih.

### useReportGenerator.ts
Custom hook untuk mengelola state dan fetching data laporan.

## Penggunaan

1. Pilih periode laporan (Harian/Mingguan/Bulanan)
2. Pilih rentang tanggal
3. Pilih sudut pandang (Per Siswa/Per Kelas/Per Level)
4. Pilih filter tambahan (kelas, siswa) jika diperlukan
5. Klik "Generate Laporan"
6. Laporan akan ditampilkan dalam format narasi profesional
7. Gunakan tombol Cetak atau Export untuk menyimpan laporan

## Catatan
- Laporan menggunakan data real-time dari API
- Sistem otomatis memberikan peringatan untuk siswa dengan masalah kehadiran/tugas
- Rekomendasi disesuaikan dengan kondisi aktual siswa/kelas
