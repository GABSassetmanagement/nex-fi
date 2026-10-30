import React, { useState } from 'react';
import { JobOpening, JOB_OPENINGS } from '../data/careersData';
import { JobApplyModal } from './JobApplyModal';
import {
  Briefcase,
  MapPin,
  Heart,
  CurrencyNgn,
  GraduationCap,
  Sparkle,
  ArrowRight,
  CheckCircle,
  Buildings,
  Eye,
  X,
  FileText,
} from '@phosphor-icons/react';

interface CareersPageProps {
  onNavigate: (view: string, productId?: string) => void;
  onOpenApply: (productName?: string) => void;
}

const STORAGE_KEY = 'nexus_career_openings_v1';

export const CareersPage: React.FC<CareersPageProps> = ({ onNavigate, onOpenApply }) => {
  const [jobs] = useState<JobOpening[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      // fallback
    }
    return JOB_OPENINGS;
  });

  const [detailJob, setDetailJob] = useState<JobOpening | null>(null);
  const [applyJob, setApplyJob] = useState<JobOpening | null>(null);
  const [activeDepartment, setActiveDepartment] = useState<string>('All');

  const departments = [
    'All',
    'Credit Risk & Underwriting',
    'Operations & Branch',
    'Fintech & Engineering',
    'Institutional Sales',
  ];

  const filteredJobs =
    activeDepartment === 'All'
      ? jobs
      : jobs.filter((j) => j.department === activeDepartment);

  return (
    <div className="pt-24 pb-20 bg-canvas text-ink font-sans min-h-screen">
      {/* Job Application Modal */}
      <JobApplyModal job={applyJob} onClose={() => setApplyJob(null)} />

      {/* JOB DETAILS MODAL ("Read More" Modal) */}
      {detailJob && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-3 sm:p-6 flex items-center justify-center animate-in fade-in duration-200"
          onClick={() => setDetailJob(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-gradient-to-b from-surface to-surface border border-rule rounded-xl shadow-sm overflow-hidden font-sans text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-rule shrink-0 flex items-start justify-between bg-surface backdrop-blur-md">
              <div className="space-y-2 pr-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-brand bg-accent-soft px-2.5 py-0.5 rounded-md border border-brand/25">
                    {detailJob.department}
                  </span>
                  <span className="text-[11px] text-muted bg-subtle px-2.5 py-0.5 rounded-md border border-rule">
                    {detailJob.type}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-ink font-display">
                  {detailJob.title}
                </h3>
                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-muted">
                  <span className="flex items-center gap-1.5 text-muted">
                    <MapPin className="w-4 h-4 text-brand" />
                    {detailJob.location}
                  </span>
                  <span>&middot;</span>
                  <span className="text-brand font-semibold">{detailJob.salaryRange}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDetailJob(null)}
                className="p-2 rounded-xl bg-subtle hover:bg-subtle text-muted hover:text-ink transition-colors cursor-pointer"
                aria-label="Close Job Details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm text-muted">
              {/* Role Overview */}
              <div>
                <h4 className="text-xs uppercase font-semibold tracking-widest text-brand mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Role Overview &amp; Mandate</span>
                </h4>
                <p className="leading-relaxed text-ink sm:text-base font-normal">
                  {detailJob.description}
                </p>
              </div>

              {/* Responsibilities */}
              {detailJob.responsibilities && detailJob.responsibilities.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase font-semibold tracking-widest text-brand mb-2.5 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    <span>Key Strategic Responsibilities</span>
                  </h4>
                  <ul className="space-y-2">
                    {detailJob.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5 text-ink">
                        <CheckCircle className="w-4 h-4 text-brand shrink-0 mt-0.5" weight="regular" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements & Qualifications */}
              {detailJob.requirements && detailJob.requirements.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase font-semibold tracking-widest text-brand mb-2.5 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>Candidate Profile &amp; Qualifications</span>
                  </h4>
                  <ul className="space-y-2">
                    {detailJob.requirements.map((req, qIdx) => (
                      <li key={qIdx} className="flex items-start gap-2.5 text-ink">
                        <CheckCircle className="w-4 h-4 text-brand shrink-0 mt-0.5" weight="regular" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Experience Badge */}
              <div className="p-4 rounded-xl bg-subtle border border-rule flex items-center justify-between text-xs">
                <span className="text-muted uppercase font-semibold">Seniority &amp; Experience:</span>
                <span className="font-semibold text-ink">{detailJob.experience}</span>
              </div>
            </div>

            {/* Modal Bottom CTA Bar */}
            <div className="p-5 sm:p-6 border-t border-rule bg-surface flex items-center justify-between gap-4 shrink-0">
              <button
                type="button"
                onClick={() => setDetailJob(null)}
                className="px-5 py-2.5 rounded-xl bg-subtle hover:bg-subtle text-muted text-xs font-semibold transition-colors cursor-pointer"
              >
                Back to Openings
              </button>

              <button
                type="button"
                onClick={() => {
                  const target = detailJob;
                  setDetailJob(null);
                  setApplyJob(target);
                }}
                className="px-7 py-3 rounded-xl bg-action hover:bg-action-hover text-on-action text-xs font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer flex items-center gap-2"
              >
                <span>Apply for this Position</span>
                <ArrowRight className="w-4 h-4" weight="regular" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <div className="relative overflow-hidden py-14 sm:py-20 border-b border-rule bg-gradient-to-b from-surface via-surface to-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-brand font-semibold">
              Careers at Nexus Finance
            </span>
            <h1 className="nx-page-title text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink font-display mt-2 mb-4 leading-[1.1]">
              Build the future of <span className="text-brand">ethical financial technology.</span>
            </h1>
            <p className="text-base sm:text-lg text-muted leading-relaxed font-sans">
              Join an elite team of Tier-1 bankers, risk underwriters, and fintech innovators transforming credit access for millions across Nigeria.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Culture & Perks Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="nx-section-title text-2xl sm:text-3xl font-semibold text-ink font-display">
              Why High-Performers Thrive at Nexus
            </h2>
            <p className="text-xs sm:text-sm text-muted mt-2">
              We reward initiative, intellectual rigor, and an uncompromising commitment to customer dignity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-subtle border border-rule hover:border-brand/25 transition-all">
              <div className="w-10 h-10 rounded-xl bg-accent-soft text-brand flex items-center justify-center mb-4">
                <CurrencyNgn className="w-5 h-5" weight="regular" />
              </div>
              <h3 className="text-base font-semibold text-ink font-display mb-1">
                Competitive Compensation
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Benchmark-topping salary packages with performance-linked quarterly profit disbursements.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-subtle border border-rule hover:border-brand/25 transition-all">
              <div className="w-10 h-10 rounded-xl bg-accent-soft text-brand flex items-center justify-center mb-4">
                <Heart className="w-5 h-5" weight="regular" />
              </div>
              <h3 className="text-base font-semibold text-ink font-display mb-1">
                Comprehensive Healthcare (HMO)
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Tier-1 private medical coverage including dental, optical, and dependent spouse/children benefits.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-subtle border border-rule hover:border-warning/25 transition-all">
              <div className="w-10 h-10 rounded-xl bg-warning-soft text-warning flex items-center justify-center mb-4">
                <Sparkle className="w-5 h-5" weight="regular" />
              </div>
              <h3 className="text-base font-semibold text-ink font-display mb-1">
                Staff Welfare &amp; 0% Loans
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Subsidized staff emergency facilities, home-ownership financing, and annual retreat allowances.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-subtle border border-rule hover:border-brand/25 transition-all">
              <div className="w-10 h-10 rounded-xl bg-accent-soft text-brand flex items-center justify-center mb-4">
                <GraduationCap className="w-5 h-5" weight="regular" />
              </div>
              <h3 className="text-base font-semibold text-ink font-display mb-1">
                Continuous Learning
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Dedicated annual executive development allowances, professional certification sponsorships, and technical masterclasses.
              </p>
            </div>
          </div>
        </div>

        {/* Active Openings Section */}
        <div id="openings">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-wider text-brand font-semibold">
                Available Positions
              </span>
              <h2 className="nx-section-title text-2xl sm:text-3xl font-semibold text-ink font-display mt-1">
                Active Job Openings ({filteredJobs.length})
              </h2>
            </div>

            {/* Department Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none font-sans">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveDepartment(dept)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeDepartment === dept
                      ? 'bg-action text-on-action shadow-sm'
                      : 'bg-subtle text-muted hover:text-ink border border-rule'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="p-6 sm:p-8 rounded-xl bg-gradient-to-br from-surface via-surface to-surface border border-rule hover:border-brand/25 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 group"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-brand bg-accent-soft px-2.5 py-0.5 rounded-md border border-brand/25">
                      {job.department}
                    </span>
                    <span className="text-[11px] text-muted bg-subtle px-2.5 py-0.5 rounded-md border border-rule">
                      {job.type}
                    </span>
                    <span className="text-[11px] text-brand bg-accent-soft px-2.5 py-0.5 rounded-md border border-brand/25">
                      {job.experience}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-semibold text-ink font-display group-hover:text-brand transition-colors">
                    {job.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted pt-1 font-sans">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-brand" />
                      {job.location}
                    </span>
                    <span>&middot;</span>
                    <span className="text-ink font-medium">{job.salaryRange}</span>
                  </div>
                </div>

                {/* Read More Action Button as Requested */}
                <div className="shrink-0 flex items-center gap-3">
                  <button
                    onClick={() => setDetailJob(job)}
                    className="w-full lg:w-auto px-6 py-3.5 rounded-xl bg-subtle hover:bg-action text-ink hover:text-ink border border-rule hover:border-brand text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Eye className="w-4 h-4" weight="regular" />
                    <span>Read More</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Speculative Application / Talents Pool */}
        <div className="p-8 sm:p-10 rounded-xl bg-subtle border border-rule text-center max-w-3xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-xl bg-subtle border border-rule flex items-center justify-center text-brand mx-auto">
            <Buildings className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-semibold text-ink font-display">
            Don't see your exact role listed?
          </h3>
          <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-xl mx-auto">
            We are always scouting for top 1% credit analysts, enterprise sales directors, and senior developers. Transmit your CV and portfolio to our executive talent acquisition desk.
          </p>
          <div className="pt-2">
            <a
              href="mailto:support@nexusfinance.com?subject=Speculative%20Application%20-%20Nexus%20Finance"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-subtle hover:bg-subtle text-ink border border-rule text-xs font-semibold transition-colors"
            >
              <span>Email Your CV to support@nexusfinance.com</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
