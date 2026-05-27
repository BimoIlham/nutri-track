# TODO — NutriTrack Backend

Daftar tugas pengerjaan backend. Diperbarui sesuai progres.

---

## Selesai

### Setup & Konfigurasi
- [x] Setup auth system dengan Prisma dan JWT
- [x] Setup profile system dengan Prisma dan JWT
- [x] Tambah `ML_API_URL` ke file `.env`
- [x] Install dependency `axios`

### Database
- [x] Update Prisma schema — tambah model `Prediction` (dengan field `probabilities Json?`)
- [x] Jalankan migrasi `20260503141321_table_user` — buat tabel User
- [x] Jalankan migrasi `20260527104407_add_prediction_model` — buat tabel Prediction

### Backend — Controllers & Routes
- [x] Buat `obesityController.js` — fungsi `predict`, `getHistory`, `getHistoryDetail`, `deleteHistory`, `healthCheck`
- [x] Buat `obesityRoutes.js` — endpoint `POST /predict`, `GET /history`, `GET /history/:id`, `DELETE /history/:id`
- [x] Daftarkan `obesityRoutes` dan `GET /api/health` di `index.js`
- [x] Fix `authRoutes.js` — tambah `GET /profile` agar frontend tidak 404

### Integrasi Frontend
- [x] Ganti mock di `AuthContext.jsx` — fungsi `login`, `register`, `updateProfile` sudah terhubung ke API
- [x] Fix unit tinggi badan di `CheckObesity.jsx` — hapus konversi cm → meter (sudah dikirim dalam cm)

### Testing
- [x] Testing manual seluruh endpoint (auth, profile, predict, history) via Postman
- [x] Setup Postman environment variables untuk base URL dan token

---

## Belum Selesai

Tidak ada item yang tertunda saat ini.

---

## Catatan

- Semua endpoint yang membutuhkan autentikasi dijaga oleh `authMiddleware` (JWT Bearer Token)
- Nilai environment variable (DATABASE_URL, JWT_SECRET, dll.) disimpan di `.env` dan **tidak boleh di-commit**
- Pastikan file `.env` masuk ke `.gitignore` sebelum push
