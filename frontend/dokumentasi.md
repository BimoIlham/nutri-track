# 🍏 NutriTrack - Dokumentasi Proyek

Dokumentasi ini dibuat untuk memudahkan tim (khususnya *Frontend* dan *Backend* developer) dalam memahami arsitektur, alur fitur, dan *tech stack* yang digunakan dalam proyek **NutriTrack**.

---

## 🏗️ Struktur Proyek (Monorepo)

Saat ini proyek diatur menggunakan struktur *monorepo* sederhana:

```text
nutri-track/
├── frontend/     # Aplikasi React (Vite)
├── backend/      # (Akan dibuat oleh tim Backend)
└── dokumentasi.md
```

---

## 🛠️ Tech Stack Frontend

Bagian frontend dibangun menggunakan teknologi modern yang fokus pada performa dan UI yang interaktif:
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 (Desain minimalis dengan tema *emerald/white*)
- **Routing**: React Router DOM (Client-side routing)
- **HTTP Client**: Axios (dengan *interceptors* untuk token JWT)
- **Data Visualization**: Recharts (Untuk grafik probabilitas obesitas)
- **Icons**: React Icons

---

## 📂 Struktur Direktori Frontend (`frontend/src/`)

- `pages/`: Berisi halaman utama aplikasi (`Home.jsx`, `Login.jsx`, `Register.jsx`, `CheckObesity.jsx`, `Profile.jsx`).
- `components/`: 
  - `common/`: Komponen yang dipakai berulang (Navbar, Footer, Button, Input, AlertModal, ProtectedRoute).
  - `specific/`: Komponen spesifik fitur (ObesityForm, ObesityChart, ResultCard).
- `contexts/`: Manajemen *state* global, saat ini menggunakan `AuthContext.jsx` untuk menyimpan data user dan token login.
- `services/`: Konfigurasi komunikasi ke backend (`api.js`).
- `data/`: Data statis atau konstanta (jika ada).
- `hooks/`: Custom React Hooks.

---

## 🔄 Alur Fitur Utama (Cek Obesitas)

Fitur utama aplikasi ini adalah memprediksi tingkat obesitas pengguna menggunakan model *Machine Learning* di backend. Berikut adalah alur data dari Frontend ke Backend:

1. **Input User**: Pengguna mengisi form di halaman `/check-obesity` (menggunakan komponen `ObesityForm.jsx`). Data yang diisi mencakup:
   - Berat Badan (kg)
   - Tinggi Badan (cm) -> *Frontend otomatis mengubahnya ke satuan Meter (m) sebelum dikirim ke backend.*
   - Fitur-fitur kebiasaan gaya hidup lainnya (seperti *family history*, *FAVC*, *FCVC*, *NCP*, *SMOKE*, dll).
2. **Proses Request**: Saat disubmit, Frontend (melalui `api.js`) mengirimkan request `POST` ke endpoint `/obesity/predict` milik backend dengan menyertakan JWT token di *header*.
3. **Respons Backend**: Backend diharapkan memproses data melalui model ML dan mengembalikan respons JSON dengan format:
   ```json
   {
     "prediction": "Obesity_Type_I",
     "probabilities": {
       "Insufficient_Weight": 0.05,
       "Normal_Weight": 0.05,
       "Overweight_Level_I": 0.1,
       "Overweight_Level_II": 0.05,
       "Obesity_Type_I": 0.8,
       "Obesity_Type_II": 0.05,
       "Obesity_Type_III": 0.0
     }
   }
   ```
4. **Visualisasi**: 
   - Komponen `ResultCard.jsx` akan menampilkan teks tingkat obesitas.
   - Komponen `ObesityChart.jsx` (menggunakan Recharts) akan menampilkan grafik probabilitas untuk setiap kategori.

---

## 🔌 Kebutuhan API (Untuk Tim Backend)

Untuk memastikan frontend dapat berjalan dengan sempurna tanpa menampilkan *mock data*, tim Backend perlu menyiapkan beberapa *endpoint* berikut:

### 1. Authentication
Frontend menyimpan token menggunakan *Local Storage* dan mengirimkannya sebagai `Bearer Token` di *Authorization Header*.
- `POST /api/auth/register` : Mendaftarkan user baru.
- `POST /api/auth/login` : Login dan mengembalikan data user beserta `token` JWT.

### 2. Prediksi Obesitas
- `POST /api/obesity/predict` : 
  - **Request Body**: JSON berisi fitur-fitur kesehatan (termasuk `Weight` dan `Height` dalam meter).
  - **Response**: JSON berisi `prediction` (string klasifikasi) dan `probabilities` (objek key-value probabilitas).

### 3. (Opsional) Profil User
- `GET /api/user/profile` : Mengambil data detail user dan *history* pengecekan obesitas untuk ditampilkan di halaman Profile.

> **Catatan untuk Backend**: Pastikan untuk mengaktifkan **CORS (Cross-Origin Resource Sharing)** agar frontend (misal berjalan di `http://localhost:5173`) dapat melakukan request ke server backend (misal `http://localhost:3000`) tanpa diblokir oleh browser. Basis URL backend saat ini diatur di frontend lewat *environment variable* `VITE_API_BASE_URL`.

---
*Dokumentasi ini bersifat dinamis dan dapat terus diperbarui seiring berjalannya proses pengembangan proyek.*
