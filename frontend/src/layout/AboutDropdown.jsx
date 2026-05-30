// AboutDropdown.jsx
// Dropdown for "About US" with its four sub-links.

import { aboutLinks } from "./navbarData";
import DropdownTrigger from "./DropdownTrigger";
import DropdownMenu from "./DropdownMenu";

const DROPDOWN_ID = "about-dropdown";

/**
 * @param {object}    props
 * @param {boolean}   props.isOpen
 * @param {() => void} props.onToggle
 * @param {() => void} props.onClose
 */
export default function AboutDropdown({
  isOpen,
  onToggle,
  onClose,
  itemKey,
  hoveredKey,
  onHover,
}) {
  return (
    <div className="relative inline-flex items-center">
      <DropdownTrigger
        label="About US"
        isOpen={isOpen}
        controlsId={DROPDOWN_ID}
        onClick={onToggle}
        itemKey={itemKey}
        hoveredKey={hoveredKey}
        onHover={onHover}
      />
      <DropdownMenu
        id={DROPDOWN_ID}
        isOpen={isOpen}
        links={aboutLinks}
        onClose={onClose}
      />
    </div>
  );
}
