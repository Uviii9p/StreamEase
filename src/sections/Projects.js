import { soundFX } from '../utils/SoundFX.js';

export const PROJECTS_DATA = [
  {
    id: 'pinterest-clone',
    title: 'Pinterest: Visual Discovery & Boards',
    category: 'apps',
    categoryLabel: 'Visual Discovery & Full Stack',
    icon: '📌',
    metric: 'Masonry Grid Engine',
    mockupUrl: 'pintrest-cyan.vercel.app',
    mockupType: 'pinterest',
    tagline: 'Full-stack visual curation and bookmarking platform featuring responsive masonry grids, pin boards, and image uploads.',
    description: 'A modern, high-performance Pinterest web application deployed live on Vercel. Features seamless infinite masonry layouts, user authentication, pin creation with high-resolution image uploads, board organization, and rapid tag-based visual search.',
    tech: ['React.js', 'Node.js', 'Express', 'Tailwind CSS', 'MongoDB', 'Vercel'],
    highlights: [
      'Engineered smooth responsive masonry layout algorithm adapting flawlessly to all screen sizes.',
      'Implemented secure user authentication and personalized moodboard collections.',
      'Optimized asset compression & CDN delivery for sub-second feed rendering.',
      'Deployed live on Vercel with automated CI/CD: pintrest-cyan.vercel.app'
    ],
    github: 'https://github.com/Uviii9p/',
    demo: 'https://pintrest-cyan.vercel.app/',
    badge: 'Live Production'
  },
  {
    id: 'date4u',
    title: 'Date4U: Modern Match & Social Hub',
    category: 'apps',
    categoryLabel: 'Social Discovery & Auth',
    icon: '💘',
    metric: 'Real-Time Match Engine',
    mockupUrl: 'date-4-u.vercel.app',
    mockupType: 'dating',
    tagline: 'Modern social connection & dating web application featuring profile matchmaking, interactive filters, and secure authentication.',
    description: 'Date4U is a sleek modern matchmaking platform deployed live on Vercel. Features real-time profile exploration, smart preference-based matching algorithms, responsive mobile-first swipe navigation, interactive messaging, and JWT authentication.',
    tech: ['React.js', 'Tailwind CSS', 'Node.js', 'JWT Auth', 'REST API', 'Vercel'],
    highlights: [
      'Engineered responsive profile discovery cards with glassmorphism UI.',
      'Implemented secure user authentication flow and protected session management.',
      'Optimized touch interactions and gesture animations for mobile web browsers.',
      'Deployed live on Vercel: date-4-u.vercel.app/login'
    ],
    github: 'https://github.com/Uviii9p/',
    demo: 'https://date-4-u.vercel.app/login',
    badge: 'Live Production'
  },
  {
    id: 'streamease',
    title: 'StreamEase: Movie & Series Hub',
    category: 'media',
    categoryLabel: 'Media & Streaming Web App',
    icon: '🎬',
    metric: 'TMDB REST API Hub',
    mockupUrl: 'stream-ease-zeta.vercel.app',
    mockupType: 'media',
    tagline: 'High-performance entertainment discovery and media platform powered by TMDB API with trailer playback and watchlists.',
    description: 'StreamEase allows users to browse trending films, TV series, view actor filmographies, search by genres, and stream trailers. Features custom glassmorphism modal players, personalized bookmarks, and instantaneous search indexing.',
    tech: ['React.js', 'TMDB API', 'Tailwind CSS', 'JavaScript', 'CSS3', 'Vercel'],
    highlights: [
      'Integrated official TMDB REST APIs for real-time trending movies, ratings, and video trailers.',
      'Built seamless client-side search with debounce filtering and category filters.',
      'Ultra-sleek dark glassmorphism design with immersive video backdrop banners.',
      'Deployed live on Vercel: stream-ease-zeta.vercel.app'
    ],
    github: 'https://github.com/Uviii9p/',
    demo: 'https://stream-ease-zeta.vercel.app/',
    badge: 'Live Production'
  },
  {
    id: 'zombie-attack',
    title: 'Zombie Attack: 3D Survival WebGL',
    category: 'games',
    categoryLabel: 'Gaming & Realtime WebGL',
    icon: '🧟',
    metric: '60 FPS WebGL Engine',
    mockupUrl: 'zombie-attack-xi.vercel.app',
    mockupType: 'game',
    tagline: 'Production 3D zombie survival shooter featuring procedural horde waves, particle pooling, and dynamic combat physics.',
    description: 'Zombie Attack is an action-packed survival shooter deployed live on Vercel. Features real-time wave progression, smart enemy AI tracking, immersive audio synthesizers, health & ammo management, and optimized asset pipelines for consistent 60 FPS in modern browsers.',
    tech: ['JavaScript', 'HTML5 Canvas', 'Three.js / WebGL', 'Web Audio API', 'Game Physics', 'Vercel'],
    highlights: [
      'Engineered responsive player movement, 360-degree aiming, and fluid bullet trajectory physics.',
      'Developed scaling horde AI algorithms that increase aggression and spawn rates dynamically.',
      'Optimized asset pipeline & particle pooling for zero-lag combat even during massive wave rushes.',
      'Deployed live on Vercel with automated CI/CD pipelines: zombie-attack-xi.vercel.app'
    ],
    github: 'https://github.com/Uviii9p/',
    demo: 'https://zombie-attack-xi.vercel.app/',
    badge: 'Live Production'
  },
  {
    id: 'student-life',
    title: 'Student Daily Life Companion',
    category: 'apps',
    categoryLabel: 'Productivity & Education',
    icon: '🎓',
    metric: 'Full-Stack Vercel App',
    mockupUrl: 'student-life-three.vercel.app',
    mockupType: 'app',
    tagline: 'Campus companion web application featuring automated timetables, smart notes, assignment countdowns, and attendance analytics.',
    description: 'A comprehensive campus companion app built to streamline academic routines. Empowers students to manage daily lecture schedules, track attendance thresholds with automated warnings, create organized revision notes, and forecast semester outcomes.',
    tech: ['React.js', 'Vite', 'Tailwind CSS', 'JavaScript', 'Local Storage', 'Vercel'],
    highlights: [
      'Intuitive dashboard displaying daily schedule countdowns and urgent assignment deadlines.',
      'Attendance tracking engine calculating safe bunks and attendance risk percentages.',
      'Clean modern responsive UI optimized for mobile, tablet, and desktop viewports.',
      'Deployed live on Vercel: student-life-three.vercel.app'
    ],
    github: 'https://github.com/Uviii9p/',
    demo: 'https://student-life-three.vercel.app/',
    badge: 'Live Production'
  },
  {
    id: 'rag-ai-chatbot',
    title: 'RAG Enterprise AI Document Agent',
    category: 'ai',
    categoryLabel: 'AI/ML & Generative AI',
    icon: '🤖',
    metric: '<800ms Vector Query',
    mockupUrl: 'rag-agent.internal.ai',
    mockupType: 'ai',
    tagline: 'Conversational AI system powered by Retrieval-Augmented Generation (RAG), LangChain, and FAISS vector embeddings.',
    description: 'Advanced AI assistant engineered to perform semantic search across unstructured documentation and provide hallucination-free, contextually grounded answers. Utilizes OpenAI embeddings, FAISS indexing, and prompt engineering pipelines.',
    tech: ['Python', 'LangChain', 'OpenAI API', 'FAISS Vector DB', 'FastAPI', 'Streamlit'],
    highlights: [
      'Implemented RAG architecture with document chunking, embeddings extraction, and semantic retrieval.',
      'Reduced LLM hallucinations by enforcing strict context-bound prompt instructions.',
      'Sub-second query response times with optimized vector similarity calculations via FAISS.',
      'Supports PDF/Markdown document ingestion and multi-turn conversational memory.'
    ],
    github: 'https://github.com/Uviii9p/',
    demo: 'https://github.com/Uviii9p/',
    badge: 'AI/ML Core'
  }
];

export class ProjectsSection {
  constructor(windowManager) {
    this.wm = windowManager;
    this.gridEl = document.getElementById('projects-grid');
    this.filterBtns = document.querySelectorAll('.filter-btn');
    this.currentFilter = 'all';

    // Side panel elements
    this.sidePanel = document.getElementById('project-side-panel');
    this.sidePanelBackdrop = document.getElementById('side-panel-backdrop');
    this.sidePanelCloseBtn = document.getElementById('side-panel-close-btn');
    this.sidePanelCategory = document.getElementById('side-panel-category');
    this.sidePanelTitle = document.getElementById('side-panel-title');
    this.sidePanelBody = document.getElementById('side-panel-body');

    this.init();
  }

  init() {
    this.renderCards();
    this.initFilters();
    this.initSidePanelEvents();
  }

  initSidePanelEvents() {
    if (this.sidePanelCloseBtn) {
      this.sidePanelCloseBtn.addEventListener('click', () => {
        soundFX.playClick();
        this.closeSidePanel();
      });
    }

    if (this.sidePanelBackdrop) {
      this.sidePanelBackdrop.addEventListener('click', () => {
        soundFX.playClick();
        this.closeSidePanel();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.sidePanel && this.sidePanel.classList.contains('open')) {
        this.closeSidePanel();
      }
    });
  }

  closeSidePanel() {
    if (this.sidePanel) {
      this.sidePanel.classList.remove('open');
      this.sidePanel.setAttribute('aria-hidden', 'true');
    }
  }

  renderMockupContent(type, icon) {
    switch (type) {
      case 'pinterest':
        return `
          <div class="mockup-ui-screen pinterest-screen">
            <div class="mockup-screen-bar">
              <span class="mockup-pill-sub">Visual Feed</span>
              <span class="mockup-pill-sub" style="color: #e60023; border-color: rgba(230,0,35,0.3); background: rgba(230,0,35,0.08);">Masonry Grid</span>
            </div>
            <div class="mockup-masonry-grid">
              <div class="mockup-pin pin-1"></div>
              <div class="mockup-pin pin-2"></div>
              <div class="mockup-pin pin-3"></div>
              <div class="mockup-pin pin-4"></div>
            </div>
            <div class="mockup-screen-bot">
              <span class="mockup-center-icon">${icon}</span>
            </div>
          </div>
        `;
      case 'dating':
        return `
          <div class="mockup-ui-screen dating-screen">
            <div class="mockup-screen-bar">
              <span class="mockup-pill-sub">Discover Match</span>
              <span class="mockup-pill-sub" style="color: #ff4b72; border-color: rgba(255,75,114,0.3); background: rgba(255,75,114,0.08);">98% Match</span>
            </div>
            <div class="mockup-dating-card">
              <div class="mockup-heart-badge">💖</div>
              <div class="mockup-match-lines">
                <div class="mockup-text-line w-65"></div>
                <div class="mockup-text-line w-45"></div>
              </div>
            </div>
            <div class="mockup-screen-bot">
              <span class="mockup-center-icon">${icon}</span>
            </div>
          </div>
        `;
      case 'game':
        return `
          <div class="mockup-ui-screen game-screen">
            <div class="mockup-screen-bar">
              <span class="mockup-pill-sub">Wave 12</span>
              <span class="mockup-pill-sub green">60 FPS WebGL</span>
            </div>
            <div class="mockup-canvas-art">
              <div class="mockup-radar-circle"></div>
              <div class="mockup-player-dot"></div>
              <div class="mockup-enemy-dot e1"></div>
              <div class="mockup-enemy-dot e2"></div>
              <div class="mockup-bullet-tracer"></div>
            </div>
            <div class="mockup-screen-bot">
              <span class="mockup-center-icon">${icon}</span>
            </div>
          </div>
        `;
      case 'app':
        return `
          <div class="mockup-ui-screen app-screen">
            <div class="mockup-screen-bar">
              <span class="mockup-pill-sub">Daily Routine</span>
              <span class="mockup-pill-sub green">Attendance: 88%</span>
            </div>
            <div class="mockup-app-grid">
              <div class="mockup-schedule-row"><span class="dot-subject"></span><div class="mockup-text-line w-75"></div></div>
              <div class="mockup-schedule-row"><span class="dot-subject s2"></span><div class="mockup-text-line w-55"></div></div>
              <div class="mockup-schedule-row"><span class="dot-subject s3"></span><div class="mockup-text-line w-85"></div></div>
            </div>
            <div class="mockup-screen-bot">
              <span class="mockup-center-icon">${icon}</span>
            </div>
          </div>
        `;
      case 'ai':
        return `
          <div class="mockup-ui-screen ai-screen">
            <div class="mockup-screen-bar">
              <span class="mockup-pill-sub">RAG Agent</span>
              <span class="mockup-pill-sub purple">FAISS Index</span>
            </div>
            <div class="mockup-chat-thread">
              <div class="mockup-chat-bubble user"><div class="mockup-text-line w-65"></div></div>
              <div class="mockup-chat-bubble ai"><div class="mockup-text-line w-85"></div><div class="mockup-text-line w-45"></div></div>
            </div>
            <div class="mockup-screen-bot">
              <span class="mockup-center-icon">${icon}</span>
            </div>
          </div>
        `;
      case 'media':
      default:
        return `
          <div class="mockup-ui-screen media-screen">
            <div class="mockup-screen-bar">
              <span class="mockup-pill-sub">Trending</span>
              <span class="mockup-pill-sub gold">★ 8.9 TMDB</span>
            </div>
            <div class="mockup-media-cards">
              <div class="mockup-poster p1"></div>
              <div class="mockup-poster p2"></div>
              <div class="mockup-poster p3"></div>
            </div>
            <div class="mockup-screen-bot">
              <span class="mockup-center-icon">${icon}</span>
            </div>
          </div>
        `;
    }
  }

  renderCards() {
    if (!this.gridEl) return;
    this.gridEl.innerHTML = '';

    const filtered = this.currentFilter === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter(p => p.category === this.currentFilter);

    filtered.forEach(project => {
      const card = document.createElement('article');
      card.className = 'glass-card project-card';
      card.dataset.id = project.id;
      card.tabIndex = 0;
      card.setAttribute('role', 'region');
      card.setAttribute('aria-label', `${project.title} Case Study Card`);

      const hasLiveDemo = project.demo.startsWith('http') && !project.demo.includes('github.com/Uviii9p/');

      card.innerHTML = `
        <div class="project-thumbnail-box">
          <div class="project-mockup-frame">
            <div class="project-mockup-bar">
              <span class="dot-sm"></span>
              <span class="dot-sm"></span>
              <span class="dot-sm"></span>
              <span class="mockup-url-label">
                https://${project.mockupUrl}
              </span>
            </div>
            <div class="project-mockup-body">
              ${this.renderMockupContent(project.mockupType, project.icon)}
            </div>
          </div>
          <span class="project-3d-badge">
            <span class="pulse-dot" style="width: 5px; height: 5px; background: ${hasLiveDemo ? 'var(--color-green)' : 'var(--color-cyan)'};"></span>
            ${project.badge}
          </span>
        </div>

        <div class="project-meta-row">
          <span class="project-category">${project.categoryLabel}</span>
          <span class="project-metric-pill">
            ${project.metric}
          </span>
        </div>

        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.tagline}</p>
        
        <div class="project-tech-tags">
          ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>

        <div class="project-card-footer">
          <button class="os-btn os-btn-sm os-btn-ghost btn-inspect" data-id="${project.id}" aria-label="Open Case Study for ${project.title}">
            <span>Case Study</span>
          </button>
          
          <div class="card-action-links">
            <a href="${project.github}" target="_blank" rel="noopener" class="os-icon-btn" title="View Source on GitHub" onclick="event.stopPropagation();" aria-label="View source code on GitHub for ${project.title}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            ${hasLiveDemo ? `
              <a href="${project.demo}" target="_blank" rel="noopener" class="os-btn os-btn-sm os-btn-primary" onclick="event.stopPropagation();" aria-label="Open live demo for ${project.title}">
                Live Demo ↗
              </a>
            ` : `
              <a href="${project.github}" target="_blank" rel="noopener" class="os-btn os-btn-sm os-btn-secondary" onclick="event.stopPropagation();" aria-label="View repository for ${project.title}">
                Repository ↗
              </a>
            `}
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        soundFX.playClick();
        this.openProjectInspector(project.id);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          soundFX.playClick();
          this.openProjectInspector(project.id);
        }
      });

      this.gridEl.appendChild(card);
    });
  }

  initFilters() {
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        soundFX.playClick();
        this.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.dataset.filter;
        this.renderCards();
      });
    });
  }

  openProjectInspector(projectId) {
    const project = PROJECTS_DATA.find(p => p.id === projectId) || PROJECTS_DATA[0];
    if (!project || !this.sidePanel) return;

    if (this.sidePanelCategory) this.sidePanelCategory.innerText = project.categoryLabel;
    if (this.sidePanelTitle) this.sidePanelTitle.innerText = project.title;

    const hasLiveDemo = project.demo.startsWith('http') && !project.demo.includes('github.com/Uviii9p/');

    if (this.sidePanelBody) {
      this.sidePanelBody.innerHTML = `
        <!-- Mockup Visual Banner -->
        <div class="side-panel-preview">
          <div class="project-mockup-frame w-full">
            <div class="project-mockup-bar">
              <span class="dot-sm"></span>
              <span class="dot-sm"></span>
              <span class="dot-sm"></span>
              <span class="mockup-url-label">
                https://${project.mockupUrl}
              </span>
            </div>
            <div class="project-mockup-body" style="height: 150px;">
              ${this.renderMockupContent(project.mockupType, project.icon)}
            </div>
          </div>
        </div>

        <div class="side-panel-badges">
          <span class="metric-chip">⚡ ${project.metric}</span>
          <span class="badge-chip ${hasLiveDemo ? 'live' : ''}">
            <span class="pulse-dot" style="width: 5px; height: 5px; background: ${hasLiveDemo ? 'var(--color-green)' : 'var(--color-cyan)'};"></span>
            ${project.badge}
          </span>
        </div>

        <!-- Tagline & Description -->
        <div class="side-panel-section">
          <h4 class="side-section-heading">EXECUTIVE SUMMARY</h4>
          <p class="side-section-text">${project.tagline}</p>
        </div>

        <div class="side-panel-section">
          <h4 class="side-section-heading">SYSTEM ARCHITECTURE</h4>
          <p class="side-section-text">${project.description}</p>
        </div>

        <!-- Highlights -->
        <div class="side-panel-section">
          <h4 class="side-section-heading">ENGINEERING HIGHLIGHTS</h4>
          <ul class="side-highlights-list">
            ${project.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>

        <!-- Tech Stack -->
        <div class="side-panel-section">
          <h4 class="side-section-heading">TECHNOLOGIES & TOOLS</h4>
          <div class="project-tech-tags">
            ${project.tech.map(t => `<span class="tech-tag" style="padding: 4px 10px; font-size: 0.75rem;">${t}</span>`).join('')}
          </div>
        </div>

        <!-- Action Links -->
        <div class="side-panel-actions">
          ${hasLiveDemo ? `
            <a href="${project.demo}" target="_blank" rel="noopener" class="os-btn os-btn-primary w-full" style="text-decoration:none;">
              <span>LAUNCH LIVE APPLICATION ↗</span>
            </a>
          ` : ''}
          <a href="${project.github}" target="_blank" rel="noopener" class="os-btn ${hasLiveDemo ? 'os-btn-secondary' : 'os-btn-primary'} w-full" style="text-decoration:none;">
            <span>VIEW REPOSITORY ON GITHUB ↗</span>
          </a>
        </div>
      `;
    }

    this.sidePanel.classList.add('open');
    this.sidePanel.setAttribute('aria-hidden', 'false');
  }
}
