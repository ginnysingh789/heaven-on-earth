import { SlidersHorizontal, X } from 'lucide-react';

/**
 * Unified filter bar used across all listing pages.
 * Props:
 *   filters   – array of { key, icon, placeholder, options: [{value, label}] }
 *   values    – { [key]: string }
 *   onChange  – (key, value) => void
 *   onClear   – () => void
 *   count     – total results count (optional)
 */
export default function FilterBar({ filters = [], values = {}, onChange, onClear, count }) {
  const hasActive = filters.some(f => values[f.key]);

  return (
    <div className="flex flex-wrap items-center gap-3 mb-8 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
      {/* Label */}
      <div className="flex items-center gap-2 text-slate-500 pr-2 border-r border-slate-100">
        <SlidersHorizontal className="w-4 h-4" />
        <span className="text-xs font-semibold uppercase tracking-wider">Filter</span>
      </div>

      {/* Select chips */}
      {filters.map(({ key, icon, placeholder, options }) => (
        <div key={key} className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons text-[16px] text-slate-400 pointer-events-none">
            {icon}
          </span>
          <select
            value={values[key] || ''}
            onChange={e => onChange(key, e.target.value)}
            className={`pl-8 pr-8 py-2 text-sm font-medium rounded-full border appearance-none cursor-pointer outline-none transition-all duration-200
              ${values[key]
                ? 'border-[#FF8C00] bg-orange-50 text-[#FF8C00]'
                : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
              }`}
          >
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {/* Chevron */}
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 material-icons text-[14px] text-slate-400 pointer-events-none">
            expand_more
          </span>
        </div>
      ))}

      {/* Clear + count */}
      <div className="flex items-center gap-3 ml-auto">
        {count !== undefined && (
          <span className="text-xs text-slate-400 font-medium">{count} result{count !== 1 ? 's' : ''}</span>
        )}
        {hasActive && (
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-all duration-200"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
