# Plan Integrasi Frontend ↔ Backend

Dokumen ini berisi rencana penyelesaian frontend agar semua fitur terhubung penuh ke backend dan siap digunakan user.

---

## Status Saat Ini

### Yang Sudah Jadi dan Berfungsi

| Komponen | File | Keterangan |
|----------|------|------------|
| Landing Page | `pages/Home.jsx` | Lengkap, responsive, auth-aware (tombol berubah sesuai status login) |
| Login | `pages/Login.jsx` | Terhubung ke `POST /api/auth/login` via AuthContext |
| Register | `pages/Register.jsx` | Terhubung ke `POST /api/auth/register` via AuthContext |
| Profil | `pages/Profile.jsx` | GET profil + PATCH update profil sudah terhubung, riwayat prediksi sudah fetch `GET /api/obesity/history` |
| Cek Obesitas | `pages/CheckObesity.jsx` | Form 16 field sudah ada, submit ke `POST /api/obesity/predict` |
| Axios Instance | `services/api.js` | Interceptor JWT token + auto redirect 401 |
| Auth Context | `contexts/AuthContext.jsx` | login, register, logout, fetchProfile, updateProfile — semua sudah pakai API |
| ProtectedRoute | `components/common/ProtectedRoute.jsx` | Guard route `/profile` dan `/cek-obesitas` |
| Navbar | `components/common/Navbar.jsx` | Auth-aware, responsive, hamburger menu |
| Footer, Button, Input, AlertModal | `components/common/` | Reusable, sudah dipakai di semua halaman |
| ObesityForm | `components/specific/ObesityForm.jsx` | 16 field sesuai dataset, validasi client-side |
| ObesityChart | `components/specific/ObesityChart.jsx` | Bar chart probabilitas via Recharts |
| ResultCard | `components/specific/ResultCard.jsx` | Tampilkan status + rekomendasi diet/olahraga/medis dari `recommendationData.js` |
| Rekomendasi Data | `data/recommendationData.js` | 7 kelas obesitas lengkap dengan saran diet, olahraga, medis |

### Yang Perlu Diperbaiki

Berikut masalah nyata yang ditemukan dari hasil scanning kode:

---

## Task 1: Fix Base URL di `services/api.js`

**File:** `src/services/api.js` baris 3

**Masalah:** Fallback masih `http://localhost:3000/api`, padahal backend sudah di port `3001`.

```js
// SEKARANG (salah)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// HARUS
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
```

**Catatan:** Idealnya buat file `.env` di root frontend dengan isi:
```
VITE_API_BASE_URL=http://localhost:3001/api
```

---

## Task 2: Hapus Mock/Fallback Data di `CheckObesity.jsx`

**File:** `src/pages/CheckObesity.jsx` baris 27-60

**Masalah:** Ada blok `try/catch` yang menangkap error API lalu menampilkan mock data palsu. Ini berbahaya karena user bisa melihat hasil prediksi yang tidak nyata tanpa sadar backend-nya down.

```js
// HAPUS BLOK INI (baris 27-60):
} catch (apiErr) {
    console.warn('Backend API unreachable. Using MOCK data for UI demonstration.', apiErr);
    await new Promise(resolve => setTimeout(resolve, 1500));
    // ... semua mock BMI calculation dan predictionData palsu
}
```

**Ganti dengan:** Langsung throw error agar ditangkap oleh catch luar dan ditampilkan sebagai alert error ke user.

---

## Task 3: Tampilkan Data Lengkap Hasil Prediksi

**File:** `src/pages/CheckObesity.jsx` baris 62-65

**Masalah:** Setelah API berhasil, hanya `prediction` dan `probabilities` yang disimpan ke state. Padahal backend juga mengirim `label`, `confidence`, `bmi`, dan `ai_advice` yang tidak ditampilkan.

```js
// SEKARANG (kurang lengkap)
setResult({
    prediction: predictionData.prediction,
    probabilities: predictionData.probabilities,
});

// HARUS
setResult({
    prediction: predictionData.prediction,
    label: predictionData.label,
    confidence: predictionData.confidence,
    bmi: predictionData.bmi,
    probabilities: predictionData.probabilities,
    ai_advice: predictionData.ai_advice,
});
```

Lalu tampilkan informasi tambahan ini di halaman hasil (di bawah chart/ResultCard). Misalnya:
- **BMI** dan **Confidence** dalam badge/card kecil
- **AI Advice** dari Gemini dalam card tersendiri

---

## Task 4: Validasi Rentang di ObesityForm Sesuai Backend

**File:** `src/components/specific/ObesityForm.jsx` baris 48-84

**Masalah:** Rentang `min`/`max` pada form tidak sama dengan yang divalidasi backend:

| Field | Form (sekarang) | Backend (seharusnya) |
|-------|-----------------|---------------------|
| FCVC | 1–3 | 1–5 |
| NCP | 1–4 | 1–6 |
| CH2O | 1–3 | 1–5 |
| FAF | 0–3 | 0–7 |
| TUE | 0–2 | 0–12 |

Label form juga perlu disesuaikan agar user tidak bingung. Contoh:
- `"Frekuensi Konsumsi Sayur (1-3)"` → `"Frekuensi Konsumsi Sayur (1-5)"`

---

## Task 5: Sinkronkan Gender Value antara Register/Profile dan ObesityForm

**File:** `src/pages/Register.jsx`, `src/pages/Profile.jsx`, `src/components/specific/ObesityForm.jsx`

**Masalah:**
- Register dan Profile menyimpan gender sebagai `"L"` / `"P"`
- ObesityForm mengirim gender sebagai `"Male"` / `"Female"` (sesuai kebutuhan ML API)
- Backend `obesityController.js` mengharapkan `"Male"` / `"Female"` untuk field `Gender` di predict

Ini **bukan bug** karena kedua form (profile vs predict) memang kirim ke endpoint yang berbeda. Tapi perlu dipastikan:
- Register/Profile tetap pakai `"L"` / `"P"` → disimpan di tabel User
- ObesityForm tetap pakai `"Male"` / `"Female"` → dikirim ke endpoint predict

**Status:** Sudah benar, tidak perlu diubah. Hanya perlu dipahami agar tidak salah "fix".

---

## Task 6: Update `dokumentasi.md` yang Outdated

**File:** `dokumentasi.md` (root frontend)

**Masalah:** Dokumentasi ini ditulis sebelum backend jadi dan sudah tidak akurat:
- Masih menyebut backend "(Akan dibuat oleh tim Backend)"
- Masih menyebut "Height dalam meter" (sudah diubah ke cm)
- Masih menyebut port `3000`
- Endpoint profil masih `/api/user/profile` (seharusnya `/api/profile`)
- Belum mencakup fitur history dan health check

**Aksi:** Perbarui dokumentasi sesuai kondisi terkini, atau hapus dan ganti dengan versi yang akurat.

---

## Ringkasan Urutan Pengerjaan

| No | Task | Prioritas | Estimasi |
|----|------|-----------|----------|
| 1 | Fix Base URL fallback ke `3001` | Kritis | 1 menit |
| 2 | Hapus mock data di CheckObesity | Kritis | 5 menit |
| 3 | Tampilkan data lengkap hasil prediksi (BMI, confidence, AI advice) | Tinggi | 15–30 menit |
| 4 | Sinkronkan rentang validasi form dengan backend | Sedang | 10 menit |
| 5 | (Tidak perlu diubah — hanya catatan) | — | — |
| 6 | Update `dokumentasi.md` yang outdated | Rendah | 10 menit |

---

## Setelah Semua Task Selesai

- Jalankan backend (`npm run dev` di folder backend, port 3001)
- Jalankan frontend (`npm run dev` di folder frontend, port 5173)
- Test end-to-end: Register → Login → Cek Obesitas → Lihat Hasil → Lihat Riwayat di Profile
- Pastikan tidak ada mock data yang muncul
- Pastikan semua error dari backend ditampilkan dengan benar ke user
