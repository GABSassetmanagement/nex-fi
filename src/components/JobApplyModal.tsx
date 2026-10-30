import React, { useState } from 'react';
import { useDialogFocus } from '../hooks/useDialogFocus';
import { JobOpening } from '../data/careersData';
import { X, CheckCircle, PaperPlaneTilt, UploadSimple } from '@phosphor-icons/react';

interface JobApplyModalProps {
  job: JobOpening | null;
  onClose: () => void;
}

export const JobApplyModal: React.FC<JobApplyModalProps> = ({ job, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [resumeLink, setResumeLink] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const dialogRef = useDialogFocus(Boolean(job), onClose);

  if (!job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      aria-labelledby="job-application-title"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl my-auto max-h-[92vh] overflow-y-auto bg-gradient-to-b from-surface to-surface border border-rule rounded-xl p-6 sm:p-8 shadow-sm text-left font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-rule mb-6">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-brand">
              Job Application Form
            </span>
            <h3 id="job-application-title" className="text-xl font-semibold text-ink font-display mt-0.5">
              {job.title}
            </h3>
            <p className="text-xs text-muted">{job.department} &middot; {job.location}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-subtle hover:bg-subtle text-muted hover:text-ink transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-accent-soft text-brand flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" weight="regular" />
            </div>
            <h4 className="text-2xl font-semibold text-ink font-display">
              Application Transmitted
            </h4>
            <p className="text-xs sm:text-sm text-muted max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-ink font-semibold">{fullName}</span>. Your application for <strong className="text-brand">{job.title}</strong> has been logged with our Human Capital &amp; Operations desk. We will review your credentials and contact you directly.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg bg-action hover:bg-action-hover text-on-action text-xs font-semibold transition-all cursor-pointer shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="jobapplymodal-field-1" className="block text-xs uppercase font-semibold text-muted mb-1.5">
                  Full Name *
                </label>
                <input id="jobapplymodal-field-1"
                  type="text"
                  required
                  placeholder="e.g. Chinelo Okonkwo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-subtle border border-rule text-ink text-xs focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label htmlFor="jobapplymodal-field-2" className="block text-xs uppercase font-semibold text-muted mb-1.5">
                  Email Address *
                </label>
                <input id="jobapplymodal-field-2"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-subtle border border-rule text-ink text-xs focus:outline-none focus:border-brand"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="jobapplymodal-field-3" className="block text-xs uppercase font-semibold text-muted mb-1.5">
                  Phone Number *
                </label>
                <input id="jobapplymodal-field-3"
                  type="tel"
                  required
                  placeholder="+234 803 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-subtle border border-rule text-ink text-xs focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label htmlFor="jobapplymodal-field-4" className="block text-xs uppercase font-semibold text-muted mb-1.5">
                  LinkedIn Profile URL
                </label>
                <input id="jobapplymodal-field-4"
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-subtle border border-rule text-ink text-xs focus:outline-none focus:border-brand"
                />
              </div>
            </div>

            <div>
              <label htmlFor="jobapplymodal-field-5" className="block text-xs uppercase font-semibold text-muted mb-1.5">
                Resume / CV Link (Google Drive / Dropbox) *
              </label>
              <input id="jobapplymodal-field-5"
                type="url"
                required
                placeholder="https://drive.google.com/your-cv-file"
                value={resumeLink}
                onChange={(e) => setResumeLink(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-subtle border border-rule text-ink text-xs focus:outline-none focus:border-brand"
              />
              <span className="text-[11px] text-muted mt-1 block">
                Ensure share permissions are set to "Anyone with the link can view".
              </span>
            </div>

            <div>
              <label htmlFor="jobapplymodal-field-6" className="block text-xs uppercase font-semibold text-muted mb-1.5">
                Why Are You a Great Fit for Nexus Finance?
              </label>
              <textarea id="jobapplymodal-field-6"
                rows={3}
                placeholder="Briefly state your core banking/fintech achievements or leadership qualities..."
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-subtle border border-rule text-ink text-xs focus:outline-none focus:border-brand resize-none"
              />
            </div>

            <div className="pt-3 border-t border-rule flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-subtle hover:bg-subtle text-ink text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl bg-action hover:bg-action-hover text-on-action text-xs font-semibold transition-all shadow-sm cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
              >
                <PaperPlaneTilt className="w-4 h-4" weight="regular" />
                <span>{submitting ? 'Submitting Application...' : 'Send Application'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
