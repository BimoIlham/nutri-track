# API Reference — NutriTrack Backend

Base URL: `http://localhost:3001`

Semua endpoint yang membutuhkan autentikasi harus menyertakan header:
```
Authorization: Bearer <token>
```

---

## Auth

### POST `/api/auth/register`
Daftarkan akun baru.

**Request Body:**
```json
{
  "name": "Budi",
  "email": "budi@mail.com",
  "password": "rahasia123",
  "age": 25,
  "gender": "Male",
  "weight": 70,
  "height": 170
}
```
`name`, `email`, `password` wajib. Sisanya opsional.

**Response 201:**
```json
{
  "token": "<jwt_token>",
  "user": { "id": "...", "name": "Budi", "email": "budi@mail.com", ... }
}
```

---

### POST `/api/auth/login`
Login dan dapatkan JWT token.

**Request Body:**
```json
{
  "email": "budi@mail.com",
  "password": "rahasia123"
}
```

**Response 200:**
```json
{
  "token": "<jwt_token>",
  "user": { "id": "...", "name": "Budi", ... }
}
```

---

## Profile
*Semua endpoint butuh token.*

### GET `/api/profile`
Ambil data profil user yang sedang login.

**Response 200:**
```json
{
  "user": {
    "id": "...",
    "name": "Budi",
    "email": "budi@mail.com",
    "age": 25,
    "gender": "Male",
    "weight": 70,
    "height": 170,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

### PATCH `/api/profile`
Update sebagian atau seluruh data profil. Minimal satu field harus dikirim.

**Request Body (semua opsional):**
```json
{
  "name": "Budi Santoso",
  "weight": 72,
  "height": 171
}
```

**Response 200:**
```json
{
  "message": "Profile updated successfully",
  "user": { ... }
}
```

---

## Obesity Prediction
*Semua endpoint butuh token.*

### POST `/api/obesity/predict`
Kirim data gaya hidup dan terima hasil prediksi tingkat obesitas.

**Request Body:**
```json
{
  "Gender": "Male",
  "Age": 25,
  "Height": 170,
  "Weight": 70,
  "family_history_with_overweight": "yes",
  "FAVC": "yes",
  "FCVC": 3,
  "NCP": 3,
  "CAEC": "Sometimes",
  "SMOKE": "no",
  "CH2O": 2,
  "SCC": "no",
  "FAF": 1,
  "TUE": 3,
  "CALC": "Sometimes",
  "MTRANS": "Public_Transportation"
}
```

Rentang nilai yang valid:
- `Age`: 14–61
- `Height`: 145–198 (cm)
- `Weight`: 39–173 (kg)
- `FCVC`: 1–5
- `NCP`: 1–6
- `CH2O`: 1–5
- `FAF`: 0–7
- `TUE`: 0–12
- `CAEC` / `CALC`: `no` | `Sometimes` | `Frequently` | `Always`
- `MTRANS`: `Automobile` | `Bike` | `Motorbike` | `Public_Transportation` | `Walking`

**Response 200:**
```json
{
  "id": "...",
  "prediction": "Obesity_Type_I",
  "label": "Obesitas Tipe I",
  "confidence": 0.87,
  "probabilities": { ... },
  "bmi": 24.2,
  "ai_advice": "Saran dari AI...",
  "advice_source": "gemini",
  "createdAt": "..."
}
```

---

### GET `/api/obesity/history`
Ambil semua riwayat prediksi milik user yang login.

**Response 200:**
```json
{
  "predictions": [
    {
      "id": "...",
      "prediction": "Obesity_Type_I",
      "label": "Obesitas Tipe I",
      "confidence": 0.87,
      "bmi": 24.2,
      "createdAt": "..."
    }
  ]
}
```

---

### GET `/api/obesity/history/:id`
Ambil detail satu prediksi berdasarkan ID.

**Response 200:**
```json
{
  "id": "...",
  "prediction": "Obesity_Type_I",
  "label": "Obesitas Tipe I",
  "confidence": 0.87,
  "bmi": 24.2,
  "probabilities": { ... },
  "ai_advice": "...",
  "createdAt": "..."
}
```

**Response 403:** Jika prediksi milik user lain.
**Response 404:** Jika prediksi tidak ditemukan.

---

### DELETE `/api/obesity/history/:id`
Hapus satu prediksi berdasarkan ID.

**Response 200:**
```json
{ "message": "Prediksi berhasil dihapus" }
```

---

## Health Check

### GET `/api/health`
Cek status semua layanan (API, database, ML service).

**Response 200 (semua sehat):**
```json
{
  "api": true,
  "database": true,
  "mlService": true
}
```

**Response 503 (ada yang down):**
```json
{
  "api": true,
  "database": true,
  "mlService": false
}
```
