// NavLogo.jsx
// The brand logo / home link at the far-left of the navbar.

import { NavLink } from "react-router-dom";
import logo from "../assets/servivecare-logo.png";

export default function NavLogo() {
  return (
    <NavLink
      to="/"
      className="inline-flex items-center gap-2 text-slate-900"
      aria-label="home"
    >
      <img src={logo} alt="servivecare logo" className="h-10 w-auto" />
    </NavLink>
  );
}
