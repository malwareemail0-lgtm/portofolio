import React, { useState } from 'react';
import { X, Printer, Copy, Check, Download } from 'lucide-react';
import { PERSONAL_INFO, CERTIFICATIONS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const resumeText = `
SUSHAN - INFRASTRUCTURE, CLOUD & SECURITY ENGINEER
Location: Kathmandu, Nepal • UTC +5:45
Email: ${PERSONAL_INFO.email}
GitHub: ${PERSONAL_INFO.github} | LinkedIn: ${PERSONAL_INFO.linkedin}

PROFILE SUMMARY
Infrastructure-focused engineer with hands-on homelab and cloud experience managing Linux distributions (Ubuntu/RHEL/Debian), Windows Server Active Directory environments, virtualization clusters (Proxmox VE/VMware ESXi), AWS cloud architectures, and network security hardening.

CORE TECHNICAL SKILLS
- Operating Systems: Linux (Ubuntu, Debian, RHEL, Alpine), Windows Server 2019/2022
- Cloud Platforms: AWS (VPC, EC2, S3, IAM, Route 53, CloudWatch, ALB)
- Identity & Directory: Active Directory Domain Services (AD DS), Group Policy (GPO), Kerberos, LDAP, DNS
- Virtualization: Proxmox VE, KVM/QEMU, LXC containers, VMware ESXi, ZFS storage management
- Networking: TCP/IP stack, Subnetting/CIDR, 802.1Q VLANs, DHCP, Wireshark, tcpdump, iptables/UFW
- Security: TLS/SSL certificate lifecycle, OpenSSL, SSH key hardening, Fail2ban, OSINT
- Monitoring & Scripting: Zabbix, PostgreSQL tuning, SNMP, Bash scripting, systemd service units

CORE PROJECTS & LAB ARCHITECTURES
1. Active Directory Infrastructure Lab:
   - Configured multi-role Windows Server DC with DNS forwarding and GPO hierarchy.
   - Troubleshot replication failures using repadmin, Event Viewer logs, and RPC endpoint tests.
2. Proxmox Virtualization Lab:
   - Built dual-node Proxmox VE hypervisor with ZFS local-zfs storage pools and NVMe mirror.
   - Deployed Linux VMs and LXC microservices with virtual bridge networking.
3. Zabbix Enterprise Monitoring Lab:
   - Deployed Zabbix server with Docker & PostgreSQL backend to monitor network switches and servers via SNMP & agents.
4. TLS & Certificate Chain Deployment:
   - Implemented commercial and internal TLS certificate chains, validated via OpenSSL and reverse proxies.
5. AWS Resilient Architecture Lab:
   - Designed multi-AZ VPC topology with public/private subnet isolation, NAT Gateways, and ALB routing.

CERTIFICATIONS
${CERTIFICATIONS.map((c) => `- ${c.name} (${c.status})`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-[#000000]/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#ffffff] text-[#1b1c19] max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl border border-[#c6c6cb] flex flex-col my-8">
        {/* Modal Action Header */}
        <div className="p-4 sm:px-8 border-b border-[#c6c6cb]/40 flex items-center justify-between bg-[#fbf9f4] sticky top-0 z-20">
          <div className="flex items-center gap-2 font-mono-sm">
            <span className="w-2 h-2 rounded-full bg-[#2563eb]"></span>
            <span className="font-bold text-[#1b1c19]">RESUME // CV DOCUMENT</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyText}
              className="px-3 py-1.5 font-mono-sm text-[12px] border border-[#c6c6cb] rounded hover:bg-[#eae8e3] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-[#2563eb]" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 font-mono-sm text-[12px] bg-[#2563eb] text-white rounded hover:bg-[#1d4ed8] transition-colors cursor-pointer"
            >
              <Printer size={14} />
              Print / Save PDF
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#76777b] hover:text-[#1b1c19] hover:bg-[#eae8e3] rounded transition-colors ml-2 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div className="p-6 sm:p-10 space-y-8 font-body-md text-[#1b1c19] print:p-0">
          {/* Header block */}
          <div className="border-b border-[#c6c6cb]/60 pb-6">
            <h1 className="font-headline-lg text-3xl sm:text-4xl font-bold tracking-tight text-[#1b1c19] mb-1">
              {PERSONAL_INFO.name.toUpperCase()}
            </h1>
            <p className="font-mono-sm text-[#2563eb] font-semibold tracking-wider text-[14px] mb-3">
              INFRASTRUCTURE, CLOUD &amp; SECURITY ENGINEER
            </p>
            <div className="flex flex-wrap gap-y-1 gap-x-4 font-mono-sm text-[12px] text-[#46464b]">
              <span>Kathmandu, Nepal (UTC +5:45)</span>
              <span>•</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-[#2563eb]">
                {PERSONAL_INFO.email}
              </a>
              <span>•</span>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-[#2563eb]">
                GitHub: sushanpaudyal
              </a>
              <span>•</span>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#2563eb]">
                LinkedIn: sushan-paudyal
              </a>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h2 className="font-mono-sm text-[12px] font-bold text-[#76777b] uppercase tracking-wider mb-2 border-b border-[#c6c6cb]/30 pb-1">
              Professional Summary
            </h2>
            <p className="text-[14px] leading-relaxed text-[#46464b]">
              Passionate, hands-on infrastructure engineer specializing in systems administration, network design, virtualization topologies, and AWS cloud architectures. Driven by methodical troubleshooting, verifiable telemetry, and deep understanding of operating system internals, protocols, and security boundaries.
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="font-mono-sm text-[12px] font-bold text-[#76777b] uppercase tracking-wider mb-3 border-b border-[#c6c6cb]/30 pb-1">
              Core Technical Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px] font-mono-sm">
              <div className="p-3 bg-[#f5f3ee] rounded border border-[#c6c6cb]/30">
                <strong className="text-[#1b1c19] block mb-1">Systems &amp; Virtualization:</strong>
                <span className="text-[#46464b]">Linux (Ubuntu, Debian, RHEL), Windows Server 2022, Proxmox VE, VMware ESXi, KVM/QEMU, LXC, ZFS</span>
              </div>
              <div className="p-3 bg-[#f5f3ee] rounded border border-[#c6c6cb]/30">
                <strong className="text-[#1b1c19] block mb-1">Cloud Infrastructure (AWS):</strong>
                <span className="text-[#46464b]">VPC, Multi-AZ Subnets, EC2, S3, IAM, Route 53, Application Load Balancers, CloudWatch</span>
              </div>
              <div className="p-3 bg-[#f5f3ee] rounded border border-[#c6c6cb]/30">
                <strong className="text-[#1b1c19] block mb-1">Directory &amp; Identity:</strong>
                <span className="text-[#46464b]">Active Directory Domain Services (AD DS), Group Policy (GPOs), Kerberos, LDAP, SYSVOL replication</span>
              </div>
              <div className="p-3 bg-[#f5f3ee] rounded border border-[#c6c6cb]/30">
                <strong className="text-[#1b1c19] block mb-1">Networking &amp; Security:</strong>
                <span className="text-[#46464b]">TCP/IP, VLAN (802.1Q), DNS, DHCP, Wireshark, UFW/iptables, TLS 1.3 certificate chains, OpenSSL, SSH hardening</span>
              </div>
            </div>
          </div>

          {/* Project Labs */}
          <div>
            <h2 className="font-mono-sm text-[12px] font-bold text-[#76777b] uppercase tracking-wider mb-4 border-b border-[#c6c6cb]/30 pb-1">
              Key Engineering Projects &amp; Lab Topologies
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[15px] text-[#1b1c19]">Active Directory Infrastructure Lab</h3>
                  <span className="font-mono-sm text-[12px] text-[#2563eb]">Verified Lab Environment</span>
                </div>
                <p className="text-[13px] text-[#46464b] mt-1">
                  Engineered and administered a multi-server Windows Active Directory domain controller topology. Resolved replication discrepancies via RPC tests and <code className="font-mono bg-[#f5f3ee] px-1 py-0.5">repadmin /showrepl</code>, configured DNS zones, and enforced secure Group Policy Objects across virtualized domain clients.
                </p>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[15px] text-[#1b1c19]">Dual-Node Proxmox Hypervisor &amp; ZFS Storage Cluster</h3>
                  <span className="font-mono-sm text-[12px] text-[#2563eb]">Physical Homelab Cluster</span>
                </div>
                <p className="text-[13px] text-[#46464b] mt-1">
                  Built a bare-metal virtualization environment running 18 concurrent virtual machines and containers. Configured enterprise NVMe mirrored ZFS storage pools with snapshot automation, scheduled scrubs, and isolated VLAN bridge interfaces.
                </p>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[15px] text-[#1b1c19]">Enterprise Monitoring Stack (Zabbix + Docker + PostgreSQL)</h3>
                  <span className="font-mono-sm text-[12px] text-[#2563eb]">Telemetry Architecture</span>
                </div>
                <p className="text-[13px] text-[#46464b] mt-1">
                  Constructed automated infrastructure telemetry ingestion over SNMP v3 and active Zabbix agents. Tuned PostgreSQL database connection pools, vacuum thresholds, and metric retention policies.
                </p>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[15px] text-[#1b1c19]">AWS Resilient Multi-Tier Infrastructure</h3>
                  <span className="font-mono-sm text-[12px] text-[#2563eb]">Cloud Architecture</span>
                </div>
                <p className="text-[13px] text-[#46464b] mt-1">
                  Designed resilient, highly available AWS architecture featuring public/private subnet segmentation, secure NAT Gateway egress, and strict security groups with least-privilege IAM roles.
                </p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="font-mono-sm text-[12px] font-bold text-[#76777b] uppercase tracking-wider mb-3 border-b border-[#c6c6cb]/30 pb-1">
              Certifications &amp; Credentials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13px] font-mono-sm">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.name} className="flex justify-between items-center p-2 bg-[#f5f3ee] rounded border border-[#c6c6cb]/20">
                  <span className="text-[#1b1c19]">{cert.name}</span>
                  <span className="text-[#2563eb] font-bold text-[11px]">{cert.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
