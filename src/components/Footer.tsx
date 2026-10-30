import React from 'react';
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  TiktokLogo,
  YoutubeLogo,
  XLogo,
  WhatsappLogo,
  EnvelopeSimple,
  PhoneCall,
  ArrowUpRight,
  MapPin,
} from '@phosphor-icons/react';

interface FooterProps {
  onOpenApply: (productName?: string) => void;
  onNavigate?: (view: string, productId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenApply, onNavigate }) => {
  const handleNav = (view: string, productId?: string) => {
    if (onNavigate) {
      onNavigate(view, productId);
    } else {
      const el = document.getElementById(view);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-canvas text-muted font-sans pt-20 pb-14 border-t border-rule relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Col 1: Who We Are */}
          <div>
            <div className="text-xs uppercase tracking-wider text-ink font-semibold mb-4 font-sans">
              Who We Are
            </div>
            <ul className="space-y-3 text-xs text-muted font-sans">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('about')}
                  className="hover:text-ink transition-colors cursor-pointer text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('leadership')}
                  className="hover:text-ink transition-colors cursor-pointer text-left"
                >
                  Leadership Team
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('gallery')}
                  className="hover:text-ink transition-colors cursor-pointer text-left"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('blog')}
                  className="hover:text-ink transition-colors cursor-pointer text-left"
                >
                  Blog &amp; News
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('careers')}
                  className="hover:text-ink transition-colors cursor-pointer text-left"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('calculator')}
                  className="hover:text-ink transition-colors cursor-pointer text-left"
                >
                  Loan Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Products */}
          <div>
            <div className="text-xs uppercase tracking-wider text-ink font-semibold mb-4 font-sans">
              Products
            </div>
            <ul className="space-y-3 text-xs text-muted font-sans">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('product-detail', 'suremoney-loan')}
                  className="hover:text-ink transition-colors text-left cursor-pointer"
                >
                  Suremoney
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('product-detail', 'nexus-credit')}
                  className="hover:text-ink transition-colors text-left cursor-pointer"
                >
                  Nexus Credit
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('product-detail', 'car-for-cash')}
                  className="hover:text-ink transition-colors text-left cursor-pointer"
                >
                  Cash for Cash
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('product-detail', 'women-empowerment')}
                  className="hover:text-ink transition-colors text-left cursor-pointer"
                >
                  NWEL
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('product-detail', 'travel-financing')}
                  className="hover:text-ink transition-colors text-left cursor-pointer"
                >
                  Travel Financing
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Others */}
          <div>
            <div className="text-xs uppercase tracking-wider text-ink font-semibold mb-4 font-sans">
              Others
            </div>
            <ul className="space-y-3 text-xs text-muted font-sans">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('product-detail', 'invoice-discounting')}
                  className="hover:text-ink transition-colors text-left cursor-pointer"
                >
                  Invoice Discounting Facility
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('product-detail', 'shop-owned-sme')}
                  className="hover:text-ink transition-colors text-left cursor-pointer"
                >
                  Shop-owned-Based Loan
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('product-detail', 'gold-for-cash')}
                  className="hover:text-ink transition-colors text-left cursor-pointer"
                >
                  Gold-for-Cash
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('product-detail', 'suremoney-loan')}
                  className="hover:text-ink transition-colors text-left cursor-pointer"
                >
                  Payday &amp; Auto Loans
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Contacts */}
          <div>
            <div className="text-xs uppercase tracking-wider text-ink font-semibold mb-4 font-sans">
              Quick Contacts
            </div>
            <ul className="space-y-3 text-xs text-muted font-sans">
              <li>
                <a
                  href="mailto:support@nexusfinance.com"
                  className="hover:text-brand transition-colors flex items-center gap-2 group"
                >
                  <EnvelopeSimple className="w-4 h-4 text-brand" />
                  <span>Tap to send us a mail</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+2348091212224"
                  className="hover:text-brand transition-colors flex items-center gap-2 font-medium text-ink"
                >
                  <PhoneCall className="w-4 h-4 text-brand" />
                  <span>+234 809-1212-224</span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=NICON+Insurance+Building,+Central+Business+District,+Abuja,+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink transition-colors flex items-start gap-1.5 pt-1 text-[11px] text-muted"
                >
                  <MapPin className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
                  <span>2nd Floor, Right Wing, NICON Insurance Building, Central Business District (CBD), Abuja.</span>
                </a>
              </li>
              <li className="text-[11px] text-muted">
                Hours: Mon – Fri, 8:00 AM – 5:00 PM
              </li>
            </ul>
          </div>

          {/* Col 5: Social Media & Brand */}
          <div className="space-y-4">
            <button
              onClick={() => handleNav('home')}
              className="inline-block text-left cursor-pointer focus:outline-none"
              aria-label="Nexus Finance Home"
            >
              <img
                src="./assets/nexus/NEXUS-BW-HOR-WH.png"
                alt="Nexus Finance"
                className="nx-logo-dark h-8 sm:h-9 w-auto object-contain"
              />
              <img src="./assets/nexus/NEXUS-coloured-HOR.png" alt="Nexus Finance" className="nx-logo-light h-8 sm:h-9 w-auto object-contain" />
            </button>
            <p className="text-xs text-muted font-normal leading-relaxed">
              Your money companion. Earn, invest and access liquidity in one unified ecosystem.
            </p>

            <div className="pt-2">
              <div className="text-xs uppercase tracking-wider text-ink font-semibold mb-3 font-sans">
                Connect With Us
              </div>
              <div className="flex flex-wrap gap-2 text-muted">
                <a
                  href="https://facebook.com/nexusfinance"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook @nexusfinance"
                  className="p-2.5 rounded-xl bg-subtle hover:bg-subtle hover:text-brand border border-rule transition-colors"
                >
                  <FacebookLogo className="w-4 h-4" weight="fill" />
                </a>
                <a
                  href="https://instagram.com/nexusfinance"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram @nexusfinance"
                  className="p-2.5 rounded-xl bg-subtle hover:bg-subtle hover:text-brand border border-rule transition-colors"
                >
                  <InstagramLogo className="w-4 h-4" weight="fill" />
                </a>
                <a
                  href="https://linkedin.com/company/nexusfinance"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn @nexusfinance"
                  className="p-2.5 rounded-xl bg-subtle hover:bg-subtle hover:text-brand border border-rule transition-colors"
                >
                  <LinkedinLogo className="w-4 h-4" weight="fill" />
                </a>
                <a
                  href="https://tiktok.com/@nexusfinance"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok @nexusfinance"
                  className="p-2.5 rounded-xl bg-subtle hover:bg-subtle hover:text-brand border border-rule transition-colors"
                >
                  <TiktokLogo className="w-4 h-4" weight="fill" />
                </a>
                <a
                  href="https://youtube.com/@nexusfinance"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube @nexusfinance"
                  className="p-2.5 rounded-xl bg-subtle hover:bg-subtle hover:text-brand border border-rule transition-colors"
                >
                  <YoutubeLogo className="w-4 h-4" weight="fill" />
                </a>
                <a
                  href="https://x.com/nexusfinance"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X @nexusfinance"
                  className="p-2.5 rounded-xl bg-subtle hover:bg-subtle hover:text-brand border border-rule transition-colors"
                >
                  <XLogo className="w-4 h-4" weight="regular" />
                </a>
                <a
                  href="https://wa.me/2348091212224"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp @nexusfinance"
                  className="p-2.5 rounded-xl bg-subtle hover:bg-subtle hover:text-brand border border-rule transition-colors"
                >
                  <WhatsappLogo className="w-4 h-4" weight="fill" />
                </a>
              </div>
            </div>

            <div className="text-[11px] text-muted font-sans pt-2">
              <span>&copy; 2026 Nexus Finance. All rights reserved.</span>
            </div>
          </div>
        </div>

        {/* Regulatory Disclosure Block */}
        <div className="pt-8 border-t border-rule space-y-4 text-xs leading-relaxed text-muted font-sans">
          <p>
            Nexus Finance is a premier financial services provider delivering fast, flexible loan and liquidity solutions across Nigeria. Established and regulated under the National Cooperative Societies, the National Cooperative Financing Agency, and the Abuja Cooperative Federation. Serving as a dependable financial safety net for public servants, paramilitary officers, and enterprise contractors.
          </p>
          <p>
            All loan rates and yield returns (up to 15.5% annualized on fixed deposit wealth tranches) are subject to statutory verification and credit underwriting. Head Office: 2nd Floor, Right Wing, NICON Insurance Building, Central Business District (CBD), Abuja, Nigeria.
          </p>
        </div>
      </div>
    </footer>
  );
};
