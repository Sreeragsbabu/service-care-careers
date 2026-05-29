import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { btnGhost } from "../../theme/style/btnGhost";
import { btnPrimary } from "../../theme/style/btnPrimary";
import { inputStyle } from "../../theme/style/input";
import { AdminStyles } from "./AdminStyles";

const ROLES = ["admin", "HR"];
const USER_STATUSES = ["active", "inactive", "suspended"];

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(16);
}

export function CreateUserFormModal({ user, onSave, onClose }) {
  const isEdit = !!user?._id;
  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    role: user?.role || "admin",
    status: user?.status || "active",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = "Username is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email is required";
    if (!isEdit && !form.password.trim())
      e.password = "Password is required for new users";
    if (form.password && form.password.length < 8)
      e.password = "Minimum 8 characters";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSave = () => {
    if (!validate()) return;
    const payload = {
      _id: user?._id || uid(),
      username: form.username.trim(),
      email: form.email.trim(),
      role: form.role,
      status: form.status,
      jobsPosted: user?.jobsPosted ?? 0,
      createdAt: user?.createdAt || new Date().toISOString(),
    };
    onSave(payload);
  };

  return (
    <div
      style={AdminStyles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={AdminStyles.modal}>
        <div style={AdminStyles.modalHeader}>
          <h2 style={AdminStyles.modalTitle}>
            {isEdit ? "Edit user" : "New user"}
          </h2>
          <button onClick={onClose} style={AdminStyles.closeBtn}>
            ×
          </button>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          <div>
            <label style={AdminStyles.label}>Username</label>
            <input
              style={inputStyle}
              value={form.username}
              onChange={(e) => set("username", e.target.value)}
              placeholder="e.g. john_doe"
              autoFocus
            />
            {errors.username && (
              <p style={AdminStyles.errorText}>{errors.username}</p>
            )}
          </div>
          <div>
            <label style={AdminStyles.label}>Email</label>
            <input
              style={inputStyle}
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="user@company.com"
            />
            {errors.email && (
              <p style={AdminStyles.errorText}>{errors.email}</p>
            )}
          </div>
          <div>
            <label style={AdminStyles.label}></label>
            <FormControl size="small" fullWidth>
              <InputLabel id="user-role-label">Role</InputLabel>
              <Select
                labelId="user-role-label"
                value={form.role}
                label="Role"
                onChange={(e) => set("role", e.target.value)}
              >
                {ROLES.map((r) => (
                  <MenuItem key={r} value={r}>
                    {r}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <label style={AdminStyles.label}></label>
            <FormControl size="small" fullWidth>
              <InputLabel id="user-status-label">Status</InputLabel>
              <Select
                labelId="user-status-label"
                value={form.status}
                label="Status"
                onChange={(e) => set("status", e.target.value)}
              >
                {USER_STATUSES.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={AdminStyles.label}>
              {isEdit ? "New password" : "Password"}
              {isEdit && (
                <span style={{ color: "#334155", fontWeight: 400 }}>
                  {" "}
                  (leave blank to keep current)
                </span>
              )}
            </label>
            <input
              style={inputStyle}
              type="password"
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
              placeholder={
                isEdit ? "Enter new password to change" : "Min. 8 characters"
              }
            />
            {errors.password && (
              <p style={AdminStyles.errorText}>{errors.password}</p>
            )}
          </div>
        </div>

        <div style={AdminStyles.modalFooter}>
          <button onClick={onClose} style={btnGhost}>
            Cancel
          </button>
          <button onClick={handleSave} style={btnPrimary}>
            {isEdit ? "Save changes" : "Create user"}
          </button>
        </div>
      </div>
    </div>
  );
}
