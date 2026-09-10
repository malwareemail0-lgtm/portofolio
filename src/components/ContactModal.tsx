import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending packet/dispatch
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        // Pre-fill mailto fallback
        window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
          formData.subject || 'System Infrastructure Inquiry'
        )}&body=${encodeURIComponent(
          `From: ${formData.name} (${formData.email})\n\n${formData.message}`
        )}`;
      }, 1200);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-[#000000]/70 backdrop-blur-sm">
      <div className="bg-[#ffffff] text-[#1b1c19] max-w-lg w-full rounded-xl shadow-2xl border border-[#c6c6cb] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-[#c6c6cb]/40 flex items-center justify-between bg-[#fbf9f4]">
          <div className="flex items-center gap-2 font-mono-sm">
            <span className="w-2 h-2 rounded-full bg-[#2563eb]"></span>
            <span className="font-bold text-[#1b1c19]">
              DISPATCH // INITIATE TRANSMISSION
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#76777b] hover:text-[#1b1c19] p-1 rounded transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-4 font-mono-sm">
              <CheckCircle2 size={48} className="text-[#2563eb] mx-auto animate-bounce" />
              <h3 className="font-bold text-lg text-[#1b1c19]">
                TRANSMISSION QUEUED
              </h3>
              <p className="text-[13px] text-[#46464b] max-w-xs mx-auto">
                Opening default mail transport client to deliver your message
                directly to <strong>{PERSONAL_INFO.email}</strong>.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-4 px-4 py-2 bg-[#000000] text-white rounded font-mono-sm text-[12px]"
              >
                Close Dialog
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono-sm">
              <p className="text-[13px] text-[#46464b] mb-4">
                Send a message directly regarding infrastructure troubleshooting,
                lab experiments, or collaboration.
              </p>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#76777b] mb-1">
                  Your Name / Handle *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Alex Mercer"
                  className="w-full px-3 py-2 bg-[#f5f3ee] border border-[#c6c6cb] rounded text-[13px] focus:outline-none focus:border-[#2563eb]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#76777b] mb-1">
                  Return Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="alex@domain.com"
                  className="w-full px-3 py-2 bg-[#f5f3ee] border border-[#c6c6cb] rounded text-[13px] focus:outline-none focus:border-[#2563eb]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#76777b] mb-1">
                  Topic / System Focus
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="e.g. Active Directory / Cloud Architecture"
                  className="w-full px-3 py-2 bg-[#f5f3ee] border border-[#c6c6cb] rounded text-[13px] focus:outline-none focus:border-[#2563eb]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#76777b] mb-1">
                  Message / Telemetry *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Describe your system or inquiry..."
                  className="w-full px-3 py-2 bg-[#f5f3ee] border border-[#c6c6cb] rounded text-[13px] focus:outline-none focus:border-[#2563eb]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-[12px] border border-[#c6c6cb] rounded hover:bg-[#f5f3ee]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 text-[12px] bg-[#2563eb] text-white rounded hover:bg-[#1d4ed8] flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                >
                  <Send size={13} />
                  {loading ? 'Transmitting...' : 'Send Transmission →'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
