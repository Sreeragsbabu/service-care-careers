// NavItem.jsx
// A single top-level navigation link (no dropdown).
// Used for Home, Careers, Blogs, Contact Us.

import { NavLink, useLocation } from "react-router-dom";

/**
 * @param {object} props
 * @param {string} props.to     - route path
 * @param {string} props.label  - link text
 */
export default function NavItem({
  to,
  label,
  itemKey,
  hoveredKey,
  onHover,
  onClick,
  openDropdown,
}) {
  const location = useLocation();
  const isActive =
    to === "/"
      ? location.pathname === "/"
      : location.pathname === to || location.pathname.startsWith(`${to}/`);

  const showIndicator = hoveredKey
    ? hoveredKey === itemKey
    : openDropdown
      ? false
      : isActive;

  return (
    <NavLink
      to={to}
      className={`relative inline-block px-3 text-xs font-medium pb-1 transition text-slate-900`}
      onMouseEnter={() => onHover?.(itemKey)}
      onMouseLeave={() => onHover?.(null)}
      onClick={() => onClick?.()}
    >
      {label}
      <span
        aria-hidden
        className={`absolute left-0 -bottom-1 h-0.5 w-full bg-[#44c2ce] transform origin-left transition-transform duration-150 ${
          showIndicator ? "scale-x-100" : "scale-x-0"
        }`}
      />
    </NavLink>
  );
}
