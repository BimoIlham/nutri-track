import { useState } from 'react';
import { obesityData } from '../../data/recommendationData';
import { FiCheckCircle } from 'react-icons/fi';
import { GiFruitBowl } from 'react-icons/gi';
import { MdSportsGymnastics, MdLocalHospital } from 'react-icons/md';

const TABS = [
  { key: 'diet', label: 'Diet', icon: GiFruitBowl },
  { key: 'olahraga', label: 'Olahraga', icon: MdSportsGymnastics },
  { key: 'medis', label: 'Medis', icon: MdLocalHospital },
];

function getStatusStyle(prediction) {
  if (prediction === 'Normal_Weight') return 'border-teal-200 bg-teal-50 text-teal-800';
  if (prediction === 'Insufficient_Weight') return 'border-sky-200 bg-sky-50 text-sky-800';
  if (prediction.startsWith('Overweight')) return 'border-amber-200 bg-amber-50 text-amber-800';
  return 'border-red-200 bg-red-50 text-red-800';
}

function shortenText(text, maxLength = 118) {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

export default function ResultCard({ prediction }) {
  const [activeTab, setActiveTab] = useState('diet');
  const data = obesityData[prediction];

  if (!data) return null;

  const activeTabData = TABS.find((tab) => tab.key === activeTab);
  const ActiveIcon = activeTabData?.icon;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden animate-scale-in">
      <div className="px-6 py-7 sm:px-8 border-b border-slate-200 bg-white">
        <div className={`inline-flex rounded-full border px-3 py-1 text-sm font-bold ${getStatusStyle(prediction)}`}>
          {data.status}
        </div>
        <h3 className="mt-4 text-2xl font-black tracking-tight text-slate-950">Rekomendasi</h3>
        <p className="mt-2 text-slate-600 text-sm leading-relaxed font-medium">{shortenText(data.deskripsi)}</p>
      </div>

      <div className="bg-white">
        <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`
                  py-4 px-2 text-sm sm:text-base font-bold transition-all duration-300 cursor-pointer
                  flex items-center justify-center gap-2 border-b-2
                  ${isActive
                    ? 'text-teal-700 border-teal-500 bg-white'
                    : 'text-slate-500 border-transparent hover:text-slate-800 hover:bg-white/70'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-6 sm:p-8">
          <h4 className="text-lg font-black text-slate-950 mb-5 flex items-center gap-3">
            {ActiveIcon && (
              <span className="p-2 bg-teal-50 border border-teal-100 rounded-xl text-teal-700">
                <ActiveIcon className="w-5 h-5" />
              </span>
            )}
            Rekomendasi {activeTabData?.label}
          </h4>

          <ul className="space-y-3">
            {data[activeTab].slice(0, 4).map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-4 rounded-xl bg-slate-50 p-4 border border-slate-100"
              >
                <FiCheckCircle className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
                <span className="text-slate-700 text-base leading-relaxed font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
