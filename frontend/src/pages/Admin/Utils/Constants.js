export const EMPTY_JOB = {
  title: "",
  category: { name: "" },
  description: "",
  location: [],
  status: "draft",
  employmentType: "full-time",
  experience: { min: 0, max: 3 },
  salary: { min: 0, max: 0 },
  skills: [],
  responsibilities: [],
};

export const STATUSES = ["draft", "active", "closed", "expired"];

export const EMP_TYPES = [
  "full-time",
  "part-time",
  "contract",
  "remote",
  "internship",
];

export const STATUS_STYLES = {
  draft: { bg: "#f1f5f9", text: "#475569", dot: "#cbd5e1" },
  active: { bg: "#dcfce7", text: "#166534", dot: "#22c55e" },
  closed: { bg: "#fee2e2", text: "#991b1b", dot: "#ef4444" },
  expired: { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" },
};
