# NutriTrack - Dokumentasi Frontend

Dokumen ini menjelaskan kondisi frontend NutriTrack saat ini, cara frontend terhubung ke backend, dan endpoint yang dipakai aplikasi.

## Struktur Proyek

```text
nutri-track/
|-- frontend/     # Aplikasi React + Vite
`-- backend/      # API Express + Prisma + PostgreSQL
```

## Tech Stack Frontend

- React 19 + Vite
- Tailwind CSS v4
- React Router DOM
- Axios untuk HTTP client
- Recharts untuk grafik probabilitas prediksi
- React Icons untuk ikon UI

## Struktur Direktori Frontend

```text
frontend/src/
|-- components/
|   |-- common/      # Navbar, Footer, Button, Input, AlertModal, ProtectedRoute
|   `-- specific/    # ObesityForm, ObesityChart, ResultCard
|-- contexts/        # AuthContext
|-- data/            # recommendationData
|-- hooks/           # Custom hooks
|-- pages/           # Home, Login, Register, Profile, CheckObesity
`-- services/        # api.js
```

## Environment Frontend

Frontend membaca alamat backend dari `frontend/.env`.

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

Jika env tidak tersedia, `src/services/api.js` memakai fallback:

```js
http://localhost:3001/api
```

Jangan menaruh secret backend seperti `DATABASE_URL`, `JWT_SECRET`, atau credential Supabase di env frontend.

## Routing Halaman

- `/` - Landing page
- `/login` - Login user
- `/register` - Registrasi user
- `/profile` - Profil user dan riwayat prediksi, protected route
- `/cek-obesitas` - Form prediksi obesitas, protected route

## Alur Auth

1. User register atau login lewat frontend.
2. Frontend mengirim request ke backend:
   - `POST /api/auth/register`
   - `POST /api/auth/login`
3. Backend mengembalikan `token` dan data `user`.
4. Frontend menyimpan token di `localStorage` dengan key `nutritrack_token`.
5. Axios interceptor di `src/services/api.js` otomatis menambahkan header:

```text
Authorization: Bearer <token>
```

Jika backend mengembalikan status `401`, frontend menghapus token dan mengarahkan user ke `/login`.

## Alur Cek Obesitas

1. User membuka `/cek-obesitas`.
2. User mengisi 16 field di `ObesityForm.jsx`.
3. Frontend mengirim data ke:

```text
POST /api/obesity/predict
```

4. Tinggi badan dikirim dalam cm, sesuai kontrak backend.
5. Backend memanggil ML API, menyimpan hasil ke database, lalu mengembalikan hasil prediksi.
6. Frontend menampilkan:
   - `prediction`
   - `label`
   - `confidence`
   - `bmi`
   - `probabilities`
   - `ai_advice`

Tidak ada mock prediction di frontend. Jika backend atau ML API gagal, frontend menampilkan alert error.

## Validasi Form Obesitas

Range numeric frontend mengikuti validasi backend:

| Field | Range |
|-------|-------|
| `Age` | 14-61 tahun |
| `Height` | 145-198 cm |
| `Weight` | 39-173 kg |
| `FCVC` | 1-5 |
| `NCP` | 1-6 |
| `CH2O` | 1-5 |
| `FAF` | 0-7 |
| `TUE` | 0-12 |

Gender untuk endpoint prediksi memakai:

```text
Male / Female
```

Gender untuk profil user tetap memakai:

```text
L / P
```

Keduanya sengaja berbeda karena endpoint dan kebutuhan datanya berbeda.

## Endpoint Backend yang Dipakai Frontend

Base URL lokal:

```text
http://localhost:3001/api
```

### Auth

- `POST /auth/register` - Register user baru
- `POST /auth/login` - Login user
- `GET /auth/profile` - Ambil profil user login

### Profile

- `GET /profile` - Ambil profil user login
- `PATCH /profile` - Update profil user

### Obesity

- `POST /obesity/predict` - Prediksi tingkat obesitas
- `GET /obesity/history` - Ambil riwayat prediksi
- `GET /obesity/history/:id` - Ambil detail prediksi
- `DELETE /obesity/history/:id` - Hapus prediksi

### Health

- `GET /health` - Cek status API, database, dan ML service

## Cara Menjalankan Lokal

Backend:

```powershell
cd C:\Code\nutri-track\backend
docker compose up -d
npm run dev
```

Frontend:

```powershell
cd C:\Code\nutri-track\frontend
npm run dev
```

URL lokal:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:3001
```
