const express = require('express');
const { register, login, refreshToken, logout } = require('../controllers/authController');
const { getProfile } = require('../controllers/profileController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/logout', logout);
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
