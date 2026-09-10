import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BOOT_SEQUENCE_LOGS } from '../data/portfolioData';

interface BootOverlayProps {
  onComplete: () => void;
  forceShow?: boolean;
}

export const BootOverlay: React.FC<BootOverlayProps> = ({ onComplete, forceShow = false }) => {
  const [visible, setVisible] = useState(true);
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user already booted during this session unless forceShow is active
    if (!forceShow) {
      const alreadyBooted = sessionStorage.getItem('sushan_sys_booted');
      if (alreadyBooted === 'true') {
        setVisible(false);
        onComplete();
        return;
      }
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < BOOT_SEQUENCE_LOGS.length) {
        const nextLog = BOOT_SEQUENCE_LOGS[currentIndex];
        setDisplayedLogs((prev) => [...prev, nextLog]);
        setProgress(Math.round(((currentIndex + 1) / BOOT_SEQUENCE_LOGS.length) * 100));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          handleDismiss();
        }, 650);
      }
    }, 320);

    return () => clearInterval(interval);
  }, [forceShow]);

  const handleDismiss = () => {
    sessionStorage.setItem('sushan_sys_booted', 'true');
    setVisible(false);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="boot-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-[#000000] text-white flex flex-col justify-between p-6 sm:p-12 lg:p-24 selection:bg-[#2563eb] selection:text-white"
        >
          {/* Top Status Bar */}
          <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563eb] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2563eb]"></span>
              </span>
              <span className="font-mono-sm tracking-widest text-[#c6c6cb]">
                SYS_BOOT_V4.82
              </span>
            </div>
            <button
              type="button"
              onClick={handleDismiss}
              className="font-mono-sm text-[#c6c6cb] hover:text-white border border-[#c6c6cb]/30 px-4 py-2 transition-all hover:border-[#c6c6cb] cursor-pointer"
            >
              [ SKIP INTRO ]
            </button>
          </div>

          {/* Central Diagnostic Stream */}
          <div className="max-w-xl w-full mx-auto my-auto py-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono-md text-[#93c5fd] font-semibold tracking-wide text-[18px]">
                SUSHAN SYSTEM
              </span>
              <span className="font-mono-sm px-2 py-0.5 bg-[#1a1b21] text-[#93c5fd] border border-[#5d5e64]/30">
                INIT_RUNLEVEL_5
              </span>
            </div>

            <div className="font-mono-sm space-y-2 text-[#e4e2dd]/80 min-h-[170px] bg-[#1a1b21]/60 p-6 border border-[#5d5e64]/20">
              {displayedLogs.length === 0 && (
                <p className="opacity-40 animate-pulse">initializing kernel subsystems...</p>
              )}
              {displayedLogs.map((log, index) => {
                const isFinal = index === BOOT_SEQUENCE_LOGS.length - 1;
                return (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={
                      isFinal
                        ? 'text-[#93c5fd] font-bold mt-4 pt-2 border-t border-[#5d5e64]/30 flex items-center gap-2'
                        : 'text-[#e4e2dd]/90 font-mono-sm flex items-center gap-2'
                    }
                  >
                    <span className={isFinal ? 'text-[#2563eb]' : 'text-[#60a5fa]'}>›</span>
                    {log}
                  </motion.p>
                );
              })}
            </div>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="flex justify-between items-end font-mono-sm text-[#76777b] w-full max-w-7xl mx-auto border-t border-[#5d5e64]/20 pt-4">
            <div className="flex items-center gap-4">
              <span>KTM / UTC+5.45</span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="hidden sm:inline">ARCH: x86_64-linux-gnu</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#c6c6cb] font-mono-sm">LOAD:</span>
              <span className="font-bold text-[#93c5fd] min-w-[3rem] text-right">
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
