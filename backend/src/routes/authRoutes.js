const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Memetakan endpoint API ke fungsi controller yang sesuai
router.post('/register', register);
router.post('/login', login);

module.exports = router;
