import { btnGhost } from "../../theme/style/btnGhost";
import { btnPrimary } from "../../theme/style/btnPrimary";
import { AdminStyles } from "./AdminStyles";

export function DeleteModal({ name, onConfirm, onClose }) {
  return (
    <div
      style={AdminStyles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{ ...AdminStyles.modal, maxWidth: 400 }}>
        <div style={AdminStyles.modalHeader}>
          <h2 style={AdminStyles.modalTitle}>Confirm delete</h2>
          <button onClick={onClose} style={AdminStyles.closeBtn}>
            ×
          </button>
        </div>
        <div
          style={{
            background: "#1c0a0a",
            border: "1px solid #3f1111",
            borderRadius: 10,
            padding: "14px 16px",
            marginBottom: 20,
          }}
        >
          <p style={{ fontSize: 13, color: "#fca5a5", lineHeight: 1.6 }}>
            You are about to permanently delete{" "}
            <strong style={{ color: "#f87171" }}>{name}</strong>. This action
            cannot be undone.
          </p>
        </div>
        <div style={AdminStyles.modalFooter}>
          <button onClick={onClose} style={btnGhost}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              ...btnPrimary,
              background: "#7f1d1d",
              borderColor: "#7f1d1d",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
