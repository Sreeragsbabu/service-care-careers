// DesktopNav.jsx
// The horizontal nav shown on lg+ screens.
// Composes NavItem + all four Dropdown components.

import { useState } from "react";
import NavItem from "./NavItem";
import WorkforceDropdown from "./WorkforceDropdown";
import WorkspaceDropdown from "./WorkspaceDropdown";
import AboutDropdown from "./AboutDropdown";
import InvestorsDropdown from "./InvestorsDropdown";
import { standaloneNavItems } from "./navbarData";

/**
 * @param {object}   props
 * @param {string|null} props.openDropdown   - key of the currently open dropdown
 * @param {(key: string) => void} props.onToggle
 * @param {() => void} props.onClose
 * @param {React.Ref}  props.navRef          - ref for click-outside detection
 */
export default function DesktopNav({
  openDropdown,
  onToggle,
  onClose,
  navRef,
}) {
  const [hoveredNav, setHoveredNav] = useState(null);
  const toggle = (key) => onToggle(key);

  return (
    <nav
      className="hidden items-center gap-0 lg:flex"
      aria-label="Primary navigation"
      ref={navRef}
    >
      {/* Home */}
      <NavItem
        to="/"
        label="Home"
        itemKey="/"
        hoveredKey={hoveredNav}
        onHover={setHoveredNav}
        onClick={onClose}
        openDropdown={openDropdown}
      />

      {/* Dropdowns */}
      <WorkforceDropdown
        isOpen={openDropdown === "workforce"}
        onToggle={() => toggle("workforce")}
        onClose={onClose}
        itemKey="workforce"
        hoveredKey={hoveredNav}
        onHover={setHoveredNav}
      />

      <WorkspaceDropdown
        isOpen={openDropdown === "workspace"}
        onToggle={() => toggle("workspace")}
        onClose={onClose}
        itemKey="workspace"
        hoveredKey={hoveredNav}
        onHover={setHoveredNav}
      />

      <AboutDropdown
        isOpen={openDropdown === "about"}
        onToggle={() => toggle("about")}
        onClose={onClose}
        itemKey="about"
        hoveredKey={hoveredNav}
        onHover={setHoveredNav}
      />

      <InvestorsDropdown
        isOpen={openDropdown === "investors"}
        onToggle={() => toggle("investors")}
        onClose={onClose}
        itemKey="investors"
        hoveredKey={hoveredNav}
        onHover={setHoveredNav}
      />

      {/* Standalone links */}
      {standaloneNavItems.map((item) => (
        <NavItem
          key={item.to}
          to={item.to}
          label={item.label}
          itemKey={item.to}
          hoveredKey={hoveredNav}
          onHover={setHoveredNav}
          onClick={onClose}
          openDropdown={openDropdown}
        />
      ))}
    </nav>
  );
}
