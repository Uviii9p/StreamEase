import { BootSequence } from './boot/BootSequence.js';
import { SceneManager } from './scene/SceneManager.js';
import { WindowManager } from './ui/WindowManager.js';
import { Terminal } from './ui/Terminal.js';
import { AppLauncher } from './ui/AppLauncher.js';
import { Taskbar } from './ui/Taskbar.js';
import { HeroSection } from './sections/Hero.js';
import { AboutSection } from './sections/About.js';
import { ProjectsSection } from './sections/Projects.js';
import { ResumeSection } from './sections/Resume.js';
import { SkillsSection } from './sections/Skills.js';
import { ContactSection } from './sections/Contact.js';
import { soundFX } from './utils/SoundFX.js';

class SujalOSApp {
  constructor() {
    this.canvas = document.getElementById('webgl-canvas');
    this.cursorGlow = document.getElementById('cursor-glow');
    this.cursorDot = document.getElementById('cursor-dot');
    this.currentZoneLabel = document.getElementById('current-zone-label');
    this.fpsEl = document.getElementById('footer-fps');

    this.sceneManager = null;
    this.windowManager = null;
    this.appLauncher = null;
    this.taskbar = null;
    this.terminal = null;

    this.initCursor();
    this.initBoot();
  }

  initCursor() {
    window.addEventListener('mousemove', (e) => {
      if (this.cursorGlow) {
        this.cursorGlow.style.left = `${e.clientX}px`;
        this.cursorGlow.style.top = `${e.clientY}px`;
      }
      if (this.cursorDot) {
        this.cursorDot.style.left = `${e.clientX}px`;
        this.cursorDot.style.top = `${e.clientY}px`;
      }
    });
  }

  initBoot() {
    // Cinematic Boot Sequence
    new BootSequence(() => {
      this.initOSWorld();
    });
  }

  initOSWorld() {
    // 1. Taskbar & Windows
    this.windowManager = new WindowManager(null);
    this.appLauncher = new AppLauncher(this.windowManager);
    this.taskbar = new Taskbar(this.windowManager, this.appLauncher, (isFastMode) => {
      if (this.sceneManager) {
        this.sceneManager.setFastMode(isFastMode);
      }
    });
    this.windowManager.taskbar = this.taskbar;

    // 2. Sections
    this.heroSection = new HeroSection(this.windowManager);
    this.aboutSection = new AboutSection(this.windowManager);
    this.projectsSection = new ProjectsSection(this.windowManager);
    this.resumeSection = new ResumeSection(this.windowManager);
    this.skillsSection = new SkillsSection();
    this.contactSection = new ContactSection(this.windowManager);

    // 3. Interactive CLI Terminal
    this.terminal = new Terminal(this.windowManager);

    // 4. Three.js 3D Scene
    this.sceneManager = new SceneManager(this.canvas, (projectId) => {
      this.projectsSection.openProjectInspector(projectId);
    });

    // 5. Quick Nav & Active Zone Spy
    this.initNavigation();

    // 6. Terminal Quick Launch Button
    const termQuickBtn = document.getElementById('terminal-quick-btn');
    if (termQuickBtn) {
      termQuickBtn.addEventListener('click', () => {
        soundFX.playClick();
        this.windowManager.openWindow('window-terminal');
      });
    }

    // 7. FPS Counter simulation
    this.initFpsMonitor();
  }

  initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const sections = document.querySelectorAll('.section');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mobileNavPanel = document.getElementById('mobile-nav-panel');

    // Desktop nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        soundFX.playClick();
        const target = link.dataset.target;
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Mobile nav toggle
    if (mobileNavToggle && mobileNavPanel) {
      mobileNavToggle.addEventListener('click', () => {
        soundFX.playClick();
        const isOpen = mobileNavPanel.classList.toggle('open');
        mobileNavToggle.setAttribute('aria-expanded', isOpen);
        mobileNavToggle.innerHTML = isOpen ? '<span>✕</span>' : '<span>☰</span>';
      });

      // Mobile nav links click
      mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
          soundFX.playClick();
          mobileNavPanel.classList.remove('open');
          mobileNavToggle.setAttribute('aria-expanded', 'false');
          mobileNavToggle.innerHTML = '<span>☰</span>';
          const target = link.dataset.target;
          const el = document.querySelector(target);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!mobileNavPanel.contains(e.target) && !mobileNavToggle.contains(e.target)) {
          mobileNavPanel.classList.remove('open');
          mobileNavToggle.setAttribute('aria-expanded', 'false');
          mobileNavToggle.innerHTML = '<span>☰</span>';
        }
      });
    }

    // Scroll Spy for breadcrumb and active nav
    window.addEventListener('scroll', () => {
      let currentSection = '';
      let currentZone = '/HOME';

      sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        const height = sec.offsetHeight;
        if (window.scrollY >= top && window.scrollY < top + height) {
          currentSection = `#${sec.id}`;
          currentZone = sec.dataset.zone || `/${sec.id.toUpperCase()}`;
        }
      });

      if (currentSection) {
        navLinks.forEach(link => {
          if (link.dataset.target === currentSection) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        mobileNavLinks.forEach(link => {
          if (link.dataset.target === currentSection) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }

      if (this.currentZoneLabel) {
        this.currentZoneLabel.innerHTML = `<span class="bc-root">SYS:</span><span class="bc-node">${currentZone}</span>`;
      }
    }, { passive: true });
  }

  initFpsMonitor() {
    let frameCount = 0;
    let lastTime = performance.now();

    const checkFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime));
        if (this.fpsEl) this.fpsEl.innerText = Math.min(60, fps);
        frameCount = 0;
        lastTime = now;
      }
      requestAnimationFrame(checkFps);
    };

    requestAnimationFrame(checkFps);
  }
}

// Instantiate Sujal OS on page load
window.addEventListener('DOMContentLoaded', () => {
  new SujalOSApp();
});
