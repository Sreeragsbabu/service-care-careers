import { TYPE_COLORS, TYPE_LABELS } from "../utils/constants";
import { formatSalary } from "../utils/formatSalary";

export function JobDetailPanel({ job, onClose }) {
  if (!job) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {job.title}
            </h2>
            <p className="text-xs text-cyan-600 font-medium">
              {job.category.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* Meta pills */}
          <div className="flex flex-wrap gap-2">
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full border ${TYPE_COLORS[job.employmentType] || ""}`}
            >
              {TYPE_LABELS[job.employmentType]}
            </span>
            {job.location.map((l) => (
              <span
                key={l}
                className="text-xs bg-slate-50 text-slate-600 border border-slate-200 rounded-full px-3 py-1"
              >
                {l}
              </span>
            ))}
            <span className="text-xs bg-slate-50 text-slate-600 border border-slate-200 rounded-full px-3 py-1">
              {job.experience.min}–{job.experience.max} yrs exp
            </span>
            <span className="text-xs bg-slate-50 text-slate-600 border border-slate-200 rounded-full px-3 py-1">
              {formatSalary(job.salary.min)} – {formatSalary(job.salary.max)} /
              yr
            </span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
              About the role
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities?.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                Responsibilities
              </h3>
              <ul className="space-y-1.5">
                {job.responsibilities.map((r, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
              Skills required
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((s) => (
                <span
                  key={s}
                  className="text-xs bg-cyan-50 text-cyan-700 border border-cyan-200 rounded-lg px-2.5 py-1 font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2">
            <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold py-3 rounded-xl transition-colors">
              Apply for this position
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
