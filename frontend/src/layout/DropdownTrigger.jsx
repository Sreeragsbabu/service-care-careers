// DropdownTrigger.jsx
// The button that opens/closes a dropdown.
// Wraps label text + animated ChevronIcon.

import ChevronIcon from "./ChevronIcon";

/**
 * @param {object}    props
 * @param {string}    props.label        - visible button text
 * @param {boolean}   props.isOpen       - controls active styling & chevron rotation
 * @param {string}    props.controlsId   - aria-controls value (matches DropdownMenu id)
 * @param {() => void} props.onClick
 */
export default function DropdownTrigger({
  label,
  isOpen,
  controlsId,
  onClick,
  itemKey,
  hoveredKey,
  onHover,
}) {
  const showIndicator = hoveredKey ? hoveredKey === itemKey : isOpen;

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => onHover?.(itemKey)}
      onMouseLeave={() => onHover?.(null)}
      aria-expanded={isOpen}
      aria-controls={controlsId}
      aria-haspopup="true"
      className={`relative inline-flex items-center gap-1 px-3 text-xs font-medium pb-1 transition text-slate-900`}
    >
      {label}
      <ChevronIcon isOpen={isOpen} />
      <span
        aria-hidden
        className={`absolute left-0 -bottom-1 h-0.5 w-full bg-[#44c2ce] transform origin-left transition-transform duration-150 ${
          hoveredKey
            ? hoveredKey === itemKey
              ? "scale-x-100"
              : "scale-x-0"
            : isOpen
              ? "scale-x-100"
              : "scale-x-0"
        }`}
      />
    </button>
  );
}
