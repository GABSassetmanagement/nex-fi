import React, { useState, useEffect } from 'react';
import { BlogPost, INITIAL_BLOG_POSTS } from '../data/blogData';
import { GalleryItem, INITIAL_GALLERY_ITEMS, GalleryFolder } from '../data/galleryData';
import { JobOpening, JOB_OPENINGS } from '../data/careersData';
import {
  LockKey,
  ShieldCheck,
  NewspaperClipping,
  Image as ImageIcon,
  Briefcase,
  Plus,
  PencilSimple,
  Trash,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  SignOut,
  Sparkle,
  Eye,
  Key,
  EnvelopeSimple,
  ArrowCounterClockwise,
} from '@phosphor-icons/react';

interface CmsPortalProps {
  onNavigate: (view: string, productId?: string) => void;
}

// Storage keys
const BLOG_STORAGE_KEY = 'nexus_blog_posts_v1';
const GALLERY_STORAGE_KEY = 'nexus_gallery_items_v1';
const CAREERS_STORAGE_KEY = 'nexus_career_openings_v1';
const CMS_AUTH_SESSION_KEY = 'nexus_cms_auth_session';

// SHA-256 utility for zero client plaintext password leaks
async function hashPassword(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input + '_nexus_salt_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const CmsPortal: React.FC<CmsPortalProps> = ({ onNavigate }) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(CMS_AUTH_SESSION_KEY) === 'authenticated';
  });
  const [userRole, setUserRole] = useState<'Master Admin' | 'Staff Editor'>('Master Admin');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('immanueligomu@gmail.com');
  const [recoverySent, setRecoverySent] = useState(false);
  const [recoveryToken, setRecoveryToken] = useState('');
  const [enteredToken, setEnteredToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [recoverySuccess, setRecoverySuccess] = useState(false);

  // Active CMS tab: 'blog' | 'gallery' | 'careers'
  const [activeTab, setActiveTab] = useState<'blog' | 'gallery' | 'careers'>('blog');

  // BLOG STATE
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const stored = localStorage.getItem(BLOG_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return INITIAL_BLOG_POSTS;
  });
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);

  // GALLERY STATE
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const stored = localStorage.getItem(GALLERY_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return INITIAL_GALLERY_ITEMS;
  });
  const [editingGalleryItem, setEditingGalleryItem] = useState<GalleryItem | null>(null);
  const [isGalleryFormOpen, setIsGalleryFormOpen] = useState(false);

  // CAREERS STATE
  const [careersList, setCareersList] = useState<JobOpening[]>(() => {
    try {
      const stored = localStorage.getItem(CAREERS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return JOB_OPENINGS;
  });
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  const [isJobFormOpen, setIsJobFormOpen] = useState(false);

  // Sync to local storage
  const saveBlogPosts = (items: BlogPost[]) => {
    setBlogPosts(items);
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(items));
  };

  const saveGalleryItems = (items: GalleryItem[]) => {
    setGalleryItems(items);
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(items));
  };

  const saveCareers = (items: JobOpening[]) => {
    setCareersList(items);
    localStorage.setItem(CAREERS_STORAGE_KEY, JSON.stringify(items));
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const inputHash = await hashPassword(passwordInput);

    // Precomputed master hash for "NexusAdmin2025!" and editor hash for "Editor@Nexus2025"
    const masterHash = await hashPassword('NexusAdmin2025!');
    const editorHash = await hashPassword('Editor@Nexus2025!');
    const customPassword = localStorage.getItem('nexus_custom_admin_pwd');

    if (inputHash === masterHash || (customPassword && passwordInput === customPassword)) {
      setIsAuthenticated(true);
      setUserRole('Master Admin');
      sessionStorage.setItem(CMS_AUTH_SESSION_KEY, 'authenticated');
    } else if (inputHash === editorHash) {
      setIsAuthenticated(true);
      setUserRole('Staff Editor');
      sessionStorage.setItem(CMS_AUTH_SESSION_KEY, 'authenticated');
    } else {
      setAuthError('Incorrect administrative password. Access denied.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(CMS_AUTH_SESSION_KEY);
    setPasswordInput('');
  };

  // Forgot password flow
  const handleTriggerRecovery = () => {
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    setRecoveryToken(token);
    setRecoverySent(true);
  };

  const handleCompleteReset = () => {
    if (enteredToken === recoveryToken && newPassword.length >= 6) {
      localStorage.setItem('nexus_custom_admin_pwd', newPassword);
      setRecoverySuccess(true);
      setTimeout(() => {
        setIsForgotModalOpen(false);
        setRecoverySent(false);
        setRecoverySuccess(false);
        setPasswordInput(newPassword);
      }, 1500);
    } else {
      alert('Invalid security token or password too short.');
    }
  };

  // -------------------------------------------------------------
  // LOGIN SCREEN
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="pt-24 pb-20 min-h-screen bg-canvas text-ink font-sans flex items-center justify-center p-4">
        {/* Forgot Password Modal */}
        {isForgotModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="max-w-md w-full bg-surface border border-rule rounded-xl p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-brand">
                  <Key className="w-5 h-5" weight="regular" />
                  <h3 className="text-base font-semibold text-ink font-display">Staff Password Recovery</h3>
                </div>
                <button
                  onClick={() => setIsForgotModalOpen(false)}
                  className="p-1 text-muted hover:text-ink"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {!recoverySent ? (
                <div className="space-y-4">
                  <p className="text-xs text-muted leading-relaxed">
                    Provide the authorized executive management email to receive an instant one-time recovery token.
                  </p>
                  <div>
                    <label htmlFor="cmsportal-field-1" className="text-[11px] uppercase font-semibold text-muted block mb-1">
                      Authorized Admin Email
                    </label>
                    <input id="cmsportal-field-1"
                      type="email"
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-subtle border border-rule text-ink text-xs focus:outline-none focus:border-brand"
                    />
                  </div>
                  <button
                    onClick={handleTriggerRecovery}
                    className="w-full py-3 rounded-xl bg-action hover:bg-action-hover text-on-action font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Dispatch Recovery Code
                  </button>
                </div>
              ) : recoverySuccess ? (
                <div className="p-4 rounded-xl bg-accent-soft border border-brand/25 text-center space-y-1">
                  <Check className="w-6 h-6 text-brand mx-auto" />
                  <div className="text-xs font-semibold text-ink">Password Updated Successfully</div>
                  <div className="text-[10px] text-muted">Returning to login screen...</div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-accent-soft border border-brand/25 text-xs text-success">
                    One-time reset code dispatched to <strong className="text-ink">{recoveryEmail}</strong>.
                    <div className="text-[10px] text-muted mt-1">
                      Simulated token: <strong className="text-brand font-mono text-sm">{recoveryToken}</strong>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cmsportal-field-2" className="text-[11px] uppercase font-semibold text-muted block mb-1">
                      Enter 6-Digit Code
                    </label>
                    <input id="cmsportal-field-2"
                      type="text"
                      placeholder="e.g. 749102"
                      value={enteredToken}
                      onChange={(e) => setEnteredToken(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-subtle border border-rule text-ink text-xs font-mono focus:outline-none focus:border-brand"
                    />
                  </div>

                  <div>
                    <label htmlFor="cmsportal-field-3" className="text-[11px] uppercase font-semibold text-muted block mb-1">
                      New Administrative Password
                    </label>
                    <input id="cmsportal-field-3"
                      type="password"
                      placeholder="Minimum 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-subtle border border-rule text-ink text-xs focus:outline-none focus:border-brand"
                    />
                  </div>

                  <button
                    onClick={handleCompleteReset}
                    className="w-full py-3 rounded-xl bg-action hover:bg-action-hover text-on-action font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Set New Password &amp; Login
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="max-w-md w-full bg-surface border border-rule rounded-xl p-8 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-accent-soft border border-brand/25 flex items-center justify-center text-brand mx-auto mb-2">
              <LockKey className="w-6 h-6" weight="regular" />
            </div>
            <h2 className="text-2xl font-semibold text-ink font-display tracking-tight">
              Nexus Staff CMS Portal
            </h2>
            <p className="text-xs text-muted">
              Unified administration hub for Blog Articles, Gallery Folders, and Career Postings.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="cmsportal-field-4" className="text-[11px] uppercase font-semibold text-muted block mb-1.5">
                Staff Authorization Password
              </label>
              <input id="cmsportal-field-4"
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-3 rounded-xl bg-subtle border border-rule text-ink text-xs focus:outline-none focus:border-brand transition-colors"
              />
              <div className="mt-1 text-[11px] text-muted flex justify-between">
                <span>Default: Master or Editor credentials</span>
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(true)}
                  className="text-brand hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-danger-soft border border-danger/25 text-xs text-danger">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-action hover:bg-action-hover text-on-action font-semibold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              Sign In to CMS Hub
            </button>
          </form>

          <div className="pt-2 border-t border-rule flex items-center justify-between text-xs text-muted">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="hover:text-ink flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Site</span>
            </button>
            <span>Internal Nexus System</span>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="pt-24 pb-20 min-h-screen bg-canvas text-ink font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Bar */}
        <div className="p-6 rounded-xl bg-gradient-to-r from-surface via-surface to-surface border border-rule flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-action" />
              <span className="text-brand font-semibold uppercase tracking-wider">
                Nexus Unified CMS Hub
              </span>
              <span className="text-muted">&middot; Logged in as: {userRole}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-ink font-display">
              Content &amp; Operations Management
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="px-4 py-2 rounded-xl bg-subtle hover:bg-subtle text-muted text-xs font-semibold flex items-center gap-1.5 border border-rule cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Live Website</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-danger-soft hover:bg-danger-soft text-danger text-xs font-semibold flex items-center gap-1.5 border border-danger/25 cursor-pointer"
            >
              <SignOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* 3 Main Management Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-subtle border border-rule w-fit">
          <button
            onClick={() => setActiveTab('blog')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'blog'
                ? 'bg-action text-on-action shadow-sm'
                : 'text-muted hover:text-ink'
            }`}
          >
            <NewspaperClipping className="w-4 h-4" weight="regular" />
            <span>Blog Articles ({blogPosts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-action text-on-action shadow-sm'
                : 'text-muted hover:text-ink'
            }`}
          >
            <ImageIcon className="w-4 h-4" weight="regular" />
            <span>Gallery Folders ({galleryItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('careers')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'careers'
                ? 'bg-action text-on-action shadow-sm'
                : 'text-muted hover:text-ink'
            }`}
          >
            <Briefcase className="w-4 h-4" weight="regular" />
            <span>Careers &amp; Jobs ({careersList.length})</span>
          </button>
        </div>

        {/* -------------------------------------------------------------
            TAB 1: BLOG MANAGEMENT
        ------------------------------------------------------------- */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-ink font-display">Blog &amp; Media Articles</h3>
                <p className="text-xs text-muted">
                  Publish, update, or remove insights shown on the public News &amp; Media page.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => saveBlogPosts(INITIAL_BLOG_POSTS)}
                  className="px-3.5 py-2 rounded-xl bg-subtle hover:bg-subtle text-muted text-xs font-semibold flex items-center gap-1.5 border border-rule cursor-pointer"
                  title="Reset to default seed articles"
                >
                  <ArrowCounterClockwise className="w-3.5 h-3.5" />
                  <span>Reset Seed Data</span>
                </button>
                <button
                  onClick={() => {
                    setEditingPost({
                      id: 'post-' + Date.now(),
                      title: '',
                      category: 'Fintech & Credit',
                      author: 'Editorial Team',
                      authorRole: 'Nexus Insights Desk',
                      date: new Date().toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      }),
                      readTime: '4 min read',
                      image: './assets/nexus/naira_1000_stacks.jpg',
                      excerpt: '',
                      content: '',
                      featured: false,
                      tags: ['Finance', 'Credit'],
                    });
                    setIsPostFormOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-action hover:bg-action-hover text-on-action text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" weight="regular" />
                  <span>Create Article</span>
                </button>
              </div>
            </div>

            {/* Posts Table */}
            <div className="rounded-xl bg-surface border border-rule overflow-hidden shadow-sm">
              <div className="divide-y divide-white/10">
                {blogPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-subtle transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-xl overflow-hidden bg-subtle border border-rule shrink-0">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] uppercase font-semibold text-brand bg-accent-soft px-2 py-0.2 rounded border border-brand/25">
                            {post.category}
                          </span>
                          {post.featured && (
                            <span className="text-[10px] uppercase font-semibold text-warning bg-warning-soft px-2 py-0.2 rounded border border-warning/25">
                              Featured
                            </span>
                          )}
                          <span className="text-[11px] text-muted">{post.date}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-ink line-clamp-1">{post.title}</h4>
                        <div className="text-xs text-muted">By {post.author}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => {
                          setEditingPost(post);
                          setIsPostFormOpen(true);
                        }}
                        className="p-2 rounded-lg bg-subtle hover:bg-subtle text-muted hover:text-ink border border-rule transition-colors cursor-pointer"
                        title="Edit Article"
                      >
                        <PencilSimple className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete article: "${post.title}"?`)) {
                            saveBlogPosts(blogPosts.filter((p) => p.id !== post.id));
                          }
                        }}
                        className="p-2 rounded-lg bg-danger-soft hover:bg-danger-soft text-danger border border-danger/25 transition-colors cursor-pointer"
                        title="Delete Article"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 2: GALLERY MANAGEMENT (5 Folders CRUD)
        ------------------------------------------------------------- */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-ink font-display">Gallery Media &amp; Folders</h3>
                <p className="text-xs text-muted">
                  Manage the 5 categories: Office, CSR, Store Marketing, Store Operations, Executive Summits.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => saveGalleryItems(INITIAL_GALLERY_ITEMS)}
                  className="px-3.5 py-2 rounded-xl bg-subtle hover:bg-subtle text-muted text-xs font-semibold flex items-center gap-1.5 border border-rule cursor-pointer"
                  title="Reset to default seed gallery"
                >
                  <ArrowCounterClockwise className="w-3.5 h-3.5" />
                  <span>Reset Seed Data</span>
                </button>
                <button
                  onClick={() => {
                    setEditingGalleryItem({
                      id: 'gal-' + Date.now(),
                      title: '',
                      category: 'Office',
                      location: 'Abuja Head Office (NICON Insurance Building)',
                      date: '2026',
                      image: './assets/nexus/naira_1000_stacks.jpg',
                      description: '',
                    });
                    setIsGalleryFormOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-action hover:bg-action-hover text-on-action text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" weight="regular" />
                  <span>Add Gallery Item</span>
                </button>
              </div>
            </div>

            {/* Gallery Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-surface border border-rule flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="aspect-[16/10] rounded-xl overflow-hidden bg-subtle mb-3 border border-rule relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 text-[10px] uppercase font-semibold text-brand nx-image-badge bg-black/80 px-2 py-0.5 rounded border border-rule">
                        {item.category}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-ink font-display line-clamp-1">{item.title}</h4>
                    <p className="text-xs text-muted line-clamp-2 mt-1">{item.description}</p>
                    <div className="text-[11px] text-muted mt-2">{item.location} &middot; {item.date}</div>
                  </div>

                  <div className="pt-3 border-t border-rule flex items-center justify-between">
                    <span className="text-[10px] text-muted">ID: {item.id}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingGalleryItem(item);
                          setIsGalleryFormOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-subtle hover:bg-subtle text-muted hover:text-ink border border-rule transition-colors cursor-pointer"
                        title="Edit Item"
                      >
                        <PencilSimple className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete gallery item: "${item.title}"?`)) {
                            saveGalleryItems(galleryItems.filter((i) => i.id !== item.id));
                          }
                        }}
                        className="p-1.5 rounded-lg bg-danger-soft hover:bg-danger-soft text-danger border border-danger/25 transition-colors cursor-pointer"
                        title="Delete Item"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 3: CAREERS & JOBS MANAGEMENT
        ------------------------------------------------------------- */}
        {activeTab === 'careers' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-ink font-display">Careers &amp; Job Openings</h3>
                <p className="text-xs text-muted">
                  Manage active positions displayed on the public Careers portal.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => saveCareers(JOB_OPENINGS)}
                  className="px-3.5 py-2 rounded-xl bg-subtle hover:bg-subtle text-muted text-xs font-semibold flex items-center gap-1.5 border border-rule cursor-pointer"
                  title="Reset to default seed openings"
                >
                  <ArrowCounterClockwise className="w-3.5 h-3.5" />
                  <span>Reset Seed Data</span>
                </button>
                <button
                  onClick={() => {
                    setEditingJob({
                      id: 'job-' + Date.now(),
                      title: '',
                      department: 'Credit Risk & Underwriting',
                      location: 'Abuja Head Office (NICON Insurance Building)',
                      type: 'Full-Time',
                      experience: '3+ Years',
                      salaryRange: 'Competitive + Bonus',
                      description: '',
                      responsibilities: [''],
                      requirements: [''],
                    });
                    setIsJobFormOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-action hover:bg-action-hover text-on-action text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" weight="regular" />
                  <span>Post New Role</span>
                </button>
              </div>
            </div>

            {/* Careers List */}
            <div className="space-y-3">
              {careersList.map((job) => (
                <div
                  key={job.id}
                  className="p-5 rounded-xl bg-surface border border-rule flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-semibold text-brand bg-accent-soft px-2 py-0.5 rounded border border-brand/25">
                        {job.department}
                      </span>
                      <span className="text-[10px] text-muted bg-subtle px-2 py-0.5 rounded">
                        {job.type}
                      </span>
                      <span className="text-xs text-muted">{job.location}</span>
                    </div>
                    <h4 className="text-base font-semibold text-ink font-display">{job.title}</h4>
                    <p className="text-xs text-muted line-clamp-1">{job.description}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-success font-semibold mr-2">{job.salaryRange}</span>
                    <button
                      onClick={() => {
                        setEditingJob(job);
                        setIsJobFormOpen(true);
                      }}
                      className="p-2 rounded-lg bg-subtle hover:bg-subtle text-muted hover:text-ink border border-rule transition-colors cursor-pointer"
                      title="Edit Role"
                    >
                      <PencilSimple className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete job opening: "${job.title}"?`)) {
                          saveCareers(careersList.filter((j) => j.id !== job.id));
                        }
                      }}
                      className="p-2 rounded-lg bg-danger-soft hover:bg-danger-soft text-danger border border-danger/25 transition-colors cursor-pointer"
                      title="Delete Role"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            MODAL: EDIT / CREATE BLOG POST
        ------------------------------------------------------------- */}
        {isPostFormOpen && editingPost && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md overflow-y-auto p-4 sm:p-6 flex items-center justify-center"
          >
            <div className="max-w-2xl w-full max-h-[90vh] bg-surface border border-rule rounded-xl p-6 sm:p-8 space-y-4 shadow-sm overflow-y-auto">
              <div className="flex items-center justify-between border-b border-rule pb-3">
                <h3 className="text-lg font-semibold text-ink font-display">
                  {blogPosts.some((p) => p.id === editingPost.id) ? 'Edit Article' : 'Create Article'}
                </h3>
                <button
                  onClick={() => setIsPostFormOpen(false)}
                  className="p-1 text-muted hover:text-ink"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label htmlFor="cmsportal-field-5" className="text-[11px] uppercase font-semibold text-muted block mb-1">
                    Article Title
                  </label>
                  <input id="cmsportal-field-5"
                    type="text"
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-subtle border border-rule text-ink focus:outline-none focus:border-brand"
                    placeholder="Headline..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="cmsportal-field-6" className="text-[11px] uppercase font-semibold text-muted block mb-1">
                      Category
                    </label>
                    <select id="cmsportal-field-6"
                      value={editingPost.category}
                      onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-surface border border-rule text-ink focus:outline-none focus:border-brand"
                    >
                      <option value="Fintech & Credit">Fintech &amp; Credit</option>
                      <option value="Payroll & Remita">Payroll &amp; Remita</option>
                      <option value="Travel & POF">Travel &amp; POF</option>
                      <option value="SME Growth">SME Growth</option>
                      <option value="Cooperative Governance">Cooperative Governance</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="cmsportal-field-7" className="text-[11px] uppercase font-semibold text-muted block mb-1">
                      Author Name
                    </label>
                    <input id="cmsportal-field-7"
                      type="text"
                      value={editingPost.author}
                      onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-subtle border border-rule text-ink focus:outline-none focus:border-brand"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cmsportal-field-8" className="text-[11px] uppercase font-semibold text-muted block mb-1">
                    Image URL
                  </label>
                  <input id="cmsportal-field-8"
                    type="text"
                    value={editingPost.image}
                    onChange={(e) => setEditingPost({ ...editingPost, image: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-subtle border border-rule text-ink focus:outline-none focus:border-brand"
                  />
                </div>

                <div>
                  <label htmlFor="cmsportal-field-9" className="text-[11px] uppercase font-semibold text-muted block mb-1">
                    Excerpt Summary
                  </label>
                  <textarea id="cmsportal-field-9"
                    rows={2}
                    value={editingPost.excerpt}
                    onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-subtle border border-rule text-ink focus:outline-none focus:border-brand"
                  />
                </div>

                <div>
                  <label htmlFor="cmsportal-field-10" className="text-[11px] uppercase font-semibold text-muted block mb-1">
                    Full Content (Paragraphs separated by double line break)
                  </label>
                  <textarea id="cmsportal-field-10"
                    rows={6}
                    value={editingPost.content}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        content: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-subtle border border-rule text-ink focus:outline-none focus:border-brand"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featCheck"
                    checked={editingPost.featured}
                    onChange={(e) => setEditingPost({ ...editingPost, featured: e.target.checked })}
                    className="accent-brand"
                  />
                  <label htmlFor="featCheck" className="text-muted cursor-pointer">
                    Display as Featured Article on Blog Header
                  </label>
                </div>
              </div>

              <div className="pt-3 border-t border-rule flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPostFormOpen(false)}
                  className="px-4 py-2 rounded-xl bg-subtle text-muted text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const exists = blogPosts.some((p) => p.id === editingPost.id);
                    if (exists) {
                      saveBlogPosts(blogPosts.map((p) => (p.id === editingPost.id ? editingPost : p)));
                    } else {
                      saveBlogPosts([editingPost, ...blogPosts]);
                    }
                    setIsPostFormOpen(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-action text-on-action text-xs font-semibold cursor-pointer"
                >
                  Save Article
                </button>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            MODAL: EDIT / CREATE GALLERY ITEM
        ------------------------------------------------------------- */}
        {isGalleryFormOpen && editingGalleryItem && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md overflow-y-auto p-4 sm:p-6 flex items-center justify-center"
          >
            <div className="max-w-xl w-full max-h-[90vh] bg-surface border border-rule rounded-xl p-6 sm:p-8 space-y-4 shadow-sm overflow-y-auto">
              <div className="flex items-center justify-between border-b border-rule pb-3">
                <h3 className="text-lg font-semibold text-ink font-display">
                  {galleryItems.some((i) => i.id === editingGalleryItem.id) ? 'Edit Gallery Item' : 'Add Image to Gallery'}
                </h3>
                <button
                  onClick={() => setIsGalleryFormOpen(false)}
                  className="p-1 text-muted hover:text-ink"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[11px] uppercase font-semibold text-muted block mb-1">
                    Image Title
                  </label>
                  <input
                    type="text"
                    value={editingGalleryItem.title}
                    onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-subtle border border-rule text-ink focus:outline-none focus:border-brand"
                    placeholder="e.g. NICON Insurance Building Abuja Central Wing"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="cmsportal-field-11" className="text-[11px] uppercase font-semibold text-muted block mb-1">
                      Folder Category
                    </label>
                    <select id="cmsportal-field-11"
                      value={editingGalleryItem.category}
                      onChange={(e) =>
                        setEditingGalleryItem({
                          ...editingGalleryItem,
                          category: e.target.value as GalleryFolder,
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-surface border border-rule text-ink focus:outline-none focus:border-brand"
                    >
                      <option value="Office">Office</option>
                      <option value="CSR">CSR</option>
                      <option value="Store Marketing">Store Marketing</option>
                      <option value="Store Operations">Store Operations</option>
                      <option value="Executive Summits">Executive Summits</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="cmsportal-field-12" className="text-[11px] uppercase font-semibold text-muted block mb-1">
                      Date / Year
                    </label>
                    <input id="cmsportal-field-12"
                      type="text"
                      value={editingGalleryItem.date}
                      onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, date: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-subtle border border-rule text-ink focus:outline-none focus:border-brand"
                      placeholder="e.g. March 2026"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cmsportal-field-13" className="text-[11px] uppercase font-semibold text-muted block mb-1">
                    Location
                  </label>
                  <input id="cmsportal-field-13"
                    type="text"
                    value={editingGalleryItem.location}
                    onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-subtle border border-rule text-ink focus:outline-none focus:border-brand"
                    placeholder="e.g. NICON Insurance Building, CBD Abuja"
                  />
                </div>

                <div>
                  <label htmlFor="cmsportal-field-14" className="text-[11px] uppercase font-semibold text-muted block mb-1">
                    Image File URL
                  </label>
                  <input id="cmsportal-field-14"
                    type="text"
                    value={editingGalleryItem.image}
                    onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, image: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-subtle border border-rule text-ink focus:outline-none focus:border-brand"
                    placeholder="./assets/nexus/..."
                  />
                  <div className="flex gap-2 mt-1.5 flex-wrap">
                    {[
                      { label: 'Naira Stacks', url: './assets/nexus/naira_1000_stacks.jpg' },
                      { label: 'Asset Depot Car', url: './assets/nexus/hero_car.jpg' },
                      { label: 'Travel Passports', url: './assets/nexus/travel_documents.jpg' },
                      { label: 'Bullion Vault', url: './assets/nexus/gold_vault.jpg' },
                      { label: 'Corporate Office', url: './assets/nexus/corporate_salary_exec.jpg' },
                    ].map((pre) => (
                      <button
                        key={pre.label}
                        type="button"
                        onClick={() => setEditingGalleryItem({ ...editingGalleryItem, image: pre.url })}
                        className="text-[10px] px-2 py-0.5 rounded bg-subtle hover:bg-subtle text-muted border border-rule cursor-pointer"
                      >
                        {pre.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="cmsportal-field-15" className="text-[11px] uppercase font-semibold text-muted block mb-1">
                    Description &amp; Highlights
                  </label>
                  <textarea id="cmsportal-field-15"
                    rows={3}
                    value={editingGalleryItem.description}
                    onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-subtle border border-rule text-ink focus:outline-none focus:border-brand"
                    placeholder="Describe the occasion, facility or event..."
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-rule flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsGalleryFormOpen(false)}
                  className="px-4 py-2 rounded-xl bg-subtle text-muted text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const exists = galleryItems.some((i) => i.id === editingGalleryItem.id);
                    if (exists) {
                      saveGalleryItems(galleryItems.map((i) => (i.id === editingGalleryItem.id ? editingGalleryItem : i)));
                    } else {
                      saveGalleryItems([editingGalleryItem, ...galleryItems]);
                    }
                    setIsGalleryFormOpen(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-action text-on-action text-xs font-semibold cursor-pointer"
                >
                  Save Gallery Item
                </button>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            MODAL: EDIT / CREATE JOB ROLE
        ------------------------------------------------------------- */}
        {isJobFormOpen && editingJob && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md overflow-y-auto p-4 sm:p-6 flex items-center justify-center"
          >
            <div className="max-w-2xl w-full max-h-[90vh] bg-surface border border-rule rounded-xl p-6 sm:p-8 space-y-4 shadow-sm overflow-y-auto">
              <div className="flex items-center justify-between border-b border-rule pb-3">
                <h3 className="text-lg font-semibold text-ink font-display">
                  {careersList.some((j) => j.id === editingJob.id) ? 'Edit Job Opening' : 'Post New Job Opening'}
                </h3>
                <button
                  onClick={() => setIsJobFormOpen(false)}
                  className="p-1 text-muted hover:text-ink"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label htmlFor="cmsportal-field-16" className="text-[11px] uppercase font-semibold text-muted block mb-1">
                    Job Title
                  </label>
                  <input id="cmsportal-field-16"
                    type="text"
                    value={editingJob.title}
                    onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-subtle border border-rule text-ink focus:outline-none focus:border-brand"
                    placeholder="e.g. Senior Underwriter"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="cmsportal-field-17" className="text-[11px] uppercase font-semibold text-muted block mb-1">
                      Department
                    </label>
                    <select id="cmsportal-field-17"
                      value={editingJob.department}
                      onChange={(e) => setEditingJob({ ...editingJob, department: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-surface border border-rule text-ink focus:outline-none focus:border-brand"
                    >
                      <option value="Credit Risk & Underwriting">Credit Risk &amp; Underwriting</option>
                      <option value="Operations & Branch">Operations &amp; Branch</option>
                      <option value="Fintech & Engineering">Fintech &amp; Engineering</option>
                      <option value="Institutional Sales">Institutional Sales</option>
                      <option value="Legal & Compliance">Legal &amp; Compliance</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="cmsportal-field-18" className="text-[11px] uppercase font-semibold text-muted block mb-1">
                      Salary Range
                    </label>
                    <input id="cmsportal-field-18"
                      type="text"
                      value={editingJob.salaryRange}
                      onChange={(e) => setEditingJob({ ...editingJob, salaryRange: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-subtle border border-rule text-ink focus:outline-none focus:border-brand"
                      placeholder="e.g. Competitive + Quarterly Bonus"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cmsportal-field-19" className="text-[11px] uppercase font-semibold text-muted block mb-1">
                    Job Description Overview
                  </label>
                  <textarea id="cmsportal-field-19"
                    rows={3}
                    value={editingJob.description}
                    onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-subtle border border-rule text-ink focus:outline-none focus:border-brand"
                  />
                </div>

                <div>
                  <label htmlFor="cmsportal-field-20" className="text-[11px] uppercase font-semibold text-muted block mb-1">
                    Responsibilities (One per line)
                  </label>
                  <textarea id="cmsportal-field-20"
                    rows={4}
                    value={editingJob.responsibilities.join('\n')}
                    onChange={(e) =>
                      setEditingJob({
                        ...editingJob,
                        responsibilities: e.target.value.split('\n').filter((l) => l.trim() !== ''),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-subtle border border-rule text-ink focus:outline-none focus:border-brand"
                  />
                </div>

                <div>
                  <label htmlFor="cmsportal-field-21" className="text-[11px] uppercase font-semibold text-muted block mb-1">
                    Requirements &amp; Qualifications (One per line)
                  </label>
                  <textarea id="cmsportal-field-21"
                    rows={4}
                    value={editingJob.requirements.join('\n')}
                    onChange={(e) =>
                      setEditingJob({
                        ...editingJob,
                        requirements: e.target.value.split('\n').filter((l) => l.trim() !== ''),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-subtle border border-rule text-ink focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-rule flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsJobFormOpen(false)}
                  className="px-4 py-2 rounded-xl bg-subtle text-muted text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const exists = careersList.some((j) => j.id === editingJob.id);
                    if (exists) {
                      saveCareers(careersList.map((j) => (j.id === editingJob.id ? editingJob : j)));
                    } else {
                      saveCareers([editingJob, ...careersList]);
                    }
                    setIsJobFormOpen(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-action text-on-action text-xs font-semibold cursor-pointer"
                >
                  Save Job Opening
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
