# Catatan Kerja NutriTrack - 2026-05-30

Dokumen ini merangkum hal yang dikerjakan hari ini pada project NutriTrack, terutama proses menjalankan project lokal dan integrasi frontend ke backend.

## 1. Setup dan Menjalankan Project Lokal

Project berhasil dijalankan secara lokal dengan komponen berikut:

- PostgreSQL via Docker
- Backend Express di `http://localhost:3001`
- Frontend Vite di `http://localhost:5173`
- ML API remote dari environment backend

Langkah yang sudah dijalankan:

```powershell
cd C:\Code\nutri-track\backend
docker compose up -d
npm install
npx prisma migrate dev
npm run dev
```

```powershell
cd C:\Code\nutri-track\frontend
npm run dev
```

Hasil pengecekan:

- Backend root endpoint aktif: `GET http://localhost:3001/`
- Backend health aktif: `GET http://localhost:3001/api/health`
- Frontend aktif: `GET http://localhost:5173/`
- Database Docker aktif di port `5433`
- Health backend menunjukkan `api`, `database`, dan `mlService` sehat

## 2. Environment Frontend

File environment frontend dibuat:

```text
frontend/.env
```

Isi:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

Tujuannya agar seluruh request frontend menuju backend lokal di port `3001`.

## 3. Task 1 - Fix Base URL Frontend

File yang diubah:

```text
frontend/src/services/api.js
```

Perubahan:

```js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
```

Sebelumnya fallback masih mengarah ke `http://localhost:3000/api`. Sekarang fallback sudah sesuai backend lokal project ini, yaitu `http://localhost:3001/api`.

Dampak:

- Login/register mengarah ke backend yang benar
- Profile mengarah ke backend yang benar
- Cek obesitas mengarah ke backend yang benar
- Frontend tetap aman meskipun `.env` tidak terbaca

## 4. Task 2 - Hapus Mock Data Prediksi

File yang diubah:

```text
frontend/src/pages/CheckObesity.jsx
```

Perubahan utama:

- Menghapus fallback mock prediction saat API gagal
- Menghapus simulasi BMI dan data probabilitas palsu
- Jika backend atau ML API error, frontend sekarang menampilkan alert error

Alasan:

Mock data berbahaya untuk fitur prediksi karena user bisa mengira hasil palsu sebagai hasil analisis asli.

## 5. Task 3 - Tampilkan Hasil Prediksi Lengkap

File yang diubah:

```text
frontend/src/pages/CheckObesity.jsx
```

Data response backend yang sekarang disimpan dan ditampilkan:

- `prediction`
- `label`
- `confidence`
- `bmi`
- `probabilities`
- `ai_advice`

UI hasil prediksi sekarang menampilkan:

- Chart probabilitas dari `probabilities`
- Result card berdasarkan `prediction`
- Metric BMI
- Metric confidence
- Label hasil prediksi
- Card saran AI dari `ai_advice`

## 6. Task 4 - Sinkronisasi Validasi Form dengan Backend

File yang diubah:

```text
frontend/src/components/specific/ObesityForm.jsx
```

Range field numeric disamakan dengan validasi backend:

| Field | Range |
|-------|-------|
| `Age` | 14-61 |
| `Height` | 145-198 cm |
| `Weight` | 39-173 kg |
| `FCVC` | 1-5 |
| `NCP` | 1-6 |
| `CH2O` | 1-5 |
| `FAF` | 0-7 |
| `TUE` | 0-12 |

Selain atribut `min` dan `max`, validasi client-side juga ditambahkan supaya user mendapat pesan error sebelum request dikirim ke backend.

## 7. Task 5 - Catatan Gender

Tidak ada perubahan kode untuk task ini.

Kesimpulan:

- Register/Profile tetap memakai `L` dan `P`
- Form prediksi obesitas tetap memakai `Male` dan `Female`

Ini sudah benar karena endpoint dan kebutuhan datanya berbeda.

## 8. Task 6 - Update Dokumentasi Frontend

File yang diubah:

```text
frontend/dokumentasi.md
```

Dokumentasi lama diganti dengan versi yang sesuai kondisi project saat ini.

Pembaruan dokumentasi mencakup:

- Struktur project frontend/backend
- Tech stack frontend
- Struktur folder frontend
- Environment frontend
- Routing halaman
- Alur auth
- Alur cek obesitas
- Validasi form obesitas
- Endpoint backend yang dipakai frontend
- Cara menjalankan project lokal

Dokumentasi lama yang tidak akurat sudah dihapus, termasuk bagian yang menyebut backend masih belum dibuat, port `3000`, endpoint profil lama, dan tinggi badan dalam meter.

## 9. Verifikasi

Perintah yang sudah dijalankan:

```powershell
npm run build
```

Hasil:

- Build frontend sukses
- Ada warning chunk size dari Vite, tetapi bukan error

Pengecekan endpoint:

- `GET http://localhost:5173/` mengembalikan status `200`
- `GET http://localhost:3001/api/health` mengembalikan status `200`

## 10. Cleanup Lint

Setelah integrasi selesai, lint frontend dibersihkan agar kode tidak menyimpan import, komponen, atau variable yang tidak dipakai.

File yang ikut dibersihkan:

- `frontend/src/components/specific/ResultCard.jsx`
- `frontend/src/pages/Home.jsx`
- `frontend/src/pages/Register.jsx`
- `frontend/src/contexts/AuthContext.jsx`
- `frontend/src/contexts/auth-context.js`
- `frontend/src/hooks/useAuth.js`
- `frontend/src/pages/Profile.jsx`

Perubahan cleanup:

- Menghapus import `GiMeal` yang tidak dipakai di `ResultCard.jsx`
- Menghapus komponen `StepCard` dan `StatItem` yang tidak dipakai di `Home.jsx`
- Mengganti destructuring `confirmPassword` yang tidak dipakai di `Register.jsx`
- Memisahkan `AuthContext` ke file `auth-context.js` agar sesuai aturan Fast Refresh React
- Mengubah bootstrap auth dari `useEffect` menjadi initializer `useState`
- Menambahkan `cause` saat melempar error baru di auth flow
- Merapikan state edit profil agar tidak melakukan `setState` sinkron di dalam `useEffect`
- Merapikan perhitungan status BMI di `Profile.jsx`

Perintah yang dijalankan:

```powershell
npm run lint
```

Hasil:

- Lint frontend sudah sukses
- Tidak ada error ESLint tersisa

## 11. Redesign UI Cek Obesitas

Setelah integrasi backend selesai, halaman cek obesitas mulai dirapikan agar tampilannya lebih modern, bersih, dan tidak terasa seperti template AI.

File yang diubah:

```text
frontend/src/pages/CheckObesity.jsx
frontend/src/components/specific/ObesityForm.jsx
frontend/src/components/specific/ObesityChart.jsx
frontend/src/components/specific/ResultCard.jsx
frontend/src/components/common/Input.jsx
frontend/src/data/recommendationData.js
```

Perubahan utama:

- Mengubah intro halaman menjadi lebih ringkas dengan label assessment, jumlah parameter, dan alur singkat
- Mengurangi teks yang terlalu panjang agar form dan hasil lebih mudah dibaca
- Menaruh bagian `Saran Personal` di paling bawah setelah ringkasan, chart, dan result card
- Membersihkan emoji dan karakter rusak/mojibake dari UI
- Menggunakan icon dari `react-icons` agar tampilan lebih konsisten
- Merapikan chart probabilitas agar tampil sebagai panel analisis yang lebih profesional
- Merapikan result card supaya rekomendasi tidak terlalu panjang di dalam kolom
- Mempertahankan alur backend asli: hasil tetap datang dari API, bukan mock data

Catatan:

- Nilai `confidence` adalah tingkat keyakinan model untuk satu hasil prediksi, bukan akurasi model keseluruhan.
- Akurasi model 97% dari tim AI belum ditampilkan sebagai data resmi di frontend karena belum tersedia dari response backend.

## 12. Redesign UI Beranda

Halaman beranda dikembangkan ulang agar lebih kuat sebagai halaman utama aplikasi, tetapi tetap terstruktur dan rapi.

File yang diubah:

```text
frontend/src/pages/Home.jsx
```

Perubahan utama:

- Mengubah hero section menjadi full hijau tanpa gradasi putih di bagian bawah
- Merapikan spacing agar konten tidak terlalu mepet
- Menambahkan preview produk/hasil analisis di area hero
- Menambahkan blok fitur, alur kerja, dan statistik agar value aplikasi lebih jelas
- Mengubah CTA bawah menjadi section netral tanpa background hijau sesuai revisi terakhir
- Mengurangi copywriting yang terlalu panjang agar halaman lebih mudah discan

## 13. Redesign Footer

Footer dikembangkan dari versi sederhana menjadi footer yang lebih lengkap dan sesuai tampilan baru beranda.

File yang diubah:

```text
frontend/src/components/common/Footer.jsx
```

Perubahan utama:

- Menambahkan brand NutriTrack dengan icon
- Menambahkan deskripsi singkat aplikasi
- Menambahkan CTA yang adaptif berdasarkan status login user
- Menambahkan navigasi footer
- Menambahkan highlight layanan: prediksi ML, riwayat tersimpan, dan akun aman
- Menambahkan status ringkas di bagian bawah footer
- Membersihkan karakter copyright yang sebelumnya rusak

## 14. Stop Project Lokal

Project lokal dimatikan setelah selesai dikerjakan.

Yang dihentikan:

- Frontend Vite di port `5173`
- Backend Express di port `3001`
- Container Docker PostgreSQL `nutri-track-db`

Catatan:

- Database hanya dihentikan dengan `docker compose down`
- Volume database tidak dihapus, jadi data lokal tetap aman

## 15. File yang Berubah Hari Ini

File baru:

```text
frontend/.env
catatan-kerja-2026-05-30.md
frontend/src/contexts/auth-context.js
```

File yang diubah:

```text
frontend/src/services/api.js
frontend/src/pages/CheckObesity.jsx
frontend/src/pages/Home.jsx
frontend/src/pages/Profile.jsx
frontend/src/pages/Register.jsx
frontend/src/components/specific/ObesityForm.jsx
frontend/src/components/specific/ObesityChart.jsx
frontend/src/components/specific/ResultCard.jsx
frontend/src/components/common/Footer.jsx
frontend/src/components/common/Input.jsx
frontend/src/data/recommendationData.js
frontend/dokumentasi.md
frontend/src/contexts/AuthContext.jsx
frontend/src/hooks/useAuth.js
```

## 16. Status Akhir

Status integrasi frontend ke backend:

- Base URL sudah benar
- Mock prediction sudah dihapus
- Hasil prediksi lengkap sudah ditampilkan
- Validasi form sudah sinkron dengan backend
- Dokumentasi frontend sudah diperbarui
- Lint frontend sudah bersih
- Build frontend sukses
- Project lokal berhasil dijalankan
- UI cek obesitas, beranda, dan footer sudah dirapikan untuk commit saat ini
- Project lokal sudah dimatikan setelah pengerjaan
