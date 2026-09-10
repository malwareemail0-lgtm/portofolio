import React from 'react';
import { ENGINEERING_PRINCIPLES } from '../data/portfolioData';

export const Principles: React.FC = () => {
  return (
    <section
      className="w-full bg-[#f5f3ee] py-24 px-6 sm:px-12 lg:px-24 border-t border-[#c6c6cb]/30"
      id="principles"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono-sm text-[#2563eb] block mb-2 tracking-wider">
            // 06. ENGINEERING PRINCIPLES
          </span>
          <h2 className="font-headline-lg text-[36px] sm:text-[40px] lg:text-[56px] tracking-tight font-medium text-[#1b1c19]">
            Guiding rules for resilient systems.
          </h2>
        </div>

        {/* 5 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ENGINEERING_PRINCIPLES.map((principle) => (
            <div
              key={principle.number}
              className="bg-[#fbf9f4] p-8 rounded-xl shadow-xs border border-[#c6c6cb]/30 hover:border-[#2563eb]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="font-mono-sm text-[#2563eb] font-bold block mb-4">
                  {principle.number}
                </span>
                <h3 className="font-headline-md text-[#1b1c19] mb-3 font-bold">
                  {principle.title}
                </h3>
                <p className="font-body-md text-[#46464b] leading-relaxed">
                  {principle.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#c6c6cb]/20 flex items-center justify-between text-[11px] font-mono-sm text-[#76777b]">
                <span>RULESET_VER_2.4</span>
                <span className="text-[#2563eb]">ENFORCED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
