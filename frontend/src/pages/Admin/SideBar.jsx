import Tooltip from "@mui/material/Tooltip";

const NAV_ITEMS = [
  {
    key: "Jobs",
    label: "Jobs",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
  {
    key: "Categories",
    label: "Categories",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    key: "Users",
    label: "Users",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

export function Sidebar({ page, setPage, expanded, onToggle }) {
  return (
    <div
      className="flex flex-col h-full"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
      }}
    >
      {/* Logo area */}
      <div
        className="flex items-center gap-3 px-4 border-b"
        style={{
          height: 64,
          borderColor: "#e2e8f0",
          flexShrink: 0,
        }}
      >
        <div
          className="flex items-center justify-center rounded-xl flex-shrink-0 cursor-pointer"
          onClick={onToggle}
          style={{
            width: 36,
            height: 36,
            background:
              "linear-gradient(135deg, #44c2ce 0%, rgba(68,194,206,0.9) 100%)",
          }}
        >
          <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {expanded && (
          <div className="min-w-0">
            <p className="text-slate-900 text-sm font-semibold leading-tight tracking-tight">
              ServiceCare
            </p>
            <p
              className="text-xs"
              style={{
                color: "rgba(15,23,42,0.65)",
                letterSpacing: "0.06em",
              }}
            >
              Admin
            </p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {expanded && (
          <p
            className="text-xs font-semibold uppercase tracking-widest px-3 mb-3"
            style={{ color: "rgba(15,23,42,0.45)" }}
          >
            Manage
          </p>
        )}
        {NAV_ITEMS.map((item) => {
          const active = page === item.key;
          const btn = (
            <button
              key={item.key}
              onClick={() => setPage(item.key)}
              className="w-full flex items-center gap-3 rounded-xl transition-all duration-150 group"
              style={{
                padding: expanded ? "0.6rem 0.75rem" : "0.6rem",
                justifyContent: expanded ? "flex-start" : "center",
                background: active
                  ? "linear-gradient(90deg, rgba(68,194,206,0.18), rgba(68,194,206,0.08))"
                  : "transparent",
                border: active
                  ? "1px solid rgba(68,194,206,0.25)"
                  : "1px solid transparent",
              }}
            >
              <span
                style={{
                  color: active ? "#44c2ce" : "rgba(15,23,42,0.45)",
                  transition: "color 0.15s",
                  flexShrink: 0,
                }}
                className="transition-colors"
              >
                {item.icon}
              </span>
              {expanded && (
                <span
                  className="text-sm font-medium truncate group-hover:text-slate-900 transition-colors"
                  style={{
                    color: active ? "#0f172a" : "rgba(15,23,42,0.75)",
                  }}
                >
                  {item.label}
                </span>
              )}
              {expanded && active && (
                <span
                  className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "#44c2ce" }}
                />
              )}
            </button>
          );

          return expanded ? (
            <div key={item.key}>{btn}</div>
          ) : (
            <Tooltip
              key={item.key}
              title={item.label}
              placement="right"
              arrow
              componentsProps={{
                tooltip: {
                  style: {
                    fontFamily: "inherit",
                    fontSize: "0.75rem",
                    background: "#f8fafc",
                    color: "#0f172a",
                    padding: "4px 10px",
                    border: "1px solid #e2e8f0",
                  },
                },
                arrow: { style: { color: "#f8fafc" } },
              }}
            >
              <div>{btn}</div>
            </Tooltip>
          );
        })}
      </nav>
    </div>
  );
}
