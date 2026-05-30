// MobileMenu.jsx
// The slide-down mobile drawer shown when the hamburger is toggled.
// Composes MobileMenuSection + NavItem for each group.

import NavItem from "./NavItem";
import MobileMenuSection from "./MobileMenuSection";
import {
  workforceLinks,
  workspaceLinks,
  aboutLinks,
  investorsLinks,
  standaloneNavItems,
} from "./navbarData";

/**
 * @param {object}    props
 * @param {boolean}   props.isOpen
 * @param {() => void} props.onClose   - collapses menu on link click
 */
export default function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden border-t border-slate-200 bg-white px-6 py-5 shadow-sm">
      <div className="space-y-4">
        {/* Standalone links */}
        {standaloneNavItems.map((item) => (
          <NavItem key={item.to} to={item.to} label={item.label} />
        ))}

        <MobileMenuSection
          heading="Workforce administration"
          links={workforceLinks}
          onLinkClick={onClose}
        />

        <MobileMenuSection
          heading="WorkSpace administration"
          links={workspaceLinks}
          onLinkClick={onClose}
        />

        <MobileMenuSection
          heading="About US"
          links={aboutLinks}
          onLinkClick={onClose}
        />

        <MobileMenuSection
          heading="Investors"
          links={investorsLinks}
          onLinkClick={onClose}
        />
      </div>
    </div>
  );
}
