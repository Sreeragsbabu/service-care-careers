// ChevronIcon.jsx
// Reusable animated chevron used by every dropdown trigger.

export default function ChevronIcon({ isOpen }) {
  return (
    <span
      className={`inline-block transform transition-transform duration-200 ${
        isOpen ? "rotate-180" : "rotate-0"
      }`}
      aria-hidden="true"
    >
      <svg
        className="h-3 w-3 text-slate-700"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </span>
  );
}
