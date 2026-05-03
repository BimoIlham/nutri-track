import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import {
  FiActivity, FiBarChart2, FiShield, FiArrowRight,
  FiHeart, FiTarget, FiTrendingUp, FiCpu, FiCheckCircle
} from 'react-icons/fi';

/**
 * Feature card for the "Mengapa NutriTrack?" section.
 */
function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="group p-8 rounded-[2rem] bg-white backdrop-blur-xl border border-emerald-100 shadow-xl shadow-emerald-900/5 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-2 transition-all duration-500">
      <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
        <Icon className="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors duration-500" />
      </div>
      <h3 className="text-xl font-extrabold text-emerald-950 mb-3">{title}</h3>
      <p className="text-emerald-800 text-base leading-relaxed">{description}</p>
    </div>
  );
}

/**
 * Step card for the "Cara Kerja" section.
 */
function StepCard({ number, title, description, icon: Icon }) {
  return (
    <div className="relative p-8 rounded-[2rem] bg-white border border-emerald-100 hover:bg-emerald-50/50 shadow-xl shadow-emerald-900/5 transition-all duration-300">
      <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-emerald-500 text-white font-black flex items-center justify-center text-xl shadow-lg shadow-emerald-500/30 border-4 border-white">
        {number}
      </div>
      <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-6 border border-emerald-200">
        <Icon className="w-6 h-6 text-emerald-600" />
      </div>
      <h3 className="text-xl font-bold text-emerald-950 mb-2">{title}</h3>
      <p className="text-emerald-800 leading-relaxed text-sm">{description}</p>
    </div>
  );
}

/**
 * Stat counter for the awareness section.
 */
function StatItem({ value, label }) {
  return (
    <div className="text-center p-6 rounded-3xl bg-white/50 backdrop-blur-md border border-emerald-200/60 shadow-lg shadow-emerald-900/5 hover:-translate-y-2 transition-all duration-300">
      <p className="text-4xl sm:text-5xl font-black bg-gradient-to-br from-emerald-600 to-teal-500 bg-clip-text text-transparent drop-shadow-sm mb-2">
        {value}
      </p>
      <p className="text-emerald-800 font-bold text-sm sm:text-base tracking-wide">{label}</p>
    </div>
  );
}

/**
 * Home — Landing page with hero, features, how it works, stats, and CTA.
 */
export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="animate-fade-in bg-white">
      {/* ══════════════ Hero Section (Emerald with Subtle White Hint) ══════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 min-h-[95vh] flex items-center pt-28 pb-20">
        {/* Soft Background Orbs - Very subtle white hint */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] rounded-full bg-white/[0.02] blur-[100px]" />
          <div className="absolute bottom-0 left-10 w-[30rem] h-[30rem] rounded-full bg-teal-400/5 blur-[120px]" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            
            {/* ── Left Content (Text) ── */}
            <div className="text-center lg:text-left mb-16 lg:mb-0 relative z-10">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-emerald-100 mb-8 backdrop-blur-sm shadow-xl">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Teknologi Machine Learning</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-black leading-[1.1] tracking-tight text-white drop-shadow-lg">
                Kenali Tubuhmu,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-white">
                  Jaga Kesehatanmu.
                </span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-emerald-100/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 drop-shadow-md">
                NutriTrack menganalisis 16 indikator kesehatan tubuhmu untuk mendeteksi tingkat obesitas dan memberikan rekomendasi gaya hidup presisi dalam hitungan detik.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link to={isAuthenticated ? '/cek-obesitas' : '/register'}>
                  <Button size="lg" className="w-full sm:w-auto min-w-[200px] shadow-emerald-900/50 shadow-2xl text-base rounded-full bg-white hover:bg-emerald-50 text-emerald-950 font-extrabold border-none">
                    {isAuthenticated ? 'Cek Obesitas' : 'Mulai Sekarang'}
                    <FiArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                {!isAuthenticated && (
                  <Link to="/login">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px] border-emerald-400/20 text-emerald-100 hover:bg-white/10 text-base rounded-full backdrop-blur-sm">
                      Sudah Punya Akun
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* ── Right Content (Floating UI Cards) ── */}
            <div className="relative z-10 w-full max-w-lg mx-auto lg:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-emerald-400/10 rounded-[3rem] rotate-3 scale-105 blur-2xl" />
              
              <div className="relative h-[400px] sm:h-[450px] w-full rounded-[2.5rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-6 sm:p-8 flex flex-col justify-between">
                
                {/* Floating Card 1: BMI Score */}
                <div className="self-end w-64 bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-white/40 hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200">
                      <FiActivity className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 border border-green-200 text-xs font-bold rounded-full">Normal</span>
                  </div>
                  <p className="text-emerald-800 text-sm font-medium">Estimasi BMI</p>
                  <p className="text-3xl font-extrabold text-emerald-950 mt-1">22.4</p>
                </div>

                {/* Floating Card 2: ML Analysis */}
                <div className="self-start w-72 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl p-5 shadow-2xl hover:-translate-y-1 transition-transform duration-300 -mt-8 sm:-mt-12 ml-[-1rem] sm:ml-[-2rem] relative z-20 border border-teal-400/30">
                  <div className="flex items-center gap-3 mb-4">
                    <FiShield className="w-6 h-6 text-white" />
                    <h3 className="text-white font-bold">Analisis AI Selesai</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="w-full bg-emerald-900/30 h-2 rounded-full overflow-hidden">
                      <div className="bg-white h-full w-[85%] shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    </div>
                    <p className="text-emerald-50 text-xs font-medium">Menganalisis 16 parameter tubuh...</p>
                  </div>
                </div>

                {/* Floating Card 3: Recommendation */}
                <div className="self-end w-60 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/40 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300 -mb-4 mr-[-1rem] sm:mr-[-2rem]">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center flex-shrink-0">
                    <FiHeart className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-emerald-950">Pola Makan</p>
                    <p className="text-xs text-emerald-800 mt-0.5">Saran disesuaikan</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════ Features Section (Light Theme) ══════════════ */}
      <section className="py-24 sm:py-32 relative bg-[#F6FCFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-4xl sm:text-5xl font-black text-emerald-950 tracking-tight">
              Mengapa <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">NutriTrack</span>?
            </h2>
            <p className="mt-4 text-lg text-emerald-800 max-w-2xl mx-auto leading-relaxed">
              Platform pintar yang membantu kamu memahami kondisi tubuh secara mendalam dan mendapatkan saran kesehatan yang sangat terpersonalisasi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={FiBarChart2}
              title="Prediksi Akurat"
              description="Algoritma Machine Learning yang dilatih dengan ribuan data untuk memberikan prediksi tingkat obesitas yang presisi."
            />
            <FeatureCard
              icon={FiHeart}
              title="Rekomendasi Personal"
              description="Saran diet, olahraga, dan medis yang disesuaikan dengan kondisi kesehatan dan kebiasaan gaya hidupmu."
            />
            <FeatureCard
              icon={FiShield}
              title="Privasi Terjaga"
              description="Data kesehatanmu terenkripsi dan terlindungi. Kami menjaga kerahasiaan informasi pribadimu."
            />
          </div>
        </div>
      </section>

      {/* ══════════════ How it Works (Cara Kerja - Refined Elegance) ══════════════ */}
      <section className="py-24 sm:py-32 relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-black text-emerald-950 tracking-tight">Cara Kerja NutriTrack</h2>
            <p className="mt-4 text-lg text-emerald-800/70 max-w-2xl mx-auto font-medium">Tiga langkah mudah untuk mengetahui status kesehatanmu.</p>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-emerald-100 via-emerald-300 to-emerald-100" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 relative z-10">
              {/* Step 1 */}
              <div className="relative flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-full bg-white border border-emerald-200 shadow-xl shadow-emerald-900/5 flex items-center justify-center mb-8 relative group-hover:-translate-y-2 transition-transform duration-300">
                  <div className="absolute inset-0 rounded-full bg-emerald-50 scale-0 group-hover:scale-100 transition-transform duration-300 ease-out" />
                  <FiActivity className="w-8 h-8 text-emerald-600 relative z-10" />
                  {/* Number badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center border-4 border-white shadow-sm">1</div>
                </div>
                <h3 className="text-2xl font-extrabold text-emerald-950 mb-3">Isi Data</h3>
                <p className="text-emerald-800/80 leading-relaxed max-w-[16rem]">Masukkan parameter tubuh dan gaya hidupmu dengan mudah.</p>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col items-center text-center group md:mt-12">
                <div className="w-20 h-20 rounded-full bg-white border border-emerald-200 shadow-xl shadow-emerald-900/5 flex items-center justify-center mb-8 relative group-hover:-translate-y-2 transition-transform duration-300">
                  <div className="absolute inset-0 rounded-full bg-emerald-50 scale-0 group-hover:scale-100 transition-transform duration-300 ease-out" />
                  <FiCpu className="w-8 h-8 text-emerald-600 relative z-10" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center border-4 border-white shadow-sm">2</div>
                </div>
                <h3 className="text-2xl font-extrabold text-emerald-950 mb-3">Analisis AI</h3>
                <p className="text-emerald-800/80 leading-relaxed max-w-[16rem]">Sistem memproses datamu secara instan menggunakan Machine Learning.</p>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-full bg-white border border-emerald-200 shadow-xl shadow-emerald-900/5 flex items-center justify-center mb-8 relative group-hover:-translate-y-2 transition-transform duration-300">
                  <div className="absolute inset-0 rounded-full bg-emerald-50 scale-0 group-hover:scale-100 transition-transform duration-300 ease-out" />
                  <FiCheckCircle className="w-8 h-8 text-emerald-600 relative z-10" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center border-4 border-white shadow-sm">3</div>
                </div>
                <h3 className="text-2xl font-extrabold text-emerald-950 mb-3">Hasil & Saran</h3>
                <p className="text-emerald-800/80 leading-relaxed max-w-[16rem]">Dapatkan tingkat obesitas dan rekomendasi kesehatan personal.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ Stats Section (Light Minimalist Theme) ══════════════ */}
      <section className="py-20 relative bg-white overflow-hidden border-b border-emerald-50">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
        
        {/* Subtle light glowing orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 md:divide-x divide-emerald-100">
            <div className="text-center group">
              <p className="text-5xl lg:text-6xl font-black text-emerald-950 mb-2 group-hover:scale-105 transition-transform duration-300">7</p>
              <p className="text-emerald-600 font-bold tracking-widest uppercase text-xs sm:text-sm">Kelas Obesitas</p>
            </div>
            <div className="text-center group">
              <p className="text-5xl lg:text-6xl font-black text-emerald-950 mb-2 group-hover:scale-105 transition-transform duration-300">16</p>
              <p className="text-emerald-600 font-bold tracking-widest uppercase text-xs sm:text-sm">Fitur Analisis</p>
            </div>
            <div className="text-center group">
              <p className="text-5xl lg:text-6xl font-black text-emerald-950 mb-2 flex items-baseline justify-center group-hover:scale-105 transition-transform duration-300">
                97<span className="text-3xl text-teal-500">%</span>
              </p>
              <p className="text-emerald-600 font-bold tracking-widest uppercase text-xs sm:text-sm">Akurasi Model</p>
            </div>
            <div className="text-center group">
              <p className="text-5xl lg:text-6xl font-black text-emerald-950 mb-2 flex items-baseline justify-center group-hover:scale-105 transition-transform duration-300">
                24<span className="text-3xl text-teal-500">/7</span>
              </p>
              <p className="text-emerald-600 font-bold tracking-widest uppercase text-xs sm:text-sm">Akses Kapanpun</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ CTA Section (Clean Minimalist White) ══════════════ */}
      <section className="py-24 sm:py-32 relative bg-white border-t border-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center flex flex-col items-center">
            
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mb-8">
              <FiTarget className="w-8 h-8 text-emerald-600" />
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-black text-emerald-950 tracking-tight mb-6">
              Ambil Kendali Kesehatanmu
            </h2>
            
            <p className="text-emerald-800/80 text-lg sm:text-xl max-w-2xl font-medium leading-relaxed">
              Bergabunglah dengan ribuan pengguna lainnya. Hanya butuh 2 menit untuk mendapatkan analisis tubuh tingkat lanjut berbasis AI.
            </p>
            
            <div className="mt-10 w-full flex justify-center">
              <Link to={isAuthenticated ? '/cek-obesitas' : '/register'}>
                <button className="flex items-center justify-center gap-3 bg-emerald-500 text-white hover:bg-emerald-600 hover:-translate-y-1 active:scale-95 shadow-lg shadow-emerald-500/30 rounded-full px-10 py-4 text-lg font-bold transition-all duration-300">
                  <FiTrendingUp className="w-6 h-6" />
                  {isAuthenticated ? 'Mulai Analisis' : 'Daftar & Cek Gratis'}
                </button>
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
