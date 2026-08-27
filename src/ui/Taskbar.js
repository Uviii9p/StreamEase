import { soundFX } from '../utils/SoundFX.js';

export class Taskbar {
  constructor(windowManager, appLauncher, onToggleFastMode) {
    this.wm = windowManager;
    this.launcher = appLauncher;
    this.onToggleFastMode = onToggleFastMode;
    
    this.startBtn = document.getElementById('start-menu-btn');
    this.activeAppsContainer = document.getElementById('taskbar-active-apps');
    this.timeEl = document.getElementById('taskbar-time');
    this.cpuEl = document.getElementById('taskbar-cpu');
    this.ramEl = document.getElementById('taskbar-ram');
    this.soundToggleBtn = document.getElementById('sound-toggle');
    this.soundIconEl = document.getElementById('sound-icon');
    this.fastModeBtn = document.getElementById('view-mode-toggle');
    this.fastModeStateEl = document.getElementById('fast-mode-state');
    this.activeTabs = new Map();

    this.init();
  }

  init() {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
    this.simulateSystemStats();

    // Start Menu Toggle
    if (this.startBtn) {
      this.startBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        soundFX.playClick();
        this.launcher.toggle();
      });
    }

    // Sound Toggle
    if (this.soundToggleBtn) {
      this.soundToggleBtn.addEventListener('click', () => {
        const enabled = soundFX.toggle();
        this.soundIconEl.innerText = enabled ? '🔊' : '🔇';
        soundFX.playClick();
      });
    }

    // Fast Mode (Recruiter View) Toggle
    if (this.fastModeBtn) {
      this.fastModeBtn.addEventListener('click', () => {
        soundFX.playClick();
        const isFast = this.fastModeStateEl.innerText === 'OFF';
        this.fastModeStateEl.innerText = isFast ? 'ON' : 'OFF';
        if (this.onToggleFastMode) {
          this.onToggleFastMode(isFast);
        }
      });
    }
  }

  updateClock() {
    if (this.timeEl) {
      const now = new Date();
      this.timeEl.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
  }

  simulateSystemStats() {
    setInterval(() => {
      if (this.cpuEl) {
        const cpu = Math.floor(Math.random() * 12 + 8);
        this.cpuEl.innerText = `${cpu}%`;
      }
      if (this.ramEl) {
        const ram = (1.2 + Math.random() * 0.4).toFixed(1);
        this.ramEl.innerText = `${ram} GB`;
      }
    }, 3000);
  }

  addActiveApp(id, title) {
    if (this.activeTabs.has(id)) return;

    const tab = document.createElement('button');
    tab.className = 'taskbar-tab active';
    tab.innerHTML = `<span class="pulse-dot"></span> <span>${title}</span>`;
    
    tab.addEventListener('click', () => {
      soundFX.playClick();
      const win = this.wm.windows.get(id);
      if (win) {
        if (win.isMinimized || win.el.classList.contains('hidden')) {
          this.wm.openWindow(id);
        } else {
          this.wm.minimizeWindow(id);
        }
      }
    });

    this.activeAppsContainer.appendChild(tab);
    this.activeTabs.set(id, tab);
  }

  removeActiveApp(id) {
    const tab = this.activeTabs.get(id);
    if (tab) {
      tab.remove();
      this.activeTabs.delete(id);
    }
  }

  setActiveTab(id) {
    this.activeTabs.forEach((tab, tabId) => {
      if (tabId === id) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  }

  setAppMinimized(id, isMinimized) {
    const tab = this.activeTabs.get(id);
    if (tab) {
      if (isMinimized) {
        tab.classList.remove('active');
      } else {
        tab.classList.add('active');
      }
    }
  }
}
