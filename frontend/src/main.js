import Hls from 'hls.js';

// State Management
const state = {
    allChannels: [],
    categories: [],
    currentCategory: 'All',
    searchQuery: '',
    hls: null,
    uiCache: new Map() // Memory cache for fast GUI switching
};

// Optimization: Pre-cached DOM elements
const dom = {
    sidebarCats: document.getElementById('sidebar-categories'),
    mainGrid: document.getElementById('content-grid'),
    search: document.getElementById('main-search'),
    player: document.getElementById('player-root'),
    video: document.getElementById('player-video'),
    closeBtn: document.getElementById('close-player'),
    playingName: document.getElementById('playing-name'),
    playingGroup: document.getElementById('playing-group'),
    heroPlay: document.getElementById('hero-play'),
    pipBtn: document.getElementById('pip-button')
};

async function init() {
    console.log("⚡ GUI Bootstrap sequence initiated...");

    // 1. Setup UI Listeners
    setupInteractions();

    // 2. Load and Render
    renderSkeletons();
    await burstLoad();

    renderSidebar();
    renderMain();
}

/**
 * Rapid data loading
 */
async function burstLoad() {
    try {
        const [cRes, catRes] = await Promise.all([
            fetch('/api/channels'),
            fetch('/api/categories')
        ]);
        state.allChannels = await cRes.json();
        state.categories = await catRes.json();
    } catch (e) {
        console.error("Critical: Backend connection failed", e);
    }
}

/**
 * Optimized Skeleton rendering
 */
function renderSkeletons() {
    dom.mainGrid.innerHTML = `
        <div class="section-header">
            <div class="skeleton" style="height:24px; width:200px; border-radius:4px"></div>
        </div>
        <div class="grid">
            ${Array(12).fill('<div class="card skeleton"></div>').join('')}
        </div>
    `;
}

/**
 * Sidebar Generation
 */
function renderSidebar() {
    const list = state.categories.slice(0, 20); // Limit sidebar for speed
    dom.sidebarCats.innerHTML = list.map(cat => `
        <a href="#" class="nav-item sidebar-cat" data-cat="${cat}">
            <div style="width:8px; height:8px; border-radius:50%; background:var(--glass-border);"></div>
            <span>${cat}</span>
        </a>
    `).join('');

    document.querySelectorAll('.sidebar-cat').forEach(el => {
        el.onclick = (e) => {
            e.preventDefault();
            switchCategory(el.dataset.cat, el);
        };
    });
}

/**
 * Optimized UI Switcher
 */
function switchCategory(cat, el) {
    state.currentCategory = cat;
    document.querySelectorAll('.nav-item').forEach(x => x.classList.remove('active'));
    if (el) el.classList.add('active');

    // Close sidebar on mobile after selection
    const sidebar = document.querySelector('aside');
    if (window.innerWidth <= 1024) {
        sidebar.classList.remove('open');
    }

    renderMain();
}

/**
 * High Performance Grid Rendering
 */
function renderMain() {
    // 1. Fast Filtering
    let list = state.allChannels;

    if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        list = list.filter(c => c.name.toLowerCase().includes(q) || c.group.toLowerCase().includes(q));
    } else if (state.currentCategory !== 'All') {
        const cat = state.currentCategory.toLowerCase();
        list = list.filter(c => c.group.toLowerCase().includes(cat));
    }

    // 2. Fragment Construction
    dom.mainGrid.innerHTML = '';
    const wrapper = document.createDocumentFragment();

    if (state.searchQuery) {
        createSection(`Search results for "${state.searchQuery}"`, list, wrapper);
    } else if (state.currentCategory !== 'All') {
        createSection(`${state.currentCategory} Collection`, list, wrapper);
    } else {
        // Multi-section dashboard
        createSection('Trending Channels', list.slice(0, 12), wrapper);

        const news = list.filter(c => c.group.toLowerCase().includes('news')).slice(0, 12);
        if (news.length) createSection('Live News', news, wrapper);

        const sports = list.filter(c => c.group.toLowerCase().includes('sports')).slice(0, 12);
        if (sports.length) createSection('Sports Action', sports, wrapper);

        const music = list.filter(c => c.group.toLowerCase().includes('music')).slice(0, 12);
        if (music.length) createSection('Pure Music', music, wrapper);
    }

    dom.mainGrid.appendChild(wrapper);
}

function createSection(title, channels, targetFragment) {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="section-header">
            <h2 class="section-title">${title}</h2>
        </div>
        <div class="grid"></div>
    `;

    const grid = container.querySelector('.grid');
    channels.forEach(chan => {
        const card = document.createElement('div');
        card.className = 'card';
        const logo = chan.logo || `https://placehold.co/400x225/111/fff?text=${encodeURIComponent(chan.name)}`;

        card.innerHTML = `
            <div class="card-blur" style="background-image: url('${logo}')"></div>
            <img src="${logo}" class="card-logo" loading="lazy" onerror="this.src='https://placehold.co/400x225/111/fff?text=${encodeURIComponent(chan.name)}'">
            <div class="card-info">
                <p class="card-name">${chan.name}</p>
                <p class="card-tag">${chan.group.split(';')[0]}</p>
            </div>
        `;
        card.onclick = () => launchStream(chan);
        grid.appendChild(card);
    });

    targetFragment.appendChild(container);
}

/**
 * Immersive Player Launch
 */
function launchStream(chan) {
    dom.playingName.innerText = chan.name;
    dom.playingGroup.innerText = chan.group.split(';')[0];
    dom.player.classList.add('visible');

    // Auto-hide UI on mobile after 2s
    setTimeout(() => dom.player.classList.add('hide-ui'), 2000);

    if (Hls.isSupported()) {
        if (state.hls) state.hls.destroy();
        state.hls = new Hls({
            capLevelToPlayerSize: true, // Auto quality selection for speed
            maxBufferLength: 30, // Optimized for lower latency
            startLevel: -1
        });
        state.hls.loadSource(chan.url);
        state.hls.attachMedia(dom.video);
        state.hls.on(Hls.Events.MANIFEST_PARSED, () => dom.video.play());
    } else if (dom.video.canPlayType('application/vnd.apple.mpegurl')) {
        dom.video.src = chan.url;
        dom.video.play();
    }
}

/**
 * Global Event Listeners
 */
function setupInteractions() {
    // Search
    dom.search.oninput = (e) => {
        state.searchQuery = e.target.value;
        renderMain();
    };

    // UI Controls
    dom.closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log("Closing player...");
        dom.player.classList.remove('visible');
        dom.player.classList.remove('hide-ui');
        dom.video.pause();
        dom.video.src = "";
        if (state.hls) {
            state.hls.stopLoad();
            state.hls.destroy();
            state.hls = null;
        }
    });

    dom.heroPlay.onclick = () => {
        const trending = state.allChannels[0];
        if (trending) launchStream(trending);
    };

    // Picture in Picture
    if (dom.pipBtn) {
        dom.pipBtn.onclick = async (e) => {
            e.stopPropagation();
            try {
                if (document.pictureInPictureElement) {
                    await document.exitPictureInPicture();
                } else if (document.pictureInPictureEnabled) {
                    await dom.video.requestPictureInPicture();
                }
            } catch (err) {
                console.error("PiP failed", err);
            }
        };
    }

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.querySelector('aside');
    if (menuBtn) {
        menuBtn.onclick = (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('open');
        };
    }

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024 && sidebar.classList.contains('open') && !sidebar.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });

    // Mobile Search Trigger
    const mobileSearch = document.getElementById('mobile-search-trigger');
    if (mobileSearch) {
        mobileSearch.onclick = (e) => {
            e.preventDefault();
            dom.search.focus();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    }

    // Auto-hide/Wake UI logic
    let uiTimeout;
    const showControls = () => {
        dom.player.classList.remove('hide-ui');
        clearTimeout(uiTimeout);
        uiTimeout = setTimeout(() => {
            if (dom.player.classList.contains('visible')) {
                dom.player.classList.add('hide-ui');
            }
        }, 3000);
    };

    dom.player.addEventListener('mousemove', showControls);
    dom.player.addEventListener('touchstart', showControls);
    dom.player.addEventListener('click', showControls);
}

function showGestureOsd(text) {
    const osd = document.createElement('div');
    osd.style = "position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); background:rgba(0,0,0,0.6); color:white; padding:10px 20px; border-radius:50px; font-weight:bold; z-index:5000; pointer-events:none; animation: fadeIn 0.3s forwards;";
    osd.innerText = text;
    dom.player.appendChild(osd);
    setTimeout(() => osd.remove(), 600);
}

init();
