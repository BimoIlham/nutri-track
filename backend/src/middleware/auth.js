const jwt = require('jsonwebtoken');
const prisma = require('../config/database');

// Middleware untuk memverifikasi token JWT dari header Authorization
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Cek apakah header Authorization tersedia dan berformat "Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Mengambil token saja tanpa kata "Bearer "
  const token = authHeader.split(' ')[1];

  try {
    // Memverifikasi validitas token menggunakan JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Mencari data user di database berdasarkan ID yang ada di dalam token
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    // Jika user tidak ditemukan, return error
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    // Menyimpan data user ke dalam objek request agar bisa digunakan oleh controller selanjutnya
    req.user = user;
    next();
  } catch (error) {
    // Jika token tidak valid atau expired, return error 401
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;
