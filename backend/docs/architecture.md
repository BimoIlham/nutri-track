# Arsitektur Backend NutriTrack

## Struktur Folder

```
backend/
├── index.js                    # Entry point, setup Express + middleware + routes
├── prisma/
│   ├── schema.prisma           # Definisi model database (User, Prediction)
│   └── migrations/             # Riwayat migrasi database
│       ├── 20260503141321_table_user/
│       └── 20260527104407_add_prediction_model/
├── src/
│   ├── config/
│   │   └── database.js         # Inisialisasi Prisma Client (singleton)
│   ├── controllers/
│   │   ├── authController.js   # Logic register & login
│   │   ├── profileController.js # Logic getProfile & updateProfile
│   │   └── obesityController.js # Logic predict, history, health check
│   ├── middleware/
│   │   ├── auth.js             # Verifikasi JWT token
│   │   └── errorHandler.js     # Global error handler
│   └── routes/
│       ├── authRoutes.js       # Route /api/auth
│       ├── profileRoutes.js    # Route /api/profile
│       └── obesityRoutes.js    # Route /api/obesity
├── docs/                       # Dokumentasi proyek
│   ├── todo.md
│   ├── progress.md
│   ├── api-reference.md
│   └── architecture.md
├── .env                        # Variabel environment (tidak di-commit)
├── docker-compose.yaml         # Setup PostgreSQL via Docker
└── package.json
```

---

## Alur Request

```
Client (Frontend)
    |
    | HTTP Request + Bearer Token
    v
Express Router
    |
    | (jika butuh auth)
    v
authMiddleware  →  verifikasi JWT  →  attach req.user
    |
    v
Controller
    |
    |-- Validasi input
    |-- Query database via Prisma
    |-- (predict) Kirim ke ML API via axios
    |
    v
JSON Response
```

---

## Database

Menggunakan **PostgreSQL** yang dijalankan via Docker (`docker-compose.yaml`).

### Model User
```
id          String   (CUID, primary key)
name        String
email       String   (unique)
password    String   (bcrypt hash)
age         Int?
gender      String?
weight      Int?
height      Int?
createdAt   DateTime
updatedAt   DateTime
predictions Prediction[]
```

### Model Prediction
```
id            String   (CUID, primary key)
userId        String   (foreign key → User.id)
prediction    String   (kode label, e.g. "Obesity_Type_I")
label         String?  (label human-readable)
confidence    Float?
bmi           Float?
probabilities Json?
aiAdvice      String?  (text panjang)
createdAt     DateTime
```

Relasi: satu `User` bisa punya banyak `Prediction`. Jika user dihapus, semua prediksinya ikut terhapus (`onDelete: Cascade`).

---

## Environment Variables

| Variable | Keterangan |
|----------|------------|
| `DATABASE_URL` | Connection string PostgreSQL |
| `JWT_SECRET` | Secret key untuk signing JWT |
| `JWT_EXPIRES_IN` | Durasi token (contoh: `7d`) |
| `ML_API_URL` | Base URL ML service (contoh: `http://localhost:8000`) |
| `PORT` | Port server Express (default: `3001`) |
