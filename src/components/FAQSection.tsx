import React, { useState } from 'react';
import { FAQS } from '../data/content';
import { CaretDown, Question } from '@phosphor-icons/react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-canvas border-t border-rule relative font-body io-reveal">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Banner removed */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="nx-section-title text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ink mb-5 text-balance font-display">
            Frequently asked <span className="text-brand">questions.</span>
          </h2>
          <p className="text-base text-muted font-sans">
            Everything you need to know about our lending criteria, verification processes, and institutional operations.
          </p>
        </div>

        <div className="space-y-4 font-sans">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-rule bg-subtle hover:border-rule transition-all duration-200 overflow-hidden"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-ink font-sans">{faq.question}</span>
                  <div
                    className={`w-7 h-7 rounded-full bg-subtle flex items-center justify-center text-muted transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-brand bg-accent-soft' : ''
                    }`}
                  >
                    <CaretDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-muted leading-relaxed border-t border-rule pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
