import React, { useState } from 'react';
import {
  Terminal,
  Network,
  Server,
  Cpu,
  Cloud,
  Shield,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { SYSTEM_DOMAINS } from '../data/portfolioData';
import { SystemDomain } from '../types';

export const Systems: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const renderIcon = (iconName: string) => {
    const props = { size: 32, className: 'text-[#2563eb]' };
    switch (iconName) {
      case 'Terminal':
        return <Terminal {...props} />;
      case 'Network':
        return <Network {...props} />;
      case 'Server':
        return <Server {...props} />;
      case 'Cpu':
        return <Cpu {...props} />;
      case 'Cloud':
        return <Cloud {...props} />;
      case 'Shield':
        return <Shield {...props} />;
      default:
        return <Terminal {...props} />;
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      className="w-full bg-[#fbf9f4] py-24 px-6 sm:px-12 lg:px-24 border-t border-[#c6c6cb]/30"
      id="systems"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="font-mono-sm text-[#2563eb] block mb-2 tracking-wider">
              // 02. DOMAINS &amp; TOOLKIT
            </span>
            <h2 className="font-headline-lg text-[36px] sm:text-[40px] lg:text-[56px] tracking-tight font-medium text-[#1b1c19]">
              Core infrastructure domains.
            </h2>
          </div>
          <p className="font-mono-sm text-[#76777b] mt-4 md:mt-0 tracking-wider">
            SYSTEMS I WORK WITH
          </p>
        </div>

        {/* 6 Domain Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SYSTEM_DOMAINS.map((domain: SystemDomain) => {
            const isExpanded = expandedId === domain.id;
            return (
              <div
                key={domain.id}
                className="bg-[#f5f3ee] p-8 rounded-xl flex flex-col justify-between hover:bg-[#f0eee9] transition-all border border-[#c6c6cb]/40 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-2.5 bg-[#ffffff] rounded-lg border border-[#c6c6cb]/30 shadow-2xs group-hover:border-[#2563eb]/40 transition-colors">
                      {renderIcon(domain.icon)}
                    </div>
                    <span className="font-mono-sm text-[#76777b] font-semibold">
                      {domain.number}
                    </span>
                  </div>

                  <h3 className="font-headline-md text-[#1b1c19] mb-3 tracking-tight font-bold">
                    {domain.title}
                  </h3>

                  <p className="font-body-md text-[#46464b] mb-6 leading-relaxed">
                    {domain.description}
                  </p>

                  {/* Expandable Technical Detail Panel */}
                  {isExpanded && domain.details && (
                    <div className="mb-6 p-4 bg-[#ffffff] border border-[#c6c6cb]/60 rounded font-mono-sm text-[12px] space-y-3">
                      <div>
                        <span className="text-[#2563eb] font-bold block mb-1">
                          KEY SUBSYSTEMS:
                        </span>
                        <ul className="list-disc list-inside space-y-0.5 text-[#46464b]">
                          {domain.details.components.map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-2 border-t border-[#c6c6cb]/30">
                        <span className="text-[#76777b] block mb-1">
                          SAMPLE COMMAND:
                        </span>
                        <code className="text-[#1b1c19] bg-[#eae8e3] px-2 py-1 block overflow-x-auto text-[11px]">
                          {domain.details.sampleCommand}
                        </code>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  {/* Tag pills */}
                  <div className="flex flex-wrap gap-2 font-mono-sm mb-4">
                    {domain.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-[#ffffff] border border-[#c6c6cb]/40 text-[#1b1c19] text-[11px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Details Toggle Button */}
                  <button
                    type="button"
                    onClick={() => toggleExpand(domain.id)}
                    className="w-full text-left font-mono-sm text-[11px] text-[#76777b] hover:text-[#2563eb] flex items-center justify-between pt-2 border-t border-[#c6c6cb]/30 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Hide Subsystems' : 'Inspect Subsystems'}</span>
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
