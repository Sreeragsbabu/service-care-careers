import { useState, useMemo } from "react";
import { inputStyle } from "../../theme/style/input";
import { btnPrimary } from "../../theme/style/btnPrimary";
import { btnGhostSm } from "../../theme/style/btnGhostSm";
import { DeleteModal } from "./DeleteModal";
import { AdminStyles } from "./AdminStyles";
import { CreateCategoryFormModal } from "./CreatecategoryFormModal";

// ─── Sample Data ──────────────────────────────────────────────────────────────
const SAMPLE_CATEGORIES = [
  {
    _id: "cat1",
    name: "Software Development",
    description:
      "Roles in software engineering, backend, frontend, and full-stack.",
  },
  {
    _id: "cat2",
    name: "Design",
    description: "UI/UX, product design, graphic design, and motion roles.",
  },
  {
    _id: "cat3",
    name: "Data & AI",
    description:
      "Machine learning, data science, analytics, and AI engineering.",
  },
  {
    _id: "cat4",
    name: "Marketing",
    description: "Growth, performance marketing, content, and brand roles.",
  },
  {
    _id: "cat5",
    name: "Operations",
    description: "HR, finance, legal, and general operations.",
  },
];

export default function Categories() {
  const [categories, setCategories] = useState(SAMPLE_CATEGORIES);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;

  const filtered = useMemo(
    () =>
      categories.filter(
        (c) => !search || c.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [categories, search],
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const safePage = Math.min(page, Math.max(1, totalPages));
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const save = (cat) => {
    setCategories((prev) =>
      prev.some((c) => c._id === cat._id)
        ? prev.map((c) => (c._id === cat._id ? cat : c))
        : [cat, ...prev],
    );
    setModal(null);
  };

  const del = (id) => {
    setCategories((prev) => prev.filter((c) => c._id !== id));
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
        {/* Topbar */}
        <div style={AdminStyles.topbar}>
          <div>
            <h1 style={AdminStyles.topbarTitle}>Categories</h1>
            <p style={AdminStyles.topbarSub}>{categories.length} categories</p>
          </div>
          <button
            style={btnPrimary}
            onClick={() => setModal({ type: "create" })}
          >
            + New category
          </button>
        </div>

        <div style={{ padding: 28 }}>
          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
              marginBottom: 24,
            }}
          >
            {[
              {
                label: "Total categories",
                value: categories.length,
                color: "#0f172a",
              },
            ].map((s) => (
              <div key={s.label} style={AdminStyles.statCard}>
                <div style={AdminStyles.statLabel}>{s.label}</div>
                <div style={{ ...AdminStyles.statValue, color: s.color }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          {/* Search */}
          <div style={{ marginBottom: 16 }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories…"
              style={{ ...inputStyle, maxWidth: 300 }}
            />
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
                    {["Category", "Description", "Actions"].map((h) => (
                      <th key={h} style={AdminStyles.th}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={3} style={AdminStyles.emptyCell}>
                        No categories found
                      </td>
                    </tr>
                  ) : (
                    paginated.map((cat, i) => (
                      <tr
                        key={cat._id}
                        style={{
                          borderBottom:
                            i < paginated.length - 1
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
                                width: 32,
                                height: 32,
                                borderRadius: 8,
                                background: "rgba(68,194,206,0.18)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 14,
                                flexShrink: 0,
                              }}
                            >
                              📂
                            </div>
                            <span style={{ fontWeight: 500, color: "#0f172a" }}>
                              {cat.name}
                            </span>
                          </div>
                        </td>
                        <td
                          style={{
                            ...AdminStyles.td,
                            color: "#64748b",
                            fontSize: 12,
                            maxWidth: 260,
                          }}
                        >
                          {cat.description || "—"}
                        </td>
                        <td style={AdminStyles.td}>
                          <div style={{ display: "flex", gap: 6 }}>
                            <button
                              style={btnGhostSm}
                              onClick={() =>
                                setModal({ type: "edit", item: cat })
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
                                setModal({ type: "delete", item: cat })
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
        <CreateCategoryFormModal
          category={null}
          onSave={save}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "edit" && (
        <CreateCategoryFormModal
          category={modal.item}
          onSave={save}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "delete" && (
        <DeleteModal
          name={modal.item.name}
          onConfirm={() => del(modal.item._id)}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
