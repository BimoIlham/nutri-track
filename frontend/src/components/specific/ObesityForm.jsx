import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import {
  FiUser, FiCalendar, FiArrowUp, FiActivity,
  FiDroplet, FiSmartphone, FiTruck, FiSend,
} from 'react-icons/fi';
import { GiMeal, GiWeightScale } from 'react-icons/gi';
import { MdFastfood, MdSmokingRooms, MdSportsBar } from 'react-icons/md';

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
  { name: 'Age', label: 'Usia (14-61 tahun)', type: 'number', icon: FiCalendar, placeholder: '25', min: '14', max: '61', step: '1' },
  { name: 'Height', label: 'Tinggi Badan (145-198 cm)', type: 'number', icon: FiArrowUp, placeholder: '170', min: '145', max: '198', step: '1' },
  { name: 'Weight', label: 'Berat Badan (39-173 kg)', type: 'number', icon: GiWeightScale, placeholder: '70', min: '39', max: '173', step: '1' },
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
    label: 'Sering Makan Tinggi Kalori',
    type: 'select',
    icon: MdFastfood,
    options: [
      { value: 'yes', label: 'Ya' },
      { value: 'no', label: 'Tidak' },
    ],
  },
  { name: 'FCVC', label: 'Frekuensi Konsumsi Sayur (1-5)', type: 'number', icon: GiMeal, placeholder: '2', min: '1', max: '5', step: '1' },
  { name: 'NCP', label: 'Jumlah Makan Utama/Hari (1-6)', type: 'number', icon: GiMeal, placeholder: '3', min: '1', max: '6', step: '1' },
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
    label: 'Merokok',
    type: 'select',
    icon: MdSmokingRooms,
    options: [
      { value: 'yes', label: 'Ya' },
      { value: 'no', label: 'Tidak' },
    ],
  },
  { name: 'CH2O', label: 'Konsumsi Air/Hari (1-5)', type: 'number', icon: FiDroplet, placeholder: '2', min: '1', max: '5', step: '1' },
  {
    name: 'SCC',
    label: 'Memantau Kalori',
    type: 'select',
    icon: FiActivity,
    options: [
      { value: 'yes', label: 'Ya' },
      { value: 'no', label: 'Tidak' },
    ],
  },
  { name: 'FAF', label: 'Frekuensi Olahraga/Minggu (0-7)', type: 'number', icon: FiActivity, placeholder: '2', min: '0', max: '7', step: '1' },
  { name: 'TUE', label: 'Waktu Pakai Gadget/Hari (0-12 jam)', type: 'number', icon: FiSmartphone, placeholder: '1', min: '0', max: '12', step: '1' },
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

const FORM_SECTIONS = [
  {
    title: 'Profil tubuh',
    description: 'Identitas dasar dan ukuran tubuh.',
    fields: ['Gender', 'Age', 'Height', 'Weight'],
  },
  {
    title: 'Pola makan',
    description: 'Kebiasaan makan dan porsi harian.',
    fields: ['family_history_with_overweight', 'FAVC', 'FCVC', 'NCP', 'CAEC'],
  },
  {
    title: 'Aktivitas dan kebiasaan',
    description: 'Aktivitas, hidrasi, dan gaya hidup.',
    fields: ['SMOKE', 'CH2O', 'SCC', 'FAF', 'TUE', 'CALC', 'MTRANS'],
  },
];

const FIELD_BY_NAME = Object.fromEntries(FORM_FIELDS.map((field) => [field.name, field]));

function buildInitialState() {
  const state = {};
  FORM_FIELDS.forEach((field) => (state[field.name] = ''));
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
      const value = formData[field.name];

      if (!value && value !== 0) {
        newErrors[field.name] = `${field.label} wajib diisi`;
        return;
      }

      if (field.type === 'number') {
        const numericValue = Number(value);
        const min = field.min !== undefined ? Number(field.min) : null;
        const max = field.max !== undefined ? Number(field.max) : null;

        if (Number.isNaN(numericValue)) {
          newErrors[field.name] = `${field.label} harus berupa angka`;
          return;
        }

        if (min !== null && numericValue < min) {
          newErrors[field.name] = `${field.label} minimal ${field.min}`;
          return;
        }

        if (max !== null && numericValue > max) {
          newErrors[field.name] = `${field.label} maksimal ${field.max}`;
        }
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
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 overflow-hidden">
        <div className="border-b border-slate-200 bg-white px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-teal-700">Form Analisis</p>
              <h2 className="mt-1 text-2xl sm:text-3xl font-black text-slate-950">Data Kesehatan</h2>
            </div>
            <p className="max-w-sm text-sm sm:text-base text-slate-600">
              Lengkapi semua field sesuai rentang.
            </p>
          </div>
        </div>

        <div className="space-y-7 p-6 sm:p-8">
          {FORM_SECTIONS.map((section) => (
            <section key={section.title} className="grid gap-5 lg:grid-cols-[220px_1fr]">
              <div>
                <h3 className="text-base font-black text-slate-950">{section.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">{section.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-5">
                {section.fields.map((fieldName) => {
                  const field = FIELD_BY_NAME[fieldName];

                  return (
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
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-sm font-medium text-slate-500">
            Hasil otomatis masuk ke riwayat profil.
          </p>
          <Button type="submit" size="lg" loading={loading} className="min-w-[210px] bg-teal-600 hover:bg-teal-700 shadow-teal-600/25 shadow-lg">
            <FiSend className="w-5 h-5 mr-2" />
            Analisis Sekarang
          </Button>
        </div>
      </div>
    </form>
  );
}
