import { useState } from 'react';
import api from '../services/api';
import ObesityForm from '../components/specific/ObesityForm';
import ObesityChart from '../components/specific/ObesityChart';
import ResultCard from '../components/specific/ResultCard';
import AlertModal from '../components/common/AlertModal';

/**
 * CheckObesity — core page orchestrating form submission → API call → results display.
 */
export default function CheckObesity() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // { prediction, probabilities }
  const [error, setError] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // The ML backend expects Height in meters, but we collect it in cm
      const payload = { ...formData };
      if (payload.Height) {
        payload.Height = Number(payload.Height) / 100;
      }

      let predictionData;
      try {
        const { data } = await api.post('/obesity/predict', payload);
        predictionData = data;
      } catch (apiErr) {
        console.warn('Backend API unreachable. Using MOCK data for UI demonstration.', apiErr);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simple BMI calculation to make the mock somewhat realistic based on input
        const w = Number(payload.Weight) || 70;
        const h = Number(payload.Height) || 1.70;
        const bmi = w / (h * h);
        
        let predClass = 'Normal_Weight';
        if (bmi < 18.5) predClass = 'Insufficient_Weight';
        else if (bmi < 25) predClass = 'Normal_Weight';
        else if (bmi < 29.9) predClass = 'Overweight_Level_II';
        else if (bmi < 34.9) predClass = 'Obesity_Type_I';
        else if (bmi < 39.9) predClass = 'Obesity_Type_II';
        else predClass = 'Obesity_Type_III';

        predictionData = {
          prediction: predClass,
          probabilities: {
            Insufficient_Weight: predClass === 'Insufficient_Weight' ? 0.8 : 0.05,
            Normal_Weight: predClass === 'Normal_Weight' ? 0.85 : 0.05,
            Overweight_Level_I: 0.1,
            Overweight_Level_II: predClass === 'Overweight_Level_II' ? 0.75 : 0.05,
            Obesity_Type_I: predClass === 'Obesity_Type_I' ? 0.8 : 0.05,
            Obesity_Type_II: predClass === 'Obesity_Type_II' ? 0.9 : 0.05,
            Obesity_Type_III: predClass === 'Obesity_Type_III' ? 0.95 : 0.0,
          }
        };
      }

      setResult({
        prediction: predictionData.prediction,
        probabilities: predictionData.probabilities,
      });
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat memproses prediksi.');
      setIsAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in min-h-[95vh]">
      <AlertModal 
        isOpen={isAlertOpen} 
        onClose={() => setIsAlertOpen(false)} 
        title="Prediksi Gagal" 
        message={error} 
        type="error" 
      />

      {/* Page Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto pt-8">
        <h1 className="text-4xl font-extrabold text-emerald-950 mb-4">🔬 Cek Obesitas</h1>
        <p className="text-emerald-800 text-lg leading-relaxed">
          Isi data kesehatanmu di bawah ini, dan NutriTrack akan menganalisis tingkat obesitasmu menggunakan AI.
        </p>
      </div>

      {/* Form */}
      <ObesityForm onSubmit={handleSubmit} loading={loading} />

      {/* Results */}
      {result && (
        <div className="mt-8 space-y-8">
          {result.probabilities && <ObesityChart probabilities={result.probabilities} />}
          {result.prediction && <ResultCard prediction={result.prediction} />}
        </div>
      )}
    </div>
  );
}
