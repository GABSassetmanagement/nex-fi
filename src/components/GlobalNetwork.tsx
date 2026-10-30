import React, { useState } from 'react';
import { Globe, ArrowRight, Shield, Zap, RefreshCw } from 'lucide-react';
import globeImg from '../assets/images/nexus_global_exchange_globe_1792755830792.jpg';

export const GlobalNetwork: React.FC = () => {
  const [activeCurrency, setActiveCurrency] = useState<'NGN' | 'USD' | 'GBP' | 'EUR'>('USD');
  const [calcInput, setCalcInput] = useState<number>(5000);

  // Conversion rates baseline to NGN
  const rates: Record<string, number> = {
    USD: 1485,
    GBP: 1940,
    EUR: 1610,
    NGN: 1,
  };

  const convertedNGN = activeCurrency === 'NGN' ? calcInput : calcInput * rates[activeCurrency];

  return (
    <section className="py-24 bg-canvas border-t border-rule relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: 3D Globe Visual */}
          <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[460px] aspect-square rounded-xl overflow-hidden border border-rule bg-gradient-to-b from-surface to-surface p-6 shadow-sm flex flex-col items-center justify-center group">
              <div className="absolute inset-0 bg-radial from-subtle via-transparent to-transparent pointer-events-none" />
              
              <img
                src={globeImg}
                alt="Global Financial Network Globe"
                className="w-full h-full object-contain rounded-xl transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Floating overlay chip */}
              <div className="absolute bottom-5 left-5 right-5 p-3 rounded-xl bg-surface backdrop-blur-xl border border-rule flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-action" />
                  <span className="font-mono text-ink text-[11px]">CROSS-BORDER POF SETTLEMENT</span>
                </div>
                <span className="text-success font-mono font-semibold">100% Admissible</span>
              </div>
            </div>
          </div>

          {/* Right: Copy & Live Converter */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-subtle border border-rule text-xs text-muted mb-4">
              <Globe className="w-3.5 h-3.5 text-brand" />
              <span className="font-mono text-[11px] uppercase tracking-wider">Borderless Liquidity</span>
            </div>

            <h2 className="nx-section-title text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ink mb-6 text-balance">
              Financial mobility beyond borders, <span className="text-brand">made effortless.</span>
            </h2>

            <p className="text-base text-muted leading-relaxed mb-8">
              Whether you are applying for international travel, sending tuition remittances, or securing multi-million naira tender collateral abroad, Nexus Finance gives you accredited institutional backing that global embassies and corporations accept without question.
            </p>

            {/* Live Converter Box */}
            <div className="p-6 rounded-xl bg-subtle border border-rule mb-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-muted">Proof of Funds &amp; Remittance Estimator</span>
                <span className="text-[10px] text-success font-mono">Live Institutional Rate</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Input */}
                <div className="p-3 rounded-xl bg-subtle border border-rule">
                  <div className="text-[10px] font-mono text-muted mb-1">Target Foreign Currency</div>
                  <div className="flex items-center justify-between">
                    <input
                      type="number"
                      value={calcInput}
                      onChange={(e) => setCalcInput(Math.max(100, Number(e.target.value)))}
                      className="bg-transparent text-lg font-semibold font-mono text-ink focus:outline-none w-24"
                    />
                    <select
                      value={activeCurrency}
                      onChange={(e) => setActiveCurrency(e.target.value as any)}
                      aria-label="Select target foreign currency"
                      className="bg-subtle text-xs font-mono text-success px-2 py-1 rounded border border-rule focus:outline-none"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="NGN">NGN (₦)</option>
                    </select>
                  </div>
                </div>

                {/* Output */}
                <div className="p-3 rounded-xl bg-subtle border border-rule">
                  <div className="text-[10px] font-mono text-muted mb-1">Equivalent Naira Value</div>
                  <div className="text-lg font-semibold font-mono text-brand truncate tabular-nums">
                    ₦{Math.round(convertedNGN).toLocaleString('en-NG')}
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-muted flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-brand" />
                <span>Certified bank-backed statement issued on official institutional letterhead within 24 hours.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
