# Status Pengerjaan NutriTrack Backend

Dokumen ini mencatat fitur-fitur yang sudah selesai dibangun dan berhasil berjalan.

---

## Fitur yang Sudah Selesai

### 1. Autentikasi (Auth System)
**Status: Selesai**

- Register user baru dengan hashing password menggunakan `bcryptjs`
- Login user dengan verifikasi password dan generate JWT token
- JWT middleware untuk proteksi endpoint (Bearer Token)
- Password tidak pernah dikembalikan ke client

**Endpoint:**
| Method | URL | Keterangan |
|--------|-----|------------|
| POST | `/api/auth/register` | Daftar akun baru |
| POST | `/api/auth/login` | Login dan dapat token |
| GET | `/api/auth/profile` | Ambil profil (alias, butuh token) |

---

### 2. Profil User (Profile System)
**Status: Selesai**

- Ambil data profil user yang sedang login
- Update sebagian atau seluruh data profil (name, email, password, age, gender, weight, height)
- Validasi duplikasi email saat update
- Method `PATCH` untuk partial update

**Endpoint:**
| Method | URL | Keterangan |
|--------|-----|------------|
| GET | `/api/profile` | Ambil data profil (butuh token) |
| PATCH | `/api/profile` | Update profil (butuh token) |

---

### 3. Prediksi Obesitas (Obesity Prediction)
**Status: Selesai**

- Validasi 16 field wajib sebelum dikirim ke ML API
- Validasi rentang nilai (usia, tinggi, berat, dll.)
- Transform payload dari format frontend ke format yang dibutuhkan ML API
- Kirim data ke ML API eksternal (`ML_API_URL`) via `axios`
- Simpan hasil prediksi ke database (tabel `Prediction`)
- Kembalikan hasil prediksi + saran AI ke client

**Endpoint:**
| Method | URL | Keterangan |
|--------|-----|------------|
| POST | `/api/obesity/predict` | Kirim data dan dapat hasil prediksi (butuh token) |
| GET | `/api/obesity/history` | Riwayat semua prediksi user (butuh token) |
| GET | `/api/obesity/history/:id` | Detail satu prediksi (butuh token) |
| DELETE | `/api/obesity/history/:id` | Hapus satu prediksi (butuh token) |

---

### 4. Health Check
**Status: Selesai**

- Cek status API, database, dan ML service sekaligus
- Return `200` jika semua sehat, `503` jika ada yang down

**Endpoint:**
| Method | URL | Keterangan |
|--------|-----|------------|
| GET | `/api/health` | Cek status semua layanan |

---

### 5. Database Schema (Prisma + PostgreSQL)
**Status: Selesai**

Dua tabel telah dibuat dan migrasi sudah dijalankan:

- **`User`** — menyimpan data akun dan data fisik user
- **`Prediction`** — menyimpan riwayat hasil prediksi, terhubung ke `User` (cascade delete)

Migrasi yang sudah dijalankan:
1. `20260503141321_table_user` — membuat tabel User
2. `20260527104407_add_prediction_model` — membuat tabel Prediction

---

### 6. Middleware & Error Handling
**Status: Selesai**

- `authMiddleware` — verifikasi JWT, attach `req.user` untuk controller berikutnya
- `errorHandler` — global error handler untuk semua unhandled error
- Handler untuk route tidak ditemukan (404)

---

### 7. Integrasi Frontend
**Status: Selesai**

- `AuthContext.jsx` — fungsi `login`, `register`, dan `updateProfile` sudah terhubung ke API backend (bukan mock lagi)
- `CheckObesity.jsx` — konversi unit tinggi badan (cm → meter) sudah dihapus, sesuai format yang diterima backend

---

### 8. Testing Manual via Postman
**Status: Selesai**

- Seluruh endpoint sudah diuji via Postman
- Postman environment variables sudah dikonfigurasi (base URL dan token)
- Endpoint yang sudah diverifikasi: auth (register, login), profile (GET, PATCH), obesity (predict, history, history detail, delete), health check

---

## Yang Belum Selesai

Tidak ada item yang tertunda saat ini.

---

## Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| Runtime | Node.js |
| Framework | Express.js v5 |
| ORM | Prisma |
| Database | PostgreSQL |
| Auth | JWT (`jsonwebtoken`) + `bcryptjs` |
| HTTP Client | Axios |
| Dev Server | Nodemon |
| Container | Docker (docker-compose) |
