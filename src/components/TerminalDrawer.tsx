import React, { useState, useRef, useEffect } from 'react';
import { X, Terminal as TermIcon, CornerDownLeft } from 'lucide-react';
import {
  PERSONAL_INFO,
  PROJECTS,
  SYSTEM_DOMAINS,
  CERTIFICATIONS,
} from '../data/portfolioData';

interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onReboot: () => void;
}

interface CommandHistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export const TerminalDrawer: React.FC<TerminalDrawerProps> = ({
  isOpen,
  onClose,
  onReboot,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: 'sysinfo',
      output:
        'SUSHAN_SYS_NODE (x86_64 Linux 6.8.0-40-pve) - Active Directory, AWS & Networking Lab Host.',
    },
    {
      command: 'help',
      output:
        'Available commands: help, whoami, uptime, systems, projects, certs, ping <host>, boot, clear, exit',
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const parts = cmd.toLowerCase().split(' ');
    const mainCmd = parts[0];

    let output: string | React.ReactNode = '';

    switch (mainCmd) {
      case 'help':
        output =
          'Commands available:\n' +
          '  whoami       - Display engineer profile & background\n' +
          '  uptime       - View hypervisor uptime and telemetry\n' +
          '  systems      - List 6 core infrastructure domains\n' +
          '  projects     - List 5 lab case studies\n' +
          '  certs        - Show current verified certifications\n' +
          '  ping <host>  - Simulate ICMP echo requests\n' +
          '  boot         - Re-execute full system boot sequence\n' +
          '  clear        - Clear console output\n' +
          '  exit         - Close terminal session';
        break;
      case 'whoami':
        output = `${PERSONAL_INFO.name} // ${PERSONAL_INFO.role}\n${PERSONAL_INFO.bio}\nLocation: ${PERSONAL_INFO.location}\nEmail: ${PERSONAL_INFO.email}`;
        break;
      case 'uptime':
        output = '10:28:45 up 42 days, 6:18, 4 nodes, load average: 0.18, 0.12, 0.08';
        break;
      case 'systems':
        output = SYSTEM_DOMAINS.map(
          (d) => `[${d.number}] ${d.title} :: ${d.tags.join(', ')}`
        ).join('\n');
        break;
      case 'projects':
        output = PROJECTS.map(
          (p) => `[${p.number}] ${p.title} -> status: ${p.status}`
        ).join('\n');
        break;
      case 'certs':
        output = CERTIFICATIONS.map((c) => `[✓] ${c.name} - ${c.status}`).join(
          '\n'
        );
        break;
      case 'ping':
        const target = parts[1] || '8.8.8.8';
        output =
          `PING ${target} (56 data bytes)\n` +
          `64 bytes from ${target}: icmp_seq=1 ttl=118 time=1.84 ms\n` +
          `64 bytes from ${target}: icmp_seq=2 ttl=118 time=1.92 ms\n` +
          `--- ${target} ping statistics ---\n` +
          `2 packets transmitted, 2 received, 0% packet loss`;
        break;
      case 'boot':
        output = 'Initiating reboot sequence...';
        setTimeout(() => {
          onClose();
          onReboot();
        }, 500);
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      case 'exit':
        onClose();
        return;
      default:
        output = `command not found: ${mainCmd}. Type 'help' for command listing.`;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-[#000000]/75 backdrop-blur-xs">
      <div className="bg-[#000000] text-[#f2f1ec] w-full max-w-3xl h-[80vh] sm:h-[650px] rounded-t-xl sm:rounded-xl shadow-2xl border border-[#5d5e64]/40 flex flex-col font-mono-sm overflow-hidden">
        {/* Terminal Titlebar */}
        <div className="px-4 py-3 bg-[#1a1b21] border-b border-[#5d5e64]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ef4444]/80"></span>
            <span className="w-3 h-3 rounded-full bg-[#eab308]/80"></span>
            <span className="w-3 h-3 rounded-full bg-[#22c55e]/80"></span>
            <span className="text-[#93c5fd] font-bold text-[12px] ml-2 flex items-center gap-1.5">
              <TermIcon size={14} />
              sushan@hypervisor-01: ~ (zsh)
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-[#76777b] hover:text-white p-1 rounded"
          >
            <X size={16} />
          </button>
        </div>

        {/* Terminal Screen Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 text-[13px] bg-[#000000]">
          <div className="text-[#76777b] text-[11px] pb-2 border-b border-[#5d5e64]/20">
            Welcome to Sushan Telemetry Shell v4.82. Type <span className="text-[#93c5fd]">help</span> to explore systems.
          </div>

          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-[#60a5fa]">
                <span className="text-[#2563eb]">sushan@sys:~$</span>
                <span className="text-white font-medium">{item.command}</span>
              </div>
              <div className="text-[#c6c6cb] whitespace-pre-wrap pl-4 leading-relaxed">
                {item.output}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleCommand}
          className="p-3 bg-[#1a1b21] border-t border-[#5d5e64]/30 flex items-center gap-2"
        >
          <span className="text-[#2563eb] pl-2 font-bold">sushan@sys:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help', 'uptime', 'systems', 'projects'..."
            className="flex-1 bg-transparent text-white focus:outline-none font-mono-sm text-[13px]"
          />
          <button
            type="submit"
            className="text-[#76777b] hover:text-[#93c5fd] p-1"
            title="Execute command"
          >
            <CornerDownLeft size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
