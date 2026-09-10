import React, { useState, useEffect } from 'react';
import { BootOverlay } from './components/BootOverlay';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Systems } from './components/Systems';
import { Projects } from './components/Projects';
import { Homelab } from './components/Homelab';
import { Roadmap } from './components/Roadmap';
import { Principles } from './components/Principles';
import { CredentialsAndNotes } from './components/CredentialsAndNotes';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { ContactModal } from './components/ContactModal';
import { TerminalDrawer } from './components/TerminalDrawer';

export default function App() {
  const [bootCompleted, setBootCompleted] = useState(false);
  const [forceBoot, setForceBoot] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Check if session previously booted
  useEffect(() => {
    const hasBooted = sessionStorage.getItem('sushan_sys_booted');
    if (hasBooted === 'true') {
      setBootCompleted(true);
    }
  }, []);

  const handleReboot = () => {
    sessionStorage.removeItem('sushan_sys_booted');
    setForceBoot(true);
    setBootCompleted(false);
  };

  const handleBootComplete = () => {
    setBootCompleted(true);
    setForceBoot(false);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f4] text-[#1b1c19] font-body-md selection:bg-[#2563eb] selection:text-white flex flex-col">
      {/* 1. Initial Interactive Boot Sequence Overlay */}
      {(!bootCompleted || forceBoot) && (
        <BootOverlay
          onComplete={handleBootComplete}
          forceShow={forceBoot}
        />
      )}

      {/* 2. Top Header Navigation */}
      <Header
        onOpenResume={() => setResumeOpen(true)}
        onOpenContact={() => setContactOpen(true)}
        onReboot={handleReboot}
      />

      {/* 3. Main Content Container */}
      <main className="w-full pt-20 bg-[#fbf9f4] flex-1">
        {/* Hero Section */}
        <Hero onOpenResume={() => setResumeOpen(true)} />

        {/* Philosophy & Journey */}
        <About />

        {/* Infrastructure Domains */}
        <Systems />

        {/* Case Studies & Diagnostics */}
        <Projects />

        {/* Homelab Environment */}
        <Homelab />

        {/* Career Progression Roadmap */}
        <Roadmap />

        {/* Engineering Principles */}
        <Principles />

        {/* Credentials & Field Notes */}
        <CredentialsAndNotes />

        {/* Initiate Connection / Contact */}
        <Contact onOpenContactModal={() => setContactOpen(true)} />
      </main>

      {/* 4. Editorial Footer */}
      <Footer
        onOpenTerminal={() => setTerminalOpen(true)}
        onReboot={handleReboot}
      />

      {/* Modals & Drawers */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      <TerminalDrawer
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onReboot={handleReboot}
      />
    </div>
  );
}
