const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/database');

// Fungsi untuk menangani pendaftaran user baru (Register)
const register = async (req, res, next) => {
  try {
    const { name, email, password, age, gender, weight, height } = req.body;

    // 1. Validasi input: Memastikan name, email, dan password telah diisi
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    // 2. Cek duplikasi: Memastikan email belum terdaftar di database
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // 3. Hash Password: Mengamankan password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Simpan User: Membuat record baru di database menggunakan Prisma
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        age: age ? parseInt(age) : null,
        gender,
        weight: weight ? parseInt(weight) : null,
        height: height ? parseInt(height) : null,
      },
    });

    // 5. Generate Token: Membuat token JWT untuk sesi login otomatis setelah register
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // 6. Response: Menghapus password dari data yang dikirim balik ke client
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    // Melemparkan error ke global error handler
    next(error);
  }
};

// Fungsi untuk menangani masuknya user (Login)
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Validasi input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // 2. Cari User: Mencari user di database berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Jika user tidak ditemukan
    if (!user) {
      return res.status(401).json({ message: 'EMAIL_NOT_FOUND' });
    }

    // 3. Verifikasi Password: Membandingkan password input dengan password hash di database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'INVALID_PASSWORD' });
    }

    // 4. Generate Token: access token + refresh token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });

    // 5. Simpan refresh token di httpOnly cookie (tidak bisa diakses JS)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
    });

    // 6. Response: Kirim access token dan data user (tanpa password)
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

// Fungsi untuk memperbarui access token menggunakan refresh token dari cookie
const refreshToken = async (req, res) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    return res.status(401).json({ message: 'Refresh token tidak ditemukan' });
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return res.status(401).json({ message: 'User tidak ditemukan' });
    }

    const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({ token: newAccessToken });
  } catch {
    res.clearCookie('refreshToken');
    return res.status(401).json({ message: 'Refresh token tidak valid atau sudah expired' });
  }
};

// Fungsi untuk logout — hapus refresh token cookie
const logout = (req, res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.json({ message: 'Logout berhasil' });
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
};
