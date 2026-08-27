import { soundFX } from '../utils/SoundFX.js';

export class WindowManager {
  constructor(taskbar) {
    this.taskbar = taskbar;
    this.windows = new Map();
    this.activeWindow = null;
    this.highestZIndex = 1000;

    this.init();
  }

  init() {
    const windowEls = document.querySelectorAll('.os-window');
    windowEls.forEach(winEl => {
      this.registerWindow(winEl.id, winEl);
    });
  }

  registerWindow(id, el) {
    const title = el.querySelector('.win-title')?.innerText || id;
    this.windows.set(id, {
      el,
      id,
      title,
      isMaximized: false,
      isMinimized: false
    });

    // Make Draggable
    this.makeDraggable(el);

    // Titlebar Controls
    const closeBtn = el.querySelector('.win-btn.close');
    const minBtn = el.querySelector('.win-btn.minimize');
    const maxBtn = el.querySelector('.win-btn.maximize');

    if (closeBtn) closeBtn.addEventListener('click', () => this.closeWindow(id));
    if (minBtn) minBtn.addEventListener('click', () => this.minimizeWindow(id));
    if (maxBtn) maxBtn.addEventListener('click', () => this.toggleMaximize(id));

    // Focus on click
    el.addEventListener('mousedown', () => this.bringToFront(id));
  }

  openWindow(id) {
    const win = this.windows.get(id);
    if (!win) return;

    soundFX.playWindowOpen();
    win.el.classList.remove('hidden');
    win.isMinimized = false;
    this.bringToFront(id);

    if (this.taskbar) {
      this.taskbar.addActiveApp(id, win.title);
    }
  }

  closeWindow(id) {
    const win = this.windows.get(id);
    if (!win) return;

    soundFX.playClick();
    win.el.classList.add('hidden');
    win.isMinimized = false;

    if (this.taskbar) {
      this.taskbar.removeActiveApp(id);
    }
  }

  minimizeWindow(id) {
    const win = this.windows.get(id);
    if (!win) return;

    soundFX.playClick();
    win.el.classList.add('hidden');
    win.isMinimized = true;

    if (this.taskbar) {
      this.taskbar.setAppMinimized(id, true);
    }
  }

  toggleMaximize(id) {
    const win = this.windows.get(id);
    if (!win) return;

    soundFX.playClick();
    win.isMaximized = !win.isMaximized;
    if (win.isMaximized) {
      win.el.classList.add('maximized');
    } else {
      win.el.classList.remove('maximized');
    }
  }

  bringToFront(id) {
    const win = this.windows.get(id);
    if (!win) return;

    this.highestZIndex += 2;
    win.el.style.zIndex = this.highestZIndex;
    this.activeWindow = id;

    if (this.taskbar) {
      this.taskbar.setActiveTab(id);
    }
  }

  makeDraggable(el) {
    const titlebar = el.querySelector('.window-titlebar');
    if (!titlebar) return;

    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    titlebar.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('win-btn')) return;
      if (el.classList.contains('maximized')) return;

      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;

      const rect = el.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;

      document.body.style.userSelect = 'none';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      el.style.left = `${initialLeft + deltaX}px`;
      el.style.top = `${initialTop + deltaY}px`;
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        document.body.style.userSelect = '';
      }
    });
  }
}
