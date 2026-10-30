import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { LEADERSHIP_TEAM } from '../data/content';
import { LeadershipMember } from '../types';
import {
  Medal,
  Briefcase,
  GraduationCap,
  CheckCircle,
  CaretRight,
  CaretLeft,
  X,
  Buildings,
  ShieldCheck,
  User,
  ArrowUpRight,
} from '@phosphor-icons/react';

export const LeadershipSection: React.FC = () => {
  const [selectedLeaderIndex, setSelectedLeaderIndex] = useState<number>(0);
  const [modalLeader, setModalLeader] = useState<LeadershipMember | null>(null);

  // Keyboard escape handler for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalLeader(null);
      }
    };
    if (modalLeader) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [modalLeader]);

  const handleOpenDossier = (leader: LeadershipMember) => {
    setModalLeader(leader);
  };

  const handleNextInModal = () => {
    if (!modalLeader) return;
    const currentIndex = LEADERSHIP_TEAM.findIndex((l) => l.name === modalLeader.name);
    const nextIndex = (currentIndex + 1) % LEADERSHIP_TEAM.length;
    setModalLeader(LEADERSHIP_TEAM[nextIndex]);
  };

  const handlePrevInModal = () => {
    if (!modalLeader) return;
    const currentIndex = LEADERSHIP_TEAM.findIndex((l) => l.name === modalLeader.name);
    const prevIndex = (currentIndex - 1 + LEADERSHIP_TEAM.length) % LEADERSHIP_TEAM.length;
    setModalLeader(LEADERSHIP_TEAM[prevIndex]);
  };

  const currentLeader = LEADERSHIP_TEAM[selectedLeaderIndex];

  return (
    <section id="leadership" className="py-24 bg-canvas border-t border-rule relative font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="nx-section-title text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ink mb-5 text-balance font-display">
            Led by veterans of <span className="text-brand">Tier-1 banking.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted font-sans">
            Our multidisciplinary executive team brings decades of institutional excellence from FCMB, GTBank, Fidelity Bank, Access Bank, LAPO, and national defence technology architectures.
          </p>
          <div className="mt-3 text-xs text-muted font-sans">
            Click any executive card below to view their comprehensive institutional dossier, full career trajectory, and credentials.
          </div>
        </div>

        {/* 5-EXECUTIVE FULL-CARD GRID (Fuller pictures & prominent interactive click) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 font-sans">
          {LEADERSHIP_TEAM.map((leader, idx) => (
            <div
              key={idx}
              onClick={() => handleOpenDossier(leader)}
              className="group rounded-xl bg-gradient-to-br from-surface via-surface to-surface border border-rule hover:border-brand/25 transition-all duration-300 p-5 flex flex-col justify-between cursor-pointer hover:shadow-sm hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Top ambient glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-soft rounded-full blur-2xl group-hover:bg-accent-soft transition-colors pointer-events-none" />

              <div>
                {/* Fuller, Taller Executive Portrait */}
                <div className="relative aspect-[3/4] min-h-[360px] sm:min-h-[400px] w-full rounded-xl overflow-hidden mb-5 border border-rule bg-subtle group-hover:border-brand/25 transition-colors">
                  {leader.image ? (
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-surface text-center p-6">
                      <div className="w-20 h-20 rounded-full bg-accent-soft border border-brand/25 flex items-center justify-center text-brand mb-4">
                        <User className="w-10 h-10" />
                      </div>
                      <span className="text-ink font-semibold font-display text-lg">{leader.name}</span>
                    </div>
                  )}

                  {/* Gradient shadow overlay for readable label */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Role Badge in bottom left */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md nx-image-badge bg-black/80 backdrop-blur-md text-brand border border-rule">
                      {leader.role}
                    </span>
                    <span className="text-[11px] font-medium text-muted nx-image-badge bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-brand" />
                      Executive
                    </span>
                  </div>
                </div>

                {/* Name & Department */}
                <h3 className="text-xl sm:text-2xl font-semibold text-ink font-display mb-1 group-hover:text-brand transition-colors">
                  {leader.name}
                </h3>
                <div className="text-xs text-muted font-sans mb-3">
                  {leader.department || leader.role}
                </div>

                {/* Prior Institutional background pill */}
                <div className="p-3 rounded-xl bg-subtle border border-rule mb-4 text-xs">
                  <span className="text-muted block text-[10px] uppercase font-semibold tracking-wider mb-1">
                    Institutional Pedigree
                  </span>
                  <p className="text-ink font-medium leading-relaxed">
                    {leader.formerBackground}
                  </p>
                </div>
              </div>

              {/* Action: Click for Full Dossier */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDossier(leader);
                }}
                className="w-full py-3 px-4 rounded-xl bg-subtle group-hover:bg-action group-hover:text-on-action text-ink border border-rule group-hover:border-brand text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
              >
                <span>View Full Executive Dossier</span>
                <ArrowUpRight className="w-3.5 h-3.5" weight="regular" />
              </button>
            </div>
          ))}
        </div>

        {/* Corporate Trust Strip */}
        <div className="p-6 rounded-xl bg-subtle border border-rule grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-muted font-sans">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-brand shrink-0" weight="regular" />
            <div>
              <span className="font-semibold text-ink block mb-0.5">Statutory Governance</span>
              Licensed by National Cooperative Societies, National Cooperative Financing Agency &amp; Abuja Cooperative Federation.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-brand shrink-0" weight="regular" />
            <div>
              <span className="font-semibold text-ink block mb-0.5">Zero Bureaucratic Bottlenecks</span>
              Automated algorithmic credit risk screening combined with seasoned institutional credit underwriters.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-brand shrink-0" weight="regular" />
            <div>
              <span className="font-semibold text-ink block mb-0.5">Physical HQ in Capital</span>
              Operating out of 2nd Floor, Right Wing, NICON Insurance Building, Central Business District (CBD), Abuja.
            </div>
          </div>
        </div>
      </div>

      {/* FULL EXECUTIVE DOSSIER MODAL (Rendered into document.body via createPortal so it is never clipped) */}
      {modalLeader && typeof document !== 'undefined' &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[99999] overflow-y-auto bg-black/85 backdrop-blur-md p-3 sm:p-6 flex items-center justify-center animate-in fade-in duration-200"
            onClick={() => setModalLeader(null)}
          >
            <div
              className="relative w-full max-w-4xl max-h-[90vh] my-auto flex flex-col bg-gradient-to-b from-surface to-surface border border-rule rounded-xl shadow-sm text-left font-sans overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header controls (Pinned top bar) */}
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-rule shrink-0 bg-surface backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-action" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-brand">
                    Executive Profile &amp; Credentials Dossier
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevInModal}
                    aria-label="Previous profile"
                    className="p-2 rounded-xl bg-subtle hover:bg-subtle text-muted hover:text-ink border border-rule transition-colors cursor-pointer"
                  >
                    <CaretLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextInModal}
                    aria-label="Next profile"
                    className="p-2 rounded-xl bg-subtle hover:bg-subtle text-muted hover:text-ink border border-rule transition-colors cursor-pointer"
                  >
                    <CaretRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalLeader(null)}
                    aria-label="Close dossier modal"
                    className="p-2 rounded-xl bg-subtle hover:bg-subtle text-muted hover:text-ink border border-rule transition-colors ml-2 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Body: Scrollable container for portrait + comprehensive info */}
              <div className="p-5 sm:p-8 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  {/* Col 1: Executive Portrait */}
                  <div className="md:col-span-5 flex flex-col items-center">
                    <div className="relative aspect-[3/4] h-72 sm:h-80 md:h-[360px] w-full max-w-sm rounded-xl overflow-hidden border border-rule bg-subtle shadow-sm mb-4">
                      {modalLeader.image ? (
                        <img
                          src={modalLeader.image}
                          alt={modalLeader.name}
                          className="w-full h-full object-cover object-top"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-subtle text-brand">
                          <User className="w-16 h-16" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-xs font-semibold uppercase tracking-wider text-brand nx-image-badge bg-black/80 px-2.5 py-1 rounded-md border border-rule">
                          {modalLeader.role}
                        </span>
                        <h3 className="text-2xl font-semibold text-ink font-display mt-2">
                          {modalLeader.name}
                        </h3>
                      </div>
                    </div>

                    {/* Prior Institution Card */}
                    <div className="w-full p-4 rounded-xl bg-subtle border border-rule text-xs">
                      <div className="flex items-center gap-2 text-muted font-semibold mb-1 text-[11px] uppercase tracking-wider">
                        <Buildings className="w-4 h-4 text-brand" />
                        <span>Prior Institutional Pedigree</span>
                      </div>
                      <p className="text-ink font-medium">
                        {modalLeader.formerBackground}
                      </p>
                    </div>
                  </div>

                  {/* Col 2: Unabridged Biography & Comprehensive Credentials */}
                  <div className="md:col-span-7 space-y-6 text-ink text-sm">
                    {/* Full Biography */}
                    <div>
                      <h4 className="text-xs uppercase font-semibold tracking-widest text-brand mb-2 flex items-center gap-2">
                        <span>Executive Biography &amp; Track Record</span>
                      </h4>
                      <p className="text-muted leading-relaxed text-sm sm:text-base font-normal">
                        {modalLeader.fullBio || modalLeader.bio}
                      </p>
                    </div>

                    {/* Education & Academic Credentials */}
                    {modalLeader.education && modalLeader.education.length > 0 && (
                      <div>
                        <h4 className="text-xs uppercase font-semibold tracking-widest text-brand mb-2.5 flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-brand" />
                          <span>Academic Background &amp; Universities</span>
                        </h4>
                        <ul className="space-y-1.5">
                          {modalLeader.education.map((edu, eIdx) => (
                            <li key={eIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted">
                              <CheckCircle className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                              <span>{edu}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Career Milestones */}
                    {modalLeader.careerHighlights && modalLeader.careerHighlights.length > 0 && (
                      <div>
                        <h4 className="text-xs uppercase font-semibold tracking-widest text-brand mb-2.5 flex items-center gap-2">
                          <Medal className="w-4 h-4 text-brand" />
                          <span>Key Career Achievements &amp; Milestones</span>
                        </h4>
                        <ul className="space-y-1.5">
                          {modalLeader.careerHighlights.map((hl, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted">
                              <CheckCircle className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Core Responsibilities at Nexus */}
                    {modalLeader.coreResponsibilities && modalLeader.coreResponsibilities.length > 0 && (
                      <div>
                        <h4 className="text-xs uppercase font-semibold tracking-widest text-brand mb-2.5 flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-brand" />
                          <span>Nexus Finance Mandate &amp; Strategic Oversight</span>
                        </h4>
                        <ul className="space-y-1.5">
                          {modalLeader.coreResponsibilities.map((resp, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted">
                              <CheckCircle className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Certifications & Fellowships */}
                    <div>
                      <h4 className="text-xs uppercase font-semibold tracking-widest text-brand mb-2.5 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-brand" />
                        <span>Chartered Certifications &amp; Professional Fellowships</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {modalLeader.certifications.map((cert, cIdx) => (
                          <span
                            key={cIdx}
                            className="text-xs px-3 py-1.5 rounded-lg bg-subtle border border-rule text-ink font-medium"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Close Button at bottom */}
                    <div className="pt-4 border-t border-rule flex justify-end">
                      <button
                        type="button"
                        onClick={() => setModalLeader(null)}
                        className="px-6 py-2.5 rounded-xl bg-surface text-ink font-semibold text-xs hover:bg-action transition-colors cursor-pointer"
                      >
                        Close Dossier
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};
