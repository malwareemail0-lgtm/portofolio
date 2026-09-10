import React from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactProps {
  onOpenContactModal: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenContactModal }) => {
  return (
    <section
      className="w-full bg-[#000000] text-white py-24 px-6 sm:px-12 lg:px-24"
      id="contact"
    >
      <div className="max-w-7xl mx-auto text-center">
        <span className="font-mono-sm text-[#93c5fd] block mb-4 tracking-wider">
          // 09. INITIATE CONNECTION
        </span>

        <h2 className="font-headline-xl text-[42px] sm:text-[48px] lg:text-[72px] tracking-tight mb-6 font-medium text-white max-w-4xl mx-auto">
          Have a system worth figuring out?
        </h2>

        <p className="font-body-lg text-[#f2f1ec]/80 max-w-xl mx-auto mb-12 leading-relaxed">
          Whether it's complex infrastructure troubleshooting, cloud
          architecture, or security hardening—let's talk systems.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 font-mono-md">
          <button
            type="button"
            onClick={onOpenContactModal}
            className="px-8 py-4 bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-all inline-flex items-center gap-2 cursor-pointer font-medium"
          >
            <Mail size={16} />
            Get in touch →
          </button>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-[#5d5e64]/50 text-[#f2f1ec] hover:bg-[#1a1b21] transition-all inline-flex items-center gap-2"
          >
            <Github size={16} />
            GitHub
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-[#5d5e64]/50 text-[#f2f1ec] hover:bg-[#1a1b21] transition-all inline-flex items-center gap-2"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
        </div>

        {/* Direct Email Display */}
        <div className="mt-12 pt-8 border-t border-[#5d5e64]/20 max-w-xs mx-auto">
          <span className="font-mono-sm text-[#76777b] block mb-1">
            DIRECT DISPATCH
          </span>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="font-mono-sm text-[#93c5fd] hover:underline"
          >
            {PERSONAL_INFO.email}
          </a>
        </div>
      </div>
    </section>
  );
};
