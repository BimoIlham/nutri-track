import {
  FiActivity,
  FiArrowRight,
  FiBarChart2,
  FiClock,
  FiDatabase,
  FiShield,
  FiUser,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Footer() {
  const { isAuthenticated } = useAuth();
  const year = new Date().getFullYear();
  const primaryTarget = isAuthenticated ? '/cek-obesitas' : '/register';
  const accountTarget = isAuthenticated ? '/profile' : '/login';

  const footerLinks = [
    { to: '/', label: 'Beranda' },
    { to: '/cek-obesitas', label: 'Cek Obesitas' },
    { to: accountTarget, label: isAuthenticated ? 'Profil' : 'Masuk' },
  ];

  const highlights = [
    { label: 'Prediksi ML', icon: FiBarChart2 },
    { label: 'Riwayat tersimpan', icon: FiDatabase },
    { label: 'Akun aman', icon: FiShield },
  ];

  return (
    <footer className="mt-auto border-t border-emerald-900 bg-emerald-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:items-start">
          <div className="max-w-xl">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 transition group-hover:bg-white/15">
                <FiActivity className="h-6 w-6 text-emerald-200" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight">
                Nutri<span className="text-emerald-300">Track</span>
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-6 text-emerald-50/75">
              Platform ringkas untuk cek risiko obesitas, membaca hasil prediksi, dan menyimpan riwayat
              kesehatan.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to={primaryTarget}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-emerald-950 shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-emerald-50"
              >
                {isAuthenticated ? 'Mulai Analisis' : 'Daftar Gratis'}
                <FiArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white/90 transition hover:border-white/30 hover:bg-white/10"
              >
                Lihat Beranda
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.22em] text-emerald-200/80">Navigasi</h3>
            <div className="mt-5 grid gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-emerald-50/80 transition hover:border-emerald-300/30 hover:bg-white/[0.07] hover:text-white"
                >
                  {link.label}
                  <FiArrowRight className="h-4 w-4 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.22em] text-emerald-200/80">Layanan</h3>
            <div className="mt-5 space-y-3">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-300/12 text-emerald-200">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-semibold text-emerald-50/80">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-emerald-50/60 md:flex-row md:items-center md:justify-between">
          <p>Copyright {year} NutriTrack. Semua hak cipta dilindungi.</p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2">
              <FiClock className="h-4 w-4 text-emerald-300" />
              Backend lokal aktif
            </span>
            <span className="inline-flex items-center gap-2">
              <FiUser className="h-4 w-4 text-emerald-300" />
              Pemantauan personal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
