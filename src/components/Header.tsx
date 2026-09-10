import React, { useState, useEffect } from 'react';
import { User, Menu, X, Terminal, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeaderProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
  onReboot: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenResume,
  onOpenContact,
  onReboot,
}) => {
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profilePopup, setProfilePopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'systems', 'projects', 'lab', 'notes'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Systems', href: '#systems', id: 'systems' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Lab', href: '#lab', id: 'lab' },
    { label: 'Notes', href: '#notes', id: 'notes' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#fbf9f4]/85 backdrop-blur-xl border-b border-[#c6c6cb]/30 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex flex-col group text-left">
          <span className="font-headline-sm font-bold tracking-tight text-[#1b1c19] group-hover:text-[#2563eb] transition-colors">
            {PERSONAL_INFO.name.toUpperCase()}
          </span>
          <span className="font-mono-sm text-[#76777b] tracking-wider">
            {PERSONAL_INFO.role}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`font-body-md transition-colors ${
                  isActive
                    ? 'text-[#000000] font-bold border-b-2 border-[#2563eb] -mb-[2px] pb-1'
                    : 'text-[#46464b] hover:text-[#1b1c19]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons & Avatar */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 font-mono-sm text-[#1b1c19] border border-[#c6c6cb] hover:bg-[#eae8e3] hover:text-[#1b1c19] transition-colors cursor-pointer"
          >
            <FileText size={14} className="text-[#76777b]" />
            Resume
          </button>

          <button
            type="button"
            onClick={onOpenContact}
            className="px-4 py-2 font-mono-sm bg-[#000000] text-[#ffffff] hover:bg-[#5d5e64] hover:text-[#ffffff] transition-colors cursor-pointer"
          >
            Contact
          </button>

          {/* User Profile Avatar with dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfilePopup(!profilePopup)}
              aria-label="User Profile details"
              className="w-8 h-8 rounded-full bg-[#000000] hover:bg-[#2563eb] transition-colors flex items-center justify-center ml-2 cursor-pointer"
            >
              <User size={16} className="text-[#ffffff]" />
            </button>

            {profilePopup && (
              <div className="absolute right-0 mt-3 w-64 bg-[#ffffff] border border-[#c6c6cb] shadow-lg p-4 z-50 text-left font-mono-sm">
                <div className="flex justify-between items-center border-b border-[#c6c6cb]/40 pb-2 mb-2">
                  <span className="font-bold text-[#1b1c19]">SUSHAN.INFRA</span>
                  <span className="text-[#2563eb] text-[10px]">VERIFIED</span>
                </div>
                <p className="text-[11px] text-[#46464b] mb-3">
                  Infrastructure, Cloud, and Security Engineer. Kathmandu, Nepal.
                </p>
                <div className="space-y-1.5 pt-1 border-t border-[#c6c6cb]/40">
                  <button
                    onClick={() => {
                      setProfilePopup(false);
                      onOpenResume();
                    }}
                    className="w-full text-left py-1 text-[#1b1c19] hover:text-[#2563eb] flex items-center gap-2"
                  >
                    <span>›</span> View Detailed Resume
                  </button>
                  <button
                    onClick={() => {
                      setProfilePopup(false);
                      onReboot();
                    }}
                    className="w-full text-left py-1 text-[#1b1c19] hover:text-[#2563eb] flex items-center gap-2"
                  >
                    <Terminal size={12} /> Run Boot Sequence
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1b1c19] hover:bg-[#eae8e3] rounded transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fbf9f4] border-b border-[#c6c6cb] px-6 py-4 space-y-3 font-mono-sm">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-[14px] ${
                activeSection === item.id
                  ? 'text-[#2563eb] font-bold'
                  : 'text-[#1b1c19] hover:text-[#2563eb]'
              }`}
            >
              › {item.label}
            </a>
          ))}
          <div className="pt-3 border-t border-[#c6c6cb]/40 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-2 text-center border border-[#c6c6cb] font-mono-sm text-[#1b1c19]"
            >
              Resume
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onReboot();
              }}
              className="w-full py-2 text-center bg-[#1a1b21] text-[#93c5fd] font-mono-sm flex items-center justify-center gap-2"
            >
              <Terminal size={14} /> Re-run System Boot
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
