const express = require('express');
const {
  predict,
  getHistory,
  getHistoryDetail,
  deleteHistory,
} = require('../controllers/obesityController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/predict', authMiddleware, predict);
router.get('/history', authMiddleware, getHistory);
router.get('/history/:id', authMiddleware, getHistoryDetail);
router.delete('/history/:id', authMiddleware, deleteHistory);

module.exports = router;
