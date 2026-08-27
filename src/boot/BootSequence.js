import { soundFX } from '../utils/SoundFX.js';

export class BootSequence {
  constructor(onComplete) {
    this.onComplete = onComplete;
    this.overlay = document.getElementById('boot-overlay');
    this.progressBar = document.getElementById('boot-progress-bar');
    this.percentEl = document.getElementById('boot-percent');
    this.statusTextEl = document.getElementById('boot-status-text');
    this.terminalEl = document.getElementById('boot-terminal-log');
    this.skipBtn = document.getElementById('btn-skip-boot');
    this.timeEl = document.getElementById('boot-time');
    
    this.isCompleted = false;
    this.progress = 0;

    this.init();
  }

  init() {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);

    // Skip Handlers
    this.skipBtn.addEventListener('click', () => this.complete());
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && !this.isCompleted) {
        this.complete();
      }
    });

    this.runSequence();
  }

  updateClock() {
    if (this.timeEl) {
      const now = new Date();
      this.timeEl.innerText = now.toTimeString().split(' ')[0] + ' UTC';
    }
  }

  runSequence() {
    const lines = this.terminalEl.querySelectorAll('.log-line');
    
    // Animate terminal lines sequentially
    lines.forEach((line, index) => {
      setTimeout(() => {
        if (this.isCompleted) return;
        line.classList.add('visible');
        soundFX.playKeyTick();
      }, index * 280);
    });

    // Progress Bar Animation
    const totalDuration = 2200; // ~2.2 seconds
    const intervalTime = 30;
    const step = 100 / (totalDuration / intervalTime);

    const timer = setInterval(() => {
      if (this.isCompleted) {
        clearInterval(timer);
        return;
      }

      this.progress += step;
      if (this.progress >= 100) {
        this.progress = 100;
        clearInterval(timer);
        this.progressBar.style.width = '100%';
        this.percentEl.innerText = '100%';
        this.statusTextEl.innerText = 'SYSTEM READY // LAUNCHING SPATIAL DESKTOP';
        
        setTimeout(() => {
          this.complete();
        }, 350);
      } else {
        this.progressBar.style.width = `${Math.floor(this.progress)}%`;
        this.percentEl.innerText = `${Math.floor(this.progress)}%`;

        if (this.progress > 70) {
          this.statusTextEl.innerText = 'CALIBRATING 3D PARTICLES & SHADERS...';
        } else if (this.progress > 40) {
          this.statusTextEl.innerText = 'INITIALIZING INTERACTIVE OS SHELL...';
        }
      }
    }, intervalTime);
  }

  complete() {
    if (this.isCompleted) return;
    this.isCompleted = true;

    soundFX.playBootSequence();

    this.overlay.classList.add('hidden');
    
    setTimeout(() => {
      if (this.overlay.parentNode) {
        this.overlay.style.display = 'none';
      }
      if (this.onComplete) {
        this.onComplete();
      }
    }, 800);
  }
}
