const bcrypt = require('bcryptjs');
const prisma = require('../config/database');

const getProfile = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        gender: true,
        weight: true,
        height: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, email, password, age, gender, weight, height } = req.body;

    if (!name && !email && !password && age === undefined && !gender && weight === undefined && height === undefined) {
      return res.status(400).json({ message: 'At least one field is required to update' });
    }

    if (email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser && existingUser.id !== req.user.id) {
        return res.status(400).json({ message: 'Email already in use by another account' });
      }
    }

    const data = {};
    if (name) data.name = name;
    if (email) data.email = email;
    if (password) data.password = await bcrypt.hash(password, 10);
    if (age !== undefined) data.age = age !== null ? parseInt(age) : null;
    if (gender !== undefined) data.gender = gender;
    if (weight !== undefined) data.weight = weight !== null ? parseInt(weight) : null;
    if (height !== undefined) data.height = height !== null ? parseInt(height) : null;

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        gender: true,
        weight: true,
        height: true,
        createdAt: true,
        updatedAt: true,
      },
      data,
    });

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
