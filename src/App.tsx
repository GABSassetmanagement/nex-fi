import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustMarquee } from './components/TrustMarquee';
import {
  MoveMoneySection,
  TestimonialsSliderSection,
  LiveTickingYieldSection,
} from './components/TuyoShowcaseSections';
import { ProductBento } from './components/ProductBento';
import { InteractiveCalculator } from './components/InteractiveCalculator';
import { LeadershipSection } from './components/LeadershipSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ApplyModal } from './components/ApplyModal';
import { AboutUsPage } from './components/AboutUsPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { BlogPage } from './components/BlogPage';
import { CareersPage } from './components/CareersPage';
import { GalleryPage } from './components/GalleryPage';
import { CmsPortal } from './components/CmsPortal';
import { useIOReveal } from './hooks/useIOReveal';

type ActiveView =
  | 'home'
  | 'about'
  | 'blog'
  | 'careers'
  | 'gallery'
  | 'product-detail'
  | 'cms';

export default function App() {
  const [currentView, setCurrentView] = useState<ActiveView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('suremoney-loan');

  // Fast-track apply modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDefaultProduct, setModalDefaultProduct] = useState<string | undefined>(undefined);
  const [modalDefaultAmount, setModalDefaultAmount] = useState<number | undefined>(undefined);
  const [modalDefaultTenure, setModalDefaultTenure] = useState<number | undefined>(undefined);

  // Trigger intersection observer reveal animation on viewport entry
  useIOReveal('.io-reveal');

  // Support direct hash navigation like #cms
  React.useEffect(() => {
    if (window.location.hash === '#cms') {
      setCurrentView('cms');
    }
    const handleHash = () => {
      if (window.location.hash === '#cms') {
        setCurrentView('cms');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenApply = (productName?: string, amount?: number, tenure?: number) => {
    setModalDefaultProduct(productName);
    setModalDefaultAmount(amount);
    setModalDefaultTenure(tenure);
    setModalOpen(true);
  };

  const handleNavigate = (view: string, productId?: string) => {
    if (view === 'product-detail') {
      setSelectedProductId(productId || 'suremoney-loan');
      setCurrentView('product-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (view === 'about') {
      setCurrentView('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (view === 'blog') {
      setCurrentView('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (view === 'careers') {
      setCurrentView('careers');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (view === 'gallery') {
      setCurrentView('gallery');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (view === 'cms') {
      setCurrentView('cms');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (view === 'about-products') {
      setCurrentView('about');
      setTimeout(() => {
        const el = document.getElementById('about-products');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return;
    }

    if (view === 'leadership') {
      setCurrentView('about');
      setTimeout(() => {
        const el = document.getElementById('leadership');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return;
    }

    if (view === 'partners') {
      setCurrentView('about');
      setTimeout(() => {
        const el = document.getElementById('partners');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return;
    }

    // Anchors on Home
    setCurrentView('home');
    if (view === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Scroll to section on home page
    setTimeout(() => {
      const el = document.getElementById(view);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleScrollToCalculator = () => {
    handleNavigate('calculator');
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#00e575] selection:text-black font-body transition-colors duration-300">
      {/* 1. Menu (Navbar) with dynamic routing */}
      <Navbar
        onOpenApply={handleOpenApply}
        onNavigate={handleNavigate}
        currentView={currentView}
      />

      <main id="main-content" tabIndex={-1}>
        {currentView === 'about' && (
          <AboutUsPage onOpenApply={handleOpenApply} onNavigate={handleNavigate} />
        )}

        {currentView === 'product-detail' && (
          <ProductDetailPage
            productId={selectedProductId}
            onOpenApply={handleOpenApply}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'blog' && (
          <BlogPage onNavigate={handleNavigate} onOpenApply={handleOpenApply} />
        )}

        {currentView === 'careers' && (
          <CareersPage onNavigate={handleNavigate} onOpenApply={handleOpenApply} />
        )}

        {currentView === 'gallery' && (
          <GalleryPage onNavigate={handleNavigate} onOpenApply={handleOpenApply} />
        )}

        {currentView === 'cms' && (
          <CmsPortal onNavigate={handleNavigate} />
        )}

        {currentView === 'home' && (
          <>
            {/* 2. Hero */}
            <Hero
              onOpenApply={handleOpenApply}
              onScrollToCalculator={handleScrollToCalculator}
              onNavigateProduct={(prodId) => handleNavigate('product-detail', prodId)}
            />

            {/* 5. "comprehensive product portfolio" (Opens dedicated Product Pages) */}
            <ProductBento
              onSelectProduct={(prodId) => handleNavigate('product-detail', prodId)}
            />

            {/* 3. "Institutional payroll..." (TrustMarquee) */}
            <div id="partners">
              <TrustMarquee />
            </div>

            {/* 4. 15-Minute Prompt Disbursement */}
            <MoveMoneySection onOpenApply={handleOpenApply} />

            {/* 6. "Real calculations..." */}
            <InteractiveCalculator onOpenApply={handleOpenApply} />

            {/* 7. "Executive Governance & Integrity" / Leadership */}
            <LeadershipSection />

            {/* 8. FAQ */}
            <FAQSection />

            {/* 9. "Join 100k+ people and testimonial" */}
            <TestimonialsSliderSection />

            {/* 10. "since your last visit.." */}
            <LiveTickingYieldSection onOpenApply={handleOpenApply} />

            {/* 11. "Ping us, we’re here" */}
            <ContactSection />
          </>
        )}
      </main>

      {/* 12. Footer with dynamic routing & socials */}
      <Footer onOpenApply={handleOpenApply} onNavigate={handleNavigate} />

      {/* Fast-Track Loan Application Modal */}
      <ApplyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultProduct={modalDefaultProduct}
        defaultAmount={modalDefaultAmount}
        defaultTenure={modalDefaultTenure}
      />
    </div>
  );
}
