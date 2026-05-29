import { useState } from "react";
import { AdminStyles } from "./AdminStyles";
import { inputStyle } from "../../theme/style/input";
import { btnGhost } from "../../theme/style/btnGhost";
import { btnPrimary } from "../../theme/style/btnPrimary";

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(16);
}

export function CreateCategoryFormModal({ category, onSave, onClose }) {
  const isEdit = !!category?._id;
  const [name, setName] = useState(category?.name || "");
  const [desc, setDesc] = useState(category?.description || "");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Category name is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({
      _id: category?._id || uid(),
      name: name.trim(),
      description: desc.trim(),
      jobCount: category?.jobCount ?? 0,
      createdAt: category?.createdAt || new Date().toISOString(),
    });
  };

  return (
    <div
      style={AdminStyles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={AdminStyles.modal}>
        <div style={AdminStyles.modalHeader}>
          <h2 style={AdminStyles.modalTitle}>
            {isEdit ? "Edit category" : "New category"}
          </h2>
          <button onClick={onClose} style={AdminStyles.closeBtn}>
            ×
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={AdminStyles.label}>Category name</label>
            <input
              style={inputStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Software Development"
              autoFocus
            />
            {errors.name && <p style={AdminStyles.errorText}>{errors.name}</p>}
          </div>
          <div>
            <label style={AdminStyles.label}>
              Description{" "}
              <span style={{ color: "#334155", fontWeight: 400 }}>
                (optional)
              </span>
            </label>
            <textarea
              style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Brief description of this category…"
            />
          </div>
        </div>

        <div style={AdminStyles.modalFooter}>
          <button onClick={onClose} style={btnGhost}>
            Cancel
          </button>
          <button onClick={handleSave} style={btnPrimary}>
            {isEdit ? "Save changes" : "Create category"}
          </button>
        </div>
      </div>
    </div>
  );
}
