import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import logoCrema from "@/assets/logo-crema.svg.asset.json";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
] as const;

const serviceLinks = [
  { to: "/services/prenatal-services", label: "Prenatal Support" },
  { to: "/services/lactation-consultations", label: "Lactation &amp; Feeding Consultations" },
  { to: "/services/packages", label: "Bundles" },
] as const;

const tailLinks = [
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export default function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [navOpen, setNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement | null>(null);
  const closeTimer = useRef<number | null>(null);

  const cancelClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const openDropdown = () => {
    cancelClose();
    setDropdownOpen(true);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setDropdownOpen(false), 180);
  };

  useEffect(() => {
    document.body.classList.toggle("nav-lock", navOpen);
    return () => document.body.classList.remove("nav-lock");
  }, [navOpen]);

  useEffect(() => {
    function onDocClick(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setDropdownOpen(false);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
      cancelClose();
    };
  }, []);

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));
  const closeNav = () => {
    setNavOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="site-logo" aria-label="Feed by Feed — Home" onClick={closeNav}>
          <img src={logoCrema.url} width={250} height={80} alt="Feed by Feed" />
        </Link>

        <nav
          className={`site-nav${navOpen ? " is-open" : ""}`}
          id="site-nav"
          aria-label="Primary"
        >
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`nav-link${isActive(link.to) ? " is-active" : ""}`}
                  onClick={closeNav}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li
              className={`has-dropdown${dropdownOpen ? " is-open" : ""}`}
              ref={dropdownRef}
              onMouseEnter={openDropdown}
              onMouseLeave={scheduleClose}
              onFocus={cancelClose}
            >
              <button
                type="button"
                className="nav-trigger"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                onClick={(event) => {
                  event.preventDefault();
                  setDropdownOpen((open) => !open);
                }}
              >
                Services
                <span className="nav-caret" aria-hidden="true"></span>
              </button>
              <ul className="dropdown-menu">
                {serviceLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} onClick={closeNav}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {tailLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`nav-link${isActive(link.to) ? " is-active" : ""}`}
                  onClick={closeNav}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-cta">
          <button type="button" className="btn btn-primary" disabled>
            Book Now
          </button>
          <button
            type="button"
            className="nav-toggle"
            id="nav-toggle"
            aria-controls="site-nav"
            aria-expanded={navOpen}
            aria-label="Toggle menu"
            onClick={() => setNavOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
