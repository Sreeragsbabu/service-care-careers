// WorkspaceDropdown.jsx
// Dropdown for "WorkSpace administration" with its four sub-links.

import { workspaceLinks } from "./navbarData";
import DropdownTrigger from "./DropdownTrigger";
import DropdownMenu from "./DropdownMenu";

const DROPDOWN_ID = "workspace-dropdown";

/**
 * @param {object}    props
 * @param {boolean}   props.isOpen
 * @param {() => void} props.onToggle
 * @param {() => void} props.onClose
 */
export default function WorkspaceDropdown({
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
        label="WorkSpace administration"
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
        links={workspaceLinks}
        onClose={onClose}
      />
    </div>
  );
}
