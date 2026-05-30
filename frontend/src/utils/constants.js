export const TYPE_LABELS = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  internship: "Internship",
};

export const TYPE_COLORS = {
  "full-time": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "part-time": "bg-sky-50 text-sky-700 border-sky-200",
  contract: "bg-amber-50 text-amber-700 border-amber-200",
  internship: "bg-violet-50 text-violet-700 border-violet-200",
};

export const SORT_OPTIONS = [
  {
    value: "newest",
    label: "Newest first",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    value: "salary-high",
    label: "Highest salary",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    value: "experience",
    label: "Entry level first",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
];
