import React, { useRef } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

interface Partner {
  id: string;
  name: string;
  fullName: string;
}

const INSTITUTIONAL_PARTNERS: Partner[] = [
  { id: "frsc", name: "FRSC", fullName: "Federal Road Safety Corps" },
  {
    id: "efcc",
    name: "EFCC",
    fullName: "Economic and Financial Crimes Commission",
  },
  { id: "npf", name: "NIGERIA POLICE", fullName: "Nigeria Police Force" },
  {
    id: "ndlea",
    name: "NDLEA",
    fullName: "National Drug Law Enforcement Agency",
  },
  {
    id: "nscdc",
    name: "CIVIL DEFENCE",
    fullName: "Nigeria Security & Civil Defence Corps",
  },
  { id: "customs", name: "CUSTOMS", fullName: "Nigeria Customs Service" },
  {
    id: "icpc",
    name: "ICPC",
    fullName: "Independent Corrupt Practices Commission",
  },
  {
    id: "aedc",
    name: "AEDC",
    fullName: "Abuja Electricity Distribution Company",
  },
  { id: "nis", name: "IMMIGRATION", fullName: "Nigeria Immigration Service" },
  { id: "fire", name: "FIRE SERVICE", fullName: "Federal Fire Service" },
  {
    id: "fcta",
    name: "FCTA ABUJA",
    fullName: "Federal Capital Territory Administration",
  },
];

export const TrustMarquee: React.FC = () => {
  const track = useRef<HTMLUListElement>(null);
  const scroll = (direction: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({
      left: direction * el.clientWidth * 0.8,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };
  return (
    <section className="nx-partners" aria-label="Institutional partners">
      <div className="nx-container">
        <div className="nx-partner-heading">
          <p className="nx-eyebrow">
            Institutional payroll &amp; credit alignment
          </p>
          <div className="flex gap-2">
            <button
              className="nx-icon-button"
              aria-label="Previous partners"
              onClick={() => scroll(-1)}
            >
              <ArrowLeft size={18} />
            </button>
            <button
              className="nx-icon-button"
              aria-label="Next partners"
              onClick={() => scroll(1)}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
        <ul
          ref={track}
          className="nx-partner-list"
          tabIndex={0}
          aria-label="Institutions"
        >
          {INSTITUTIONAL_PARTNERS.map((partner) => (
            <li key={partner.id}>
              <strong>{partner.name}</strong>
              <span>{partner.fullName}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
