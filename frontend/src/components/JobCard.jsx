import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TYPE_COLORS, TYPE_LABELS } from "../utils/constants";

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export function JobCard({ job, onClick }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  };

  return (
    <>
      <style>{`
        .job-card {
          position: relative;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 1.25rem;
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.25s ease,
                      border-color 0.2s ease;
          will-change: transform;
          overflow: hidden;
        }
        .job-card:hover {
          transform: translateY(-6px) scale(1.018);
          border-color: #67e8f9;
          box-shadow: 0 20px 40px -12px rgba(8, 145, 178, 0.18),
                      0 8px 16px -8px rgba(8, 145, 178, 0.12);
        }
        .job-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          background: radial-gradient(
            circle at var(--mx, 50%) var(--my, 50%),
            rgba(8, 145, 178, 0.07) 0%,
            transparent 65%
          );
        }
        .job-card:hover::before {
          opacity: 1;
        }
        .job-card-title {
          transition: color 0.2s ease;
        }
        .job-card:hover .job-card-title {
          color: #0e7490;
        }
        .job-card-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: transparent;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.2s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          color: #0e7490;
          flex-shrink: 0;
        }
        .job-card:hover .job-card-arrow {
          opacity: 1;
          transform: translateX(0);
        }
        .job-card-skill {
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .job-card:hover .job-card-skill {
          background: #ecfeff;
          border-color: #a5f3fc;
          color: #0e7490;
        }
      `}</style>

      <article
        className="job-card"
        onClick={() => (onClick ? onClick(job) : navigate(`/jobs/${job._id}`))}
        onMouseLeave={() => setPos({ x: 50, y: 50 })}
        onMouseMove={handleMouseMove}
        style={{ "--mx": `${pos.x}%`, "--my": `${pos.y}%` }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0 flex items-center gap-2 text-xs text-slate-400">
            <h3 className="job-card-title text-base font-semibold text-slate-900 leading-snug truncate">
              {job.title}
            </h3>
            <span className="job-card-arrow">
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
            <span className="flex items-center justify-center gap-1">
              <svg
                className="h-3.5 w-3.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {job.experience.min}–{job.experience.max} yrs
            </span>
          </div>
          <span
            className={`flex-shrink-0 text-xs font-medium px-2.5 py-1 rounded-full border ${
              TYPE_COLORS[job.employmentType] ||
              "bg-slate-50 text-slate-600 border-slate-200"
            }`}
          >
            {TYPE_LABELS[job.employmentType] || job.employmentType}
          </span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {job.skills.slice(0, 4).map((s) => (
            <span
              key={s}
              className="job-card-skill text-xs bg-slate-50 text-slate-600 border border-slate-200 rounded-md px-2 py-0.5"
            >
              {s}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="text-xs text-slate-400">
              +{job.skills.length - 4}
            </span>
          )}
        </div>

        {/* Footer meta */}
        <div className="grid grid-cols-3 pt-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <svg
              className="h-3.5 w-3.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="truncate">
              {job.location.slice(0, 2).join(", ")}
              {job.location.length > 2 ? ` +${job.location.length - 2}` : ""}
            </span>
          </span>
        </div>

        <div className="text-xs text-slate-400 mt-2">
          Posted {timeAgo(job.createdAt)}
        </div>
      </article>
    </>
  );
}
