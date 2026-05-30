import { useState } from 'react';
import api from '../services/api';
import ObesityForm from '../components/specific/ObesityForm';
import ObesityChart from '../components/specific/ObesityChart';
import ResultCard from '../components/specific/ResultCard';
import AlertModal from '../components/common/AlertModal';
import {
  FiActivity,
  FiBarChart2,
  FiCheckCircle,
  FiClipboard,
  FiMessageCircle,
  FiSend,
} from 'react-icons/fi';

const WORKFLOW = [
  'Isi form',
  'Analisis',
  'Simpan hasil',
];

function formatPercentage(value) {
  return typeof value === 'number' ? `${(value * 100).toFixed(1)}%` : '-';
}

function formatBmi(value) {
  return typeof value === 'number' ? value.toFixed(1) : '-';
}

function getPredictionErrorMessage(error) {
  const responseData = error.response?.data;

  if (responseData?.detail) {
    return typeof responseData.detail === 'string'
      ? responseData.detail
      : JSON.stringify(responseData.detail);
  }

  if (responseData?.errors?.length) {
    return responseData.errors.join(', ');
  }

  return responseData?.message || error.message || 'Terjadi kesalahan saat memproses prediksi.';
}

function PageIntro() {
  return (
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-bold text-teal-800">
          <FiActivity className="w-4 h-4" />
          Assessment
        </div>
        <h1 className="mt-5 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
          Analisis Risiko Obesitas
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
          Isi data singkat untuk melihat prediksi, probabilitas, dan rekomendasi.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
          <FiClipboard className="w-4 h-4 text-teal-700" />
          16 parameter
        </div>
        <ol className="flex flex-wrap gap-2">
          {WORKFLOW.map((item, index) => (
            <li key={item} className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-black text-teal-700">
                {index + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function PredictionMetric({ icon: Icon, label, value, tone = 'teal' }) {
  const toneClasses = {
    teal: 'bg-teal-50 text-teal-700 border-teal-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${toneClasses[tone]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs uppercase font-bold text-slate-500 tracking-wider">{label}</p>
          <p className="text-xl font-black text-slate-950 mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
}

function PredictionSummary({ result }) {
  const resultLabel = result.label || result.prediction;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-slide-up">
      <PredictionMetric icon={FiActivity} label="BMI" value={formatBmi(result.bmi)} tone="teal" />
      <PredictionMetric icon={FiBarChart2} label="Confidence" value={formatPercentage(result.confidence)} tone="amber" />
      <PredictionMetric icon={FiCheckCircle} label="Hasil" value={resultLabel || '-'} tone="slate" />
    </div>
  );
}

function PersonalAdvice({ advice }) {
  if (!advice) return null;

  return (
    <div className="rounded-2xl border border-teal-100 bg-gradient-to-br from-white to-teal-50/70 p-6 sm:p-8 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-teal-600/20">
          <FiMessageCircle className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider font-bold text-teal-700">Saran</p>
          <h3 className="mt-1 text-xl sm:text-2xl font-black text-slate-950">Personal</h3>
          <p className="mt-3 text-slate-700 leading-relaxed whitespace-pre-line font-medium max-w-4xl">
            {advice}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CheckObesity() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const payload = { ...formData };
      const { data: predictionData } = await api.post('/obesity/predict', payload);

      setResult({
        prediction: predictionData.prediction,
        label: predictionData.label,
        confidence: predictionData.confidence,
        bmi: predictionData.bmi,
        probabilities: predictionData.probabilities,
        ai_advice: predictionData.ai_advice,
      });
    } catch (err) {
      setError(getPredictionErrorMessage(err));
      setIsAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[95vh] bg-slate-50 animate-fade-in">
      <AlertModal
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title="Prediksi Gagal"
        message={error}
        type="error"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <PageIntro />
        <ObesityForm onSubmit={handleSubmit} loading={loading} />

        {result && (
          <section className="mt-10 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-teal-700">Hasil Analisis</p>
                  <h2 className="mt-1 text-2xl sm:text-3xl font-black text-slate-950">Ringkasan</h2>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
                  <FiSend className="w-4 h-4 text-teal-700" />
                  Tersimpan ke riwayat
                </div>
              </div>
            </div>

            <PredictionSummary result={result} />

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
              {result.probabilities && <ObesityChart probabilities={result.probabilities} />}
              {result.prediction && <ResultCard prediction={result.prediction} />}
            </div>

            <PersonalAdvice advice={result.ai_advice} />
          </section>
        )}
      </main>
    </div>
  );
}
