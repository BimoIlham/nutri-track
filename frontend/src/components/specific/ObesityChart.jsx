import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import { FiBarChart2 } from 'react-icons/fi';

const CLASS_COLORS = {
  Insufficient_Weight: '#0ea5e9',
  Normal_Weight: '#10b981',
  Overweight_Level_I: '#f59e0b',
  Overweight_Level_II: '#f97316',
  Obesity_Type_I: '#ef4444',
  Obesity_Type_II: '#dc2626',
  Obesity_Type_III: '#b91c1c',
};

const SHORT_LABELS = {
  Insufficient_Weight: 'Kurang',
  Normal_Weight: 'Normal',
  Overweight_Level_I: 'Overweight I',
  Overweight_Level_II: 'Overweight II',
  Obesity_Type_I: 'Obesitas I',
  Obesity_Type_II: 'Obesitas II',
  Obesity_Type_III: 'Obesitas III',
};

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { fullName, probability } = payload[0].payload;

  return (
    <div className="bg-slate-950 text-white px-4 py-3 rounded-xl text-sm shadow-xl border border-slate-800">
      <p className="font-bold">{fullName}</p>
      <p className="text-teal-300 mt-1 text-base font-black">{(probability * 100).toFixed(1)}%</p>
    </div>
  );
}

export default function ObesityChart({ probabilities }) {
  if (!probabilities || Object.keys(probabilities).length === 0) return null;

  const chartData = Object.entries(probabilities).map(([key, value]) => ({
    name: SHORT_LABELS[key] || key,
    fullName: key.replace(/_/g, ' '),
    probability: value,
    color: CLASS_COLORS[key] || '#94a3b8',
  }));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm animate-slide-up">
      <div className="mb-8 flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
          <FiBarChart2 className="w-6 h-6 text-teal-700" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider font-bold text-slate-500">Probabilitas</p>
          <h3 className="text-2xl font-black text-slate-950">Distribusi Kelas</h3>
          <p className="mt-1 text-slate-600 text-base font-medium">Peluang tiap kategori.</p>
        </div>
      </div>

      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: '#334155', fontWeight: 600 }}
              axisLine={{ stroke: '#cbd5e1' }}
              tickLine={false}
              interval={0}
              angle={-25}
              textAnchor="end"
              height={60}
            />
            <YAxis
              tick={{ fontSize: 13, fill: '#334155', fontWeight: 600 }}
              axisLine={{ stroke: '#cbd5e1' }}
              tickLine={false}
              tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
              domain={[0, 1]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(15, 23, 42, 0.04)' }} />
            <Bar dataKey="probability" radius={[8, 8, 0, 0]} maxBarSize={64}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
