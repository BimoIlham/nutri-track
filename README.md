<p align="center">
  <img src="https://img.shields.io/badge/NutriTrack-Obesity%20Prediction-10B981?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTEyIDJhMTAgMTAgMCAxIDAgMTAgMTBIMTIiLz48cGF0aCBkPSJNMTIgMmE3IDcgMCAxIDAgNyA3aC03Ii8+PC9zdmc+" alt="NutriTrack"/>
</p>

<h1 align="center">NutriTrack</h1>

<p align="center">
  <strong>Aplikasi Web Prediksi Tingkat Obesitas Berbasis Machine Learning</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/Express-5.2-000000?style=flat-square&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/Prisma-6.19-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma"/>
  <img src="https://img.shields.io/badge/PostgreSQL-17-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/TailwindCSS-4.2-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="TailwindCSS"/>
</p>

<p align="center">
  <a href="#-tentang-project">Tentang</a> •
  <a href="#-fitur-utama">Fitur</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-arsitektur">Arsitektur</a> •
  <a href="#-instalasi--setup">Instalasi</a> •
  <a href="#-penggunaan">Penggunaan</a> •
  <a href="#-api-endpoints">API</a> •
  <a href="#-tim-pengembang">Tim</a>
</p>

---

## 📋 Tentang Project

**NutriTrack** adalah aplikasi web yang memanfaatkan teknologi **Machine Learning** untuk memprediksi tingkat obesitas pengguna berdasarkan data fisik dan kebiasaan sehari-hari. Aplikasi ini dikembangkan sebagai **Capstone Project DBS Foundation Coding Camp 2025**.

Pengguna cukup mengisi formulir dengan data seperti usia, tinggi badan, berat badan, frekuensi konsumsi sayur, aktivitas fisik, dan lainnya. Sistem kemudian menganalisis data tersebut menggunakan model ML dan memberikan:

- **Prediksi kategori obesitas** (Insufficient Weight, Normal Weight, Overweight, hingga Obesity Type III)
- **Nilai BMI** (Body Mass Index)
- **Tingkat keyakinan model** terhadap prediksi
- **Distribusi probabilitas** untuk semua kategori
- **Saran personal berbasis AI** untuk perbaikan kesehatan

## 🎯 Tujuan

| Tujuan | Deskripsi |
|--------|-----------|
| **Deteksi Dini** | Membantu pengguna mengetahui tingkat obesitas sejak dini sebelum berkembang menjadi penyakit kronis |
| **Edukasi Kesehatan** | Memberikan pemahaman tentang faktor-faktor yang mempengaruhi obesitas |
| **Saran Actionable** | Menyediakan rekomendasi personal berbasis AI yang dapat langsung diterapkan |
| **Tracking Riwayat** | Menyimpan riwayat prediksi agar pengguna dapat memantau perkembangan kesehatannya |

## 🌟 Manfaat

- **Bagi Pengguna Umum** — Mendapatkan asesmen kesehatan cepat tanpa harus ke dokter untuk screening awal
- **Bagi Mahasiswa/Pelajar** — Meningkatkan awareness tentang pola hidup sehat sejak usia muda
- **Bagi Profesional Kesehatan** — Alat bantu screening awal yang cepat untuk identifikasi risiko obesitas pasien
- **Bagi Peneliti** — Contoh implementasi ML dalam domain kesehatan publik

## ✨ Fitur Utama

### 🔐 Autentikasi & Keamanan
- Registrasi dan login dengan email & password
- JWT Access Token + Refresh Token dengan rotasi otomatis
- Refresh token disimpan sebagai HTTP-only cookie (aman dari XSS)
- Token di-hash (SHA-256) sebelum disimpan di database
- Logout dengan server-side token revocation

### 🩺 Prediksi Obesitas
- Form input 16 parameter kesehatan dengan validasi real-time
- Prediksi menggunakan model ML melalui API eksternal
- Hasil prediksi meliputi: kategori, label, BMI, confidence, dan probabilitas
- Visualisasi distribusi probabilitas dalam bentuk chart interaktif
- Saran personal berbasis AI

### 👤 Profil Pengguna
- Lihat dan edit data profil (nama, usia, gender, tinggi, berat badan)
- Riwayat prediksi obesitas tersimpan di database
- Detail lengkap setiap prediksi dapat dilihat kembali

### 📊 Visualisasi Data
- Chart probabilitas menggunakan Recharts
- Result card dengan kode warna berdasarkan kategori prediksi
- Tampilan BMI dan confidence level

## 🛠 Tech Stack

### Frontend
| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| React | 19.2 | UI Library |
| Vite | 8.0 | Build Tool & Dev Server |
| Tailwind CSS | 4.2 | Utility-first CSS Framework |
| React Router | 7.14 | Client-side Routing |
| Recharts | 3.8 | Visualisasi Chart |
| React Icons | 5.6 | Icon Library |
| Axios | 1.16 | HTTP Client |

### Backend
| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| Express.js | 5.2 | Web Framework |
| Prisma | 6.19 | ORM & Database Toolkit |
| PostgreSQL | 17 | Relational Database |
| JSON Web Token | 9.0 | Autentikasi |
| bcryptjs | 3.0 | Password Hashing |
| cookie-parser | 1.4 | HTTP Cookie Parsing |

### Machine Learning (External API)
| Komponen | Deskripsi |
|----------|-----------|
| Model | Klasifikasi tingkat obesitas multi-kelas |
| Input | 16 parameter (usia, tinggi, berat, kebiasaan makan, dll) |
| Output | Prediksi kategori, confidence, probabilitas, saran AI |

## 🏗 Arsitektur

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   React SPA     │────▶│  Express API    │────▶│   ML Service    │
│   (Frontend)    │◀────│  (Backend)      │◀────│   (External)    │
│                 │     │                 │     │                 │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                │
                        ┌────────▼────────┐
                        │                 │
                        │   PostgreSQL    │
                        │   (Database)    │
                        │                 │
                        └─────────────────┘
```

### Struktur Folder

```
nutri-track/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/          # Navbar, Footer, Button, Input, dll
│   │   │   └── specific/        # ObesityForm, ObesityChart, ResultCard
│   │   ├── contexts/            # AuthContext (state management auth)
│   │   ├── data/                # Data statis (rekomendasi, dll)
│   │   ├── hooks/               # Custom hooks (useAuth)
│   │   ├── pages/               # Home, Login, Register, Profile, CheckObesity
│   │   ├── services/            # API client (Axios instance + interceptor)
│   │   └── App.jsx              # Root component + routing
│   ├── .env                     # Environment variables frontend
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/              # Konfigurasi database, dll
│   │   ├── controllers/         # Auth, Profile, Obesity controllers
│   │   ├── middleware/          # Auth middleware, error handler
│   │   └── routes/              # Route definitions
│   ├── prisma/
│   │   └── schema.prisma        # Database schema
│   ├── index.js                 # Entry point server
│   └── package.json
│
└── README.md
```

## 🚀 Instalasi & Setup

### Prasyarat

Pastikan software berikut sudah terinstall di komputer Anda:

- **Node.js** v18 atau lebih baru — [Download](https://nodejs.org/)
- **npm** v9 atau lebih baru (biasanya sudah termasuk dengan Node.js)
- **PostgreSQL** v15+ — [Download](https://www.postgresql.org/download/)
- **Git** — [Download](https://git-scm.com/)

### 1. Clone Repository

```bash
git clone https://github.com/BimoIlham/nutri-track.git
cd nutri-track
```

### 2. Setup Database

Pastikan PostgreSQL sudah berjalan, lalu buat database baru melalui `psql` atau pgAdmin:

```sql
CREATE DATABASE nutritrack_local;
```

### 3. Setup Backend

```bash
cd backend

# Install dependencies
npm install
```

Buat file `backend/.env` dengan isi berikut:

```env
PORT=3001
DATABASE_URL="postgresql://postgres:<password>@localhost:5432/nutritrack_local"
JWT_SECRET="your-secret-key-here"
JWT_EXPIRES_IN=1h
REFRESH_TOKEN_SECRET="your-refresh-secret-key-here"
REFRESH_TOKEN_EXPIRES_IN=7d
CLIENT_URL="http://localhost:5173"
ML_API_URL="<url-ml-api-dari-tim>"
```

> **Catatan:** Sesuaikan `<password>`, username, dan nama database pada `DATABASE_URL` dengan konfigurasi PostgreSQL lokal Anda.

```bash
# Jalankan migrasi database
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate

# Jalankan backend
npm run dev
```

Backend akan berjalan di `http://localhost:3001`.

### 4. Setup Frontend

Buka terminal baru:

```bash
cd frontend

# Install dependencies
npm install

# Buat file environment
```

Buat file `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

```bash
# Jalankan frontend
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`.

### 5. Verifikasi Instalasi

Buka browser dan akses:

| URL | Expected |
|-----|----------|
| `http://localhost:5173` | Halaman beranda NutriTrack |
| `http://localhost:3001` | "NutriTrack API is running" |
| `http://localhost:3001/api/health` | JSON status kesehatan API |

## 📖 Penggunaan

### Alur Penggunaan Aplikasi

```
1. Register    ──▶  Buat akun dengan nama, email, dan password
       │
2. Login       ──▶  Masuk ke aplikasi
       │
3. Isi Profil  ──▶  Lengkapi data (usia, gender, tinggi, berat badan)
       │
4. Cek Obesitas ──▶  Isi form 16 parameter ──▶ Submit
       │
5. Lihat Hasil  ──▶  Prediksi, BMI, chart probabilitas, saran AI
       │
6. Riwayat     ──▶  Lihat kembali hasil prediksi sebelumnya
```

### Parameter Input Prediksi

| Parameter | Deskripsi | Range |
|-----------|-----------|-------|
| Age | Usia | 14 – 61 tahun |
| Height | Tinggi badan | 145 – 198 cm |
| Weight | Berat badan | 39 – 173 kg |
| Gender | Jenis kelamin | Male / Female |
| FCVC | Frekuensi konsumsi sayur | 1 – 5 |
| NCP | Jumlah makan utama per hari | 1 – 6 |
| CH2O | Konsumsi air per hari | 1 – 5 |
| FAF | Frekuensi aktivitas fisik per minggu | 0 – 7 |
| TUE | Waktu penggunaan gadget per hari (jam) | 0 – 12 |
| Family history | Riwayat obesitas keluarga | Yes / No |
| FAVC | Sering konsumsi makanan tinggi kalori | Yes / No |
| CAEC | Konsumsi makanan di antara waktu makan | Sometimes / Frequently / Always / No |
| SMOKE | Merokok | Yes / No |
| SCC | Memantau asupan kalori | Yes / No |
| CALC | Konsumsi alkohol | Sometimes / Frequently / Always / No |
| MTRANS | Transportasi utama | Walking / Bike / Motorbike / Public Transport / Automobile |

### Kategori Hasil Prediksi

| Kategori | Keterangan |
|----------|------------|
| Insufficient Weight | Berat badan kurang |
| Normal Weight | Berat badan normal |
| Overweight Level I | Kelebihan berat badan tingkat I |
| Overweight Level II | Kelebihan berat badan tingkat II |
| Obesity Type I | Obesitas tipe I |
| Obesity Type II | Obesitas tipe II |
| Obesity Type III | Obesitas tipe III |

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| `POST` | `/api/auth/register` | Registrasi akun baru | - |
| `POST` | `/api/auth/login` | Login dan dapatkan token | - |
| `POST` | `/api/auth/refresh` | Refresh access token | Cookie |
| `POST` | `/api/auth/logout` | Logout dan revoke token | Cookie |

### Profile
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| `GET` | `/api/profile` | Ambil data profil | Bearer Token |
| `PATCH` | `/api/profile` | Update data profil | Bearer Token |

### Obesity Prediction
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| `POST` | `/api/obesity/predict` | Prediksi tingkat obesitas | Bearer Token |
| `GET` | `/api/obesity/history` | Riwayat semua prediksi | Bearer Token |
| `GET` | `/api/obesity/history/:id` | Detail satu prediksi | Bearer Token |
| `DELETE` | `/api/obesity/history/:id` | Hapus satu prediksi | Bearer Token |

### Health Check
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| `GET` | `/api/health` | Status kesehatan API | - |

## 📊 Database Schema

```
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│      User        │       │  RefreshToken     │       │   Prediction     │
├──────────────────┤       ├──────────────────┤       ├──────────────────┤
│ id         (PK)  │──┐    │ id         (PK)  │       │ id         (PK)  │
│ name             │  │    │ hashedToken (UQ) │       │ userId     (FK)  │
│ email      (UQ)  │  ├───▶│ userId     (FK)  │       │ prediction       │
│ password         │  │    │ expiresAt        │       │ label            │
│ age              │  │    │ createdAt        │       │ confidence       │
│ gender           │  │    └──────────────────┘       │ bmi              │
│ weight           │  │                               │ probabilities    │
│ height           │  └──────────────────────────────▶│ aiAdvice         │
│ createdAt        │                                  │ createdAt        │
│ updatedAt        │                                  └──────────────────┘
└──────────────────┘
```

## 🔧 Scripts

### Backend

```bash
npm run dev      # Jalankan server dengan hot-reload (nodemon)
npm start        # Jalankan server untuk production
npm run build    # Generate Prisma Client
```

### Frontend

```bash
npm run dev      # Jalankan dev server Vite
npm run build    # Build untuk production
npm run preview  # Preview hasil build
npm run lint     # Jalankan ESLint
```

## 🤝 Tim Pengembang

Project ini dikembangkan oleh tim **Capstone DBS Foundation Coding Camp 2025**.

| Nama | Role |
|------|------|
| Bimo Ilham Heryansah | Frontend Developer |
| Dika Ramadhani | Backend Developer |
| Muhammad Syahid Nashrul Aziz | Data Scientist |
| Okta Nuzulifa | Data Scientist |
| Luiz Yosef Martua Raffles Nainggolan | AI Engineer |
| Halim Elsa Putra | AI Engineer |

## 📄 Lisensi

Project ini dikembangkan untuk keperluan Capstone sebagai bagian dari **DBS Foundation Coding Camp 2025**.

---

<p align="center">
  Dibuat dengan ❤️ oleh Tim NutriTrack — DBS Foundation Coding Camp 2025
