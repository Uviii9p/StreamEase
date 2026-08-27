import confetti from 'canvas-confetti';
import { soundFX } from '../utils/SoundFX.js';

export class HeroSection {
  constructor(windowManager) {
    this.wm = windowManager;
    this.typewriterEl = document.getElementById('typewriter-target');
    this.btnExplore = document.getElementById('btn-explore-projects');
    this.btnTerminal = document.getElementById('btn-open-terminal-hero');

    this.phrases = [
      '3D Web Experiences',
      'Multiplayer Games in Unity',
      'Sujal OS Spatial Interfaces',
      'High-Performance Systems',
      'Playful Experimental UI'
    ];
    this.phraseIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;

    this.init();
  }

  init() {
    this.startTypewriter();

    if (this.btnExplore) {
      this.btnExplore.addEventListener('click', () => {
        soundFX.playClick();
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#00f0ff', '#7b5cff', '#ff2a85', '#ffd000']
        });
        const projSec = document.getElementById('projects');
        if (projSec) projSec.scrollIntoView({ behavior: 'smooth' });
      });
    }

    if (this.btnTerminal) {
      this.btnTerminal.addEventListener('click', () => {
        soundFX.playClick();
        this.wm.openWindow('window-terminal');
      });
    }
  }

  startTypewriter() {
    if (!this.typewriterEl) return;

    const currentPhrase = this.phrases[this.phraseIndex];

    if (this.isDeleting) {
      this.charIndex--;
      this.typewriterEl.innerText = currentPhrase.substring(0, this.charIndex);
    } else {
      this.charIndex++;
      this.typewriterEl.innerText = currentPhrase.substring(0, this.charIndex);
    }

    let speed = this.isDeleting ? 40 : 80;

    if (!this.isDeleting && this.charIndex === currentPhrase.length) {
      speed = 1800; // Pause at full phrase
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      speed = 400;
    }

    setTimeout(() => this.startTypewriter(), speed);
  }
}
