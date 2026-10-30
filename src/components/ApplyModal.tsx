import React, { useState, useEffect } from 'react';
import { X, Check, ArrowRight, ShieldCheck, Clock, FileText, Buildings } from '@phosphor-icons/react';
import { NEXUS_PRODUCTS } from '../data/content';
import { useDialogFocus } from '../hooks/useDialogFocus';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
  defaultAmount?: number;
  defaultTenure?: number;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  isOpen,
  onClose,
  defaultProduct,
  defaultAmount,
  defaultTenure,
}) => {
  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<string>(defaultProduct || 'Suremoney Loan');
  const [amount, setAmount] = useState<number>(defaultAmount || 1500000);
  const [tenure, setTenure] = useState<number>(defaultTenure || 6);

  // Applicant info
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('Ministry of Interior');
  const [bvn, setBvn] = useState('');
  const [nin, setNin] = useState('');
  const [referenceId, setReferenceId] = useState('');

  useEffect(() => {
    if (defaultProduct) setSelectedProduct(defaultProduct);
    if (defaultAmount) setAmount(defaultAmount);
    if (defaultTenure) setTenure(defaultTenure);
  }, [defaultProduct, defaultAmount, defaultTenure]);

  const dialogRef = useDialogFocus(isOpen, onClose);

  if (!isOpen) return null;

  // Monthly estimate
  const monthlyRate = 0.05;
  const monthlyInstallment = amount / tenure + amount * monthlyRate;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      const generatedId = `NX-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      setReferenceId(generatedId);
      setStep(4);
    }
  };

  const handleReset = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-sans">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="application-title"
        tabIndex={-1}
        className="relative w-full max-w-2xl rounded-xl bg-gradient-to-b from-surface via-surface to-surface border border-rule p-6 sm:p-8 shadow-sm text-left max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-subtle hover:bg-subtle text-muted hover:text-ink transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs uppercase font-semibold text-brand mb-1 font-sans">
            <ShieldCheck className="w-4 h-4" />
            <span>Encrypted Direct Application · Prompt Disbursal SLA</span>
          </div>
          <h3 id="application-title" className="text-2xl font-semibold text-ink font-display">
            {step === 4 ? 'Application Registered' : 'Fast-Track Loan Application'}
          </h3>
          <p className="text-xs text-muted mt-1 font-sans">
            {step === 1 && 'Step 1 of 3: Select your desired financing facility'}
            {step === 2 && 'Step 2 of 3: Choose requested amount and tenure'}
            {step === 3 && 'Step 3 of 3: Employment and verification credentials'}
            {step === 4 && 'Your verification docket has been transmitted to underwriting'}
          </p>

          {/* Progress bar */}
          {step < 4 && (
            <div className="w-full h-1 bg-subtle rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-action transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          )}
        </div>

        {/* Step 1: Select Facility */}
        {step === 1 && (
          <div className="space-y-3 font-sans">
            <label className="block text-xs uppercase tracking-wider text-muted font-semibold mb-2">
              Select Product:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
              {NEXUS_PRODUCTS.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => setSelectedProduct(prod.name)}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    selectedProduct === prod.name
                      ? 'bg-accent-soft border-brand text-ink shadow-sm'
                      : 'bg-subtle border-rule text-muted hover:border-rule hover:text-ink'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-ink font-sans">{prod.name}</span>
                    {selectedProduct === prod.name && (
                      <Check className="w-4 h-4 text-brand shrink-0" weight="regular" />
                    )}
                  </div>
                  <div className="text-xs text-muted line-clamp-1">{prod.tagline}</div>
                  <div className="text-[11px] text-brand font-semibold mt-2">{prod.turnaroundTime}</div>
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-action hover:bg-action-hover text-on-action font-semibold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                <span>Continue to Amount &amp; Terms</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Amount & Tenure */}
        {step === 2 && (
          <div className="space-y-6 font-sans">
            <div className="p-4 rounded-xl bg-subtle border border-rule">
              <div className="text-xs text-muted">Selected Facility</div>
              <div className="text-sm font-semibold text-ink font-sans">{selectedProduct}</div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="applymodal-field-1" className="text-xs uppercase text-muted font-semibold">Requested Principal (₦):</label>
                <span className="text-xl font-semibold font-display text-ink tabular-nums">
                  ₦{amount.toLocaleString('en-NG')}
                </span>
              </div>
              <input id="applymodal-field-1"
                type="range"
                min="100000"
                max="10000000"
                step="50000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-subtle rounded-lg appearance-none cursor-pointer accent-brand"
              />
              <div className="flex justify-between text-xs text-muted mt-1 font-sans">
                <span>₦100,000</span>
                <span>₦5,000,000</span>
                <span>₦10,000,000</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs uppercase text-muted font-semibold">Repayment Period:</label>
                <span className="text-sm font-semibold font-display text-brand">{tenure} Months</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[3, 6, 9, 12, 18].map((m) => (
                  <button
                    key={m}
                    onClick={() => setTenure(m)}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer font-sans ${
                      tenure === m
                        ? 'bg-action text-on-action border-brand'
                        : 'bg-subtle border-rule text-muted hover:text-ink'
                    }`}
                  >
                    {m} Mos
                  </button>
                ))}
              </div>
            </div>

            {/* Estimated installment summary */}
            <div className="p-4 rounded-xl bg-accent-soft border border-brand/25 flex items-center justify-between text-xs">
              <div>
                <div className="text-muted">Estimated Monthly Installment:</div>
                <div className="text-lg font-semibold font-display text-ink">
                  ₦{Math.round(monthlyInstallment).toLocaleString('en-NG')}
                  <span className="text-xs font-normal text-muted font-sans">/mo</span>
                </div>
              </div>
              <div className="text-right text-brand font-semibold">5.0% Monthly Flat</div>
            </div>

            <div className="flex justify-between pt-2">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs text-muted hover:text-ink transition-colors cursor-pointer"
              >
                &larr; Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 bg-action hover:bg-action-hover text-on-action font-semibold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                <span>Proceed to Personal Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Employment and Verification */}
        {step === 3 && (
          <form onSubmit={handleNext} className="space-y-4 font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="applymodal-field-2" className="block text-xs uppercase text-muted font-semibold mb-1">Full Legal Name *</label>
                <input id="applymodal-field-2"
                  type="text"
                  required
                  placeholder="e.g. Sgt. Ibrahim Danladi"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-subtle border border-rule text-ink text-xs placeholder-muted focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label htmlFor="applymodal-field-3" className="block text-xs uppercase text-muted font-semibold mb-1">Phone Number (WhatsApp) *</label>
                <input id="applymodal-field-3"
                  type="tel"
                  required
                  placeholder="e.g. 0803 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-subtle border border-rule text-ink text-xs placeholder-muted focus:outline-none focus:border-brand"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="applymodal-field-4" className="block text-xs uppercase text-muted font-semibold mb-1">Official Email Address *</label>
                <input id="applymodal-field-4"
                  type="email"
                  required
                  placeholder="officer@agency.gov.ng"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-subtle border border-rule text-ink text-xs placeholder-muted focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label htmlFor="applymodal-field-5" className="block text-xs uppercase text-muted font-semibold mb-1">Employer / Command / Agency *</label>
                <select id="applymodal-field-5"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-subtle border border-rule text-ink text-xs focus:outline-none focus:border-brand cursor-pointer"
                >
                  <option value="EFCC">EFCC (Economic &amp; Financial Crimes)</option>
                  <option value="Nigeria Police Force (NPF)">Nigeria Police Force (NPF)</option>
                  <option value="NSCDC (Civil Defence)">NSCDC (Civil Defence)</option>
                  <option value="NDLEA">NDLEA</option>
                  <option value="FRSC">Federal Road Safety Corps (FRSC)</option>
                  <option value="Nigeria Customs Service (NCS)">Nigeria Customs Service (NCS)</option>
                  <option value="Nigeria Immigration Service (NIS)">Nigeria Immigration Service (NIS)</option>
                  <option value="Federal Fire Service (FFC)">Federal Fire Service (FFC)</option>
                  <option value="Federal Ministry / Parastatal">Federal Ministry / MDA</option>
                  <option value="AEDC / Corporate">AEDC / Private Corporate</option>
                  <option value="Self-Employed / SME">Self-Employed / SME Merchant</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="applymodal-field-6" className="block text-xs uppercase text-muted font-semibold mb-1">
                  Bank Verification Number (BVN) *
                </label>
                <input id="applymodal-field-6"
                  type="text"
                  required
                  maxLength={11}
                  placeholder="11-digit BVN"
                  value={bvn}
                  onChange={(e) => setBvn(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-subtle border border-rule text-ink text-xs placeholder-muted focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label htmlFor="applymodal-field-7" className="block text-xs uppercase text-muted font-semibold mb-1">
                  National Identification Number (NIN) *
                </label>
                <input id="applymodal-field-7"
                  type="text"
                  required
                  maxLength={11}
                  placeholder="11-digit NIN"
                  value={nin}
                  onChange={(e) => setNin(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-subtle border border-rule text-ink text-xs placeholder-muted focus:outline-none focus:border-brand"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-subtle border border-rule text-xs text-muted flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand shrink-0" />
              <span>You will be prompted to attach your recent payslip and staff ID upon automated pre-approval.</span>
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs text-muted hover:text-ink transition-colors cursor-pointer"
              >
                &larr; Back
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-action hover:bg-action-hover text-on-action font-semibold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                <span>Submit Verification &amp; Apply</span>
                <Check className="w-4 h-4" weight="regular" />
              </button>
            </div>
          </form>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="text-center py-6 space-y-5 font-sans">
            <div className="w-16 h-16 rounded-full bg-accent-soft text-brand flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" weight="regular" />
            </div>

            <div>
              <div className="text-xs uppercase text-muted font-semibold">Docket Reference ID</div>
              <div className="text-2xl font-display font-semibold text-brand mt-1">{referenceId}</div>
            </div>

            <div className="p-5 rounded-xl bg-subtle border border-rule text-xs text-muted max-w-lg mx-auto space-y-2 text-left font-sans">
              <div className="flex justify-between">
                <span className="text-muted">Applicant:</span>
                <span className="text-ink font-medium">{fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Facility:</span>
                <span className="text-ink font-medium">{selectedProduct}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Principal:</span>
                <span className="text-brand font-display font-semibold text-sm">₦{amount.toLocaleString('en-NG')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Tenure:</span>
                <span className="text-ink font-medium">{tenure} Months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Estimated Monthly Pay:</span>
                <span className="text-ink font-display font-semibold">₦{Math.round(monthlyInstallment).toLocaleString('en-NG')}</span>
              </div>
            </div>

            <p className="text-xs text-muted max-w-md mx-auto">
              Your application has been received. Our credit verification desk at NICON Insurance Building, CBD Abuja is reviewing your credentials. An officer will call you within 15 minutes to finalize disbursal.
            </p>

            <div className="pt-2">
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-action text-on-action font-semibold text-xs rounded-xl hover:bg-action-hover transition-colors cursor-pointer"
              >
                Close &amp; Return to Overview
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
