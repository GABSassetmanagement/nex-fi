import React, { useState } from 'react';
import {
  Calculator,
  ArrowRight,
  ShieldCheck,
  Clock,
  Check,
  TrendUp,
  Sparkle,
  Buildings,
  Car,
  UserCheck,
  Briefcase,
} from '@phosphor-icons/react';

interface InteractiveCalculatorProps {
  onOpenApply: (productName?: string, amount?: number, tenure?: number) => void;
}

export const InteractiveCalculator: React.FC<InteractiveCalculatorProps> = ({ onOpenApply }) => {
  const [calculatorMode, setCalculatorMode] = useState<'loan' | 'investment'>('loan');

  // Loan state - 1 month default tenure for all products as requested
  const [selectedProduct, setSelectedProduct] = useState<string>('suremoney');
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [loanAmountInput, setLoanAmountInput] = useState<string>('1,000,000');
  const [loanTenure, setLoanTenure] = useState<number>(1); // 1 month default for all products

  // Investment state - with typed input support
  const [investAmount, setInvestAmount] = useState<number>(2000000);
  const [investAmountInput, setInvestAmountInput] = useState<string>('2,000,000');
  const [investTenure, setInvestTenure] = useState<number>(365); // days
  const [payoutSchedule, setPayoutSchedule] = useState<'monthly' | 'maturity'>('monthly');

  // Rate lookup based on selected product facility
  const getProductRate = (prod: string) => {
    switch (prod) {
      case 'nwel':
        return { rate: 0.035, label: '3.5% Monthly Concessionary', name: 'Nexus Women Empowerment (NWEL)', maxAmt: 5000000 };
      case 'nexus-credit':
        return { rate: 0.045, label: '4.5% Monthly Remita', name: 'Nexus Credit', maxAmt: 5000000 };
      case 'travel':
        return { rate: 0.04, label: '4.0% Placement Fee', name: 'Travel Financing', maxAmt: 50000000 };
      case 'invoice':
        return { rate: 0.04, label: '4.0% Monthly Factoring', name: 'Invoice Discounting Facility (IDF)', maxAmt: 50000000 };
      case 'gold':
        return { rate: 0.045, label: '4.5% Monthly Secured', name: 'Gold-for-Cash (GFC)', maxAmt: 20000000 };
      case 'sobl':
        return { rate: 0.055, label: '5.5% Monthly SME', name: 'Shop-Owned-Based Loan (SOBL)', maxAmt: 15000000 };
      case 'cfc':
        return { rate: 0.05, label: '5.0% Monthly Depot Secured', name: 'Car-for-Cash (CFC)', maxAmt: 25000000 };
      case 'suremoney':
      default:
        return { rate: 0.05, label: '5.0% Monthly Flat', name: 'Suremoney Loan', maxAmt: 10000000 };
    }
  };

  const productConfig = getProductRate(selectedProduct);
  const monthlyInterestRate = productConfig.rate;
  const processingFeePercent = 0.04;
  const processingFee = loanAmount * processingFeePercent;
  const monthlyInterest = loanAmount * monthlyInterestRate;
  const monthlyPrincipal = loanAmount / loanTenure;
  const monthlyInstallment = monthlyPrincipal + monthlyInterest;
  const totalInterest = monthlyInterest * loanTenure;
  const totalRepayment = loanAmount + totalInterest;

  // Calculations for investment (12.5% for 90d, 14% for 180d, 15.5% for 365d)
  const getAnnualRate = (days: number) => {
    if (days <= 90) return 0.125;
    if (days <= 180) return 0.14;
    return 0.155;
  };

  const annualRate = getAnnualRate(investTenure);
  const estimatedReturn = investAmount * (annualRate * (investTenure / 365));
  const totalInvestmentMaturity = investAmount + estimatedReturn;
  const bankAverageReturn = investAmount * (0.045 * (investTenure / 365)); // 4.5% commercial bank average

  return (
    <section id="calculator" className="py-24 relative overflow-hidden bg-canvas font-body io-reveal">
      {/* Glow aura */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-subtle via-subtle to-subtle rounded-full blur-[160px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="nx-section-title text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ink mb-5 text-balance font-display">
            Real calculations. <span className="text-brand">Zero hidden surprises.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted font-sans">
            Simulate your exact facility schedule across Suremoney, Nexus Credit, Car-for-Cash, or high-yield wealth deposit returns in seconds.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="mt-8 inline-flex p-1.5 rounded-xl bg-subtle border border-rule backdrop-blur-md font-sans">
            <button
              onClick={() => setCalculatorMode('loan')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                calculatorMode === 'loan'
                  ? 'bg-action text-on-action shadow-sm '
                  : 'text-muted hover:text-ink'
              }`}
            >
              Loan &amp; Credit Facilities
            </button>
            <button
              onClick={() => setCalculatorMode('investment')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                calculatorMode === 'investment'
                  ? 'bg-action text-on-action shadow-sm '
                  : 'text-muted hover:text-ink'
              }`}
            >
              High-Yield Fixed Deposit (Up to 15.5%)
            </button>
          </div>
        </div>

        {calculatorMode === 'loan' ? (
          /* LOAN CALCULATOR */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans">
            {/* Control Panel (7 cols) */}
            <div className="lg:col-span-7 rounded-xl p-6 sm:p-8 bg-gradient-to-br from-surface via-surface to-surface border border-rule shadow-sm flex flex-col justify-between">
              <div>
                {/* 1. SELECT PRODUCT FACILITY */}
                <div className="mb-8">
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-muted mb-3">
                    1. Select Product Facility
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'suremoney', label: 'Suremoney Loan', tag: '15 Mins' },
                      { id: 'nexus-credit', label: 'Nexus Credit', tag: 'Remita' },
                      { id: 'cfc', label: 'Car-for-Cash (CFC)', tag: '2hr Disbursal' },
                      { id: 'travel', label: 'Travel Financing', tag: 'Visa / POF' },
                      { id: 'nwel', label: 'Women Empowerment (NWEL)', tag: 'Concessionary' },
                      { id: 'sobl', label: 'Shop-Owned Loan', tag: 'SME Retail' },
                      { id: 'invoice', label: 'Invoice Discounting', tag: 'Receivables' },
                      { id: 'gold', label: 'Gold-for-Cash', tag: 'Precious Asset' },
                    ].map((cat) => {
                      const isSelected = selectedProduct === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setSelectedProduct(cat.id);
                            // Default tenure for all products is 1 month as requested
                            setLoanTenure(1);
                            const cfg = getProductRate(cat.id);
                            if (loanAmount > cfg.maxAmt) {
                              setLoanAmount(cfg.maxAmt);
                              setLoanAmountInput(cfg.maxAmt.toLocaleString('en-NG'));
                            }
                          }}
                          className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-accent-soft border-brand text-ink shadow-sm '
                              : 'bg-subtle border-rule text-muted hover:border-rule hover:text-ink'
                          }`}
                        >
                          <div className="text-[10px] font-sans font-medium text-success mb-1">{cat.tag}</div>
                          <div className="text-xs font-semibold font-sans leading-tight">{cat.label}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Amount Input & Slider (Editable by typing or dragging slider) */}
                <div className="mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                    <div>
                      <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted block">
                        2. Required Facility Amount
                      </label>
                      <span className="text-[11px] text-muted font-sans">
                        Drag slider or type exact amount below:
                      </span>
                    </div>

                    {/* Editable Typed Principal Amount Input Box */}
                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface border border-rule focus-within:border-brand focus-within:ring-1 focus-within:ring-brand transition-all shadow-sm">
                      <span className="text-xl sm:text-2xl font-semibold text-brand font-display">₦</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={loanAmountInput}
                        onChange={(e) => {
                          const digitsOnly = e.target.value.replace(/[^0-9]/g, '');
                          if (!digitsOnly) {
                            setLoanAmountInput('');
                            return;
                          }
                          const val = parseInt(digitsOnly, 10);
                          setLoanAmountInput(val.toLocaleString('en-NG'));
                          setLoanAmount(val);
                        }}
                        onBlur={() => {
                          const digitsOnly = loanAmountInput.replace(/[^0-9]/g, '');
                          let val = parseInt(digitsOnly, 10) || 100000;
                          if (val < 100000) val = 100000;
                          if (val > productConfig.maxAmt) val = productConfig.maxAmt;
                          setLoanAmount(val);
                          setLoanAmountInput(val.toLocaleString('en-NG'));
                        }}
                        aria-label="Edit facility principal amount"
                        className="bg-transparent text-xl sm:text-2xl font-semibold font-display text-ink outline-none w-36 sm:w-44 text-right tabular-nums tracking-tight"
                        placeholder="1,000,000"
                      />
                    </div>
                  </div>

                  <input
                    type="range"
                    min="100000"
                    max={productConfig.maxAmt}
                    step="50000"
                    value={loanAmount}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setLoanAmount(val);
                      setLoanAmountInput(val.toLocaleString('en-NG'));
                    }}
                    className="w-full h-2.5 bg-subtle rounded-lg appearance-none cursor-pointer accent-brand"
                  />

                  <div className="flex justify-between text-xs font-sans text-muted mt-2">
                    <span>₦100,000 (Min)</span>
                    <span>₦{(productConfig.maxAmt / 2).toLocaleString('en-NG')}</span>
                    <span>₦{productConfig.maxAmt.toLocaleString('en-NG')} (Max)</span>
                  </div>

                  {/* Preset Quick Chips */}
                  <div className="flex flex-wrap gap-2 mt-3.5">
                    {[500000, 1000000, 2500000, 5000000, 10000000].filter((a) => a <= productConfig.maxAmt).map((amt) => (
                      <button
                        key={amt}
                        onClick={() => {
                          setLoanAmount(amt);
                          setLoanAmountInput(amt.toLocaleString('en-NG'));
                        }}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-sans font-medium transition-colors cursor-pointer ${
                          loanAmount === amt
                            ? 'bg-subtle border-brand text-ink'
                            : 'bg-subtle border-rule text-muted hover:text-ink'
                        }`}
                      >
                        ₦{(amt / 1000000).toFixed(amt % 1000000 === 0 ? 0 : 1)}M
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tenure Selector (Default 1 Month) */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted block">
                        3. Repayment Tenure
                      </label>
                      <span className="text-[11px] text-muted font-sans">
                        Default is 1 month; choose your repayment period:
                      </span>
                    </div>
                    <span className="text-base font-semibold font-display text-brand bg-accent-soft px-3 py-1 rounded-xl border border-brand/25">
                      {loanTenure} {loanTenure === 1 ? 'month' : 'months'} {loanTenure === 1 && '(Default)'}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {[1, 3, 6, 9, 12, 18, 24].map((months) => (
                      <button
                        key={months}
                        onClick={() => setLoanTenure(months)}
                        className={`py-3 rounded-xl border text-center font-sans text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                          loanTenure === months
                            ? 'bg-action text-on-action border-brand shadow-sm  font-semibold'
                            : 'bg-subtle border-rule text-muted hover:text-ink hover:border-rule'
                        }`}
                      >
                        {months} {months === 1 ? 'Mo' : 'Mos'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Requirement highlights */}
              <div className="pt-4 border-t border-rule flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-muted font-sans">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brand" weight="regular" /> Valid ID &amp; Bank Statement
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brand" weight="regular" /> BVN &amp; NIN Verification
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brand" weight="regular" /> Fast Direct Bank Disbursement
                </span>
              </div>
            </div>

            {/* Repayment Breakdown Output Card (5 cols) - 5 Hours SLA badge removed */}
            <div className="lg:col-span-5 rounded-xl p-6 sm:p-8 bg-gradient-to-br from-surface to-surface border border-brand/25 shadow-sm flex flex-col justify-between relative overflow-hidden font-sans">
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent-soft rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-wider text-muted font-semibold font-sans">
                    Estimated Facility Schedule
                  </span>
                </div>

                {/* Primary Hero Figure */}
                <div className="p-5 rounded-xl bg-subtle border border-rule mb-6">
                  <div className="text-xs text-muted mb-1 font-sans">Estimated Monthly Installment:</div>
                  <div className="text-3xl sm:text-4xl font-semibold font-display text-ink tabular-nums">
                    ₦{Math.round(monthlyInstallment).toLocaleString('en-NG')}
                    <span className="text-sm font-normal text-muted font-sans">/mo</span>
                  </div>
                  <div className="text-xs text-muted mt-2 flex items-center justify-between border-t border-rule pt-2 font-sans">
                    <span>Principal: ₦{Math.round(monthlyPrincipal).toLocaleString('en-NG')}</span>
                    <span>Interest: ₦{Math.round(monthlyInterest).toLocaleString('en-NG')}</span>
                  </div>
                </div>

                {/* Breakdown List */}
                <div className="space-y-3.5 text-sm mb-6 font-sans">
                  <div className="flex justify-between py-1 border-b border-rule">
                    <span className="text-muted">Selected Facility</span>
                    <span className="font-semibold text-ink">{productConfig.name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-rule">
                    <span className="text-muted">Monthly Interest Rate</span>
                    <span className="font-semibold text-success">{productConfig.label}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-rule">
                    <span className="text-muted">Processing Fee (Upfront 4%)</span>
                    <span className="font-semibold text-ink">₦{Math.round(processingFee).toLocaleString('en-NG')}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-rule">
                    <span className="text-muted">Total Interest over {loanTenure} Mos</span>
                    <span className="font-semibold text-ink">₦{Math.round(totalInterest).toLocaleString('en-NG')}</span>
                  </div>
                  <div className="flex justify-between py-1 pt-2 text-base font-semibold">
                    <span className="text-ink">Total Facility Payoff</span>
                    <span className="font-display font-semibold text-brand text-lg tabular-nums">
                      ₦{Math.round(totalRepayment).toLocaleString('en-NG')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="space-y-3 pt-4">
                <button
                  onClick={() => onOpenApply(productConfig.name, loanAmount, loanTenure)}
                  className="w-full py-4 bg-action hover:bg-action-hover active:scale-[0.98] text-on-action font-semibold text-sm rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer font-sans"
                >
                  <span>Apply for this ₦{loanAmount.toLocaleString('en-NG')} Loan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-center text-muted font-sans">
                  Prompt 15-minute to same-day turnaround upon submission of valid identification and verification.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* INVESTMENT CALCULATOR */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans">
            {/* Investment Controls */}
            <div className="lg:col-span-7 rounded-xl p-6 sm:p-8 bg-gradient-to-br from-surface via-surface to-surface border border-rule shadow-sm flex flex-col justify-between">
              <div>
                <div className="mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                    <div>
                      <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted block">
                        1. Deposit / Investment Principal
                      </label>
                      <span className="text-[11px] text-muted font-sans">
                        Drag slider or type exact deposit amount below:
                      </span>
                    </div>

                    {/* Editable Typed Fixed Deposit Principal Input Box */}
                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface border border-rule focus-within:border-brand focus-within:ring-1 focus-within:ring-brand transition-all shadow-sm">
                      <span className="text-xl sm:text-2xl font-semibold text-brand font-display">₦</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={investAmountInput}
                        onChange={(e) => {
                          const digitsOnly = e.target.value.replace(/[^0-9]/g, '');
                          if (!digitsOnly) {
                            setInvestAmountInput('');
                            return;
                          }
                          const val = parseInt(digitsOnly, 10);
                          setInvestAmountInput(val.toLocaleString('en-NG'));
                          setInvestAmount(val);
                        }}
                        onBlur={() => {
                          const digitsOnly = investAmountInput.replace(/[^0-9]/g, '');
                          let val = parseInt(digitsOnly, 10) || 250000;
                          if (val < 250000) val = 250000;
                          if (val > 50000000) val = 50000000;
                          setInvestAmount(val);
                          setInvestAmountInput(val.toLocaleString('en-NG'));
                        }}
                        aria-label="Edit fixed deposit principal amount"
                        className="bg-transparent text-xl sm:text-2xl font-semibold font-display text-ink outline-none w-36 sm:w-44 text-right tabular-nums tracking-tight"
                        placeholder="2,000,000"
                      />
                    </div>
                  </div>

                  <input
                    type="range"
                    min="250000"
                    max="20000000"
                    step="100000"
                    value={investAmount}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setInvestAmount(val);
                      setInvestAmountInput(val.toLocaleString('en-NG'));
                    }}
                    className="w-full h-2.5 bg-subtle rounded-lg appearance-none cursor-pointer accent-brand"
                  />

                  <div className="flex justify-between text-xs font-sans text-muted mt-2">
                    <span>₦250,000 (Min)</span>
                    <span>₦10,000,000</span>
                    <span>₦20,000,000+</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3.5">
                    {[500000, 1000000, 2000000, 5000000, 10000000].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => {
                          setInvestAmount(amt);
                          setInvestAmountInput(amt.toLocaleString('en-NG'));
                        }}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-sans font-medium transition-colors cursor-pointer ${
                          investAmount === amt
                            ? 'bg-subtle border-brand text-ink'
                            : 'bg-subtle border-rule text-muted hover:text-ink'
                        }`}
                      >
                        ₦{(amt / 1000000).toFixed(amt % 1000000 === 0 ? 0 : 1)}M
                      </button>
                    ))}
                  </div>
                </div>

                {/* Investment Term */}
                <div className="mb-8">
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-muted mb-3">
                    2. Lock-in Tenure &amp; Yield Bracket
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { days: 90, label: '90 Days', rate: '12.5% P.A.', tag: 'Quarterly' },
                      { days: 180, label: '180 Days', rate: '14.0% P.A.', tag: 'Bi-Annual' },
                      { days: 365, label: '365 Days', rate: '15.5% P.A.', tag: 'Annual (Top Yield)' },
                    ].map((tier) => (
                      <button
                        key={tier.days}
                        onClick={() => setInvestTenure(tier.days)}
                        className={`p-4 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                          investTenure === tier.days
                            ? 'bg-accent-soft border-brand text-ink shadow-sm '
                            : 'bg-subtle border-rule text-muted hover:text-ink'
                        }`}
                      >
                        <div className="text-xs text-muted mb-1 font-sans">{tier.label}</div>
                        <div className="text-lg font-semibold font-display text-brand">{tier.rate}</div>
                        <div className="text-[11px] text-muted mt-1 font-sans">{tier.tag}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payout preference */}
                <div className="mb-6">
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-muted mb-3">
                    3. Interest Distribution Schedule
                  </label>
                  <div className="grid grid-cols-2 gap-3 font-sans">
                    <button
                      onClick={() => setPayoutSchedule('monthly')}
                      className={`p-3 rounded-xl border text-sm font-medium transition-colors cursor-pointer ${
                        payoutSchedule === 'monthly'
                          ? 'bg-subtle border-brand text-ink'
                          : 'bg-subtle border-rule text-muted'
                      }`}
                    >
                      Monthly Bank Credit (Cash Flow)
                    </button>
                    <button
                      onClick={() => setPayoutSchedule('maturity')}
                      className={`p-3 rounded-xl border text-sm font-medium transition-colors cursor-pointer ${
                        payoutSchedule === 'maturity'
                          ? 'bg-subtle border-brand text-ink'
                          : 'bg-subtle border-rule text-muted'
                      }`}
                    >
                      Compounded at Maturity
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-rule flex items-center justify-between text-xs text-muted font-sans">
                <span>Backed by regulated cooperative assets</span>
                <span className="text-success font-medium">Guaranteed Capital Preservation</span>
              </div>
            </div>

            {/* Investment Output Summary */}
            <div className="lg:col-span-5 rounded-xl p-6 sm:p-8 bg-gradient-to-br from-surface to-surface border border-brand/25 shadow-sm flex flex-col justify-between relative overflow-hidden font-sans">
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent-soft rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs uppercase tracking-wider text-muted font-semibold font-sans">
                    Projected Yield Earnings
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-accent-soft border border-brand/25 text-brand text-xs font-semibold flex items-center gap-1 font-sans">
                    <Sparkle className="w-3.5 h-3.5" />
                    {(annualRate * 100).toFixed(1)}% APY
                  </span>
                </div>

                <div className="p-5 rounded-xl bg-subtle border border-rule mb-6">
                  <div className="text-xs text-muted mb-1 font-sans">Estimated Net Return:</div>
                  <div className="text-3xl sm:text-4xl font-semibold font-display text-brand tabular-nums">
                    +₦{Math.round(estimatedReturn).toLocaleString('en-NG')}
                  </div>
                  <div className="text-xs text-muted mt-2 font-sans">
                    Total Maturity Value: <span className="text-ink font-display font-semibold">₦{Math.round(totalInvestmentMaturity).toLocaleString('en-NG')}</span>
                  </div>
                </div>

                {/* Comparison with traditional bank */}
                <div className="p-4 rounded-xl bg-subtle border border-rule space-y-2 mb-6 text-xs font-sans">
                  <div className="text-muted font-semibold mb-2">Alpha Above Commercial Banks:</div>
                  <div className="flex justify-between">
                    <span className="text-muted">Nexus Projected Return:</span>
                    <span className="text-success font-semibold">+₦{Math.round(estimatedReturn).toLocaleString('en-NG')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Traditional Bank (~4.5%):</span>
                    <span className="text-muted">₦{Math.round(bankAverageReturn).toLocaleString('en-NG')}</span>
                  </div>
                  <div className="pt-2 border-t border-rule flex justify-between font-semibold">
                    <span className="text-ink">Additional Wealth Generated:</span>
                    <span className="text-brand font-semibold">
                      +₦{Math.round(estimatedReturn - bankAverageReturn).toLocaleString('en-NG')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <button
                  onClick={() => onOpenApply('Institutional Fixed Deposit Vaults', investAmount)}
                  className="w-full py-4 bg-action hover:bg-action-hover active:scale-[0.98] text-on-action font-semibold text-sm rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer font-sans"
                >
                  <span>Open ₦{investAmount.toLocaleString('en-NG')} Wealth Vault</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-center text-muted font-sans">
                  Minimum deposit ₦250,000. Interest paid monthly or compounded to maturity.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
