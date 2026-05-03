import { FiActivity } from 'react-icons/fi';
import { Link } from 'react-router-dom';

/**
 * Premium Modern Footer
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-emerald-800 py-10 mt-auto bg-gradient-to-br from-emerald-950 to-emerald-900 relative overflow-hidden">
      {/* Very subtle white hint */}
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-white/[0.02] rounded-full blur-[100px]" />
      
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-4 relative z-10">
        <Link to="/" className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-all">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
            <FiActivity className="w-5 h-5 text-emerald-300" />
          </div>
          <span className="text-xl font-bold text-white tracking-wide">NutriTrack</span>
        </Link>
        <p className="text-sm font-medium text-emerald-100/60">
          © {year} NutriTrack. Semua hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}
