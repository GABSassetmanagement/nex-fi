import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  CaretDown,
  List,
  Moon,
  Sun,
  X,
} from "@phosphor-icons/react";
import { useTheme } from "../hooks/useTheme";
import { NEXUS_PRODUCTS } from "../data/content";

interface NavbarProps {
  onOpenApply: (productName?: string) => void;
  onNavigate: (view: string, productId?: string) => void;
  currentView?: string;
}
const companyLinks = [
  ["About Nexus", "about"],
  ["Our people", "leadership"],
  ["News & insights", "blog"],
  ["Gallery", "gallery"],
  ["Careers", "careers"],
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenApply,
  onNavigate,
  currentView = "home",
}) => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState<"company" | "products" | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const companyTrigger = useRef<HTMLButtonElement>(null);
  const productTrigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setDropdown(null);
        setMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);
  const navigate = (view: string, productId?: string) => {
    setMenuOpen(false);
    setDropdown(null);
    onNavigate(view, productId);
  };
  return (
    <header
      className="nx-header"
      ref={headerRef}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        if (dropdown === "company") companyTrigger.current?.focus();
        if (dropdown === "products") productTrigger.current?.focus();
        if (menuOpen) mobileTrigger.current?.focus();
        setDropdown(null);
        setMenuOpen(false);
      }}
    >
      <a className="nx-skip" href="#main-content">
        Skip to content
      </a>
      <div className="nx-container nx-nav-row">
        <button
          className="nx-brand"
          aria-label="Nexus Finance home"
          onClick={() => navigate("home")}
        >
          <img
            src={`./assets/nexus/NEXUS-coloured-HOR${theme === "dark" ? "-dark" : ""}.png`}
            alt="Nexus Finance"
            width="150"
            height="48"
          />
        </button>
        <nav className="nx-desktop-nav" aria-label="Main navigation">
          <button
            aria-current={currentView === "home" ? "page" : undefined}
            onClick={() => navigate("home")}
          >
            Home
          </button>
          <div className="nx-nav-group">
            <button
              ref={companyTrigger}
              aria-expanded={dropdown === "company"}
              aria-controls="nx-company-menu"
              onClick={() =>
                setDropdown(dropdown === "company" ? null : "company")
              }
            >
              Who we are <CaretDown size={14} aria-hidden="true" />
            </button>
            {dropdown === "company" && (
              <div id="nx-company-menu" className="nx-dropdown">
                <span className="nx-eyebrow">Meet Nexus</span>
                {companyLinks.map(([label, view]) => (
                  <button key={view} onClick={() => navigate(view)}>
                    {label}
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="nx-nav-group">
            <button
              ref={productTrigger}
              aria-expanded={dropdown === "products"}
              aria-controls="nx-product-menu"
              onClick={() =>
                setDropdown(dropdown === "products" ? null : "products")
              }
            >
              Our products <CaretDown size={14} aria-hidden="true" />
            </button>
            {dropdown === "products" && (
              <div
                id="nx-product-menu"
                className="nx-dropdown nx-dropdown-products"
              >
                <span className="nx-eyebrow">Find your next move</span>
                {NEXUS_PRODUCTS.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => navigate("product-detail", product.id)}
                  >
                    {product.name}
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => navigate("calculator")}>
            Loan calculator
          </button>
          <button onClick={() => navigate("contact")}>Contact</button>
        </nav>
        <div className="nx-nav-actions">
          <button
            className="nx-icon-button nx-theme-button"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <Moon size={20} aria-hidden="true" />
            ) : (
              <Sun size={20} aria-hidden="true" />
            )}
          </button>
          <button
            className="nx-button nx-nav-apply"
            onClick={() => {
              setMenuOpen(false);
              setDropdown(null);
              onOpenApply();
            }}
          >
            Apply now <ArrowUpRight size={18} aria-hidden="true" />
          </button>
          <button
            ref={mobileTrigger}
            className="nx-icon-button nx-menu-trigger"
            aria-expanded={menuOpen}
            aria-controls="nx-mobile-nav"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <List size={24} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav
          id="nx-mobile-nav"
          className="nx-mobile-nav nx-container"
          aria-label="Mobile navigation"
        >
          <button onClick={() => navigate("home")}>Home</button>
          <details>
            <summary>Who we are</summary>
            {companyLinks.map(([label, view]) => (
              <button key={view} onClick={() => navigate(view)}>
                {label}
              </button>
            ))}
          </details>
          <details>
            <summary>Our products</summary>
            {NEXUS_PRODUCTS.map((product) => (
              <button
                key={product.id}
                onClick={() => navigate("product-detail", product.id)}
              >
                {product.name}
              </button>
            ))}
          </details>
          <button onClick={() => navigate("calculator")}>
            Loan calculator
          </button>
          <button onClick={() => navigate("contact")}>Contact us</button>
        </nav>
      )}
    </header>
  );
};
