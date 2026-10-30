import React, { useState } from 'react';
import { BlogPost, INITIAL_BLOG_POSTS } from '../data/blogData';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  ArrowRight,
  ShareNetwork,
  Check,
  Tag,
  Sparkle,
  Calculator,
  WhatsappLogo,
  LinkedinLogo,
  XLogo,
  FacebookLogo,
} from '@phosphor-icons/react';

interface BlogPageProps {
  onNavigate: (view: string, productId?: string) => void;
  onOpenApply: (productName?: string) => void;
}

const STORAGE_KEY = 'nexus_blog_posts_v1';

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate, onOpenApply }) => {
  const [posts] = useState<BlogPost[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      // fallback
    }
    return INITIAL_BLOG_POSTS;
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const categories = [
    'All',
    'Fintech & Credit',
    'Payroll & Remita',
    'Travel & POF',
    'SME Growth',
    'Cooperative Governance',
  ];

  const filteredPosts =
    activeCategory === 'All'
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const featuredPost = posts.find((p) => p.featured) || posts[0];

  // Articles suggested in the sidebar (excluding current selected post)
  const suggestedPosts = selectedPost
    ? posts.filter((p) => p.id !== selectedPost.id).slice(0, 4)
    : [];

  return (
    <div className="pt-24 pb-20 bg-canvas text-ink font-sans min-h-screen">
      {/* Main Content Area: List View vs Reader View */}
      {selectedPost ? (
        /* Full Article Reader with Dedicated Sticky Sidebar */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
          {/* Top Return and Share Bar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-rule">
            <button
              onClick={() => {
                setSelectedPost(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold text-muted hover:text-ink transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to All Articles</span>
            </button>

            {/* Top Return and Social Share Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-muted font-medium mr-1 hidden sm:inline">Share:</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(selectedPost.title + ' - ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on WhatsApp"
                className="p-2 rounded-full bg-accent-soft hover:bg-accent-soft text-brand border border-brand/25 transition-colors cursor-pointer"
              >
                <WhatsappLogo className="w-3.5 h-3.5" weight="fill" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on LinkedIn"
                className="p-2 rounded-full bg-surface hover:bg-surface text-brand border border-brand/25 transition-colors cursor-pointer"
              >
                <LinkedinLogo className="w-3.5 h-3.5" weight="fill" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedPost.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on X"
                className="p-2 rounded-full bg-subtle hover:bg-subtle text-ink border border-rule transition-colors cursor-pointer"
              >
                <XLogo className="w-3.5 h-3.5" weight="regular" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on Facebook"
                className="p-2 rounded-full bg-accent-soft hover:bg-accent-soft text-brand border border-brand/25 transition-colors cursor-pointer"
              >
                <FacebookLogo className="w-3.5 h-3.5" weight="fill" />
              </a>
              <button
                onClick={handleShare}
                className="px-3 py-1.5 rounded-lg bg-subtle hover:bg-subtle text-muted text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-rule ml-1"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-brand" />
                    <span className="text-brand">Copied</span>
                  </>
                ) : (
                  <>
                    <ShareNetwork className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Article Content Column (8 cols) */}
            <article className="lg:col-span-8 space-y-6">
              {/* Category & Title */}
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-md text-xs uppercase tracking-wider font-semibold text-brand bg-accent-soft border border-brand/25">
                  {selectedPost.category}
                </span>
                <h1 className="nx-page-title text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink font-display leading-[1.15]">
                  {selectedPost.title}
                </h1>
              </div>

              {/* Author & Publishing Metadata */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-muted py-3 border-y border-rule font-sans">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-accent-soft border border-brand/25 flex items-center justify-center text-brand">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-ink block">{selectedPost.author}</span>
                    <span className="text-[10px] text-muted">{selectedPost.authorRole}</span>
                  </div>
                </div>
                <span>&middot;</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand" />
                  <span>{selectedPost.date}</span>
                </div>
                <span>&middot;</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand" />
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>

              {/* Featured Cover Image */}
              <div className="aspect-[16/9] rounded-xl overflow-hidden bg-subtle border border-rule shadow-sm relative">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Excerpt Lead */}
              <p className="text-lg sm:text-xl text-ink font-medium leading-relaxed italic border-l-2 border-brand pl-4 py-1">
                "{selectedPost.excerpt}"
              </p>

              {/* Unabridged Article Body */}
              <div className="space-y-5 text-muted text-sm sm:text-base leading-relaxed pt-2 font-sans">
                {selectedPost.content.split('\n\n').map((paragraph: string, idx: number) => (
                  <p key={idx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags Strip */}
              {selectedPost.tags && selectedPost.tags.length > 0 && (
                <div className="pt-6 border-t border-rule flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-brand" />
                    Tags:
                  </span>
                  {selectedPost.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-lg bg-subtle text-muted border border-rule"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Dedicated Social Media Sharing Strip */}
              <div className="pt-6 pb-2 border-t border-rule">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-subtle border border-rule">
                  <div>
                    <div className="text-xs font-semibold text-ink uppercase tracking-wider font-display">
                      Share this Article
                    </div>
                    <div className="text-[11px] text-muted mt-0.5">
                      Circulate to colleagues, business partners, and social networks:
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(selectedPost.title + ' - ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-accent-soft hover:bg-accent-soft border border-brand/25 text-brand text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <WhatsappLogo className="w-4 h-4" weight="fill" />
                      <span>WhatsApp</span>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-surface hover:bg-surface border border-brand/25 text-brand text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <LinkedinLogo className="w-4 h-4" weight="fill" />
                      <span>LinkedIn</span>
                    </a>

                    {/* Twitter / X */}
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedPost.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-subtle hover:bg-subtle border border-rule text-ink text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <XLogo className="w-4 h-4" weight="regular" />
                      <span>X</span>
                    </a>

                    {/* Facebook */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-accent-soft hover:bg-accent-soft border border-brand/25 text-brand text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <FacebookLogo className="w-4 h-4" weight="fill" />
                      <span>Facebook</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom In-Article CTA Banner */}
              <div className="p-6 sm:p-8 rounded-xl bg-gradient-to-r from-subtle via-subtle to-subtle border border-brand/25 flex flex-col sm:flex-row items-center justify-between gap-5 mt-10">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-lg font-semibold text-ink font-display">Need urgent emergency liquidity?</h4>
                  <p className="text-xs text-muted">
                    Apply for Suremoney or Nexus Credit and receive disbursement in 15 minutes flat.
                  </p>
                </div>
                <button
                  onClick={() => onOpenApply('Suremoney Loan')}
                  className="px-6 py-3 rounded-full bg-action hover:bg-action-hover text-on-action font-semibold text-xs uppercase tracking-wider shrink-0 transition-all shadow-sm cursor-pointer"
                >
                  Apply in 15 Mins
                </button>
              </div>
            </article>

            {/* Sidebar Column (4 cols) - Suggests Other Articles */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              {/* Suggested Other Articles Box */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-surface to-surface border border-rule shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-rule pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkle className="w-4 h-4 text-brand" weight="regular" />
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-ink font-display">
                      Read More Articles
                    </h3>
                  </div>
                  <span className="text-[10px] text-muted font-sans">Nexus Insights</span>
                </div>

                <div className="space-y-4">
                  {suggestedPosts.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => {
                        setSelectedPost(post);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group p-3 rounded-xl hover:bg-subtle border border-transparent hover:border-rule transition-all cursor-pointer flex gap-3.5 items-start"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-subtle shrink-0 border border-rule">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="space-y-1 flex-1">
                        <span className="text-[10px] uppercase font-semibold text-brand">
                          {post.category}
                        </span>
                        <h4 className="text-xs font-semibold text-ink line-clamp-2 group-hover:text-brand transition-colors leading-snug">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-muted pt-0.5">
                          <span>{post.readTime}</span>
                          <span>&middot;</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calculator Quick Widget */}
              <div className="p-6 rounded-xl bg-subtle border border-rule space-y-3">
                <div className="w-10 h-10 rounded-xl bg-accent-soft text-brand flex items-center justify-center">
                  <Calculator className="w-5 h-5" weight="regular" />
                </div>
                <h4 className="text-base font-semibold text-ink font-display">Instant Repayment Calculator</h4>
                <p className="text-xs text-muted leading-relaxed font-sans">
                  Calculate real monthly installments across Suremoney, Nexus Credit, and Car-for-Cash with zero guesswork.
                </p>
                <button
                  onClick={() => onNavigate('calculator')}
                  className="w-full py-2.5 rounded-xl bg-subtle hover:bg-subtle text-ink text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span>Launch Loan Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Category Quick Cloud */}
              <div className="p-6 rounded-xl bg-subtle border border-rule space-y-3">
                <h4 className="text-xs uppercase font-semibold tracking-wider text-muted">
                  Topic Archives
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {categories.filter((c) => c !== 'All').map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedPost(null);
                        setActiveCategory(cat);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-xs px-2.5 py-1 rounded-lg bg-subtle hover:bg-subtle text-muted hover:text-ink transition-colors cursor-pointer border border-rule"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      ) : (
        /* Blog Article Feed / List View */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          {/* Header */}
          <div className="relative overflow-hidden py-10 border-b border-rule">
            <div className="max-w-3xl">
              <span className="text-xs uppercase tracking-widest text-brand font-semibold">
                News &amp; Media Insights
              </span>
              <h1 className="nx-page-title text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink font-display mt-2 mb-4 leading-[1.1]">
                Financial intelligence for <span className="text-brand">modern Nigeria.</span>
              </h1>
              <p className="text-base text-muted leading-relaxed font-sans">
                Deep dives into public sector payroll dynamics, travel proof of capability frameworks, Remita integrations, and responsible credit expansion.
              </p>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-sans">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-action text-on-action shadow-sm '
                    : 'bg-subtle text-muted hover:text-ink border border-rule'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Post Hero Card (Only on 'All') */}
          {activeCategory === 'All' && featuredPost && (
            <div
              onClick={() => {
                setSelectedPost(featuredPost);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group rounded-xl p-6 sm:p-10 bg-gradient-to-br from-surface via-surface to-surface border border-rule hover:border-brand/25 transition-all cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm"
            >
              <div className="lg:col-span-7 aspect-[16/10] rounded-xl overflow-hidden bg-subtle border border-rule">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase font-semibold text-brand bg-accent-soft px-2.5 py-0.5 rounded-md border border-brand/25">
                    Featured Analysis
                  </span>
                  <span className="text-xs text-muted">{featuredPost.readTime}</span>
                </div>

                <h2 className="nx-section-title text-2xl sm:text-3xl font-semibold text-ink font-display group-hover:text-brand transition-colors leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-sm text-muted leading-relaxed font-sans">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center gap-3 pt-2 text-xs text-muted">
                  <span className="font-semibold text-ink">{featuredPost.author}</span>
                  <span>&middot;</span>
                  <span>{featuredPost.date}</span>
                </div>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-brand group-hover:translate-x-1 transition-transform">
                    <span>Read Complete Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => {
                  setSelectedPost(post);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group rounded-xl p-6 bg-gradient-to-br from-surface to-surface border border-rule hover:border-brand/25 transition-all flex flex-col justify-between cursor-pointer shadow-sm hover:-translate-y-1 duration-200"
              >
                <div>
                  <div className="aspect-[16/10] rounded-xl overflow-hidden bg-subtle mb-5 border border-rule">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-[11px] font-semibold uppercase text-brand">
                      {post.category}
                    </span>
                    <span className="text-[11px] text-muted">{post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-ink font-display mb-2 group-hover:text-brand transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-muted line-clamp-3 leading-relaxed font-sans mb-4">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-rule flex items-center justify-between text-xs text-muted">
                  <span>{post.date}</span>
                  <span className="text-brand font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
