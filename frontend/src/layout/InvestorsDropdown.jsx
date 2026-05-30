// InvestorsDropdown.jsx
// Dropdown for "Investors" with its three sub-links.

import { investorsLinks } from "./navbarData";
import DropdownTrigger from "./DropdownTrigger";
import DropdownMenu from "./DropdownMenu";

const DROPDOWN_ID = "investors-dropdown";

/**
 * @param {object}    props
 * @param {boolean}   props.isOpen
 * @param {() => void} props.onToggle
 * @param {() => void} props.onClose
 */
export default function InvestorsDropdown({
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
        label="Investors"
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
        links={investorsLinks}
        onClose={onClose}
      />
    </div>
  );
}
