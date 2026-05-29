import { btnGhost } from "../../theme/style/btnGhost";
import { btnPrimary } from "../../theme/style/btnPrimary";
import { AdminStyles } from "./AdminStyles";

const AVATAR_COLORS = [
  "#1e3a5f",
  "#2d1a4a",
  "#052e16",
  "#1c2340",
  "#1a2e1a",
  "#2e1a1a",
];

const ROLE_STYLES = {
  admin: { bg: "rgba(68,194,206,0.18)", color: "#44c2ce" },
  HR: { bg: "rgba(68,194,206,0.18)", color: "#44c2ce" },
};

const STATUS_STYLES = {
  active: { bg: "#dcfce7", color: "#166534", dot: "#22c55e" },
  inactive: { bg: "#f3f4f6", color: "#475569", dot: "#cbd5e1" },
};

function avatarColor(id) {
  return AVATAR_COLORS[id.charCodeAt(id.length - 1) % AVATAR_COLORS.length];
}

function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.inactive;
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        padding: "3px 10px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 500,
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
      }}
    >
      <span
        style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot }}
      />
      {status}
    </span>
  );
}

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function RoleBadge({ role }) {
  const s = ROLE_STYLES[role] || ROLE_STYLES.admin;
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        padding: "3px 10px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 500,
      }}
    >
      {role}
    </span>
  );
}

export function UserViewModal({ user, onEdit, onClose }) {
  return (
    <div
      style={AdminStyles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{ ...AdminStyles.modal, maxWidth: 380 }}>
        <div style={AdminStyles.modalHeader}>
          <h2 style={AdminStyles.modalTitle}>User details</h2>
          <button onClick={onClose} style={AdminStyles.closeBtn}>
            ×
          </button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "8px 0 24px",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: avatarColor(user._id),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 600,
              color: "#ffffff",
            }}
          >
            {initials(user.username)}
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 600, fontSize: 16, color: "#0f172a" }}>
              {user.username}
            </div>
            <div style={{ fontSize: 13, color: "#475569", marginTop: 3 }}>
              {user.email}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <RoleBadge role={user.role} />
            <StatusBadge status={user.status} />
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid #e2e8f0",
            paddingTop: 20,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {[
            { label: "Jobs posted", value: user.jobsPosted },
            { label: "Member since", value: fmtDate(user.createdAt) },
            {
              label: "User ID",
              value: (
                <code style={{ fontSize: 11, color: "#475569" }}>
                  {user._id}
                </code>
              ),
            },
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 13, color: "#475569" }}>
                {row.label}
              </span>
              <span style={{ fontSize: 13, color: "#0f172a", fontWeight: 500 }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <div style={AdminStyles.modalFooter}>
          <button onClick={onClose} style={btnGhost}>
            Close
          </button>
          <button onClick={onEdit} style={btnPrimary}>
            Edit user
          </button>
        </div>
      </div>
    </div>
  );
}
