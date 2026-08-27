import confetti from 'canvas-confetti';
import { soundFX } from '../utils/SoundFX.js';

export class ContactSection {
  constructor(windowManager) {
    this.wm = windowManager;
    this.form = document.getElementById('contact-form');
    this.feedbackEl = document.getElementById('form-feedback');
    this.btnTerminalContact = document.getElementById('btn-open-terminal-contact');

    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        soundFX.playClick();
        this.handleSubmit();
      });
    }

    if (this.btnTerminalContact) {
      this.btnTerminalContact.addEventListener('click', () => {
        soundFX.playClick();
        this.wm.openWindow('window-terminal');
      });
    }
  }

  handleSubmit() {
    const name = document.getElementById('sender-name').value;
    const email = document.getElementById('sender-email').value;

    const submitBtn = document.getElementById('btn-submit-msg');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>ENCRYPTING & TRANSMITTING...</span>';
    }

    setTimeout(() => {
      soundFX.playWindowOpen();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#00ff88', '#00f0ff', '#7b5cff']
      });

      if (this.feedbackEl) {
        this.feedbackEl.className = 'form-feedback success';
        this.feedbackEl.innerHTML = `
          ⚡ <b>TRANSMISSION CONFIRMED</b>: Message logged into Sujal OS buffer. Sujal will respond to <u>${email}</u> promptly.
        `;
        this.feedbackEl.classList.remove('hidden');
      }

      this.form.reset();

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="btn-icon">📡</span><span>SEND TRANSMISSION</span>';
      }
    }, 1200);
  }
}
