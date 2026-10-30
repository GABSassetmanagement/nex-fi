import React, { useState } from 'react';
import {
  EnvelopeSimple,
  Phone,
  MapPin,
  PaperPlaneTilt,
  CheckCircle,
  ChatCircleDots,
  WhatsappLogo,
  CaretDown,
  ArrowSquareOut,
} from '@phosphor-icons/react';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'Suremoney Loan (MDA & Paramilitary)',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API dispatch to support@nexusfinance.com
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <section id="contact" className="py-24 bg-canvas border-t border-rule relative font-body io-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Headquarters, Direct Contacts & Google Map */}
          <div className="lg:col-span-5 flex flex-col justify-between font-sans">
            <div>
              <h2 className="nx-section-title text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ink mb-6 text-balance font-display">
                Ping us, <br />
                <span className="text-brand">we’re here for you.</span>
              </h2>

              <p className="text-base text-muted leading-relaxed mb-8 font-sans">
                Our team at the Federal Capital Territory is on standby. Reach out with questions about your loan schedule, car appraisal, proof of funds, or investment vault.
              </p>

              <div className="space-y-6 text-sm text-muted font-sans mb-8">
                {/* Head Office with Google Map link */}
                <div className="flex items-start gap-3.5 group">
                  <div className="w-10 h-10 rounded-xl bg-subtle border border-rule flex items-center justify-center text-brand shrink-0 mt-0.5 group-hover:border-brand transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-semibold text-muted">Head Office</div>
                    <a
                      href="https://maps.google.com/?q=NICON+Insurance+Building,+Central+Business+District,+Abuja,+Nigeria"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink font-medium mt-0.5 hover:text-brand transition-colors flex items-center gap-1.5"
                    >
                      <span>2nd Floor, Right Wing, NICON Insurance Building,</span>
                      <ArrowSquareOut className="w-3.5 h-3.5 text-muted group-hover:text-brand" />
                    </a>
                    <div className="text-muted">Central Business District (CBD), Abuja, Nigeria.</div>
                  </div>
                </div>

                {/* Direct Phone & WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-subtle border border-rule flex items-center justify-center text-brand shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-semibold text-muted">Direct Officer Lines &amp; WhatsApp</div>
                    <div className="text-ink font-medium mt-0.5 flex flex-wrap items-center gap-2">
                      <a href="tel:+2348091212224" className="hover:text-brand transition-colors font-semibold">
                        +234 809 121 2224
                      </a>
                      <span className="text-muted">|</span>
                      <a
                        href="https://wa.me/2348091212224"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-accent-soft text-brand hover:bg-accent-soft text-xs border border-brand/25 transition-colors"
                      >
                        <WhatsappLogo className="w-3.5 h-3.5" weight="fill" />
                        <span>Chat WhatsApp</span>
                      </a>
                    </div>
                    <div className="text-muted text-xs mt-0.5">Mon–Fri: 8:00 AM – 5:00 PM WAT</div>
                  </div>
                </div>

                {/* Electronic Mail */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-subtle border border-rule flex items-center justify-center text-brand shrink-0 mt-0.5">
                    <EnvelopeSimple className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-semibold text-muted">Electronic Mail</div>
                    <div className="text-ink font-medium mt-0.5">
                      <a href="mailto:support@nexusfinance.com" className="hover:text-brand transition-colors font-semibold">
                        support@nexusfinance.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Embedded Google Maps Container */}
              <div className="rounded-xl overflow-hidden border border-rule shadow-sm aspect-[16/9] w-full bg-subtle relative">
                <iframe
                  title="Nexus Finance Head Office - NICON Insurance Building Abuja"
                  src="https://maps.google.com/maps?q=NICON+Insurance+Building,+Central+Business+District,+Abuja,+Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  href="https://maps.google.com/?q=NICON+Insurance+Building,+Central+Business+District,+Abuja,+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2.5 right-2.5 px-3 py-1 rounded-lg nx-image-badge bg-black/80 hover:bg-canvas text-[11px] font-semibold text-brand border border-rule backdrop-blur-md transition-colors flex items-center gap-1.5"
                >
                  <span>Open in Google Maps</span>
                  <ArrowSquareOut className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form with properly spaced Dropdown */}
          <div className="lg:col-span-7 rounded-xl p-8 sm:p-10 bg-gradient-to-br from-surface via-surface to-surface border border-rule shadow-sm font-sans flex flex-col justify-between">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent-soft text-brand flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" weight="regular" />
                </div>
                <h3 className="text-2xl font-semibold text-ink font-display">Inquiry Transmitted to Support</h3>
                <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-ink font-semibold">{formState.name}</span>. Your priority message has been dispatched to <strong className="text-brand">support@nexusfinance.com</strong>. A dedicated credit desk officer will respond to your provided contact within minutes.
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-3">
                  <a
                    href={`mailto:support@nexusfinance.com?subject=Inquiry%20from%20${encodeURIComponent(formState.name)}%20-%20${encodeURIComponent(formState.topic)}&body=${encodeURIComponent(`Name: ${formState.name}\nPhone: ${formState.phone}\nEmail: ${formState.email}\nTopic: ${formState.topic}\n\nMessage:\n${formState.message}`)}`}
                    className="px-6 py-2.5 rounded-xl bg-action text-on-action text-xs font-semibold hover:bg-action-hover transition-all cursor-pointer shadow-sm"
                  >
                    Open in Your Email Client
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: '', email: '', phone: '', topic: 'Suremoney Loan (MDA & Paramilitary)', message: '' });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-subtle text-ink text-xs font-semibold hover:bg-subtle transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contactsection-field-1" className="block text-xs uppercase tracking-wider text-muted font-semibold mb-2">
                      Full Name *
                    </label>
                    <input id="contactsection-field-1"
                      type="text"
                      required
                      placeholder="e.g. Ibrahim Abubakar"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-subtle border border-rule text-ink placeholder-muted text-sm focus:outline-none focus:border-brand transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contactsection-field-2" className="block text-xs uppercase tracking-wider text-muted font-semibold mb-2">
                      Phone Number *
                    </label>
                    <input id="contactsection-field-2"
                      type="tel"
                      required
                      placeholder="e.g. +234 803 000 0000"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-subtle border border-rule text-ink placeholder-muted text-sm focus:outline-none focus:border-brand transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contactsection-field-3" className="block text-xs uppercase tracking-wider text-muted font-semibold mb-2">
                      Official Email *
                    </label>
                    <input id="contactsection-field-3"
                      type="email"
                      required
                      placeholder="name@organization.gov.ng"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-subtle border border-rule text-ink placeholder-muted text-sm focus:outline-none focus:border-brand transition-colors"
                    />
                  </div>

                  {/* Dropdown with generous right padding (pr-11) and custom Chevron icon to prevent touching the edge */}
                  <div>
                    <label htmlFor="contactsection-field-4" className="block text-xs uppercase tracking-wider text-muted font-semibold mb-2">
                      Facility of Interest *
                    </label>
                    <div className="relative">
                      <select id="contactsection-field-4"
                        value={formState.topic}
                        onChange={(e) => setFormState({ ...formState, topic: e.target.value })}
                        className="w-full appearance-none pl-4 pr-11 py-3.5 rounded-xl bg-surface border border-rule text-ink text-sm focus:outline-none focus:border-brand transition-colors cursor-pointer truncate"
                      >
                        <option value="Suremoney Loan (MDA & Paramilitary)">Suremoney Loan (15-Min Disbursal)</option>
                        <option value="Nexus Credit (Salary-Based)">Nexus Credit (Remita Salary-Based)</option>
                        <option value="Car-for-Cash (CFC)">Car-for-Cash (2hr Disbursal · Depot Stored)</option>
                        <option value="Travel Financing">Travel Financing (Visa &amp; Study POF)</option>
                        <option value="Nexus Women Empowerment (NWEL)">Women Empowerment Loan (NWEL)</option>
                        <option value="Shop-Owned Loan (SOBL SME)">Shop-Owned Loan (SOBL SME)</option>
                        <option value="Invoice Discounting Facility">Invoice Discounting (IDF)</option>
                        <option value="Gold-for-Cash (GFC)">Gold-for-Cash (GFC)</option>
                        <option value="Institutional Fixed Deposit Vault">High-Yield Fixed Deposit (15.5%)</option>
                        <option value="Other Corporate Inquiry">General Corporate Partnership</option>
                      </select>
                      <CaretDown className="w-4 h-4 text-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="contactsection-field-5" className="block text-xs uppercase tracking-wider text-muted font-semibold mb-2">
                    How Can We Assist You?
                  </label>
                  <textarea id="contactsection-field-5"
                    rows={4}
                    placeholder="Provide details on your desired facility amount, command/agency, or specific timeline..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-subtle border border-rule text-ink placeholder-muted text-sm focus:outline-none focus:border-brand transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-action hover:bg-action-hover active:scale-[0.98] text-on-action font-semibold text-sm rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{submitting ? 'Transmitting to support@nexusfinance.com...' : 'Submit Priority Inquiry'}</span>
                    <PaperPlaneTilt className="w-4 h-4" weight="regular" />
                  </button>
                  <p className="text-xs text-center text-muted mt-3 font-sans">
                    Submissions are transmitted directly to <span className="text-brand">support@nexusfinance.com</span> under NDPR encryption protocols.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
