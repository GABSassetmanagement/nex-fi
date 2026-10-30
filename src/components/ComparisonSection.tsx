import React from 'react';
import { Check, X, ShieldCheck, Medal } from '@phosphor-icons/react';

export const ComparisonSection: React.FC = () => {
  const comparisonRows = [
    {
      feature: 'Loan Disbursal Turnaround',
      nexus: 'Guaranteed 5 Hours (Direct to Bank)',
      banks: '3 to 6 Weeks Bureaucracy',
      apps: 'Instant but Predatory',
      highlight: true,
    },
    {
      feature: 'Monthly Interest Rate Structure',
      nexus: 'Clear 5% Flat Monthly (Zero Hidden Fees)',
      banks: 'Complex Compound 28–34% APR + Surprise Charges',
      apps: '40% – 120% Extortionate Daily Rates',
      highlight: true,
    },
    {
      feature: 'Car-for-Cash Equity (Vehicle)',
      nexus: 'Drive your car 100% every single day',
      banks: 'Vehicle physically seized / parked in compound',
      apps: 'Not Offered',
      highlight: true,
    },
    {
      feature: 'Guarantor Requirements (MDAs)',
      nexus: 'Zero Guarantors needed for verified officers',
      banks: '2+ Level 14+ Civil Servant Guarantors',
      apps: 'None (extracts your entire contact book)',
      highlight: false,
    },
    {
      feature: 'Data Privacy & Ethics',
      nexus: 'Bank-Grade NDPR & Zero Defamation Guarantee',
      banks: 'Conservative bureaucracy',
      apps: 'Illegal contact harassment & blackmail',
      highlight: false,
    },
    {
      feature: 'High-Yield Investment Returns',
      nexus: 'Up to 15.5% P.A. Capital-Protected Yield',
      banks: '4% – 5.5% P.A. (Sub-Inflationary)',
      apps: 'Not Offered (Pure Borrowing)',
      highlight: false,
    },
    {
      feature: 'Institutional Accreditation',
      nexus: 'National Cooperative Financing Agency Licensed',
      banks: 'CBN Commercial Banking',
      apps: 'Unregistered / Frequently sanctioned',
      highlight: false,
    },
  ];

  return (
    <section id="comparison" className="py-24 bg-canvas border-t border-rule relative font-body io-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="nx-section-title text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ink mb-5 text-balance font-display">
            Why Nigeria’s professionals <br />
            <span className="text-brand">choose Nexus Finance.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted font-sans">
            Compare our institutional transparency against traditional commercial banks and predatory lending apps.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-xl border border-rule bg-gradient-to-b from-surface to-surface shadow-sm font-sans">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-rule bg-subtle">
                <th className="py-6 px-6 text-xs font-semibold uppercase tracking-wider text-muted w-1/4">
                  Feature / Benefit
                </th>
                <th className="py-6 px-6 text-xs uppercase tracking-wider text-brand bg-accent-soft border-x border-brand/25 w-1/3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-action" />
                    <span className="text-base font-semibold text-ink font-display">Nexus Finance</span>
                  </div>
                </th>
                <th className="py-6 px-6 text-xs uppercase tracking-wider text-muted w-1/5 font-semibold">
                  Commercial Banks
                </th>
                <th className="py-6 px-6 text-xs uppercase tracking-wider text-muted w-1/5 font-semibold">
                  Lending Apps
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {comparisonRows.map((row, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-subtle transition-colors ${
                    row.highlight ? 'bg-accent-soft' : ''
                  }`}
                >
                  <td className="py-5 px-6 font-semibold text-ink">
                    {row.feature}
                  </td>
                  <td className="py-5 px-6 text-brand font-semibold bg-accent-soft border-x border-brand/25">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand shrink-0" weight="regular" />
                      <span>{row.nexus}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-muted">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-danger shrink-0" weight="regular" />
                      <span>{row.banks}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-muted">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-danger shrink-0" weight="regular" />
                      <span>{row.apps}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
