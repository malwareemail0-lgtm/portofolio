import React from 'react';
import { HOMELAB_METRICS } from '../data/portfolioData';

export const Homelab: React.FC = () => {
  return (
    <section
      className="w-full bg-[#30312e] text-[#f2f1ec] py-24 px-6 sm:px-12 lg:px-24"
      id="lab"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono-sm text-[#22d3ee] block mb-2 tracking-wider">
            // 04. HOMELAB ENVIRONMENT
          </span>
          <h2 className="font-headline-lg text-[36px] sm:text-[40px] lg:text-[56px] tracking-tight font-medium text-white">
            The lab is where I break things safely.
          </h2>
        </div>

        {/* Lab Architecture Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Lab Metrics Panel */}
          <div className="lg:col-span-8 bg-[#1a1b21] p-8 lg:p-12 rounded-xl border border-[#22d3ee]/25 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-8 border-b border-[#5d5e64]/30 pb-4">
                <span className="font-mono-sm text-[#22d3ee] flex items-center gap-2 font-bold tracking-wide">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22d3ee] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22d3ee]"></span>
                  </span>
                  LAB STATUS: {HOMELAB_METRICS.status}
                </span>
                <span className="font-mono-sm text-[#76777b]">
                  {HOMELAB_METRICS.type}
                </span>
              </div>

              {/* 4 Metric Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 font-mono-sm">
                <div className="bg-[#000000] p-4 rounded border border-[#5d5e64]/30">
                  <span className="text-[#76777b] text-[11px] block mb-1 uppercase">
                    NODES ACTIVE
                  </span>
                  <span className="text-[#22d3ee] text-xl font-bold font-mono-md">
                    {HOMELAB_METRICS.nodesActive}
                  </span>
                </div>

                <div className="bg-[#000000] p-4 rounded border border-[#5d5e64]/30">
                  <span className="text-[#76777b] text-[11px] block mb-1 uppercase">
                    VIRTUAL MACHINES
                  </span>
                  <span className="text-[#22d3ee] text-xl font-bold font-mono-md">
                    {HOMELAB_METRICS.vmsRunning}
                  </span>
                </div>

                <div className="bg-[#000000] p-4 rounded border border-[#5d5e64]/30">
                  <span className="text-[#76777b] text-[11px] block mb-1 uppercase">
                    CORE SERVICES
                  </span>
                  <span className="text-[#22d3ee] text-xl font-bold font-mono-md">
                    {HOMELAB_METRICS.coreServices}
                  </span>
                </div>

                <div className="bg-[#000000] p-4 rounded border border-[#5d5e64]/30">
                  <span className="text-[#76777b] text-[11px] block mb-1 uppercase">
                    EXPERIMENTS
                  </span>
                  <span className="text-[#22d3ee] text-xl font-bold font-mono-md">
                    {HOMELAB_METRICS.experiments}
                  </span>
                </div>
              </div>

              <p className="font-body-md text-[#f2f1ec]/80 leading-relaxed">
                My homelab acts as an unconstrained testing ground where I
                replicate production topologies, simulate network partitions,
                test zero-day mitigations, and refine automation scripts before
                touching any production endpoint.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#5d5e64]/20 flex justify-between items-center text-[12px] font-mono-sm text-[#76777b]">
              <span>CLUSTER: HYPERVISOR 01 / 02</span>
              <span className="text-[#22d3ee]">UPTIME: 99.98%</span>
            </div>
          </div>

          {/* Lab Snapshot Sidebar */}
          <div className="lg:col-span-4 bg-[#000000] p-8 rounded-xl border border-[#22d3ee]/25 font-mono-sm flex flex-col justify-between">
            <div>
              <span className="text-[#22d3ee] block mb-4 font-bold tracking-wider">
                // LAB SNAPSHOT
              </span>
              <div className="space-y-3 text-[13px] text-[#c6c6cb]">
                {HOMELAB_METRICS.snapshots.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border-b border-[#5d5e64]/20 pb-2.5"
                  >
                    <span className="text-[#76777b]">{item.domain}</span>
                    <span className="text-[#22d3ee] font-medium">
                      {item.stack}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#5d5e64]/20 text-[#76777b] text-[11px] flex justify-between items-center">
              <span>SYSTEMS EXPERIMENTED</span>
              <span className="text-[#22d3ee] font-semibold">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
