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
    bg-emerald-50/50 border-2 transition-all duration-200
    focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white
    placeholder:text-emerald-800/40 text-emerald-950
    ${Icon ? 'pl-12 pr-5' : 'px-5'}
    ${error ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500' : 'border-emerald-100 hover:border-emerald-200'}
    ${className}
  `;

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-extrabold text-emerald-950">
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 pointer-events-none">
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
        <p className="text-sm font-bold text-red-500 flex items-center gap-1.5 mt-1 animate-slide-up">
          <span className="text-base">⚠️</span> {error}
        </p>
      )}
    </div>
  );
}

