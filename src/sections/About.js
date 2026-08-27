import { soundFX } from '../utils/SoundFX.js';

export class AboutSection {
  constructor(windowManager) {
    this.wm = windowManager;
    this.counters = document.querySelectorAll('.counter');
    this.btnResume = document.getElementById('btn-view-resume');
    this.btnSpecs = document.getElementById('btn-inspect-specs');
    this.animated = false;

    this.init();
  }

  init() {
    this.initIntersectionObserver();

    if (this.btnSpecs) {
      this.btnSpecs.addEventListener('click', () => {
        soundFX.playClick();
        this.wm.openWindow('window-terminal');
      });
    }

    if (this.btnResume) {
      this.btnResume.addEventListener('click', (e) => {
        e.preventDefault();
        soundFX.playClick();
        const resumeSec = document.getElementById('resume');
        if (resumeSec) {
          resumeSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  initIntersectionObserver() {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animated) {
          this.animated = true;
          this.animateCounters();
        }
      });
    }, { threshold: 0.2 });

    observer.observe(aboutSection);
  }

  animateCounters() {
    this.counters.forEach(counter => {
      const target = parseInt(counter.dataset.target, 10);
      let count = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const interval = setInterval(() => {
        count += step;
        if (count >= target) {
          counter.innerText = target;
          clearInterval(interval);
        } else {
          counter.innerText = count;
        }
      }, 35);
    });
  }

  openResumeModal() {
    const titleEl = document.getElementById('proj-win-title');
    const statusEl = document.getElementById('proj-win-status');
    const bodyEl = document.getElementById('proj-win-body');

    if (titleEl) titleEl.innerText = 'DOSSIER :: SUJAL_RATHOD_OFFICIAL_RESUME.MD';
    if (statusEl) statusEl.innerText = 'STATUS: VERIFIED';

    if (bodyEl) {
      bodyEl.innerHTML = `
        <div style="font-family: var(--font-mono); line-height: 1.7; font-size: 0.88rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem; margin-bottom: 1.2rem;">
            <div>
              <h2 style="color: #fff; font-family: var(--font-display); font-size: 1.8rem; margin-bottom: 0.2rem;">SUJAL RATHOD</h2>
              <p style="color: var(--color-cyan); font-weight: 600;">AI/ML Enthusiast | Full Stack Developer | Creative 3D Engineer</p>
              <p style="color: var(--color-text-muted); font-size: 0.8rem; margin-top: 0.3rem;">📍 Gujarat, Gandhinagar, Sector 24 • 📞 +91 9328375515 • ✉️ sr3052236@gmail.com</p>
            </div>
            <div style="display: flex; gap: 0.6rem;">
              <a href="https://github.com/Uviii9p/" target="_blank" class="os-btn os-btn-sm os-btn-secondary" style="text-decoration:none;">GitHub</a>
              <a href="https://www.linkedin.com/in/sujal-rathod-2881a0305" target="_blank" class="os-btn os-btn-sm os-btn-primary" style="text-decoration:none;">LinkedIn</a>
            </div>
          </div>
          
          <h3 style="color: var(--color-yellow); margin: 1.2rem 0 0.5rem;">SUMMARY</h3>
          <p style="color: var(--color-text-main); background: rgba(255,255,255,0.02); padding: 0.8rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06);">
            Enthusiastic and determined Computer Engineering Diploma graduate with strong skills in AI/ML and Full Stack Development. Passionate about building real-world applications, solving complex algorithmic problems, and continuously learning new technologies. Experienced in developing and deploying modern web applications and AI-driven solutions.
          </p>

          <h3 style="color: var(--color-yellow); margin: 1.2rem 0 0.5rem;">INTERNSHIPS & EXPERIENCE</h3>
          <div style="display: flex; flex-direction: column; gap: 0.8rem;">
            <div style="background: rgba(0, 240, 255, 0.03); border: 1px solid rgba(0, 240, 255, 0.15); padding: 0.8rem; border-radius: 6px;">
              <div style="display: flex; justify-content: space-between; font-weight: 600; color: #fff;">
                <span>AI/ML Intern — Info Tech and Solution</span>
                <span style="color: var(--color-cyan); font-size: 0.8rem;">Internship</span>
              </div>
              <ul style="color: var(--color-text-muted); list-style: square; padding-left: 1.2rem; margin-top: 0.4rem;">
                <li>Worked on AI/ML development projects and gained practical industry experience.</li>
                <li>Built and tested machine learning models and integrated them into responsive web apps.</li>
                <li>Enhanced knowledge in data preprocessing, model training, evaluation, and deployment.</li>
              </ul>
            </div>

            <div style="background: rgba(123, 92, 255, 0.03); border: 1px solid rgba(123, 92, 255, 0.15); padding: 0.8rem; border-radius: 6px;">
              <div style="display: flex; justify-content: space-between; font-weight: 600; color: #fff;">
                <span>AI/ML Web Developer Intern — BISAG (Bhaskaracharya Institute For Space Applications and Geo-Informatics)</span>
                <span style="color: var(--color-primary); font-size: 0.8rem;">Govt. Research Internship</span>
              </div>
              <ul style="color: var(--color-text-muted); list-style: square; padding-left: 1.2rem; margin-top: 0.4rem;">
                <li>Worked on real-world geospatial and AI-based mission critical projects.</li>
                <li>Developed and integrated web solutions for complex data visualization and analysis.</li>
                <li>Gained hands-on experience in AI/ML, geospatial data handling, and full-stack web development.</li>
              </ul>
            </div>
          </div>

          <h3 style="color: var(--color-yellow); margin: 1.2rem 0 0.5rem;">EDUCATION</h3>
          <div style="background: rgba(255,255,255,0.02); padding: 0.8rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06);">
            <div style="display: flex; justify-content: space-between; font-weight: 600; color: #fff;">
              <span>Diploma in Computer Engineering — Silver Oak University</span>
              <span style="color: var(--color-green);">2023 - Present (Completed)</span>
            </div>
            <p style="color: var(--color-cyan); margin-top: 0.2rem;">⭐ SPI: 8+ | Percentage: 80%+</p>
          </div>

          <h3 style="color: var(--color-yellow); margin: 1.2rem 0 0.5rem;">CERTIFICATIONS</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.5rem;">
            <div style="background: rgba(255,255,255,0.03); padding: 0.5rem; border-radius: 4px; border: 1px solid rgba(255,255,255,0.06);">
              🏅 <b>AI/ML Virtual Internship</b> – Edunet Foundation
            </div>
            <div style="background: rgba(255,255,255,0.03); padding: 0.5rem; border-radius: 4px; border: 1px solid rgba(255,255,255,0.06);">
              🏅 <b>Generative AI Virtual Internship</b> – Edunet Foundation
            </div>
            <div style="background: rgba(255,255,255,0.03); padding: 0.5rem; border-radius: 4px; border: 1px solid rgba(255,255,255,0.06);">
              🏅 <b>Python Programming</b> – Infosys Springboard
            </div>
            <div style="background: rgba(255,255,255,0.03); padding: 0.5rem; border-radius: 4px; border: 1px solid rgba(255,255,255,0.06);">
              🏅 <b>SQL Certification</b> – Infosys Springboard
            </div>
            <div style="background: rgba(255,255,255,0.03); padding: 0.5rem; border-radius: 4px; border: 1px solid rgba(255,255,255,0.06);">
              🏅 <b>Data Analytics with Python</b> – CodeBasix
            </div>
          </div>

          <div style="margin-top: 2rem; display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="mailto:sr3052236@gmail.com" class="os-btn os-btn-primary" style="text-decoration:none;">
              <span>GET IN TOUCH (sr3052236@gmail.com)</span>
            </a>
            <a href="https://github.com/Uviii9p/" target="_blank" class="os-btn os-btn-ghost" style="text-decoration:none;">
              <span>GITHUB PROFILE (Uviii9p)</span>
            </a>
            <a href="https://www.linkedin.com/in/sujal-rathod-2881a0305" target="_blank" class="os-btn os-btn-secondary" style="text-decoration:none;">
              <span>LINKEDIN PROFILE</span>
            </a>
          </div>
        </div>
      `;
      this.wm.openWindow('window-project-detail');
    }
  }
}
