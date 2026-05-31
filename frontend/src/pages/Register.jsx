import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import AlertModal from '../components/common/AlertModal';
import { FiMail, FiLock, FiUser, FiCalendar, FiArrowUp, FiUserPlus, FiActivity } from 'react-icons/fi';
import { GiWeightScale } from 'react-icons/gi';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', age: '', gender: '', weight: '', height: '' });
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Nama wajib diisi';
    if (!formData.email.trim()) e.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Format email tidak valid';
    if (!formData.password) e.password = 'Password wajib diisi';
    else if (formData.password.length < 6) e.password = 'Minimal 6 karakter';
    if (formData.password !== formData.confirmPassword) e.confirmPassword = 'Password tidak cocok';
    if (!formData.age) e.age = 'Wajib diisi';
    if (!formData.gender) e.gender = 'Pilih jenis kelamin';
    if (!formData.weight) e.weight = 'Wajib diisi';
    if (!formData.height) e.height = 'Wajib diisi';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) {
      setGlobalError('Terdapat isian yang tidak valid. Mohon periksa kembali.');
      setIsAlertOpen(true);
      return;
    }
    setGlobalError('');
    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        age: Number(formData.age),
        gender: formData.gender,
        weight: Number(formData.weight),
        height: Number(formData.height),
      };
      await register(payload);
      navigate('/login');
    } catch (err) {
      setGlobalError(err.message);
      setIsAlertOpen(true);
    }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-emerald-50 via-[#F6FCFA] to-teal-50">
      <AlertModal
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title="Pendaftaran Gagal"
        message={globalError}
        type="error"
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-teal-200/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-emerald-200/30 blur-3xl" />
      </div>

      <div className="relative w-full max-w-3xl animate-scale-in">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <FiActivity className="w-8 h-8 text-white" />
            </div>
          </Link>
          <h1 className="mt-6 text-4xl font-extrabold text-emerald-950">Buat Akun Baru</h1>
          <p className="mt-2 text-emerald-800 text-lg">Bergabunglah dengan NutriTrack</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-emerald-900/10 border border-emerald-100 p-10 sm:p-12">
          
          <form onSubmit={handleSubmit} className="space-y-10">
            <div>
              <p className="text-sm font-bold text-emerald-800/60 uppercase tracking-widest mb-6 border-b border-emerald-100 pb-2">Informasi Akun</p>
              <div className="space-y-4">
                <Input label="Nama Lengkap" id="reg-name" icon={FiUser} placeholder="John Doe" value={formData.name} onChange={handleChange('name')} error={errors.name} />
                <Input label="Email" id="reg-email" type="email" icon={FiMail} placeholder="nama@email.com" value={formData.email} onChange={handleChange('email')} error={errors.email} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Input label="Password" id="reg-pass" type="password" icon={FiLock} placeholder="Min. 6 karakter" value={formData.password} onChange={handleChange('password')} error={errors.password} />
                  <Input label="Konfirmasi Password" id="reg-cpass" type="password" icon={FiLock} placeholder="Ulangi password" value={formData.confirmPassword} onChange={handleChange('confirmPassword')} error={errors.confirmPassword} />
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold text-emerald-800/60 uppercase tracking-widest mb-6 border-b border-emerald-100 pb-2">Data Kesehatan</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-4">
                <Input label="Usia" id="reg-age" type="number" icon={FiCalendar} placeholder="25" value={formData.age} onChange={handleChange('age')} error={errors.age} min="1" max="120" />
                <Input 
                  label="Jenis Kelamin" 
                  id="reg-gender" 
                  type="select" 
                  icon={FiUser} 
                  value={formData.gender} 
                  onChange={handleChange('gender')} 
                  error={errors.gender}
                  options={[
                    { label: 'Pria', value: 'L' },
                    { label: 'Wanita', value: 'P' }
                  ]}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <Input label="Berat (kg)" id="reg-weight" type="number" icon={GiWeightScale} placeholder="70" value={formData.weight} onChange={handleChange('weight')} error={errors.weight} step="0.1" />
                <Input label="Tinggi (cm)" id="reg-height" type="number" icon={FiArrowUp} placeholder="170" value={formData.height} onChange={handleChange('height')} error={errors.height} step="0.1" />
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" fullWidth loading={loading} size="lg" className="bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30 shadow-lg">
                <FiUserPlus className="w-6 h-6" /> Daftar Sekarang
              </Button>
            </div>
          </form>
          <div className="mt-8 text-center text-base text-emerald-800">
            Sudah punya akun?{' '}<Link to="/login" className="text-emerald-600 font-bold hover:text-emerald-700">Masuk di sini</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
