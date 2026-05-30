import { FiAlertCircle } from 'react-icons/fi';

/**
 * Reusable Input component with label, error state, and optional icon.
 *
 * For <select>, pass `type="select"` and `options` array.
 */
export default function Input({
  label,
  id,
  error,
  icon: Icon,
  type = 'text',
  options = [],
  className = '',
  ...props
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  const baseClasses = `
    w-full py-3.5 rounded-xl text-base font-medium
    bg-white border transition-all duration-200
    focus:outline-none focus:ring-4 focus:ring-teal-500/15 focus:border-teal-500
    placeholder:text-slate-400 text-slate-950
    ${Icon ? 'pl-12 pr-5' : 'px-5'}
    ${error ? 'border-red-400 focus:ring-red-500/15 focus:border-red-500' : 'border-slate-200 hover:border-teal-300'}
    ${className}
  `;

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-bold text-slate-800">
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-600 pointer-events-none">
            <Icon className="w-5 h-5" />
          </div>
        )}

        {type === 'select' ? (
          <select id={inputId} className={`${baseClasses} cursor-pointer appearance-none`} {...props}>
            <option value="" disabled hidden>Pilih {label}</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input id={inputId} type={type} className={baseClasses} {...props} />
        )}
      </div>

      {error && (
        <p className="text-sm font-semibold text-red-600 flex items-center gap-1.5 mt-1 animate-slide-up">
          <FiAlertCircle className="w-4 h-4 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}
