import { useState, useMemo } from "react";
import { inputStyle } from "../../theme/style/input";
import { btnPrimary } from "../../theme/style/btnPrimary";
import { btnGhostSm } from "../../theme/style/btnGhostSm";
import { DeleteModal } from "./DeleteModal";
import { AdminStyles } from "./AdminStyles";
import { CreateUserFormModal } from "./CreateUserFormModal";
import { UserViewModal } from "./UserViewModal";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// ─── Sample Data ──────────────────────────────────────────────────────────────
const SAMPLE_USERS = [
  {
    _id: "u1",
    username: "Sreerag",
    email: "sreeragsbabu@servicecare.com",
    role: "admin",
    status: "active",
    jobsPosted: 8,
    createdAt: "2026-01-05T08:00:00.000Z",
  },
  {
    _id: "u2",
    username: "Ananya",
    email: "ananya.k@servicecare.com",
    role: "HR",
    status: "active",
    jobsPosted: 5,
    createdAt: "2026-02-10T09:15:00.000Z",
  },
  {
    _id: "u3",
    username: "Rohit",
    email: "rohit.m@servicecare.com",
    role: "HR",
    status: "inactive",
    jobsPosted: 2,
    createdAt: "2026-02-28T11:00:00.000Z",
  },
  {
    _id: "u4",
    username: "Priya",
    email: "priya.s@servicecare.com",
    role: "HR",
    status: "active",
    jobsPosted: 0,
    createdAt: "2026-03-15T14:00:00.000Z",
  },
  {
    _id: "u5",
    username: "Kiran",
    email: "kiran.b@servicecare.com",
    role: "HR",
    status: "active",
    jobsPosted: 1,
    createdAt: "2026-04-01T08:30:00.000Z",
  },
];

const ROLES = ["admin", "HR"];
const USER_STATUSES = ["active", "inactive"];

const STATUS_STYLES = {
  active: { bg: "#dcfce7", color: "#166534", dot: "#22c55e" },
  inactive: { bg: "#f3f4f6", color: "#475569", dot: "#cbd5e1" },
};

const ROLE_STYLES = {
  admin: { bg: "rgba(68,194,206,0.18)", color: "#44c2ce" },
  HR: { bg: "rgba(68,194,206,0.18)", color: "#44c2ce" },
};

function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
const AVATAR_COLORS = [
  "#1e3a5f",
  "#2d1a4a",
  "#052e16",
  "#1c2340",
  "#1a2e1a",
  "#2e1a1a",
];
function avatarColor(id) {
  return AVATAR_COLORS[id.charCodeAt(id.length - 1) % AVATAR_COLORS.length];
}

// ─── Status & Role badges ─────────────────────────────────────────────────────
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

export default function Users() {
  const [users, setUsers] = useState(SAMPLE_USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [modal, setModal] = useState(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;

  const filtered = useMemo(
    () =>
      users.filter((u) => {
        const q = search.toLowerCase();
        return (
          (!q ||
            u.username.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q)) &&
          (!roleFilter || u.role === roleFilter) &&
          (!statusFilter || u.status === statusFilter)
        );
      }),
    [users, search, roleFilter, statusFilter],
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const safePage = Math.min(page, Math.max(1, totalPages));
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const save = (user) => {
    setUsers((prev) =>
      prev.some((u) => u._id === user._id)
        ? prev.map((u) => (u._id === user._id ? user : u))
        : [user, ...prev],
    );
    setModal(null);
  };

  const del = (id) => {
    setUsers((prev) => prev.filter((u) => u._id !== id));
    setModal(null);
  };

  const stats = useMemo(() => {
    const active = users.filter((u) => u.status === "active").length;
    const admins = users.filter((u) => u.role === "admin").length;
    return [
      { label: "Total users", value: users.length, color: "#0f172a" },
      { label: "Active", value: active, color: "#4ade80" },
      { label: "Admins", value: admins, color: "#2a272d" },
    ];
  }, [users]);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        color: "#0f172a",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        {/* Topbar */}
        <div style={AdminStyles.topbar}>
          <div>
            <h1 style={AdminStyles.topbarTitle}>Users</h1>
            <p style={AdminStyles.topbarSub}>{users.length} total users</p>
          </div>
          <button
            style={btnPrimary}
            onClick={() => setModal({ type: "create" })}
          >
            + New user
          </button>
        </div>

        <div style={{ padding: 28 }}>
          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 12,
              marginBottom: 24,
            }}
          >
            {stats.map((s) => (
              <div key={s.label} style={AdminStyles.statCard}>
                <div style={AdminStyles.statLabel}>{s.label}</div>
                <div style={{ ...AdminStyles.statValue, color: s.color }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div
            style={{
              display: "flex",
              gap: 10,
              marginBottom: 16,
              flexWrap: "wrap",
            }}
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email…"
              style={{ ...inputStyle, maxWidth: 280, flex: 1 }}
            />
            <FormControl size="small" style={{ minWidth: 150, maxWidth: 150 }}>
              <InputLabel id="role-filter-label">Role</InputLabel>
              <Select
                labelId="role-filter-label"
                value={roleFilter}
                label="Role"
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <MenuItem value="">All roles</MenuItem>
                {ROLES.map((r) => (
                  <MenuItem key={r} value={r}>
                    {r}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" style={{ minWidth: 160, maxWidth: 160 }}>
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="">All statuses</MenuItem>
                {USER_STATUSES.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {/* Table */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <div
              style={{
                ...AdminStyles.tableWrap,
                overflowY: "hidden",
              }}
            >
              <table style={AdminStyles.table}>
                <thead>
                  <tr>
                    {["User", "Email", "Role", "Status", "Actions"].map((h) => (
                      <th key={h} style={AdminStyles.th}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={AdminStyles.emptyCell}>
                        No users found
                      </td>
                    </tr>
                  ) : (
                    paginated.map((user, i) => (
                      <tr
                        key={user._id}
                        style={{
                          borderBottom:
                            i < filtered.length - 1
                              ? "1px solid #e2e8f0"
                              : "none",
                        }}
                      >
                        <td style={AdminStyles.td}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                            }}
                          >
                            <div
                              style={{
                                width: 34,
                                height: 34,
                                borderRadius: "50%",
                                background: avatarColor(user._id),
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 13,
                                fontWeight: 600,
                                color: "#ffffff",
                                flexShrink: 0,
                              }}
                            >
                              {initials(user.username)}
                            </div>
                            <span style={{ fontWeight: 500, color: "#0f172a" }}>
                              {user.username}
                            </span>
                          </div>
                        </td>
                        <td
                          style={{
                            ...AdminStyles.td,
                            fontSize: 12,
                            color: "#6b7280",
                          }}
                        >
                          {user.email}
                        </td>
                        <td style={AdminStyles.td}>
                          <RoleBadge role={user.role} />
                        </td>
                        <td style={AdminStyles.td}>
                          <StatusBadge status={user.status} />
                        </td>
                        <td style={AdminStyles.td}>
                          <div style={{ display: "flex", gap: 6 }}>
                            <button
                              style={btnGhostSm}
                              onClick={() =>
                                setModal({ type: "view", item: user })
                              }
                            >
                              View
                            </button>
                            <button
                              style={btnGhostSm}
                              onClick={() =>
                                setModal({ type: "edit", item: user })
                              }
                            >
                              Edit
                            </button>
                            <button
                              style={{
                                ...btnGhostSm,
                                color: "#f87171",
                                borderColor: "#3f1111",
                              }}
                              onClick={() =>
                                setModal({ type: "delete", item: user })
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                borderTop: "1px solid #e2e8f0",
                background: "#f8fafc",
                borderRadius: "0 0 12px 12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 12, color: "#475569" }}>
                  Showing{" "}
                  {paginated.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}–
                  {Math.min(safePage * PAGE_SIZE, filtered.length)} of{" "}
                  {filtered.length}
                </span>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  style={{
                    padding: "5px 12px",
                    fontSize: 12,
                    borderRadius: 6,
                    border: "1px solid #e2e8f0",
                    background: "transparent",
                    color: safePage === 1 ? "#94a3b8" : "#0f172a",
                    cursor: safePage === 1 ? "not-allowed" : "pointer",
                  }}
                >
                  ← Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (p) =>
                      p === 1 ||
                      p === totalPages ||
                      Math.abs(p - safePage) <= 1,
                  )
                  .reduce((acc, p, idx, arr) => {
                    if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, idx) =>
                    p === "..." ? (
                      <span
                        key={`ellipsis-${idx}`}
                        style={{
                          padding: "5px 8px",
                          fontSize: 12,
                          color: "#334155",
                        }}
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        style={{
                          padding: "5px 10px",
                          fontSize: 12,
                          borderRadius: 6,
                          border: "1px solid",
                          borderColor: safePage === p ? "#44c2ce" : "#e2e8f0",
                          background:
                            safePage === p
                              ? "rgba(68,194,206,0.15)"
                              : "transparent",
                          color: safePage === p ? "#44c2ce" : "#6b7280",
                          cursor: "pointer",
                          minWidth: 32,
                        }}
                      >
                        {p}
                      </button>
                    ),
                  )}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages || totalPages === 0}
                  style={{
                    padding: "5px 12px",
                    fontSize: 12,
                    borderRadius: 6,
                    border: "1px solid #e2e8f0",
                    background: "transparent",
                    color:
                      safePage === totalPages || totalPages === 0
                        ? "#94a3b8"
                        : "#0f172a",
                    cursor:
                      safePage === totalPages || totalPages === 0
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>

        {modal?.type === "create" && (
          <CreateUserFormModal
            user={null}
            onSave={save}
            onClose={() => setModal(null)}
          />
        )}
        {modal?.type === "edit" && (
          <CreateUserFormModal
            user={modal.item}
            onSave={save}
            onClose={() => setModal(null)}
          />
        )}
        {modal?.type === "view" && (
          <UserViewModal
            user={modal.item}
            onEdit={() => setModal({ type: "edit", item: modal.item })}
            onClose={() => setModal(null)}
          />
        )}
        {modal?.type === "delete" && (
          <DeleteModal
            name={modal.item.username}
            onConfirm={() => del(modal.item._id)}
            onClose={() => setModal(null)}
          />
        )}
      </div>
    </div>
  );
}
