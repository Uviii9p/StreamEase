import { soundFX } from '../utils/SoundFX.js';

export class Terminal {
  constructor(windowManager, onLaunchToy) {
    this.wm = windowManager;
    this.onLaunchToy = onLaunchToy;
    this.historyEl = document.getElementById('terminal-history');
    this.inputEl = document.getElementById('terminal-input');
    this.commandHistory = [];
    this.historyIndex = -1;

    this.init();
  }

  init() {
    if (!this.inputEl) return;

    this.inputEl.addEventListener('keydown', (e) => {
      soundFX.playKeyTick();

      if (e.key === 'Enter') {
        const cmd = this.inputEl.value.trim();
        this.inputEl.value = '';
        if (cmd) {
          this.commandHistory.push(cmd);
          this.historyIndex = this.commandHistory.length;
          this.executeCommand(cmd);
        }
      } else if (e.key === 'ArrowUp') {
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.inputEl.value = this.commandHistory[this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        if (this.historyIndex < this.commandHistory.length - 1) {
          this.historyIndex++;
          this.inputEl.value = this.commandHistory[this.historyIndex];
        } else {
          this.historyIndex = this.commandHistory.length;
          this.inputEl.value = '';
        }
      }
    });

    const termBody = document.getElementById('terminal-content');
    if (termBody) {
      termBody.addEventListener('click', () => this.inputEl.focus());
    }
  }

  printLine(html, type = 'normal') {
    const p = document.createElement('p');
    p.className = `term-line term-${type}`;
    p.innerHTML = html;
    this.historyEl.appendChild(p);
    this.historyEl.scrollTop = this.historyEl.scrollHeight;
  }

  executeCommand(rawCmd) {
    this.printLine(`<span class="term-prompt">sujal@sujal-os:~$</span> ${this.escapeHtml(rawCmd)}`);
    const parts = rawCmd.toLowerCase().split(' ');
    const cmd = parts[0];
    const arg = parts.slice(1).join(' ');

    switch (cmd) {
      case 'help':
        this.printLine(`
Available Sujal OS Commands:
  <b class="text-cyan">about</b>       - View engineer summary & academic background
  <b class="text-cyan">projects</b>    - View live projects (Zombie Attack, Student Life, RAG AI...)
  <b class="text-cyan">skills</b>      - View technical arsenal & tech stack
  <b class="text-cyan">contact</b>     - Display contact channels (Email, LinkedIn, GitHub)
  <b class="text-cyan">neofetch</b>    - Render system architecture telemetry
  <b class="text-cyan">clear</b>       - Clear shell buffer
        `);
        break;

      case 'about':
        this.printLine(`
<b class="text-yellow">SUJAL RATHOD</b> — AI/ML Enthusiast | Full Stack Developer | Creative 3D Engineer
📍 Gandhinagar, Gujarat, India
🎓 Diploma in Computer Engineering @ Silver Oak University (SPI: 8+)
💼 Internships at BISAG (Govt Research) & Info Tech and Solution
        `);
        break;

      case 'projects':
        this.printLine(`
<b class="text-cyan">DEPLOYED LIVE APPLICATIONS:</b>
  1. <b class="text-yellow">Pinterest Clone</b> (Visual Discovery): <a href="https://pintrest-cyan.vercel.app/" target="_blank" class="text-cyan">pintrest-cyan.vercel.app</a>
  2. <b class="text-yellow">Date4U</b> (Modern Matchmaking): <a href="https://date-4-u.vercel.app/login" target="_blank" class="text-cyan">date-4-u.vercel.app/login</a>
  3. <b class="text-yellow">StreamEase</b> (Entertainment Hub): <a href="https://stream-ease-zeta.vercel.app/" target="_blank" class="text-cyan">stream-ease-zeta.vercel.app</a>
  4. <b class="text-yellow">Zombie Attack</b> (3D WebGL Survival): <a href="https://zombie-attack-xi.vercel.app/" target="_blank" class="text-cyan">zombie-attack-xi.vercel.app</a>
  5. <b class="text-yellow">Student Life</b> (Daily Companion): <a href="https://student-life-three.vercel.app/" target="_blank" class="text-cyan">student-life-three.vercel.app</a>
  6. <b class="text-yellow">RAG AI Document Agent</b> (LangChain, FAISS, OpenAI)
        `);
        break;

      case 'skills':
        this.printLine(`
<b class="text-cyan">TECHNICAL ARSENAL:</b>
  - AI/ML: Machine Learning, Deep Learning, NumPy, Pandas, Scikit-learn, LangChain, FAISS
  - Languages: Python, JavaScript, TypeScript, Java, C, C++, SQL
  - Web: React.js, Node.js, Express.js, Tailwind CSS, Vite, Three.js, WebGL
  - Databases: MongoDB, MySQL, Supabase, Firebase
        `);
        break;

      case 'contact':
        this.printLine(`
<b class="text-green">ACTIVE CHANNELS:</b>
  Email:    <a href="mailto:sr3052236@gmail.com" class="text-cyan">sr3052236@gmail.com</a>
  Phone:    <span class="text-yellow">+91 9328375515</span>
  GitHub:   <a href="https://github.com/Uviii9p/" target="_blank" class="text-cyan">github.com/Uviii9p</a>
  LinkedIn: <a href="https://www.linkedin.com/in/sujal-rathod-2881a0305" target="_blank" class="text-cyan">linkedin.com/in/sujal-rathod-2881a0305</a>
        `);
        break;

      case 'neofetch':
        this.printLine(`
<span class="text-cyan">      /\\_/\       </span>  <b class="text-yellow">sujal@sujal-os</b>
<span class="text-cyan">     ( o.o )      </span>  ------------------
<span class="text-cyan">      > ^ <       </span>  <b class="text-cyan">OS:</b> Sujal_OS Spatial 64-bit
<span class="text-cyan">     /|   |\\     </span>  <b class="text-cyan">Host:</b> Silver Oak University
<span class="text-cyan">    (_|   |_)     </span>  <b class="text-cyan">Kernel:</b> ThreeJS-WebGL2-AI/ML
<span class="text-cyan">                  </span>  <b class="text-cyan">Specialization:</b> Full-Stack & Spatial Computing
        `);
        break;

      case 'clear':
        this.historyEl.innerHTML = '';
        break;

      default:
        this.printLine(`Command not found: <b class="text-pink">${this.escapeHtml(cmd)}</b>. Type <b class="text-yellow">help</b>.`, 'error');
        break;
    }
  }

  escapeHtml(str) {
    const div = document.createElement('div');
    div.innerText = str;
    return div.innerHTML;
  }
}
