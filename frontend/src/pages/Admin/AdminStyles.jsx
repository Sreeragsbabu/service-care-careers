export const AdminStyles = {
  // Layout
  topbar: {
    background: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
    padding: "16px 28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  topbarTitle: { fontSize: 18, fontWeight: 600, color: "#0f172a" },
  topbarSub: { fontSize: 12, color: "#64748b", marginTop: 2 },

  // Stat cards
  statCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: "16px 20px",
  },
  statLabel: { fontSize: 12, color: "#64748b", marginBottom: 6 },
  statValue: { fontSize: 28, fontWeight: 700, lineHeight: 1 },

  // Table
  tableWrap: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    overflow: "hidden",
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 13 },
  th: {
    textAlign: "left",
    padding: "11px 16px",
    fontSize: 11,
    fontWeight: 500,
    color: "#64748b",
    background: "#f8fafc",
    borderBottom: "1px solid #e2e8f0",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  td: { padding: "13px 16px", color: "#0f172a", verticalAlign: "middle" },
  emptyCell: {
    textAlign: "center",
    padding: 48,
    color: "#64748b",
    fontSize: 14,
  },

  // Modal
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15,23,42,0.65)",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "40px 16px",
    zIndex: 50,
    overflowY: "auto",
  },
  modal: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    width: "100%",
    maxWidth: 560,
    maxHeight: "calc(100vh - 80px)",
    padding: 28,
    display: "flex",
    flexDirection: "column",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: { fontSize: 18, fontWeight: 600, color: "#0f172a" },
  closeBtn: {
    background: "#f8fafc",
    border: "none",
    borderRadius: 8,
    width: 32,
    height: 32,
    cursor: "pointer",
    color: "#475569",
    fontSize: 18,
    fontFamily: "inherit",
  },
  modalFooter: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 24,
    paddingTop: 20,
    borderTop: "1px solid #e2e8f0",
  },

  // Form
  label: {
    display: "block",
    fontSize: 12,
    fontWeight: 500,
    color: "#475569",
    marginBottom: 6,
  },
  errorText: { fontSize: 11, color: "#dc2626", marginTop: 4 },
};
