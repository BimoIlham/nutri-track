import { useState } from 'react';
import { obesityData } from '../../data/recommendationData';
import { FiCheckCircle } from 'react-icons/fi';
import { GiMeal, GiFruitBowl } from 'react-icons/gi';
import { MdSportsGymnastics, MdLocalHospital } from 'react-icons/md';

/**
 * Tab definitions for recommendation sections.
 */
const TABS = [
  { key: 'diet', label: 'Diet', icon: GiFruitBowl, emoji: '🍎' },
  { key: 'olahraga', label: 'Olahraga', icon: MdSportsGymnastics, emoji: '🏃' },
  { key: 'medis', label: 'Medis', icon: MdLocalHospital, emoji: '🏥' },
];

/**
 * Status → color mapping for the card header.
 */
function getStatusStyle(prediction) {
  if (prediction === 'Normal_Weight') return 'from-teal-500 to-emerald-600';
  if (prediction === 'Insufficient_Weight') return 'from-blue-500 to-cyan-600';
  if (prediction.startsWith('Overweight')) return 'from-amber-500 to-orange-500';
  return 'from-rose-500 to-red-600';
}

/**
 * ResultCard — displays obesity prediction result with tabbed recommendations.
 *
 * @param {string} prediction — key from obesityData (e.g. 'Normal_Weight')
 */
export default function ResultCard({ prediction }) {
  const [activeTab, setActiveTab] = useState('diet');
  const data = obesityData[prediction];

  if (!data) return null;

  const gradient = getStatusStyle(prediction);

  return (
    <div className="rounded-3xl shadow-2xl shadow-emerald-900/5 border border-emerald-100 overflow-hidden animate-scale-in">
      {/* ── Status Header ── */}
      <div className={`bg-gradient-to-r ${gradient} px-6 sm:px-10 py-8 text-white`}>
        <h3 className="text-3xl sm:text-4xl font-black tracking-tight">{data.status}</h3>
        <p className="mt-3 text-white/90 text-sm sm:text-lg leading-relaxed font-medium">{data.deskripsi}</p>
      </div>

      {/* ── Tabs ── */}
      <div className="bg-white">
        <div className="flex border-b border-emerald-100">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                flex-1 py-4 px-2 text-sm sm:text-base font-bold transition-all duration-300 cursor-pointer
                flex items-center justify-center gap-2
                ${activeTab === tab.key
                  ? 'text-emerald-700 border-b-2 border-emerald-500 bg-emerald-50/80 shadow-inner'
                  : 'text-emerald-800/60 hover:text-emerald-800 hover:bg-emerald-50/50'
                }
              `}
            >
              <span className="text-xl">{tab.emoji}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ── Tab Content ── */}
        <div className="p-6 sm:p-10">
          <h4 className="text-xl font-extrabold text-emerald-950 mb-6 flex items-center gap-3">
            <span className="p-2 bg-emerald-50 rounded-xl">{TABS.find((t) => t.key === activeTab)?.emoji}</span>
            Rekomendasi {TABS.find((t) => t.key === activeTab)?.label}
          </h4>

          <ul className="space-y-4">
            {data[activeTab].map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-50 transition-all duration-300 hover:shadow-md hover:shadow-emerald-900/5"
              >
                <FiCheckCircle className="w-6 h-6 text-teal-500 mt-0.5 shrink-0" />
                <span className="text-emerald-900 text-base leading-relaxed font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
