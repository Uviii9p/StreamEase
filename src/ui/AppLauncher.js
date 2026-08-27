import { soundFX } from '../utils/SoundFX.js';

export class AppLauncher {
  constructor(windowManager, onLaunchToy) {
    this.wm = windowManager;
    this.onLaunchToy = onLaunchToy;
    this.launcherEl = document.getElementById('app-launcher');
    this.closeBtn = document.getElementById('close-launcher-btn');
    this.searchInput = document.getElementById('launcher-search-input');
    this.appItems = document.querySelectorAll('.launcher-app-item');

    this.init();
  }

  init() {
    if (!this.launcherEl) return;

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    document.addEventListener('click', (e) => {
      if (!this.launcherEl.contains(e.target) && !e.target.closest('#start-menu-btn')) {
        this.close();
      }
    });

    // App Item Clicks
    this.appItems.forEach(item => {
      item.addEventListener('click', () => {
        soundFX.playClick();
        const action = item.dataset.action;
        
        if (action === 'navigate') {
          const target = item.dataset.target;
          const el = document.querySelector(target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else if (action === 'window') {
          const winId = item.dataset.win;
          this.wm.openWindow(winId);
        } else if (action === 'toy') {
          const toy = item.dataset.toy;
          if (this.onLaunchToy) this.onLaunchToy(toy);
        }

        this.close();
      });
    });

    // Filter Search
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        this.appItems.forEach(item => {
          const name = item.querySelector('.app-name')?.innerText.toLowerCase() || '';
          if (name.includes(query)) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    }
  }

  toggle() {
    if (this.launcherEl.classList.contains('hidden')) {
      this.open();
    } else {
      this.close();
    }
  }

  open() {
    this.launcherEl.classList.remove('hidden');
    if (this.searchInput) {
      this.searchInput.value = '';
      this.searchInput.focus();
    }
  }

  close() {
    this.launcherEl.classList.add('hidden');
  }
}
