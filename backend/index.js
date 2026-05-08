require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./src/routes/authRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

// Mengizinkan akses dari domain frontend (Vite)
app.use(cors({
  origin: 'http://localhost:5173', 
}));
app.use(express.json()); 

// Memetakan endpoint API ke fungsi controller yang sesuai
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);


app.get('/', (req, res) => {
  res.send('NutriTrack API is running');
});


app.use((req, res, next) => {
  res.status(404).json({
    message: "Oops! Alamat URL yang Anda cari tidak ditemukan.",
  });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Port berjalan pada localhost:${port}`);
});
