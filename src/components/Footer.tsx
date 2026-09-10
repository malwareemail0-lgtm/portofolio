import React from 'react';
import { Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenTerminal: () => void;
  onReboot: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal, onReboot }) => {
  return (
    <footer className="w-full bg-[#f5f3ee] py-12 border-t border-[#c6c6cb]/40">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-4 text-[#46464b] font-body-sm">
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with rigor
          and infrastructure telemetry.
        </p>

        <div className="flex items-center gap-6 font-mono-sm">
          <a
            className="hover:text-[#1b1c19] transition-colors"
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="hover:text-[#1b1c19] transition-colors"
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <button
            type="button"
            onClick={onOpenTerminal}
            className="hover:text-[#2563eb] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Terminal size={12} />
            Terminal
          </button>
          <button
            type="button"
            onClick={onReboot}
            className="text-[#76777b] hover:text-[#1b1c19] text-[10px] uppercase border border-[#c6c6cb] px-2 py-0.5 cursor-pointer ml-2"
            title="Rerun sys boot animation"
          >
            Reboot
          </button>
        </div>
      </div>
    </footer>
  );
};
