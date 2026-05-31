const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const prisma = require('../config/database');

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

const REFRESH_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 hari

// Fungsi untuk menangani pendaftaran user baru (Register)
const register = async (req, res, next) => {
  try {
    const { name, email, password, age, gender, weight, height } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
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

    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json({ user: userWithoutPassword });
  } catch (error) {
    next(error);
  }
};

// Fungsi untuk menangani masuknya user (Login)
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    // Pesan generik untuk mencegah user enumeration
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const refreshTokenValue = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });

    // Simpan hash refresh token di database untuk server-side revocation
    await prisma.refreshToken.create({
      data: {
        hashedToken: hashToken(refreshTokenValue),
        userId: user.id,
        expiresAt: new Date(Date.now() + REFRESH_MAX_AGE_MS),
      },
    });

    res.cookie('refreshToken', refreshTokenValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: REFRESH_MAX_AGE_MS,
    });

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({ token, user: userWithoutPassword });
  } catch (error) {
    next(error);
  }
};

// Fungsi untuk memperbarui access token menggunakan refresh token dari cookie
const refreshToken = async (req, res, next) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    return res.status(401).json({ message: 'Refresh token tidak ditemukan' });
  }

  // Pisahkan error JWT dari error database
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch {
    res.clearCookie('refreshToken');
    return res.status(401).json({ message: 'Refresh token tidak valid atau sudah expired' });
  }

  try {
    const hashed = hashToken(token);
    const storedToken = await prisma.refreshToken.findUnique({ where: { hashedToken: hashed } });

    // Token valid secara JWT tapi sudah di-revoke atau expired di sisi server
    if (!storedToken || storedToken.expiresAt < new Date()) {
      res.clearCookie('refreshToken');
      return res.status(401).json({ message: 'Refresh token sudah tidak valid' });
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      await prisma.refreshToken.deleteMany({ where: { hashedToken: hashed } });
      res.clearCookie('refreshToken');
      return res.status(401).json({ message: 'User tidak ditemukan' });
    }

    // Rotasi token: generate pair baru, hapus yang lama
    const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    const newRefreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });

    await prisma.refreshToken.update({
      where: { hashedToken: hashed },
      data: {
        hashedToken: hashToken(newRefreshToken),
        expiresAt: new Date(Date.now() + REFRESH_MAX_AGE_MS),
      },
    });

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: REFRESH_MAX_AGE_MS,
    });

    res.json({ token: newAccessToken });
  } catch (error) {
    next(error);
  }
};

// Fungsi untuk logout — hapus refresh token dari DB dan cookie
const logout = async (req, res, next) => {
  const token = req.cookies?.refreshToken;

  if (token) {
    try {
      await prisma.refreshToken.deleteMany({ where: { hashedToken: hashToken(token) } });
    } catch (error) {
      return next(error);
    }
  }

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  res.json({ message: 'Logout berhasil' });
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
};
