import React from 'react';
import { PERSONAL_INFO, JOURNEY_STEPS } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section
      className="w-full bg-[#000000] text-white py-24 px-6 sm:px-12 lg:px-24"
      id="about"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono-sm text-[#93c5fd] block mb-2 tracking-wider">
            // 01. PHILOSOPHY &amp; JOURNEY
          </span>
          <h2 className="font-headline-lg text-[36px] sm:text-[40px] lg:text-[56px] tracking-tight font-medium text-white">
            Learning systems from the inside out.
          </h2>
        </div>

        {/* Philosophy Prose & Quick Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-6 font-body-lg text-[#f2f1ec]/80 space-y-6 leading-relaxed">
            <p>
              I am driven by a fundamental curiosity about how bits turn into
              packets, how operating systems manage resources, and how complex
              networks sustain global services without collapsing.
            </p>
            <p>
              Rather than relying on black-box abstractions, I build physical and
              virtual labs to tear down protocols, analyze packet captures,
              configure active directories, and automate deployments from
              scratch.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono-sm">
            <div className="bg-[#1a1b21] p-6 rounded border border-[#5d5e64]/20 flex flex-col justify-center">
              <span className="text-[#93c5fd] block mb-2 text-2xl font-bold font-mono-md">
                {PERSONAL_INFO.stats.toolsExplored}
              </span>
              <span className="text-[#f2f1ec]/70 text-[13px] leading-snug">
                {PERSONAL_INFO.stats.toolsLabel}
              </span>
            </div>

            <div className="bg-[#1a1b21] p-6 rounded border border-[#5d5e64]/20 flex flex-col justify-center">
              <span className="text-[#93c5fd] block mb-2 text-2xl font-bold font-mono-md">
                {PERSONAL_INFO.stats.labEnvironment}
              </span>
              <span className="text-[#f2f1ec]/70 text-[13px] leading-snug">
                {PERSONAL_INFO.stats.labLabel}
              </span>
            </div>
          </div>
        </div>

        {/* PERSONALITY BLOCK */}
        <div className="mb-20 bg-[#1a1b21] p-6 sm:p-8 rounded-xl border border-[#5d5e64]/30 font-mono-sm">
          <span className="text-[#93c5fd] block mb-4 font-semibold tracking-wider">
            // SUSHAN.PROFILE
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-[13px]">
            <div className="border-l-2 border-[#5d5e64]/40 pl-3">
              <span className="text-[#76777b] block mb-1 text-[11px] uppercase tracking-wider">
                BASED IN
              </span>
              <span className="text-[#f2f1ec] font-bold">
                {PERSONAL_INFO.profile.basedIn}
              </span>
            </div>

            <div className="border-l-2 border-[#2563eb] pl-3">
              <span className="text-[#76777b] block mb-1 text-[11px] uppercase tracking-wider">
                CURRENTLY LEARNING
              </span>
              <span className="text-[#93c5fd] font-bold">
                {PERSONAL_INFO.profile.learning}
              </span>
            </div>

            <div className="border-l-2 border-[#5d5e64]/40 pl-3">
              <span className="text-[#76777b] block mb-1 text-[11px] uppercase tracking-wider">
                INTERESTED IN
              </span>
              <span className="text-[#f2f1ec] font-bold">
                {PERSONAL_INFO.profile.interests}
              </span>
            </div>

            <div className="border-l-2 border-[#5d5e64]/40 pl-3">
              <span className="text-[#76777b] block mb-1 text-[11px] uppercase tracking-wider">
                USUALLY FOUND
              </span>
              <span className="text-[#f2f1ec] font-bold leading-tight block">
                {PERSONAL_INFO.profile.usuallyFound}
              </span>
            </div>
          </div>
        </div>

        {/* Visual Journey Timeline */}
        <div className="border-t border-[#5d5e64]/30 pt-12">
          <span className="font-mono-sm text-[#f2f1ec]/40 block mb-8 tracking-wider">
            VISUAL JOURNEY TIMELINE
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono-sm">
            {JOURNEY_STEPS.map((step, idx) => {
              const isLast = idx === JOURNEY_STEPS.length - 1;
              return (
                <React.Fragment key={step}>
                  <span
                    className={
                      isLast
                        ? 'px-4 py-2 bg-[#2563eb] text-white font-bold tracking-wider shadow-sm'
                        : 'px-4 py-2 bg-[#1a1b21] border border-[#2563eb]/40 text-[#93c5fd] hover:border-[#2563eb] transition-colors'
                    }
                  >
                    {step}
                  </span>
                  {!isLast && (
                    <span className="text-[#76777b] select-none font-bold">→</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
