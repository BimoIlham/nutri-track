const axios = require('axios');
const prisma = require('../config/database');

const FREQUENCY_MAP = { no: 0, Sometimes: 1, Frequently: 2, Always: 3 };
const TRANSPORT_MAP = {
  Automobile: 0,
  Bike: 1,
  Motorbike: 2,
  Public_Transportation: 3,
  Walking: 4,
};

const REQUIRED_FIELDS = [
  'Gender', 'Age', 'Height', 'Weight',
  'family_history_with_overweight', 'FAVC', 'FCVC', 'NCP',
  'CAEC', 'SMOKE', 'CH2O', 'SCC', 'FAF', 'TUE', 'CALC', 'MTRANS',
];

function validateRange(body) {
  const errors = [];
  const age    = Number(body.Age);
  const height = Number(body.Height);
  const weight = Number(body.Weight);
  const fcvc   = Number(body.FCVC);
  const ncp    = Number(body.NCP);
  const ch2o   = Number(body.CH2O);
  const faf    = Number(body.FAF);
  const tue    = Number(body.TUE);

  if (age < 14 || age > 61)          errors.push('Usia harus antara 14–61 tahun');
  if (height < 145 || height > 198)  errors.push('Tinggi badan harus antara 145–198 cm');
  if (weight < 39 || weight > 173)   errors.push('Berat badan harus antara 39–173 kg');
  if (fcvc < 1 || fcvc > 5)          errors.push('Frekuensi sayur harus antara 1–5');
  if (ncp < 1 || ncp > 6)            errors.push('Jumlah makan utama harus antara 1–6');
  if (ch2o < 1 || ch2o > 5)          errors.push('Konsumsi air harus antara 1–5');
  if (faf < 0 || faf > 7)            errors.push('Frekuensi olahraga harus antara 0–7');
  if (tue < 0 || tue > 12)           errors.push('Waktu pakai gadget harus antara 0–12');

  return errors;
}

function transformPayload(body) {
  return {
    gender:          body.Gender === 'Male' ? 1 : 0,
    age:             Number(body.Age),
    height:          Number(body.Height),
    weight:          Number(body.Weight),
    family_history:  body.family_history_with_overweight === 'yes' ? 1 : 0,
    high_cal_food:   body.FAVC === 'yes' ? 1 : 0,
    veg_freq:        Number(body.FCVC),
    meals_day:       Number(body.NCP),
    snack:           FREQUENCY_MAP[body.CAEC] ?? 0,
    smoking:         body.SMOKE === 'yes' ? 1 : 0,
    water:           Number(body.CH2O),
    cal_monitoring:  body.SCC === 'yes' ? 1 : 0,
    faf:             Number(body.FAF),
    tue:             Number(body.TUE),
    alcohol:         FREQUENCY_MAP[body.CALC] ?? 0,
    transport:       TRANSPORT_MAP[body.MTRANS] ?? 0,
  };
}

const predict = async (req, res, next) => {
  try {
    const body = req.body;

    const missing = REQUIRED_FIELDS.filter(f => body[f] === undefined || body[f] === '');
    if (missing.length > 0) {
      return res.status(400).json({
        message: 'Field berikut wajib diisi',
        missingFields: missing,
      });
    }

    const rangeErrors = validateRange(body);
    if (rangeErrors.length > 0) {
      return res.status(400).json({
        message: 'Data di luar rentang yang diizinkan',
        errors: rangeErrors,
      });
    }

    const mlPayload = transformPayload(body);

    const mlResponse = await axios.post(
      `${process.env.ML_API_URL}/predict`,
      mlPayload,
      { timeout: 30000 }
    );

    const result = mlResponse.data;

    const prediction = await prisma.prediction.create({
      data: {
        userId:        req.user.id,
        prediction:    result.prediction,
        label:         result.label,
        confidence:    result.confidence,
        bmi:           result.bmi,
        probabilities: result.probabilities,
        aiAdvice:      result.ai_advice,
      },
    });

    res.status(200).json({
      id:            prediction.id,
      prediction:    result.prediction,
      label:         result.label,
      confidence:    result.confidence,
      probabilities: result.probabilities,
      bmi:           result.bmi,
      ai_advice:     result.ai_advice,
      advice_source: result.advice_source,
      createdAt:     prediction.createdAt,
    });

  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({
        message: 'ML API error',
        detail: error.response.data.detail || error.response.data,
      });
    }
    if (error.code === 'ECONNABORTED') {
      return res.status(504).json({
        message: 'ML API tidak merespons. Silakan coba lagi.',
      });
    }
    next(error);
  }
};

const getHistory = async (req, res, next) => {
  try {
    const predictions = await prisma.prediction.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        prediction: true,
        label: true,
        confidence: true,
        bmi: true,
        createdAt: true,
      },
    });

    res.status(200).json({ predictions });
  } catch (error) {
    next(error);
  }
};

const getHistoryDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const prediction = await prisma.prediction.findUnique({
      where: { id },
    });

    if (!prediction) {
      return res.status(404).json({ message: 'Prediksi tidak ditemukan' });
    }

    if (prediction.userId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.status(200).json({
      id:            prediction.id,
      prediction:    prediction.prediction,
      label:         prediction.label,
      confidence:    prediction.confidence,
      bmi:           prediction.bmi,
      probabilities: prediction.probabilities,
      ai_advice:     prediction.aiAdvice,
      createdAt:     prediction.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

const deleteHistory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const prediction = await prisma.prediction.findUnique({
      where: { id },
    });

    if (!prediction) {
      return res.status(404).json({ message: 'Prediksi tidak ditemukan' });
    }

    if (prediction.userId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await prisma.prediction.delete({ where: { id } });

    res.status(200).json({ message: 'Prediksi berhasil dihapus' });
  } catch (error) {
    next(error);
  }
};

const healthCheck = async (req, res) => {
  const status = { api: true, database: false, mlService: false };

  try {
    await prisma.$queryRaw`SELECT 1`;
    status.database = true;
  } catch {
    status.database = false;
  }

  try {
    const mlRes = await axios.get(`${process.env.ML_API_URL}/health`, { timeout: 5000 });
    status.mlService = mlRes.data.model_loaded === true;
  } catch {
    status.mlService = false;
  }

  const allHealthy = status.database && status.mlService;
  res.status(allHealthy ? 200 : 503).json(status);
};

module.exports = { predict, getHistory, getHistoryDetail, deleteHistory, healthCheck };
