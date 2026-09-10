import { SystemDomain, ProjectCaseStudy, Certification, FieldNote, EngineeringPrinciple } from '../types';

export const PERSONAL_INFO = {
  name: 'Sushan',
  role: 'INFRA / CLOUD / SECURITY',
  tagline: 'I build, break, troubleshoot, and understand systems.',
  bio: "I'm Sushan, an infrastructure-focused engineer working across Linux, Windows Server, networking, Active Directory, virtualization, AWS, and security.",
  location: 'Kathmandu, Nepal • UTC +5:45',
  email: 'sushanpaudyal030@gmail.com',
  github: 'https://github.com/sushanpaudyal',
  linkedin: 'https://linkedin.com/in/sushan-paudyal',
  focus: 'Cloud & Infra',
  currentLearning: 'AWS Solutions Architect Associate',
  profile: {
    basedIn: 'Kathmandu, Nepal',
    learning: 'AWS Solutions Architect Associate',
    interests: 'Cloud / Infrastructure / Security / DevOps',
    usuallyFound: 'Breaking a VM / Reading logs / Fixing DNS / Building another lab',
  },
  stats: {
    toolsExplored: '08+',
    toolsLabel: 'Core infrastructure & virtualization tools explored',
    labEnvironment: '100%',
    labLabel: 'Hands-on homelab testing environment',
  },
};

export const BOOT_SEQUENCE_LOGS = [
  '[✓] identity: sushan // infra-cloud-sec',
  '[✓] infrastructure: linux // windows server',
  '[✓] cloud: aws architecture & services',
  '[✓] security: tls, active directory, hardening',
  '[✓] projects: 5 core lab topologies loaded',
  'SYSTEM READY',
];

export const JOURNEY_STEPS = [
  'LINUX',
  'NETWORKING',
  'WINDOWS SERVER',
  'ACTIVE DIRECTORY',
  'VIRTUALIZATION',
  'SECURITY',
  'AWS',
  'DEVOPS',
  'ARCHITECTURE',
];

export const SYSTEM_DOMAINS: SystemDomain[] = [
  {
    id: 'infra',
    number: '01',
    title: 'INFRASTRUCTURE',
    description:
      'Deep experience managing Linux distributions (Ubuntu, RHEL, Debian) and Windows Server environments with focus on system hardening and performance tuning.',
    tags: ['Linux', 'Windows Server', 'Systemd', 'Bash'],
    icon: 'Terminal',
    details: {
      components: ['Kernel parameters (/etc/sysctl.conf)', 'Systemd services & timers', 'Storage mounting & LVM', 'User/Group RBAC & sudoers'],
      typicalTools: ['systemctl', 'journalctl', 'htop', 'rsync', 'strace'],
      sampleCommand: 'systemctl status sshd.service --no-pager -l',
    },
  },
  {
    id: 'net',
    number: '02',
    title: 'NETWORKING',
    description:
      'Thorough understanding of TCP/IP stack, subnetting, VLANs, routing protocols, DNS resolution, and packet inspection using Wireshark.',
    tags: ['TCP/IP', 'VLAN', 'DNS/DHCP', 'Wireshark'],
    icon: 'Network',
    details: {
      components: ['802.1Q VLAN Tagging', 'Subnet boundary sizing (CIDR)', 'Stateful NAT & static routing', 'DNS record propagation & root hints'],
      typicalTools: ['wireshark', 'tcpdump', 'dig', 'traceroute', 'iperf3'],
      sampleCommand: 'tcpdump -i eth0 -nn -s0 -v "port 53 or port 443"',
    },
  },
  {
    id: 'ad',
    number: '03',
    title: 'ACTIVE DIRECTORY',
    description:
      'Domain controller configuration, Group Policy Objects (GPOs), LDAP queries, Kerberos authentication, and multi-site replication troubleshooting.',
    tags: ['AD DS', 'GPO', 'Kerberos', 'LDAP'],
    icon: 'Server',
    details: {
      components: ['Forest & Domain Functional Levels', 'SYSVOL & Netlogon replication', 'Kerberos ticket granting (TGT/TGS)', 'Group Policy precedence (LSDOU)'],
      typicalTools: ['repadmin', 'dcdiag', 'Get-ADUser', 'nltest', 'rsop.msc'],
      sampleCommand: 'repadmin /showrepl /verbose * /csv',
    },
  },
  {
    id: 'virt',
    number: '04',
    title: 'VIRTUALIZATION',
    description:
      'Building robust homelabs using Proxmox VE and VMware ESXi, managing virtual machines, storage pools, container templates, and backup strategies.',
    tags: ['Proxmox VE', 'VMware', 'KVM/QEMU', 'LXC'],
    icon: 'Cpu',
    details: {
      components: ['ZFS Zpool mirror/raidz sizing', 'Bridge & Open vSwitch networks', 'PCIe pass-through (IOMMU)', 'Proxmox Backup Server deduplication'],
      typicalTools: ['qm', 'pct', 'zfs', 'pvesm', 'esxcli'],
      sampleCommand: 'zpool status -v local-zfs',
    },
  },
  {
    id: 'cloud',
    number: '05',
    title: 'CLOUD (AWS)',
    description:
      'Designing Virtual Private Clouds (VPCs), EC2 instances, S3 storage buckets, IAM security policies, and Route 53 DNS routing.',
    tags: ['VPC / EC2', 'S3 / IAM', 'Route 53', 'CloudWatch'],
    icon: 'Cloud',
    details: {
      components: ['Multi-AZ subnet architecture', 'Least-privilege IAM roles & policies', 'Application Load Balancer health-checks', 'VPC flow logs & S3 lifecycles'],
      typicalTools: ['AWS CLI', 'CloudFormation', 'Session Manager', 'CloudWatch'],
      sampleCommand: 'aws ec2 describe-subnets --filters "Name=vpc-id,Values=vpc-012345"',
    },
  },
  {
    id: 'sec',
    number: '06',
    title: 'SECURITY',
    description:
      'TLS certificate lifecycles, firewall configurations (iptables, UFW), SSH key hardening, vulnerability scanning, and SIEM monitoring basics.',
    tags: ['TLS / SSL', 'UFW / iptables', 'SSH Hardening', 'Zabbix'],
    icon: 'Shield',
    details: {
      components: ['X.509 cert chains (Root/Intermediate)', 'Strict SSH cipher suits & ed25519 keys', 'Default-deny packet filter policies', 'Auditd system call monitoring'],
      typicalTools: ['openssl', 'nmap', 'fail2ban', 'ufw', 'lynis'],
      sampleCommand: 'openssl s_client -connect app.internal:443 -servername app.internal',
    },
  },
];

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'proj-01',
    number: '01',
    title: 'Active Directory Infrastructure Lab',
    subtitle: 'Active Directory Infrastructure Lab',
    description:
      'Built and troubleshot Windows Server Active Directory environments involving domain controllers, DNS, Group Policy, domain joins, replication and trust-related issues.',
    flowSteps: ['Client', 'Domain Controller', 'DNS', 'Replication'],
    diagnosticTitle: '// DIAGNOSTIC LOG',
    diagnosticLog: [
      'C:\\> repadmin /showrepl',
      'Default-First-Site-Name\\DC01 via RPC',
      'Event Viewer & DNS Check',
      'GPO Application Status: OK',
      'DS Replication Partner sync: 0 failures / 4 success',
    ],
    status: 'ONLINE',
  },
  {
    id: 'proj-02',
    number: '02',
    title: 'Proxmox Virtualization Lab',
    subtitle: 'Proxmox Virtualization Lab',
    description:
      'Hands-on experimentation with Proxmox virtualization, Linux-based infrastructure, virtual machines, storage and virtual networking.',
    flowSteps: ['Proxmox VE', 'Virtual Machines', 'Storage & Networks'],
    diagnosticTitle: '// STORAGE STATUS',
    diagnosticLog: [
      'pool: local-zfs',
      'state: ONLINE',
      'scan: scrub repaired 0B in 00:12:44 with 0 errors',
      'config: mirror-0 ONLINE (2 x NVMe Enterprise)',
      'status: VM storage pools active (ZFS snapshot sync)',
    ],
    status: 'ONLINE',
  },
  {
    id: 'proj-03',
    number: '03',
    title: 'Zabbix Monitoring Lab',
    subtitle: 'Zabbix Monitoring Lab',
    description:
      'Built and troubleshot a Zabbix monitoring environment involving Linux, Docker, PostgreSQL, SNMP and agent-based monitoring.',
    flowSteps: ['Network Devices', 'SNMP', 'Zabbix Server', 'PostgreSQL', 'Web UI'],
    diagnosticTitle: '// TRIGGER MONITOR',
    diagnosticLog: [
      '[OK] Host [linux-node01] ping response < 2ms',
      '[OK] PostgreSQL connection established: active pool 24/100',
      '[OK] SNMP v3 poll interval: 30s jitter < 5ms',
      '[OK] All triggers operational (0 critical / 0 warning)',
    ],
    status: 'ONLINE',
  },
  {
    id: 'proj-04',
    number: '04',
    title: 'TLS & Certificate Deployment',
    subtitle: 'TLS & Certificate Deployment',
    description:
      'Worked with commercial TLS certificates, certificate chains, OpenSSL verification, reverse proxies and Linux-based services.',
    flowSteps: ['Client', 'TLS Certificate', 'Reverse Proxy', 'Application'],
    diagnosticTitle: '// OPENSSL VERIFY',
    diagnosticLog: [
      'verify return:1 (depth=1, Root CA)',
      'Intermediate CA & Certificate Chain Validated',
      'TLS Protocol: TLSv1.3, Cipher: TLS_AES_256_GCM_SHA384',
      'OCSP Stapling: successful',
      'TLS Verification: SUCCESS',
    ],
    status: 'VERIFIED',
  },
  {
    id: 'proj-05',
    number: '05',
    title: 'AWS Architecture Lab',
    subtitle: 'AWS Architecture Lab',
    description:
      'Designing and experimenting with highly available AWS architectures as part of my AWS Solutions Architect Associate preparation.',
    flowSteps: ['Route 53', 'Load Balancer', 'VPC', 'Public / Private Subnets', 'App', 'Database'],
    diagnosticTitle: '// VPC STATUS',
    diagnosticLog: [
      'VPC ID: vpc-0123456789 (CIDR 10.0.0.0/16)',
      'Subnets: Multi-AZ Public/Private Configured (ap-south-1a/b)',
      'NAT Gateway: nat-0abc1234 active',
      'Security Groups & Route Tables Active: ingress strictly 443',
    ],
    status: 'ACTIVE',
  },
];

export const HOMELAB_METRICS = {
  nodesActive: '4 Nodes',
  vmsRunning: '18 Running',
  coreServices: 'Docker / K3s',
  experiments: 'ONGOING',
  status: 'ONLINE',
  type: 'PHYSICAL / HYPER-V',
  snapshots: [
    { domain: '[VIRTUALIZATION]', stack: 'Proxmox / VMware' },
    { domain: '[DIRECTORY]', stack: 'Windows AD / DNS' },
    { domain: '[MONITORING]', stack: 'Zabbix / Postgres' },
    { domain: '[NETWORKING]', stack: 'VLAN / Wireshark' },
  ],
};

export const CAREER_ROADMAP = [
  {
    number: '01 // CURRENT FOCUS',
    title: 'AWS Solutions Architect Associate',
    description:
      'Mastering resilient, cost-effective, and secure cloud design patterns across AWS global infrastructure.',
    isHighlighted: true,
  },
  {
    number: '02 // NEXT MILESTONE',
    title: 'Terraform & CI/CD Pipelines',
    description:
      'Transitioning manual infrastructure deployment into repeatable Infrastructure as Code (IaC) modules.',
    isHighlighted: false,
  },
  {
    number: '03 // FUTURE HORIZON',
    title: 'Cloud Security & DevSecOps',
    description:
      'Embedding automated vulnerability checks and advanced observability into multi-cloud architectures.',
    isHighlighted: false,
  },
];

export const ENGINEERING_PRINCIPLES: EngineeringPrinciple[] = [
  {
    number: '01',
    title: 'Understand before changing.',
    description:
      'Never modify a production configuration until you fully comprehend the downstream dependencies.',
  },
  {
    number: '02',
    title: 'Logs before guesses.',
    description:
      'Let the telemetry guide troubleshooting. Check `/var/log`, event viewer, and packet captures before making assumptions.',
  },
  {
    number: '03',
    title: 'Systems are interconnected.',
    description:
      'A failure in DNS is rarely just a DNS failure—it ripples across authentication, storage, and application delivery.',
  },
  {
    number: '04',
    title: 'Break it in the lab.',
    description:
      'Intentionally induce network partitions and service crashes in homelabs to learn recovery workflows.',
  },
  {
    number: '05',
    title: 'Document the fix.',
    description:
      'An undocumented fix is temporary. Write clear runbooks so the solution outlasts the incident.',
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'AWS Cloud Practitioner',
    status: 'VERIFIED',
    issuer: 'Amazon Web Services',
    date: '2024',
  },
  {
    name: 'Red Hat System Administration Basics',
    status: 'COMPLETED',
    issuer: 'Red Hat',
    date: '2024',
  },
  {
    name: 'Cisco Ethical Hacker Intro',
    status: 'COMPLETED',
    issuer: 'Cisco Networking Academy',
    date: '2024',
  },
  {
    name: 'Neo4j Graph Fundamentals',
    status: 'COMPLETED',
    issuer: 'Neo4j',
    date: '2024',
  },
  {
    name: 'OSINT & Threat Intelligence',
    status: 'COMPLETED',
    issuer: 'Security Operations Course',
    date: '2023',
  },
];

export const FIELD_NOTES: FieldNote[] = [
  {
    id: 'note-01',
    number: '01',
    title: 'Active Directory Replication Troubleshooting',
    lesson:
      'Debugging replication lag using `repadmin` and Event Viewer revealed how subtle DNS misconfigurations between primary and secondary domain controllers can silently halt sync operations.',
    tags: ['Windows Server', 'AD DS', 'DNS', 'repadmin'],
  },
  {
    id: 'note-02',
    number: '02',
    title: 'Zabbix Database Troubleshooting',
    lesson:
      'Monitoring high-frequency SNMP metrics requires careful PostgreSQL tuning; unoptimized housekeeping can saturate database connections and cause alert delays.',
    tags: ['Zabbix', 'PostgreSQL', 'SNMP', 'Performance'],
  },
  {
    id: 'note-03',
    number: '03',
    title: 'Linux Stdin / Stdout / Stderr Redirection',
    lesson:
      'Mastering file descriptors (`2>&1`) is essential when writing unattended bash cron jobs to ensure stderr debugging output isn\'t swallowed silently.',
    tags: ['Linux', 'Bash', 'Systemd', 'POSIX'],
  },
  {
    id: 'note-04',
    number: '04',
    title: 'TLS Certificate Deployment',
    lesson:
      'Chain verification errors with OpenSSL often stem from missing intermediate certificates in the Nginx bundle rather than incorrect private keys.',
    tags: ['TLS/SSL', 'OpenSSL', 'Nginx', 'Certificates'],
  },
  {
    id: 'note-05',
    number: '05',
    title: 'DNS Troubleshooting & TTLs',
    lesson:
      'Never underestimate TTL values when migrating records. Lowering TTLs well in advance prevents client caching black holes across subnets.',
    tags: ['DNS', 'Networking', 'BIND', 'Route 53'],
  },
  {
    id: 'note-06',
    number: '06',
    title: 'Proxmox Storage Pools',
    lesson:
      'Properly sizing ZFS vdevs and understanding local storage allocation prevents unexpected IO bottlenecks during heavy virtual machine snapshot operations.',
    tags: ['Proxmox VE', 'ZFS', 'Storage', 'KVM'],
  },
  {
    id: 'note-07',
    number: '07',
    title: 'AWS Architecture Experiments',
    lesson:
      'Isolating public and private subnets with correct NAT Gateway route tables is critical for secure outbound patching without exposing internal EC2 instances.',
    tags: ['AWS', 'VPC', 'Subnets', 'Security Groups'],
  },
];
