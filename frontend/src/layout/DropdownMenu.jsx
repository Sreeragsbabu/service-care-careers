// DropdownMenu.jsx
// Generic dropdown panel — renders any list of { to, label } links.
// Used by WorkforceDropdown, WorkspaceDropdown, AboutDropdown, InvestorsDropdown.

import { NavLink } from "react-router-dom";

/**
 * @param {object}   props
 * @param {string}   props.id          - aria id for the panel
 * @param {boolean}  props.isOpen      - visibility flag
 * @param {{ to: string, label: string }[]} props.links
 * @param {() => void} props.onClose   - called after a link is clicked
 */
export default function DropdownMenu({ id, isOpen, links, onClose }) {
  return (
    <div
      id={id}
      role="menu"
      className={`absolute right-0 top-full mt-2 min-w-[18rem] rounded-[1rem] border border-slate-200 bg-white p-4 shadow-2xl transition-opacity duration-200 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="space-y-2">
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            role="menuitem"
            className="block text-sm font-medium text-slate-900"
            onClick={onClose}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
