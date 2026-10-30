import React, { useState, useEffect, useCallback } from 'react';
import { GalleryItem, INITIAL_GALLERY_ITEMS, GalleryFolder } from '../data/galleryData';
import {
  MapPin,
  Calendar,
  X,
  Play,
  Pause,
  CaretLeft,
  CaretRight,
  FolderSimple,
  Sparkle,
  ArrowRight,
  ShieldCheck,
} from '@phosphor-icons/react';

interface GalleryPageProps {
  onNavigate: (view: string, productId?: string) => void;
  onOpenApply: (productName?: string) => void;
}

const STORAGE_KEY = 'nexus_gallery_items_v1';

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate, onOpenApply }) => {
  const [items] = useState<GalleryItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      // fallback
    }
    return INITIAL_GALLERY_ITEMS;
  });

  const [activeFolder, setActiveFolder] = useState<string>('All');
  const [slideshowIndex, setSlideshowIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const folders: (string | GalleryFolder)[] = [
    'All',
    'Office',
    'CSR',
    'Store Marketing',
    'Store Operations',
    'Executive Summits',
  ];

  const filteredItems =
    activeFolder === 'All'
      ? items
      : items.filter((item) => item.category === activeFolder);

  // Slideshow navigation
  const handlePrev = useCallback(() => {
    if (slideshowIndex === null) return;
    setSlideshowIndex((prev) =>
      prev === null ? 0 : (prev - 1 + filteredItems.length) % filteredItems.length
    );
  }, [slideshowIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (slideshowIndex === null) return;
    setSlideshowIndex((prev) =>
      prev === null ? 0 : (prev + 1) % filteredItems.length
    );
  }, [slideshowIndex, filteredItems.length]);

  // Auto-play timer for slideshow
  useEffect(() => {
    if (slideshowIndex === null || !isPlaying) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [slideshowIndex, isPlaying, handleNext]);

  // Keyboard navigation & escape for slideshow
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (slideshowIndex === null) return;
      if (e.key === 'Escape') setSlideshowIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slideshowIndex, handleNext, handlePrev]);

  const activeItem = slideshowIndex !== null ? filteredItems[slideshowIndex] : null;

  return (
    <div className="pt-24 pb-20 bg-canvas text-ink font-sans min-h-screen">
      {/* FULLSCREEN SLIDESHOW MODAL */}
      {activeItem && slideshowIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-2xl animate-in fade-in duration-200"
          onClick={() => setSlideshowIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-surface border border-rule rounded-xl overflow-hidden shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-rule bg-surface shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase font-semibold text-brand bg-accent-soft px-2.5 py-1 rounded-md border border-brand/25">
                  Folder: {activeItem.category}
                </span>
                <span className="text-xs text-muted font-mono">
                  {slideshowIndex + 1} of {filteredItems.length}
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                {/* Auto Play / Pause Toggle */}
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-colors cursor-pointer ${
                    isPlaying
                      ? 'bg-accent-soft text-brand border-brand/25'
                      : 'bg-subtle text-muted border-rule hover:text-ink'
                  }`}
                  title={isPlaying ? 'Pause Auto-Play' : 'Start Auto-Play'}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" weight="regular" />
                      <span className="hidden sm:inline">Auto-Playing (4.5s)</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" weight="regular" />
                      <span className="hidden sm:inline">Play Slideshow</span>
                    </>
                  )}
                </button>

                {/* Prev */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2 rounded-xl bg-subtle hover:bg-subtle text-ink border border-rule transition-colors cursor-pointer"
                  aria-label="Previous image"
                >
                  <CaretLeft className="w-4 h-4" />
                </button>

                {/* Next */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2 rounded-xl bg-subtle hover:bg-subtle text-ink border border-rule transition-colors cursor-pointer"
                  aria-label="Next image"
                >
                  <CaretRight className="w-4 h-4" />
                </button>

                {/* Close */}
                <button
                  type="button"
                  onClick={() => setSlideshowIndex(null)}
                  className="p-2 rounded-xl bg-subtle hover:bg-subtle text-ink border border-rule transition-colors cursor-pointer ml-1"
                  aria-label="Close slideshow"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Slideshow Image Area */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-canvas overflow-hidden flex items-center justify-center">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-contain"
              />

              {/* Prev Overlay Button */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-subtle hover:bg-accent-soft text-ink border border-rule transition-all cursor-pointer opacity-75 hover:opacity-100 hover:scale-105"
                aria-label="Previous slide"
              >
                <CaretLeft className="w-5 h-5" />
              </button>

              {/* Next Overlay Button */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-subtle hover:bg-accent-soft text-ink border border-rule transition-all cursor-pointer opacity-75 hover:opacity-100 hover:scale-105"
                aria-label="Next slide"
              >
                <CaretRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slideshow Metadata Footer */}
            <div className="p-5 sm:p-6 bg-gradient-to-t from-surface to-surface space-y-2 shrink-0 border-t border-rule">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg sm:text-xl font-semibold text-ink font-display">
                  {activeItem.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <Calendar className="w-3.5 h-3.5 text-brand" />
                  <span>{activeItem.date}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-3xl">
                {activeItem.description}
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs text-muted">
                <MapPin className="w-4 h-4 text-brand" />
                <span>{activeItem.location}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <div className="relative overflow-hidden py-14 sm:py-16 border-b border-rule bg-gradient-to-b from-surface via-surface to-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-brand font-semibold">
              Visual Archives &amp; Office Highlights
            </span>
            <h1 className="nx-page-title text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink font-display mt-2 mb-4 leading-[1.1]">
              Inside Nexus: Our <span className="text-brand">Spaces &amp; Field Milestones.</span>
            </h1>
            <p className="text-base text-muted leading-relaxed font-sans">
              Explore our operations across 5 curated folders: Office Headquarters, CSR Community Drives, Store Marketing, Store Operations, and Executive Summits.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* 5 Folder Category Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none font-sans">
          {folders.map((fld) => {
            const count =
              fld === 'All'
                ? items.length
                : items.filter((it) => it.category === fld).length;
            const isSelected = activeFolder === fld;
            return (
              <button
                key={fld}
                onClick={() => setActiveFolder(fld)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-action text-on-action shadow-sm '
                    : 'bg-subtle text-muted hover:text-ink border border-rule hover:border-rule'
                }`}
              >
                <FolderSimple className="w-4 h-4 shrink-0" weight={isSelected ? 'fill' : 'regular'} />
                <span>{fld}</span>
                <span
                  className={`text-[10px] px-2 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-subtle text-ink' : 'bg-subtle text-muted'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Image Grid with Slideshow Launcher */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                setSlideshowIndex(idx);
                setIsPlaying(true);
              }}
              className="group rounded-xl bg-gradient-to-br from-surface via-surface to-surface border border-rule hover:border-brand/25 p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-sm hover:-translate-y-1.5"
            >
              <div>
                {/* Image Frame */}
                <div className="relative aspect-[16/11] rounded-xl overflow-hidden mb-4 bg-subtle border border-rule">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 nx-image-badge bg-black/80 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-semibold text-brand border border-rule uppercase tracking-wider">
                    {item.category}
                  </div>
                  <div className="absolute inset-0 bg-subtle opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-action text-on-action font-semibold text-xs flex items-center gap-1.5 shadow-sm">
                      <Play className="w-3.5 h-3.5" weight="regular" />
                      <span>Open Slideshow</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted mb-2">
                  <Calendar className="w-3.5 h-3.5 text-brand" />
                  <span>{item.date}</span>
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-ink font-display mb-2 group-hover:text-brand transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-muted line-clamp-2 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-rule flex items-center justify-between text-xs text-muted">
                <span className="flex items-center gap-1.5 truncate max-w-[200px]">
                  <MapPin className="w-3.5 h-3.5 text-brand shrink-0" />
                  <span className="truncate">{item.location}</span>
                </span>
                <span className="text-brand font-semibold text-[11px] shrink-0">
                  View Full &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-8 sm:p-10 rounded-xl bg-subtle border border-rule flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-ink font-display">
              Schedule an in-person visit to our Abuja headquarters
            </h3>
            <p className="text-sm text-muted max-w-xl">
              2nd Floor, Right Wing, NICON Insurance Building, Central Business District, Abuja. Meet with our executive underwriting team in private consultation.
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=NICON+Insurance+Building,+Central+Business+District,+Abuja,+Nigeria"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 rounded-lg bg-action hover:bg-action-hover text-on-action font-semibold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer shrink-0"
          >
            Locate on Google Maps
          </a>
        </div>
      </div>
    </div>
  );
};
