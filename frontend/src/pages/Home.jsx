import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import {
  FiActivity,
  FiArrowRight,
  FiBarChart2,
  FiCheckCircle,
  FiClipboard,
  FiDatabase,
  FiHeart,
  FiLock,
  FiTarget,
  FiTrendingUp,
} from 'react-icons/fi';

const FEATURES = [
  {
    icon: FiBarChart2,
    title: 'Prediksi terukur',
    description: 'Model membaca data tubuh dan kebiasaan untuk memberi hasil yang mudah dipahami.',
  },
  {
    icon: FiHeart,
    title: 'Saran personal',
    description: 'Rekomendasi diet, aktivitas, dan langkah medis disesuaikan dengan hasil analisis.',
  },
  {
    icon: FiLock,
    title: 'Riwayat tersimpan',
    description: 'Setiap hasil analisis masuk ke profil agar progres kesehatan lebih mudah dipantau.',
  },
];

const STEPS = [
  {
    title: 'Isi data',
    description: 'Masukkan 16 parameter tubuh dan kebiasaan harian.',
    icon: FiClipboard,
  },
  {
    title: 'Analisis model',
    description: 'Backend memproses data dan mengambil hasil prediksi.',
    icon: FiDatabase,
  },
  {
    title: 'Lihat rekomendasi',
    description: 'Pantau hasil, probabilitas, dan saran personal.',
    icon: FiCheckCircle,
  },
];

const STATS = [
  { value: '7', label: 'kelas hasil' },
  { value: '16', label: 'parameter' },
  { value: '3', label: 'jenis saran' },
  { value: '24/7', label: 'akses web' },
];

const PROBABILITY_ROWS = [
  { label: 'Normal', value: 72, color: 'bg-teal-500' },
  { label: 'Overweight I', value: 18, color: 'bg-amber-500' },
  { label: 'Obesitas I', value: 10, color: 'bg-red-500' },
];

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">
      <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="mt-5 text-xl font-black text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}

function StepCard({ index, icon: Icon, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white">
          {index + 1}
        </span>
        <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <h3 className="mt-6 text-xl font-black text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}

function StatBlock({ value, label }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-7 py-6 shadow-sm">
      <p className="text-3xl font-black text-slate-950">{value}</p>
      <p className="mt-1 text-sm font-bold uppercase tracking-wider text-slate-500">{label}</p>
    </div>
  );
}

function ProductPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-[2rem] bg-teal-300/20 blur-sm" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-white shadow-2xl shadow-slate-950/30">
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Preview Analisis</p>
              <p className="mt-1 text-lg font-black text-slate-950">Ringkasan hasil</p>
            </div>
            <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-black text-teal-700">
              Normal
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-bold text-slate-500">BMI</p>
              <p className="mt-1 text-2xl font-black text-slate-950">22.4</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-bold text-slate-500">Confidence</p>
              <p className="mt-1 text-2xl font-black text-slate-950">87%</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-bold text-slate-500">Riwayat</p>
              <p className="mt-1 text-2xl font-black text-slate-950">Auto</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {PROBABILITY_ROWS.map((row) => (
              <div key={row.label}>
                <div className="mb-2 flex items-center justify-between text-sm font-bold">
                  <span className="text-slate-700">{row.label}</span>
                  <span className="text-slate-500">{row.value}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.value}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-amber-200 flex items-center justify-center text-amber-600">
                <FiTarget className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-950">Saran singkat</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  Pertahankan pola makan seimbang dan aktivitas rutin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { isAuthenticated } = useAuth();
  const primaryTarget = isAuthenticated ? '/cek-obesitas' : '/register';

  return (
    <div className="animate-fade-in bg-slate-50">
      <section className="relative overflow-hidden bg-emerald-950 pt-32 pb-24 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.12)_1px,transparent_0)] [background-size:30px_30px] opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_520px] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-teal-100 backdrop-blur-md">
                <FiActivity className="w-4 h-4" />
                Analisis kesehatan berbasis data
              </div>

              <h1 className="mt-7 max-w-3xl text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl">
                Kenali risiko tubuh dengan analisis yang lebih terarah.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-teal-50/85">
                NutriTrack membantu membaca data tubuh, memprediksi risiko obesitas, dan memberi rekomendasi yang bisa langsung kamu tindaklanjuti.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link to={primaryTarget}>
                  <Button size="lg" className="w-full sm:w-auto rounded-full bg-white text-emerald-950 hover:bg-emerald-50 shadow-2xl shadow-emerald-950/30">
                    {isAuthenticated ? 'Mulai Analisis' : 'Coba Sekarang'}
                    <FiArrowRight className="w-5 h-5 ml-1" />
                  </Button>
                </Link>

                {!isAuthenticated && (
                  <Link to="/login">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full border-white/25 text-teal-50 hover:bg-white/10 hover:text-white backdrop-blur-md">
                      Masuk Akun
                    </Button>
                  </Link>
                )}
              </div>

              <div className="mt-10 grid grid-cols-1 gap-4 max-w-xl sm:grid-cols-3">
                {STATS.slice(0, 3).map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-xl shadow-slate-950/10 backdrop-blur-md">
                    <p className="text-2xl font-black text-white">{stat.value}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-teal-50/70">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <ProductPreview />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-teal-700">Fitur utama</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-black text-slate-950">Dibuat untuk keputusan yang jelas</h2>
            </div>
            <p className="max-w-lg text-base leading-relaxed text-slate-600">
              Fokus pada alur inti: input data, hasil prediksi, dan rekomendasi.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[360px_1fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-teal-700">Cara kerja</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-black text-slate-950">Tiga langkah, tanpa ribet</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Alurnya dibuat pendek supaya kamu bisa fokus pada hasil dan tindak lanjutnya.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {STEPS.map((step, index) => (
                <StepCard key={step.title} index={index} {...step} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat) => (
              <StatBlock key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 border border-slate-200">
            <FiTrendingUp className="w-7 h-7" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950">Mulai dari satu analisis.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            Cek kondisi tubuhmu sekarang, lalu pantau riwayatnya dari profil.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to={primaryTarget}>
              <Button size="lg" className="rounded-full bg-slate-950 text-white hover:bg-slate-800 shadow-slate-950/20">
                {isAuthenticated ? 'Buka Cek Obesitas' : 'Daftar Gratis'}
                <FiArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
