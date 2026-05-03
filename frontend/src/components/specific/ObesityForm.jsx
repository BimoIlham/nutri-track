import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import {
  FiUser, FiCalendar, FiArrowUp, FiActivity,
  FiDroplet, FiSmartphone, FiTruck, FiSend,
} from 'react-icons/fi';
import { GiMeal, GiWeightScale } from 'react-icons/gi';
import { MdFastfood, MdSmokingRooms, MdSportsBar } from 'react-icons/md';

/**
 * Form fields definition — maps to the 16 dataset features.
 */
const FORM_FIELDS = [
  {
    name: 'Gender',
    label: 'Jenis Kelamin',
    type: 'select',
    icon: FiUser,
    options: [
      { value: 'Male', label: 'Laki-laki' },
      { value: 'Female', label: 'Perempuan' },
    ],
  },
  { name: 'Age', label: 'Usia (tahun)', type: 'number', icon: FiCalendar, placeholder: '25', step: '1' },
  { name: 'Height', label: 'Tinggi Badan (cm)', type: 'number', icon: FiArrowUp, placeholder: '170', step: '1' },
  { name: 'Weight', label: 'Berat Badan (kg)', type: 'number', icon: GiWeightScale, placeholder: '70', step: '1' },
  {
    name: 'family_history_with_overweight',
    label: 'Riwayat Keluarga Obesitas',
    type: 'select',
    icon: FiUser,
    options: [
      { value: 'yes', label: 'Ya' },
      { value: 'no', label: 'Tidak' },
    ],
  },
  {
    name: 'FAVC',
    label: 'Sering Makan Tinggi Kalori?',
    type: 'select',
    icon: MdFastfood,
    options: [
      { value: 'yes', label: 'Ya' },
      { value: 'no', label: 'Tidak' },
    ],
  },
  { name: 'FCVC', label: 'Frekuensi Konsumsi Sayur (1-3)', type: 'number', icon: GiMeal, placeholder: '2', min: '1', max: '3', step: '1' },
  { name: 'NCP', label: 'Jumlah Makan Utama/Hari (1-4)', type: 'number', icon: GiMeal, placeholder: '3', min: '1', max: '4', step: '1' },
  {
    name: 'CAEC',
    label: 'Makan di Antara Waktu Makan',
    type: 'select',
    icon: MdFastfood,
    options: [
      { value: 'no', label: 'Tidak pernah' },
      { value: 'Sometimes', label: 'Kadang-kadang' },
      { value: 'Frequently', label: 'Sering' },
      { value: 'Always', label: 'Selalu' },
    ],
  },
  {
    name: 'SMOKE',
    label: 'Merokok?',
    type: 'select',
    icon: MdSmokingRooms,
    options: [
      { value: 'yes', label: 'Ya' },
      { value: 'no', label: 'Tidak' },
    ],
  },
  { name: 'CH2O', label: 'Konsumsi Air/Hari (1-3 liter)', type: 'number', icon: FiDroplet, placeholder: '2', min: '1', max: '3', step: '1' },
  {
    name: 'SCC',
    label: 'Memantau Kalori?',
    type: 'select',
    icon: FiActivity,
    options: [
      { value: 'yes', label: 'Ya' },
      { value: 'no', label: 'Tidak' },
    ],
  },
  { name: 'FAF', label: 'Frekuensi Olahraga/Minggu (0-3)', type: 'number', icon: FiActivity, placeholder: '2', min: '0', max: '3', step: '1' },
  { name: 'TUE', label: 'Waktu Pakai Gadget/Hari (0-2 jam)', type: 'number', icon: FiSmartphone, placeholder: '1', min: '0', max: '2', step: '1' },
  {
    name: 'CALC',
    label: 'Konsumsi Alkohol',
    type: 'select',
    icon: MdSportsBar,
    options: [
      { value: 'no', label: 'Tidak pernah' },
      { value: 'Sometimes', label: 'Kadang-kadang' },
      { value: 'Frequently', label: 'Sering' },
      { value: 'Always', label: 'Selalu' },
    ],
  },
  {
    name: 'MTRANS',
    label: 'Transportasi Utama',
    type: 'select',
    icon: FiTruck,
    options: [
      { value: 'Automobile', label: 'Mobil' },
      { value: 'Motorbike', label: 'Motor' },
      { value: 'Bike', label: 'Sepeda' },
      { value: 'Public_Transportation', label: 'Transportasi Umum' },
      { value: 'Walking', label: 'Jalan Kaki' },
    ],
  },
];

function buildInitialState() {
  const state = {};
  FORM_FIELDS.forEach((f) => (state[f.name] = ''));
  return state;
}

export default function ObesityForm({ onSubmit, loading = false }) {
  const [formData, setFormData] = useState(buildInitialState);
  const [errors, setErrors] = useState({});

  const handleChange = (name) => (e) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    FORM_FIELDS.forEach((field) => {
      if (!formData[field.name] && formData[field.name] !== 0) {
        newErrors[field.name] = `${field.label} wajib diisi`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl shadow-emerald-900/5 border border-emerald-100 p-10 sm:p-12">
        {/* Header */}
        <div className="mb-10 border-b border-emerald-100 pb-6">
          <h2 className="text-3xl font-extrabold text-emerald-950">📋 Data Kesehatan</h2>
          <p className="text-emerald-800/80 mt-2 text-lg">Isi semua field berikut dengan bilangan bulat (tanpa koma/desimal) untuk mendapatkan prediksi tingkat obesitas.</p>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
          {FORM_FIELDS.map((field) => (
            <Input
              key={field.name}
              label={field.label}
              id={`obesity-${field.name}`}
              type={field.type}
              icon={field.icon}
              options={field.options}
              value={formData[field.name]}
              onChange={handleChange(field.name)}
              error={errors[field.name]}
              placeholder={field.placeholder}
              min={field.min}
              max={field.max}
              step={field.step}
            />
          ))}
        </div>

        {/* Submit */}
        <div className="mt-12 flex justify-end">
          <Button type="submit" size="lg" loading={loading} className="min-w-[200px] bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30 shadow-lg">
            <FiSend className="w-5 h-5 mr-2" />
            Analisis Sekarang
          </Button>
        </div>
      </div>
    </form>
  );
}
