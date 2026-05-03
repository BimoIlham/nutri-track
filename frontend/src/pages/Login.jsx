import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import AlertModal from '../components/common/AlertModal';
import { FiMail, FiLock, FiLogIn, FiActivity } from 'react-icons/fi';

/**
 * Login — centered card form with email/password fields.
 */
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email.trim()) return 'Email wajib diisi';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Format email tidak valid';
    if (!password) return 'Password wajib diisi';
    if (password.length < 6) return 'Password minimal 6 karakter';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setIsAlertOpen(true);
      return;
    }

    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
      setIsAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-emerald-50 via-[#F6FCFA] to-teal-50">
      <AlertModal 
        isOpen={isAlertOpen} 
        onClose={() => setIsAlertOpen(false)} 
        title="Login Gagal" 
        message={error} 
        type="error" 
      />

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-teal-200/30 blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg animate-scale-in">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <FiActivity className="w-8 h-8 text-white" />
            </div>
          </Link>
          <h1 className="mt-6 text-4xl font-extrabold text-emerald-950">Selamat Datang</h1>
          <p className="mt-2 text-emerald-800 text-lg">Masuk ke akun NutriTrack kamu</p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-emerald-900/10 border border-emerald-100 p-10 sm:p-12">
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email"
              id="login-email"
              type="email"
              icon={FiMail}
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              id="login-password"
              type="password"
              icon={FiLock}
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" fullWidth loading={loading} size="lg" className="bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30 shadow-lg">
              <FiLogIn className="w-5 h-5" />
              Masuk
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-emerald-800">
            Belum punya akun?{' '}
            <Link to="/register" className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors">
              Daftar di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
