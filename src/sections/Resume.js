import { soundFX } from '../utils/SoundFX.js';

export class ResumeSection {
  constructor(windowManager) {
    this.wm = windowManager;
    this.tabButtons = document.querySelectorAll('.resume-tab-btn');
    this.tabPanes = document.querySelectorAll('.resume-tab-pane');
    this.btnPrint = document.getElementById('btn-print-resume');

    this.init();
  }

  init() {
    this.tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        soundFX.playClick();
        const tabId = btn.dataset.tab;

        this.tabButtons.forEach(b => b.classList.remove('active'));
        this.tabPanes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPane = document.getElementById(tabId);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });

    if (this.btnPrint) {
      this.btnPrint.addEventListener('click', () => {
        soundFX.playClick();
        window.print();
      });
    }
  }
}
