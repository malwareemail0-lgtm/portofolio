import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';

export const Projects: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyDiagnostic = (id: string, lines: string[]) => {
    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      className="w-full bg-[#000000] text-white py-24 px-6 sm:px-12 lg:px-24"
      id="projects"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono-sm text-[#93c5fd] block mb-2 tracking-wider">
            // 03. LAB &amp; PRODUCTION CASE STUDIES
          </span>
          <h2 className="font-headline-lg text-[36px] sm:text-[40px] lg:text-[56px] tracking-tight font-medium text-white">
            Things I've actually built, broken, and fixed.
          </h2>
        </div>

        {/* 5 Project Case Studies */}
        <div className="space-y-12">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="bg-[#1a1b21] p-8 lg:p-12 rounded-xl border border-[#5d5e64]/20 flex flex-col lg:flex-row gap-8 items-stretch lg:items-center hover:border-[#5d5e64]/40 transition-colors"
            >
              {/* Left Details */}
              <div className="lg:w-7/12">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono-sm text-[#93c5fd] font-bold">
                    {project.number}
                  </span>
                  <span className="text-[#76777b]">•</span>
                  <span className="font-mono-sm text-[#f2f1ec]/60">
                    {project.subtitle}
                  </span>
                </div>

                <h3 className="font-headline-lg text-[24px] sm:text-[28px] mb-4 text-white font-medium">
                  {project.title}
                </h3>

                <p className="font-body-md text-[#f2f1ec]/80 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Pipeline Flow Steps */}
                <div className="flex flex-wrap items-center gap-2 font-mono-sm">
                  {project.flowSteps.map((step, idx) => {
                    const isLast = idx === project.flowSteps.length - 1;
                    return (
                      <React.Fragment key={idx}>
                        <span className="px-3 py-1 bg-[#000000] border border-[#5d5e64]/40 text-[#93c5fd] text-[12px]">
                          {step}
                        </span>
                        {!isLast && (
                          <span className="text-[#76777b] select-none text-[12px]">
                            →
                          </span>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Right Diagnostic Log Terminal */}
              <div className="lg:w-5/12 w-full bg-[#000000] p-6 rounded border border-[#5d5e64]/30 font-mono-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3 border-b border-[#5d5e64]/30 pb-2">
                  <span className="text-[#93c5fd] font-semibold text-[13px] flex items-center gap-1.5">
                    <Terminal size={14} className="text-[#60a5fa]" />
                    {project.diagnosticTitle}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      copyDiagnostic(project.id, project.diagnosticLog)
                    }
                    className="text-[#76777b] hover:text-white transition-colors text-[11px] flex items-center gap-1 cursor-pointer"
                    title="Copy diagnostic output"
                  >
                    {copiedId === project.id ? (
                      <>
                        <Check size={12} className="text-[#2563eb]" />
                        <span className="text-[#93c5fd]">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-[#c6c6cb] text-[12px] leading-relaxed space-y-1 overflow-x-auto py-1 font-mono">
                  {project.diagnosticLog.map((line, lIdx) => (
                    <div key={lIdx} className="whitespace-pre font-mono">
                      {line.startsWith('[OK]') ? (
                        <span>
                          <span className="text-[#93c5fd] font-bold">[OK]</span>{' '}
                          {line.replace('[OK]', '')}
                        </span>
                      ) : line.includes('SUCCESS') || line.includes('ONLINE') ? (
                        <span className="text-white font-semibold">{line}</span>
                      ) : (
                        line
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-2 border-t border-[#5d5e64]/20 flex justify-between items-center text-[10px] text-[#76777b]">
                  <span>NODE VERIFIED: PASS</span>
                  <span className="text-[#93c5fd]">RUNTIME: LIVE</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
