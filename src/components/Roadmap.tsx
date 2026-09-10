import React from 'react';
import { CAREER_ROADMAP } from '../data/portfolioData';

export const Roadmap: React.FC = () => {
  const progressionSteps = [
    'TROUBLESHOOT',
    'UNDERSTAND',
    'AUTOMATE',
    'DESIGN',
    'ARCHITECT',
  ];

  return (
    <section className="w-full bg-[#fbf9f4] py-24 px-6 sm:px-12 lg:px-24 border-t border-[#c6c6cb]/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono-sm text-[#2563eb] block mb-2 tracking-wider">
            // 05. TRAJECTORY &amp; ROADMAP
          </span>
          <h2 className="font-headline-lg text-[36px] sm:text-[40px] lg:text-[56px] tracking-tight font-medium text-[#1b1c19]">
            Systematic career progression.
          </h2>
        </div>

        {/* 3 Career Milestones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {CAREER_ROADMAP.map((item, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-xl transition-all ${
                item.isHighlighted
                  ? 'bg-[#f5f3ee] border-2 border-[#2563eb] shadow-xs'
                  : 'bg-[#f5f3ee] border border-[#c6c6cb]/40 hover:border-[#c6c6cb]'
              }`}
            >
              <span
                className={`font-mono-sm block mb-2 font-semibold tracking-wider ${
                  item.isHighlighted ? 'text-[#2563eb]' : 'text-[#76777b]'
                }`}
              >
                {item.number}
              </span>
              <h3 className="font-headline-md text-[#1b1c19] mb-3 font-bold">
                {item.title}
              </h3>
              <p className="font-body-md text-[#46464b] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Core Engine Progression Bar */}
        <div className="bg-[#000000] text-white p-8 lg:p-12 rounded-xl flex flex-wrap items-center justify-between gap-6 font-mono-md border border-[#5d5e64]/30 shadow-sm">
          <span className="text-[#93c5fd] font-bold tracking-wider text-[13px] sm:text-[14px]">
            CORE ENGINE PROGRESSION:
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[13px]">
            {progressionSteps.map((step, idx) => {
              const isLast = idx === progressionSteps.length - 1;
              return (
                <React.Fragment key={step}>
                  <span
                    className={
                      isLast
                        ? 'text-[#93c5fd] font-bold bg-[#1a1b21] px-3 py-1 border border-[#2563eb]/60 rounded-xs'
                        : 'text-white/90'
                    }
                  >
                    {step}
                  </span>
                  {!isLast && (
                    <span className="text-[#76777b] select-none font-bold">
                      →
                    </span>
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
