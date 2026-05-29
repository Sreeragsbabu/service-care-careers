// WorkforceDropdown.jsx
// Dropdown for "Workforce administration" with its three sub-links.

import { workforceLinks } from "./navbarData";
import DropdownTrigger from "./DropdownTrigger";
import DropdownMenu from "./DropdownMenu";

const DROPDOWN_ID = "workforce-dropdown";

/**
 * @param {object}    props
 * @param {boolean}   props.isOpen
 * @param {() => void} props.onToggle
 * @param {() => void} props.onClose
 */
export default function WorkforceDropdown({
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
        label="Workforce administration"
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
        links={workforceLinks}
        onClose={onClose}
      />
    </div>
  );
}
