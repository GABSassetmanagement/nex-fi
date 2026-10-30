import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/content';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((curr) => (curr === 0 ? TESTIMONIALS.length - 1 : curr - 1));
  const next = () => setActiveIndex((curr) => (curr === TESTIMONIALS.length - 1 ? 0 : curr + 1));

  return (
    <section className="py-24 bg-canvas border-t border-rule relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1 text-warning mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-warning" />
            ))}
            <span className="text-xs font-mono text-ink ml-2">4.9 / 5.0 Client Satisfaction</span>
          </div>

          <h2 className="nx-section-title text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ink mb-5 text-balance">
            Trusted by those who <span className="text-brand">serve the nation.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted">
            Real outcomes from federal officers, enterprise contractors, and business owners across Nigeria.
          </p>
        </div>

        {/* Carousel / Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-xl bg-gradient-to-br from-surface to-surface border border-rule hover:border-brand/25 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand text-brand" />
                    ))}
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-subtle text-muted border border-rule">
                    {t.tag}
                  </span>
                </div>

                <Quote className="w-8 h-8 text-success mb-3" />
                <p className="text-base text-ink leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-rule flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-subtle to-subtle flex items-center justify-center font-semibold text-ink text-xs font-mono">
                  {t.author.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink">{t.author}</div>
                  <div className="text-xs text-muted">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
