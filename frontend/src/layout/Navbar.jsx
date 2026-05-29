// Navbar.jsx
// Root navbar component. Owns all open/close state and
// composes NavLogo, DesktopNav, MobileMenuButton, and MobileMenu.

import { useEffect, useRef, useState } from "react";

import NavLogo from "./NavLogo";
import DesktopNav from "./DesktopNav";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

  // Close dropdown when clicking outside the nav
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on browser navigation (back/forward)
  useEffect(() => {
    const handleLocationChange = () => setOpenDropdown(null);
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const handleDropdownToggle = (key) => {
    setOpenDropdown((current) => (current === key ? null : key));
  };

  const handleDropdownClose = () => setOpenDropdown(null);

  return (
    <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-30 font-sans">
      <div className="mx-auto flex max-w-8xl items-center justify-between gap-2 px-6 py-5 lg:px-8">
        <NavLogo />

        <DesktopNav
          openDropdown={openDropdown}
          onToggle={handleDropdownToggle}
          onClose={handleDropdownClose}
          navRef={navRef}
        />

        <MobileMenuButton
          isOpen={mobileOpen}
          onToggle={() => setMobileOpen((v) => !v)}
        />
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </div>
  );
}
