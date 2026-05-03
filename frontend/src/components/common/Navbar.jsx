import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FiMenu, FiX, FiLogOut, FiUser, FiActivity } from 'react-icons/fi';

/**
 * Glassmorphic sticky Navbar — auth-aware with responsive hamburger.
 */
export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate('/');
  };

  const navLinks = isAuthenticated
    ? [
        { to: '/', label: 'Beranda' },
        { to: '/cek-obesitas', label: 'Cek Obesitas' },
        { to: '/profile', label: 'Profil' },
      ]
    : [
        { to: '/', label: 'Beranda' },
        { to: '/login', label: 'Masuk' },
        { to: '/register', label: 'Daftar' },
      ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-emerald-50/90 backdrop-blur-2xl border-b border-emerald-200/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300 group-hover:-translate-y-0.5">
              <FiActivity className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-extrabold text-emerald-950 tracking-tight">
              Nutri<span className="text-emerald-600">Track</span>
            </span>
          </Link>

          {/* ── Desktop Links ── */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative px-1 py-1 mx-2 text-base font-bold text-emerald-800 hover:text-emerald-600 transition-colors duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-emerald-600 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="ml-4 px-5 py-2 rounded-full text-base font-bold text-red-500 border border-red-200 hover:text-red-600 hover:bg-red-50 transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <FiLogOut className="w-5 h-5" /> Keluar
              </button>
            )}

            {isAuthenticated && user && (
              <div className="ml-4 pl-4 border-l-2 border-emerald-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 border border-emerald-200 flex items-center justify-center shadow-sm">
                  <FiUser className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-base font-bold text-emerald-900 max-w-[150px] truncate">
                  {user.name}
                </span>
              </div>
            )}
          </div>

          {/* ── Mobile Toggle ── */}
          <button
            className="md:hidden p-2 rounded-full text-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX className="w-7 h-7" /> : <FiMenu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 space-y-2 bg-emerald-50/95 backdrop-blur-3xl border-t border-emerald-200 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block px-4 py-3 rounded-xl text-base font-bold text-emerald-900 hover:text-emerald-600 hover:bg-emerald-100 transition-all"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 rounded-xl text-base font-bold text-red-500 hover:text-red-600 hover:bg-red-50 transition-all flex items-center gap-2 cursor-pointer"
            >
              <FiLogOut className="w-5 h-5" /> Keluar
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
