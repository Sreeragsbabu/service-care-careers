export function CheckboxFilter({ label, count, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-2 cursor-pointer group">
      <span className="flex items-center gap-2">
        <span
          className={`h-4 w-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
            checked
              ? "bg-cyan-600 border-cyan-600"
              : "border-slate-300 group-hover:border-cyan-400"
          }`}
          onClick={onChange}
        >
          {checked && (
            <svg
              className="h-2.5 w-2.5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </span>
        <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
          {label}
        </span>
      </span>
      {count !== undefined && (
        <span className="text-xs text-slate-400 tabular-nums">{count}</span>
      )}
    </label>
  );
}
