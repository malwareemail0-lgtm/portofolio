import React, { useState } from 'react';
import { Router, Server, Cloud, CheckCircle, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
}

const TELEMETRY_LINES = [
  { cmd: '$ sysctl -a | grep telemetry', res: 'OK' },
  { cmd: '$ sysctl net.ipv4.ip_forward', res: '1' },
  { cmd: '$ sysctl kernel.kptr_restrict', res: '2' },
  { cmd: '$ uname -r', res: '6.8.0-40-pve' },
];

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [telemetryIndex, setTelemetryIndex] = useState(0);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const cycleTelemetry = () => {
    setTelemetryIndex((prev) => (prev + 1) % TELEMETRY_LINES.length);
  };

  const activeTelemetry = TELEMETRY_LINES[telemetryIndex];

  return (
    <section className="relative w-full min-h-[921px] flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-24 bg-[#fbf9f4] overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Editorial Statement */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          {/* Location / Status Chip */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#eae8e3] rounded-full mb-6 font-mono-sm text-[#46464b] border border-[#c6c6cb]/40">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563eb] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563eb]"></span>
            </span>
            <span>{PERSONAL_INFO.location}</span>
          </div>

          {/* Massive Headline */}
          <h1 className="font-headline-xl text-[54px] sm:text-[64px] lg:text-[80px] tracking-tight leading-[1.02] text-[#1b1c19] mb-6">
            I build, break, troubleshoot, and understand systems.
          </h1>

          {/* Subtext */}
          <p className="font-body-lg text-[#46464b] max-w-2xl mb-8 leading-relaxed">
            {PERSONAL_INFO.bio}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <a
              href="#projects"
              className="px-6 py-4 bg-[#000000] text-[#ffffff] font-mono-md hover:bg-[#5d5e64] transition-all inline-flex items-center gap-2"
            >
              Explore my work →
            </a>
            <button
              type="button"
              onClick={onOpenResume}
              className="px-6 py-4 border border-[#c6c6cb] font-mono-md text-[#1b1c19] hover:bg-[#eae8e3] transition-all cursor-pointer"
            >
              View resume / bio
            </button>
          </div>

          {/* Meta summary footer */}
          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-[#c6c6cb]/30 font-mono-sm text-[#46464b] w-full">
            <div>
              <strong className="text-[#1b1c19] font-semibold">Focus:</strong>{' '}
              {PERSONAL_INFO.focus}
            </div>
            <div className="text-[#c6c6cb]">•</div>
            <div>
              <strong className="text-[#1b1c19] font-semibold">Learning:</strong>{' '}
              {PERSONAL_INFO.currentLearning}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Network Topology Node Visual */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="w-full aspect-square max-w-[480px] bg-[#f5f3ee] rounded-xl relative p-8 flex flex-col justify-between shadow-sm border border-[#c6c6cb]/40 overflow-hidden">
            {/* Background Dot Grid */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1b1c19_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>

            {/* Topology Header */}
            <div className="flex justify-between items-start z-10">
              <span className="font-mono-sm px-2.5 py-1 bg-[#eae8e3] text-[#1b1c19] border border-[#c6c6cb]/30">
                NODE_TOPOLOGY_01
              </span>
              <span className="font-mono-sm text-[#2563eb] flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse"></span>
                ACTIVE
              </span>
            </div>

            {/* Topology Content */}
            <div className="relative z-10 my-auto py-6">
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {/* Node 1 */}
                <button
                  type="button"
                  onClick={() =>
                    setSelectedNode(selectedNode === 'vpc' ? null : 'vpc')
                  }
                  className={`bg-[#fbf9f4] p-3 sm:p-4 rounded shadow-sm border transition-all text-center flex flex-col items-center cursor-pointer ${
                    selectedNode === 'vpc'
                      ? 'border-[#2563eb] ring-1 ring-[#2563eb]'
                      : 'border-[#c6c6cb]/30 hover:border-[#c6c6cb]'
                  }`}
                >
                  <Router className="text-[#2563eb] mb-1.5" size={24} />
                  <span className="font-mono-sm font-bold text-[#1b1c19]">VPC / NET</span>
                  <span className="text-[10px] text-[#76777b] font-mono-sm">10.0.0.0/16</span>
                </button>

                {/* Node 2 */}
                <button
                  type="button"
                  onClick={() =>
                    setSelectedNode(selectedNode === 'ad' ? null : 'ad')
                  }
                  className={`bg-[#fbf9f4] p-3 sm:p-4 rounded shadow-sm border transition-all text-center flex flex-col items-center cursor-pointer ${
                    selectedNode === 'ad'
                      ? 'border-[#2563eb] ring-1 ring-[#2563eb]'
                      : 'border-[#c6c6cb]/30 hover:border-[#c6c6cb]'
                  }`}
                >
                  <Server className="text-[#2563eb] mb-1.5" size={24} />
                  <span className="font-mono-sm font-bold text-[#1b1c19]">AD / DC</span>
                  <span className="text-[10px] text-[#76777b] font-mono-sm">LDAP / Kerberos</span>
                </button>

                {/* Node 3 */}
                <button
                  type="button"
                  onClick={() =>
                    setSelectedNode(selectedNode === 'aws' ? null : 'aws')
                  }
                  className={`bg-[#fbf9f4] p-3 sm:p-4 rounded shadow-sm border transition-all text-center flex flex-col items-center cursor-pointer ${
                    selectedNode === 'aws'
                      ? 'border-[#2563eb] ring-1 ring-[#2563eb]'
                      : 'border-[#c6c6cb]/30 hover:border-[#c6c6cb]'
                  }`}
                >
                  <Cloud className="text-[#2563eb] mb-1.5" size={24} />
                  <span className="font-mono-sm font-bold text-[#1b1c19]">AWS CLOUD</span>
                  <span className="text-[10px] text-[#76777b] font-mono-sm">EC2 / S3 / IAM</span>
                </button>
              </div>

              {/* Node Inspection Details when clicked */}
              {selectedNode && (
                <div className="mt-3 p-3 bg-[#fbf9f4] border border-[#2563eb]/40 rounded font-mono-sm text-[11px] text-[#46464b]">
                  {selectedNode === 'vpc' && (
                    <p>
                      <strong>Subnet Routing:</strong> 2 Public / 2 Private subnets across AZs with NAT Gateway egress.
                    </p>
                  )}
                  {selectedNode === 'ad' && (
                    <p>
                      <strong>Domain Controller:</strong> Windows Server 2022 with Group Policies and DNS forwarding.
                    </p>
                  )}
                  {selectedNode === 'aws' && (
                    <p>
                      <strong>Cloud Infrastructure:</strong> IAM least-privilege roles, Application Load Balancers & S3 object storage.
                    </p>
                  )}
                </div>
              )}

              {/* Interactive Telemetry Line */}
              <div
                onClick={cycleTelemetry}
                title="Click to cycle telemetry inspection"
                className="mt-6 p-4 bg-[#000000] text-[#ffffff] rounded font-mono-sm flex items-center justify-between cursor-pointer hover:bg-[#1a1b21] transition-colors group"
              >
                <span className="text-[#93c5fd] flex items-center gap-2">
                  <Terminal size={14} className="text-[#60a5fa] group-hover:animate-pulse" />
                  {activeTelemetry.cmd}
                </span>
                <span className="text-[#c6c6cb] font-bold px-2 py-0.5 bg-[#1a1b21] rounded border border-[#5d5e64]/40">
                  {activeTelemetry.res}
                </span>
              </div>
            </div>

            {/* Topology Footer */}
            <div className="flex justify-between items-end text-[#76777b] font-mono-sm z-10 border-t border-[#c6c6cb]/30 pt-3">
              <span>PROXMOX VE // K3s</span>
              <span className="flex items-center gap-1 text-[#2563eb]">
                <CheckCircle size={12} />
                SECURE_SESSION
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
