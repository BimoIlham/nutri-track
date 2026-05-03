import { FiAlertCircle, FiX, FiCheckCircle } from 'react-icons/fi';

export default function AlertModal({ isOpen, onClose, title, message, type = 'error' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-emerald-950/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl shadow-emerald-900/20 p-6 sm:p-8 animate-scale-in flex flex-col items-center text-center border border-emerald-100">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-emerald-800/40 hover:text-emerald-800 hover:bg-emerald-50 rounded-full transition-colors"
        >
          <FiX className="w-5 h-5" />
        </button>

        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner ${
          type === 'error' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'
        }`}>
          {type === 'error' ? <FiAlertCircle className="w-8 h-8" /> : <FiCheckCircle className="w-8 h-8" />}
        </div>

        <h3 className="text-xl font-extrabold text-emerald-950 mb-2">{title}</h3>
        <p className="text-emerald-800/80 text-sm leading-relaxed mb-8">{message}</p>

        <button 
          onClick={onClose}
          className={`w-full py-3 px-6 rounded-full font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 ${
            type === 'error' ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30' : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30'
          }`}
        >
          Mengerti
        </button>
      </div>
    </div>
  );
}
