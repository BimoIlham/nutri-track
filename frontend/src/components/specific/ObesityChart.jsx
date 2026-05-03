import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';

/**
 * Color mapping for obesity classes — green ▸ yellow ▸ orange ▸ red
 */
const CLASS_COLORS = {
  Insufficient_Weight: '#0ea5e9', // sky-500
  Normal_Weight: '#10b981', // emerald-500
  Overweight_Level_I: '#f59e0b', // amber-500
  Overweight_Level_II: '#f97316', // orange-500
  Obesity_Type_I: '#ef4444', // red-500
  Obesity_Type_II: '#dc2626', // red-600
  Obesity_Type_III: '#b91c1c', // red-700
};

/**
 * Short labels for chart readability.
 */
const SHORT_LABELS = {
  Insufficient_Weight: 'Kurang',
  Normal_Weight: 'Normal',
  Overweight_Level_I: 'Overweight I',
  Overweight_Level_II: 'Overweight II',
  Obesity_Type_I: 'Obesitas I',
  Obesity_Type_II: 'Obesitas II',
  Obesity_Type_III: 'Obesitas III',
};

/**
 * Custom tooltip for the bar chart.
 */
function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { fullName, probability } = payload[0].payload;

  return (
    <div className="bg-emerald-950 text-white px-4 py-3 rounded-xl text-sm shadow-xl border border-emerald-800">
      <p className="font-bold">{fullName}</p>
      <p className="text-teal-400 mt-1 text-base font-black">{(probability * 100).toFixed(1)}%</p>
    </div>
  );
}

/**
 * ObesityChart — Bar chart showing probability distribution across all obesity classes.
 *
 * @param {Object} probabilities — key-value map { className: probability (0-1) }
 */
export default function ObesityChart({ probabilities }) {
  if (!probabilities || Object.keys(probabilities).length === 0) return null;

  const chartData = Object.entries(probabilities).map(([key, value]) => ({
    name: SHORT_LABELS[key] || key,
    fullName: key.replace(/_/g, ' '),
    probability: value,
    color: CLASS_COLORS[key] || '#94a3b8',
  }));

  return (
    <div className="bg-white rounded-3xl shadow-2xl shadow-emerald-900/5 border border-emerald-100 p-6 sm:p-10 animate-slide-up">
      <h3 className="text-2xl font-black text-emerald-950 mb-2">📊 Distribusi Probabilitas</h3>
      <p className="text-emerald-800/80 text-base mb-8 font-medium">Probabilitas untuk setiap kelas obesitas berdasarkan data Anda.</p>

      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ecfdf5" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: '#064e3b', fontWeight: 600 }}
              axisLine={{ stroke: '#d1fae5' }}
              tickLine={false}
              interval={0}
              angle={-25}
              textAnchor="end"
              height={60}
            />
            <YAxis
              tick={{ fontSize: 13, fill: '#064e3b', fontWeight: 600 }}
              axisLine={{ stroke: '#d1fae5' }}
              tickLine={false}
              tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
              domain={[0, 1]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(16, 185, 129, 0.05)' }} />
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
