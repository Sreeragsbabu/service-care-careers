// MobileMenuSection.jsx
// One labelled group of links inside the mobile drawer.
// Used for Workforce, Workspace, About, Investors sections.

import { NavLink } from "react-router-dom";

/**
 * @param {object}   props
 * @param {string}   props.heading   - section label shown in uppercase
 * @param {{ to: string, label: string }[]} props.links
 * @param {() => void} [props.onLinkClick]  - optional callback after nav
 */
export default function MobileMenuSection({ heading, links, onLinkClick }) {
  return (
    <div className="space-y-3">
      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
        {heading}
      </span>
      {links.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `block text-sm text-slate-700 ${isActive ? "font-medium" : ""}`
          }
          onClick={onLinkClick}
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}
