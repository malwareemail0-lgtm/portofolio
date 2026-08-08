/* ═══════════════════════════════════════════════════════
   INFRASTRUCTURE PORTFOLIO — MAIN.JS
   Matrix rain | Boot sequence | Typewriter | Interactive terminal
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── CONFIG ───
  const BOOT_DURATION = 3200;       // ms for full boot sequence
  const MATRIX_FADE_START = 2000;   // when matrix starts fading
  const TYPEWRITER_SPEED = 28;      // ms per character
  const TYPEWRITER_LINE_DELAY = 400; // ms between lines

  // ═══════════ MATRIX RAIN ═══════════
  function initMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*(){}[]|;:<>?/~`';
    const charArr = chars.split('');
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    // Randomize initial positions for more organic look
    for (let i = 0; i < drops.length; i++) {
      drops[i] = Math.random() * -100;
    }

    function draw() {
      ctx.fillStyle = 'rgba(10, 14, 39, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = fontSize + 'px JetBrains Mono, monospace';

      for (let i = 0; i < drops.length; i++) {
        const char = charArr[Math.floor(Math.random() * charArr.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Leading character is brighter
        if (Math.random() > 0.6) {
          ctx.fillStyle = '#00ff88';
          ctx.shadowColor = '#00ff88';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = 'rgba(0, 255, 136, 0.35)';
          ctx.shadowBlur = 0;
        }

        ctx.fillText(char, x, y);
        ctx.shadowBlur = 0;

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const matrixInterval = setInterval(draw, 45);

    // Fade out matrix after boot
    setTimeout(() => {
      canvas.classList.add('fade-out');
      setTimeout(() => {
        clearInterval(matrixInterval);
        canvas.classList.add('hidden');
      }, 1500);
    }, MATRIX_FADE_START);

    // Handle resize
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // ═══════════ BOOT SEQUENCE ═══════════
  function runBootSequence() {
    const overlay = document.getElementById('boot-overlay');
    const bootText = document.getElementById('boot-text');
    if (!overlay || !bootText) return;

    const bootLines = [
      { text: 'BIOS POST... ', cls: 'boot-dim', delay: 80 },
      { text: 'Memory Test: 32768 MB OK', cls: 'boot-ok', delay: 60 },
      { text: 'CPU: Intel Xeon E5-2670 v3 @ 2.30GHz [  OK  ]', cls: 'boot-ok', delay: 50 },
      { text: '', cls: '', delay: 30 },
      { text: 'Loading GRUB 2.06...', cls: 'boot-dim', delay: 100 },
      { text: 'Booting \'Sushan Infrastructure OS 5.15.0-SMP\'', cls: 'boot-info', delay: 80 },
      { text: '', cls: '', delay: 40 },
      { text: '[    0.000000] Linux version 5.15.0 (root@infra) (gcc 12.2.0) #1 SMP', cls: 'boot-dim', delay: 40 },
      { text: '[    0.004291] Command line: BOOT_IMAGE=/vmlinuz root=/dev/sda1 quiet', cls: 'boot-dim', delay: 30 },
      { text: '[    0.112455] Initializing network stack...             [  OK  ]', cls: 'boot-ok', delay: 50 },
      { text: '[    0.234112] Loading security modules...               [  OK  ]', cls: 'boot-ok', delay: 50 },
      { text: '[    0.345001] Mounting filesystems (ZFS, ext4)...       [  OK  ]', cls: 'boot-ok', delay: 50 },
      { text: '[    0.456723] Starting sshd service...                  [  OK  ]', cls: 'boot-ok', delay: 40 },
      { text: '[    0.567890] Starting nginx reverse proxy...           [  OK  ]', cls: 'boot-ok', delay: 40 },
      { text: '[    0.678234] Loading firewall rules (iptables)...      [  OK  ]', cls: 'boot-ok', delay: 40 },
      { text: '[    0.789456] Starting monitoring daemon...             [  OK  ]', cls: 'boot-ok', delay: 40 },
      { text: '[    0.890123] Initializing Proxmox cluster comm...      [  OK  ]', cls: 'boot-ok', delay: 40 },
      { text: '[    0.956789] Starting Docker engine...                 [  OK  ]', cls: 'boot-ok', delay: 40 },
      { text: '[    1.023456] Loading Active Directory connector...     [  OK  ]', cls: 'boot-ok', delay: 40 },
      { text: '', cls: '', delay: 30 },
      { text: '═══════════════════════════════════════════════════', cls: 'boot-info', delay: 60 },
      { text: '  SUSHAN INFRASTRUCTURE OS v5.15.0', cls: 'boot-info', delay: 80 },
      { text: '  Network & Systems Administration Terminal', cls: 'boot-info', delay: 60 },
      { text: '  Status: ALL SYSTEMS OPERATIONAL', cls: 'boot-ok', delay: 80 },
      { text: '═══════════════════════════════════════════════════', cls: 'boot-info', delay: 60 },
      { text: '', cls: '', delay: 30 },
      { text: 'root@infra:~# ./portfolio.sh --start', cls: 'boot-ok', delay: 120 },
      { text: 'Launching interface...', cls: 'boot-dim', delay: 200 },
    ];

    let i = 0;
    let totalDelay = 0;

    bootLines.forEach((line, idx) => {
      totalDelay += line.delay;
      setTimeout(() => {
        const el = document.createElement('div');
        el.className = 'boot-line ' + line.cls;
        el.textContent = line.text;
        bootText.appendChild(el);
        // Auto-scroll
        bootText.scrollTop = bootText.scrollHeight;
      }, totalDelay);
    });

    // After boot completes, fade out and show main
    setTimeout(() => {
      overlay.classList.add('fade-out');
      const mainContent = document.getElementById('main-content');
      if (mainContent) mainContent.classList.add('visible');

      setTimeout(() => {
        overlay.classList.add('hidden');
        startHeroTypewriter();
      }, 800);
    }, BOOT_DURATION);
  }

  // ═══════════ HERO TYPEWRITER ═══════════
  function startHeroTypewriter() {
    const container = document.getElementById('hero-typewriter');
    if (!container) return;

    const lines = [
      { prompt: '$ ', command: 'whoami', output: 'Sushan [Infrastructure Architect]' },
      { prompt: '$ ', command: 'hostname', output: 'infra.admin' },
      { prompt: '$ ', command: 'uname -a', output: 'Linux sysadmin 5.15.0 #1 SMP x86_64 GNU/Linux' },
      { prompt: '$ ', command: 'uptime', output: 'infrastructure: UP 24/7 | security: HARDENED | systems: OPERATIONAL' },
    ];

    let lineIdx = 0;

    function typeLine() {
      if (lineIdx >= lines.length) return;

      const line = lines[lineIdx];
      const lineDiv = document.createElement('div');
      lineDiv.className = 'terminal-line';
      container.appendChild(lineDiv);

      // Type prompt
      const promptSpan = document.createElement('span');
      promptSpan.className = 'prompt';
      promptSpan.textContent = line.prompt;
      lineDiv.appendChild(promptSpan);

      // Type command character by character
      const cmdSpan = document.createElement('span');
      cmdSpan.className = 'command';
      lineDiv.appendChild(cmdSpan);

      let charIdx = 0;
      const cmdInterval = setInterval(() => {
        if (charIdx < line.command.length) {
          cmdSpan.textContent += line.command[charIdx];
          charIdx++;
        } else {
          clearInterval(cmdInterval);
          // Show output after small delay
          setTimeout(() => {
            const outputDiv = document.createElement('div');
            outputDiv.className = 'terminal-output';
            outputDiv.style.color = '#c9d1d9';
            outputDiv.style.paddingLeft = '1.2rem';
            outputDiv.style.marginBottom = '0.5rem';
            outputDiv.textContent = line.output;
            container.appendChild(outputDiv);

            lineIdx++;
            setTimeout(typeLine, TYPEWRITER_LINE_DELAY);
          }, 200);
        }
      }, TYPEWRITER_SPEED);
    }

    typeLine();
  }

  // ═══════════ INTERACTIVE TERMINAL ═══════════
  function initInteractiveTerminal() {
    const input = document.getElementById('terminal-input');
    const history = document.getElementById('terminal-history');
    if (!input || !history) return;

    const commands = {
      help: () => `Available commands:
  whoami        — Who is Sushan?
  skills        — List technical skills
  projects      — Show project list
  uptime        — System uptime
  hostname      — Show hostname
  uname         — System info
  neofetch      — System fetch
  status        — Lab status
  contact       — Contact info
  blog          — Recent articles
  clear         — Clear terminal
  hack          — Try it ;)
  sudo rm -rf / — Don't even think about it
  exit          — Close session`,

      whoami: () => `Sushan — Network & Systems Administrator
Infrastructure Architect | Security-First | Linux Enthusiast
"Production systems don't break — people don't plan."`,

      skills: () => `[CORE SKILLS]
├── Hypervisors: Proxmox VE, VMware ESXi, KVM/libvirt
├── Cloud: AWS EC2, Terraform, IaC
├── Security: Sophos XG, FortiGate, F5 BIG-IP
├── Systems: Linux (Ubuntu/CentOS/Debian), Windows Server
├── Network: IPsec VPN, DNS, Kerberos, HSTS
├── Automation: PowerShell, Bash, Python, Ansible
├── Databases: PostgreSQL, MySQL, MariaDB
└── Backup/DR: Acronis, Veeam, Proxmox Backup, ZFS`,

      projects: () => `$ ls /projects/
drwxr-xr-x  ACTIVE_DIRECTORY_LAB    [OPERATIONAL ✓]
drwxr-xr-x  VAULTWARDEN_MIGRATION   [HARDENED ✓]
drwxr-xr-x  SOPHOS_AUTOMATION       [AUTOMATED ✓]
drwxr-xr-x  ESXI_INFRASTRUCTURE     [OPTIMIZED ✓]
drwxr-xr-x  BRANCH_CONNECTIVITY     [RESOLVED ✓]`,

      uptime: () => {
        const now = new Date();
        return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}
up ${Math.floor(Math.random() * 300 + 100)} days, load average: ${(Math.random() * 0.5 + 0.1).toFixed(2)}, ${(Math.random() * 0.4 + 0.1).toFixed(2)}, ${(Math.random() * 0.3 + 0.1).toFixed(2)}`;
      },

      hostname: () => 'infra.admin',

      uname: () => 'Linux infra.admin 5.15.0-smp #1 SMP x86_64 GNU/Linux',

      neofetch: () => `        .--.           root@infra.admin
       |o_o |          ─────────────────
       |:_/ |          OS: Infrastructure OS 5.15.0 x86_64
      //   \\ \\         Host: Dell PowerEdge R710
     (|     | )        Kernel: 5.15.0-smp
    /'\\_   _/\`\\        Uptime: 24/7/365
    \\___)=(___/        Shell: bash 5.1.16
                       CPU: Xeon E5-2670 v3
                       Memory: 32768 MB
                       Disk: ZFS RAID-Z2`,

      status: () => `● Lab Status: OPERATIONAL
├─ Proxmox Cluster: RUNNING
├─ Vaultwarden: UP
├─ Odoo Instance: UP
├─ Active Directory Lab: UP
├─ Monitoring: RUNNING
└─ Uptime: 99.7%`,

      contact: () => `[CONTACT INFO]
├── Email:    admin@sushan.io
├── GitHub:   github.com/your-handle
├── LinkedIn: linkedin.com/in/your-profile
└── Response: < 48 hours`,

      blog: () => `[RECENT POSTS]
1. "Why ESXi 8 Fails on Westmere CPUs"
2. "Debugging F5 BIG-IP SSL Termination"
3. "Vaultwarden to Production"
4. "Active Directory Lab on AWS"`,

      clear: () => '__CLEAR__',

      hack: () => `[ACCESS DENIED]
                                         
  ██╗  ██╗ █████╗  ██████╗██╗  ██╗      
  ██║  ██║██╔══██╗██╔════╝██║ ██╔╝      
  ███████║███████║██║     █████╔╝       
  ██╔══██║██╔══██║██║     ██╔═██╗       
  ██║  ██║██║  ██║╚██████╗██║  ██╗      
  ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝      
                                         
Nice try. Firewall says no.
IDS alert logged. Your IP has been noted. 😏`,

      'sudo rm -rf /': () => `[PERMISSION DENIED]
Are you out of your mind?
This infrastructure was built with obsessive planning.
rm -rf doesn't work here. Neither does panic.`,

      exit: () => `Session terminated.
Thank you for visiting. Infrastructure keeps running.
// Reconnect anytime.`,
    };

    // Command history for up/down arrows
    const cmdHistory = [];
    let historyIdx = -1;

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = input.value.trim().toLowerCase();
        if (!cmd) return;

        cmdHistory.unshift(cmd);
        historyIdx = -1;

        // Show command in history
        addToHistory(`visitor@infra:~$ ${input.value.trim()}`, 'command-echo');

        // Process command
        const handler = commands[cmd];
        if (handler) {
          const result = handler();
          if (result === '__CLEAR__') {
            history.innerHTML = '';
          } else {
            addToHistory(result, 'command-result');
          }
        } else {
          addToHistory(`bash: ${cmd}: command not found. Type 'help' for available commands.`, 'command-error');
        }

        input.value = '';
        history.scrollTop = history.scrollHeight;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIdx < cmdHistory.length - 1) {
          historyIdx++;
          input.value = cmdHistory[historyIdx];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIdx > 0) {
          historyIdx--;
          input.value = cmdHistory[historyIdx];
        } else {
          historyIdx = -1;
          input.value = '';
        }
      }
    });

    function addToHistory(text, className) {
      const div = document.createElement('div');
      div.className = `terminal-output ${className}`;
      div.style.whiteSpace = 'pre-wrap';

      if (className === 'command-echo') {
        div.style.color = '#00ff88';
        div.style.marginTop = '0.5rem';
      } else if (className === 'command-error') {
        div.style.color = '#ff4757';
      } else {
        div.style.color = '#c9d1d9';
        div.style.marginBottom = '0.3rem';
      }

      div.textContent = text;
      history.appendChild(div);
    }

    // Focus terminal when clicking anywhere in the block
    const termBlock = document.getElementById('interactive-terminal');
    if (termBlock) {
      termBlock.addEventListener('click', () => input.focus());
    }
  }

  // ═══════════ SCROLL FADE-IN ═══════════
  function initScrollObserver() {
    const fadeEls = document.querySelectorAll('.fade-in');
    if (!fadeEls.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    });

    fadeEls.forEach((el) => observer.observe(el));
  }

  // ═══════════ NAV SCROLL EFFECT ═══════════
  function initNavScroll() {
    const nav = document.getElementById('nav-bar');
    if (!nav) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  // ═══════════ SYSTEM LOAD FAKER ═══════════
  function initSystemLoad() {
    const valueEl = document.getElementById('system-load-value');
    const barEl = document.getElementById('system-load-bar');
    if (!valueEl || !barEl) return;

    function updateLoad() {
      const load = Math.floor(Math.random() * 25 + 8);
      valueEl.textContent = load;
      barEl.style.width = load + '%';

      // Color based on load
      if (load > 20) {
        barEl.style.background = '#ffa502';
      } else {
        barEl.style.background = '#00d4ff';
      }
    }

    updateLoad();
    setInterval(updateLoad, 4000);
  }

  // ═══════════ LAST UPDATED & UPTIME ═══════════
  function initTimestamps() {
    const lastUpdatedEl = document.getElementById('last-updated');
    if (lastUpdatedEl) {
      const now = new Date();
      lastUpdatedEl.textContent = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    }

    const footerYear = document.getElementById('footer-year');
    if (footerYear) {
      footerYear.textContent = new Date().getFullYear();
    }

    // Uptime counter
    const uptimeEl = document.getElementById('uptime-counter');
    if (uptimeEl) {
      const startTime = Date.now();
      function updateUptime() {
        const elapsed = Date.now() - startTime;
        const s = Math.floor(elapsed / 1000) % 60;
        const m = Math.floor(elapsed / 60000) % 60;
        const h = Math.floor(elapsed / 3600000) % 24;
        const d = Math.floor(elapsed / 86400000);
        uptimeEl.textContent =
          String(d).padStart(2, '0') + ':' +
          String(h).padStart(2, '0') + ':' +
          String(m).padStart(2, '0') + ':' +
          String(s).padStart(2, '0');
      }
      setInterval(updateUptime, 1000);
      updateUptime();
    }
  }

  // ═══════════ SMOOTH SCROLL FOR NAV LINKS ═══════════
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ═══════════ INIT ═══════════
  document.addEventListener('DOMContentLoaded', () => {
    initMatrixRain();
    runBootSequence();
    initInteractiveTerminal();
    initNavScroll();
    initSystemLoad();
    initTimestamps();
    initSmoothScroll();

    // Delay scroll observer until main content is visible
    setTimeout(() => {
      initScrollObserver();
    }, BOOT_DURATION + 500);
  });

})();
