import { useState } from "react";
import { AdminStyles } from "./AdminStyles";
import { inputStyle } from "../../theme/style/input";
import { EMP_TYPES, EMPTY_JOB, STATUSES } from "./Utils/Constants";
import { btnGhost } from "../../theme/style/btnGhost";
import { btnPrimary } from "../../theme/style/btnPrimary";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(16);
}

function TagInput({ tags, setTags, placeholder }) {
  const [val, setVal] = useState("");
  const add = () => {
    const v = val.trim();
    if (v && !tags.includes(v)) setTags([...tags, v]);
    setVal("");
  };
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 6,
        padding: "6px 10px",
        background: "#f8fafc",
        border: "1px solid #d1d5db",
        borderRadius: 8,
        minHeight: 42,
      }}
    >
      {tags.map((t) => (
        <span
          key={t}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            background: "rgba(68,194,206,0.18)",
            color: "#44c2ce",
            padding: "2px 8px",
            borderRadius: 20,
            fontSize: 12,
          }}
        >
          {t}
          <button
            onClick={() => setTags(tags.filter((x) => x !== t))}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#44c2ce",
              fontSize: 14,
              lineHeight: 1,
              padding: 0,
            }}
          >
            ×
          </button>
        </span>
      ))}
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            add();
          }
        }}
        placeholder={placeholder}
        style={{
          background: "transparent",
          border: "none",
          outline: "none",
          color: "#475569",
          fontSize: 13,
          minWidth: 100,
          flexGrow: 1,
        }}
      />
    </div>
  );
}

function Field({ label, error, children, style }) {
  return (
    <div style={style}>
      <label style={AdminStyles.label}>{label}</label>
      {children}
      {error && <p style={AdminStyles.errorText}>{error}</p>}
    </div>
  );
}

const rangeLabel = { fontSize: 11, color: "#475569", marginBottom: 4 };
export function CreateJobFormModal({ job: initJob, onSave, onClose }) {
  const isEdit = !!initJob?._id;
  const [form, setForm] = useState(initJob || EMPTY_JOB);
  const [locs, setLocs] = useState(initJob?.location || []);
  const [skills, setSkills] = useState(initJob?.skills || []);
  const [resp, setResp] = useState(initJob?.responsibilities || []);
  const [errors, setErrors] = useState({});

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  const setNested = (parent, key, val) =>
    setForm((f) => ({ ...f, [parent]: { ...f[parent], [key]: val } }));

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Required";
    if (!locs.length) e.location = "Add at least one location";
    if ((form.experience.min || 0) > (form.experience.max || 0))
      e.exp = "Min > Max";
    if ((form.salary.min || 0) > (form.salary.max || 0)) e.sal = "Min > Max";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({
      ...form,
      location: locs,
      skills,
      responsibilities: resp,
      _id: initJob?._id || uid(),
      createdAt: initJob?.createdAt || new Date().toISOString(),
      createdBy: initJob?.createdBy || {
        username: "Admin",
        email: "admin@example.com",
      },
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
            {isEdit ? "Edit job" : "Create new job"}
          </h2>
          <button onClick={onClose} style={AdminStyles.closeBtn}>
            ×
          </button>
        </div>
        <div
          style={{
            overflowY: "auto",
            flex: 1,
            paddingRight: 4,
            marginBottom: 12,
          }}
        >
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <Field
              label="Job title"
              error={errors.title}
              style={{ gridColumn: "1 / -1" }}
            >
              <input
                style={inputStyle}
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="e.g. Senior Engineer"
              />
            </Field>
            <Field label="Category" style={{ gridColumn: "1 / -1" }}>
              <input
                style={inputStyle}
                value={form.category?.name || ""}
                onChange={(e) =>
                  set("category", { ...form.category, name: e.target.value })
                }
                placeholder="e.g. Engineering"
              />
            </Field>
            <Field label="" style={{ marginTop: 5 }}>
              <FormControl size="small" fullWidth>
                <InputLabel id="job-status-label">Status</InputLabel>
                <Select
                  labelId="job-status-label"
                  value={form.status}
                  label="Status"
                  onChange={(e) => set("status", e.target.value)}
                >
                  {STATUSES.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Field>
            <Field style={{ marginTop: 5 }}>
              <FormControl size="small" fullWidth>
                <InputLabel id="job-employment-type-label">
                  Employment type
                </InputLabel>
                <Select
                  labelId="job-employment-type-label"
                  value={form.employmentType}
                  label="Employment type"
                  onChange={(e) => set("employmentType", e.target.value)}
                >
                  {EMP_TYPES.map((t) => (
                    <MenuItem key={t} value={t}>
                      {t}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Field>
            <Field label="Description" style={{ gridColumn: "1 / -1" }}>
              <textarea
                style={{ ...inputStyle, minHeight: 72, resize: "vertical" }}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </Field>
            <Field
              label="Locations — press Enter to add"
              error={errors.location}
              style={{ gridColumn: "1 / -1" }}
            >
              <TagInput tags={locs} setTags={setLocs} placeholder="Add city…" />
            </Field>
            <Field
              label="Skills — press Enter to add"
              style={{ gridColumn: "1 / -1" }}
            >
              <TagInput
                tags={skills}
                setTags={setSkills}
                placeholder="Add skill…"
              />
            </Field>
            <Field
              label="Responsibilities — press Enter to add"
              style={{ gridColumn: "1 / -1" }}
            >
              <TagInput
                tags={resp}
                setTags={setResp}
                placeholder="Add responsibility…"
              />
            </Field>
            <Field label="Experience (yrs)" error={errors.exp}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                }}
              >
                <div>
                  <div style={rangeLabel}>Min</div>
                  <input
                    style={inputStyle}
                    type="number"
                    min={0}
                    value={form.experience.min}
                    onChange={(e) =>
                      setNested("experience", "min", +e.target.value)
                    }
                  />
                </div>
                <div>
                  <div style={rangeLabel}>Max</div>
                  <input
                    style={inputStyle}
                    type="number"
                    min={0}
                    value={form.experience.max}
                    onChange={(e) =>
                      setNested("experience", "max", +e.target.value)
                    }
                  />
                </div>
              </div>
            </Field>
            <Field label="Salary (₹/yr)" error={errors.sal}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                }}
              >
                <div>
                  <div style={rangeLabel}>Min</div>
                  <input
                    style={inputStyle}
                    type="number"
                    min={0}
                    value={form.salary.min}
                    onChange={(e) =>
                      setNested("salary", "min", +e.target.value)
                    }
                  />
                </div>
                <div>
                  <div style={rangeLabel}>Max</div>
                  <input
                    style={inputStyle}
                    type="number"
                    min={0}
                    value={form.salary.max}
                    onChange={(e) =>
                      setNested("salary", "max", +e.target.value)
                    }
                  />
                </div>
              </div>
            </Field>
          </div>
          <div style={AdminStyles.modalFooter}>
            <button onClick={onClose} style={btnGhost}>
              Cancel
            </button>
            <button onClick={handleSave} style={btnPrimary}>
              {isEdit ? "Save changes" : "Create job"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
