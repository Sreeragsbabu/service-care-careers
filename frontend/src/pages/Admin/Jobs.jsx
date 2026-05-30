import { useState, useMemo } from "react";
import { MOCK_JOBS } from "../jobs";
import { inputStyle } from "../../theme/style/input";
import { btnPrimary } from "../../theme/style/btnPrimary";
import { btnGhostSm } from "../../theme/style/btnGhostSm";
import { DeleteModal } from "./DeleteModal";
import { AdminStyles } from "./AdminStyles";
import { EMP_TYPES, STATUS_STYLES, STATUSES } from "./Utils/Constants";
import { CreateJobFormModal } from "./CreateJobFormModal";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function fmtSalary(s) {
  if (!s?.min && !s?.max) return "—";
  const f = (n) =>
    n >= 100000 ? (n / 100000).toFixed(1) + "L" : (n / 1000).toFixed(0) + "K";
  return `₹${f(s.min)} – ₹${f(s.max)}`;
}

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.draft;
  return (
    <span
      style={{
        background: s.bg,
        color: s.text,
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
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: s.dot,
          flexShrink: 0,
        }}
      />
      {status}
    </span>
  );
}

export default function Jobs() {
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [modal, setModal] = useState(null);

  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;

  // Remove setPage(1) from useMemo — keep filtered as pure derivation
  const filtered = useMemo(
    () =>
      jobs.filter((j) => {
        const q = (search || "").toString().toLowerCase().trim();
        const statusVal = (j.status || "").toString().toLowerCase().trim();
        const typeVal = (j.employmentType || "")
          .toString()
          .toLowerCase()
          .trim();
        const filterStatus = (statusFilter || "")
          .toString()
          .toLowerCase()
          .trim();
        const filterType = (typeFilter || "").toString().toLowerCase().trim();

        return (
          (!q ||
            (j.title || "").toString().toLowerCase().includes(q) ||
            (j.category?.name || "").toString().toLowerCase().includes(q)) &&
          (!filterStatus || statusVal === filterStatus) &&
          (!filterType || typeVal === filterType)
        );
      }),
    [jobs, search, statusFilter, typeFilter],
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const safePage = Math.min(page, Math.max(1, totalPages));
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const stats = useMemo(() => {
    const counts = { draft: 0, active: 0, closed: 0, expired: 0 };
    jobs.forEach((j) => counts[j.status]++);
    return [
      { label: "Total", value: jobs.length, color: "#0f172a" },
      { label: "Active", value: counts.active, color: "#4ade80" },
      { label: "Draft", value: counts.draft, color: "#7dd3fc" },
      { label: "Closed", value: counts.closed, color: "#f87171" },
    ];
  }, [jobs]);

  const saveJob = (job) => {
    setJobs((prev) =>
      prev.some((j) => j._id === job._id)
        ? prev.map((j) => (j._id === job._id ? job : j))
        : [job, ...prev],
    );
    setModal(null);
  };

  const deleteJob = (id) => {
    setJobs((prev) => prev.filter((j) => j._id !== id));
    setModal(null);
  };

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
        <div style={AdminStyles.topbar}>
          <div>
            <h1 style={AdminStyles.topbarTitle}>Jobs</h1>
            <p style={AdminStyles.topbarSub}>{jobs.length} total positions</p>
          </div>
          <button
            style={btnPrimary}
            onClick={() => setModal({ type: "create" })}
          >
            + New job
          </button>
        </div>

        <div style={{ padding: 28 }}>
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
              placeholder="Search jobs…"
              style={{ ...inputStyle, maxWidth: 240, flex: 1 }}
            />
            <FormControl size="small" style={{ minWidth: 160, maxWidth: 160 }}>
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="">All statuses</MenuItem>
                {STATUSES.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" style={{ minWidth: 170, maxWidth: 170 }}>
              <InputLabel id="type-filter-label">Type</InputLabel>
              <Select
                labelId="type-filter-label"
                value={typeFilter}
                label="Type"
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <MenuItem value="">All types</MenuItem>
                {EMP_TYPES.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

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
                    {[
                      "Title & Category",
                      "Status",
                      "Locations",
                      "Type",
                      "Experience",
                      "Salary",
                      "Actions",
                    ].map((h) => (
                      <th key={h} style={AdminStyles.th}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={AdminStyles.emptyCell}>
                        No jobs found
                      </td>
                    </tr>
                  ) : (
                    paginated.map((job, i) => (
                      <tr
                        key={job._id}
                        style={{
                          borderBottom:
                            i < paginated.length - 1
                              ? "1px solid #e2e8f0"
                              : "none",
                        }}
                      >
                        <td style={AdminStyles.td}>
                          <div style={{ fontWeight: 500, color: "#0f172a" }}>
                            {job.title}
                          </div>
                          <div
                            style={{
                              fontSize: 11,
                              color: "#6b7280",
                              marginTop: 3,
                            }}
                          >
                            {job.category.name}
                          </div>
                        </td>
                        <td style={AdminStyles.td}>
                          <StatusBadge status={job.status} />
                        </td>
                        <td
                          style={{
                            ...AdminStyles.td,
                            fontSize: 12,
                            color: "#6b7280",
                          }}
                        >
                          {job.location.join(", ")}
                        </td>
                        <td
                          style={{
                            ...AdminStyles.td,
                            fontSize: 12,
                            color: "#94a3b8",
                          }}
                        >
                          {job.employmentType}
                        </td>
                        <td
                          style={{
                            ...AdminStyles.td,
                            fontSize: 12,
                            color: "#6b7280",
                          }}
                        >
                          {job.experience.min}–{job.experience.max} yrs
                        </td>
                        <td
                          style={{
                            ...AdminStyles.td,
                            fontSize: 12,
                            color: "#94a3b8",
                          }}
                        >
                          {fmtSalary(job.salary)}
                        </td>
                        <td style={AdminStyles.td}>
                          <div style={{ display: "flex", gap: 6 }}>
                            <button
                              style={btnGhostSm}
                              onClick={() => setModal({ type: "edit", job })}
                            >
                              Edit
                            </button>
                            <button
                              style={{
                                ...btnGhostSm,
                                color: "#f87171",
                                borderColor: "#3f1111",
                              }}
                              onClick={() => setModal({ type: "delete", job })}
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
                  {filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}–
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
      </div>

      {modal?.type === "create" && (
        <CreateJobFormModal
          job={null}
          onSave={saveJob}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "edit" && (
        <CreateJobFormModal
          job={modal.job}
          onSave={saveJob}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "delete" && (
        <DeleteModal
          name={modal.job.title}
          onConfirm={() => deleteJob(modal.job._id)}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
