import { FiLoader } from 'react-icons/fi';

/**
 * Reusable Button component with variants and loading state.
 *
 * @param {'primary'|'secondary'|'outline'|'danger'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {boolean} loading — shows spinner and disables click
 * @param {boolean} fullWidth
 */
const VARIANTS = {
  primary:
    'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 border border-emerald-400/20',
  secondary:
    'bg-emerald-950 text-white hover:bg-emerald-900 shadow-lg shadow-emerald-950/25',
  outline:
    'border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50',
  danger:
    'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/25',
};

const SIZES = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-8 py-3.5 text-base',
  lg: 'px-10 py-4 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        font-semibold rounded-xl
        transition-all duration-200 ease-out
        focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        cursor-pointer
        ${VARIANTS[variant]}
        ${SIZES[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <FiLoader className="animate-spin w-5 h-5" />}
      {children}
    </button>
  );
}
