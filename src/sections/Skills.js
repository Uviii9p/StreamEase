import { soundFX } from '../utils/SoundFX.js';

export class SkillsSection {
  constructor() {
    this.skillPills = document.querySelectorAll('.skill-pill');
    this.init();
  }

  init() {
    this.skillPills.forEach(pill => {
      pill.addEventListener('mouseenter', () => {
        soundFX.playHover();
      });
    });
  }
}
