import * as THREE from 'three';
import { ParticleField } from './ParticleField.js';
import { FloatingObjects } from './FloatingObjects.js';
import { CameraRig } from './CameraRig.js';
import { soundFX } from '../utils/SoundFX.js';

export class SceneManager {
  constructor(canvas, onProjectClick) {
    this.canvas = canvas;
    this.onProjectClick = onProjectClick;
    
    this.isFastMode = false;
    this.clock = new THREE.Clock();
    this.raycaster = new THREE.Raycaster();
    this.mouseVector = new THREE.Vector2();
    this.hoveredObjectId = null;

    // Screen Space 3D Tooltip Element
    this.tooltipEl = document.getElementById('scene-3d-tooltip');

    this.init();
  }

  init() {
    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x08090f, 0.015);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 15);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: window.devicePixelRatio <= 1.5,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;

    // 4. Lighting — warm, subtle, non-neon
    this.setupLights();


    // 5. Scene Objects
    this.particleField = new ParticleField(this.scene);
    this.floatingObjects = new FloatingObjects(this.scene);
    this.cameraRig = new CameraRig(this.camera);

    // 6. Listeners (Mouse, Touch, Resize)
    this.initListeners();

    // 7. Start Render Loop
    this.render = this.render.bind(this);
    requestAnimationFrame(this.render);
  }

  setupLights() {
    const ambientLight = new THREE.AmbientLight(0x1a1e30, 2.0);
    this.scene.add(ambientLight);

    // Soft cool light — upper right
    const pointLight1 = new THREE.PointLight(0x6888b0, 2.0, 60);
    pointLight1.position.set(12, 12, 10);
    this.scene.add(pointLight1);

    // Subtle warm fill — lower left
    const pointLight2 = new THREE.PointLight(0x8070a0, 1.8, 60);
    pointLight2.position.set(-12, -10, 8);
    this.scene.add(pointLight2);

    // Dim back light
    const pointLight3 = new THREE.PointLight(0x605060, 1.2, 45);
    pointLight3.position.set(0, -20, -20);
    this.scene.add(pointLight3);
  }

  initListeners() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // Mouse Navigation
    window.addEventListener('mousemove', (e) => {
      this.mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
      this.handleRaycastHover(e.clientX, e.clientY);
    });

    // Touch Support for Mobile
    let touchStartX = 0;
    let touchStartY = 0;

    window.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        this.mouseVector.x = (touchStartX / window.innerWidth) * 2 - 1;
        this.mouseVector.y = -(touchStartY / window.innerHeight) * 2 + 1;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        this.mouseVector.x = (touchX / window.innerWidth) * 2 - 1;
        this.mouseVector.y = -(touchY / window.innerHeight) * 2 + 1;
        this.cameraRig.handleTouchDelta(touchX - touchStartX, touchY - touchStartY);
        touchStartX = touchX;
        touchStartY = touchY;
      }
    }, { passive: true });

    // Click handler for 3D objects
    window.addEventListener('click', (e) => {
      if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input') || e.target.closest('.os-window') || e.target.closest('.app-launcher')) {
        return;
      }
      this.handleRaycastClick();
    });
  }

  handleRaycastHover(screenX, screenY) {
    if (this.isFastMode) return;
    this.raycaster.setFromCamera(this.mouseVector, this.camera);
    const meshes = this.floatingObjects.getRaycastMeshes();
    const intersects = this.raycaster.intersectObjects(meshes, true);

    if (intersects.length > 0) {
      let targetGroup = intersects[0].object;
      while (targetGroup.parent && !targetGroup.userData.isInteractive && targetGroup !== this.scene) {
        targetGroup = targetGroup.parent;
      }

      if (targetGroup.userData && targetGroup.userData.id) {
        const id = targetGroup.userData.id;
        const name = targetGroup.userData.name;
        
        if (this.hoveredObjectId !== id) {
          this.hoveredObjectId = id;
          this.floatingObjects.setHover(id, true);
          soundFX.playHover();
          document.body.style.cursor = 'pointer';

          if (this.tooltipEl) {
            this.tooltipEl.innerHTML = `<span class="tip-tag">3D ARTIFACT</span> <b>${name}</b> <span class="tip-action">[CLICK TO INSPECT]</span>`;
            this.tooltipEl.style.left = `${screenX + 15}px`;
            this.tooltipEl.style.top = `${screenY - 25}px`;
            this.tooltipEl.classList.add('visible');
          }
        } else if (this.tooltipEl) {
          this.tooltipEl.style.left = `${screenX + 15}px`;
          this.tooltipEl.style.top = `${screenY - 25}px`;
        }
        return;
      }
    }

    if (this.hoveredObjectId) {
      this.floatingObjects.setHover(this.hoveredObjectId, false);
      this.hoveredObjectId = null;
      document.body.style.cursor = 'default';
      if (this.tooltipEl) {
        this.tooltipEl.classList.remove('visible');
      }
    }
  }

  handleRaycastClick() {
    if (this.hoveredObjectId && this.onProjectClick) {
      soundFX.playClick();
      this.onProjectClick(this.hoveredObjectId);
      if (this.tooltipEl) {
        this.tooltipEl.classList.remove('visible');
      }
    }
  }

  setFastMode(enabled) {
    this.isFastMode = enabled;
    this.canvas.style.opacity = enabled ? '0.15' : '1';
  }

  render() {
    requestAnimationFrame(this.render);

    const elapsedTime = this.clock.getElapsedTime();

    if (!this.isFastMode) {
      this.particleField.update(elapsedTime);
      this.floatingObjects.update(elapsedTime);
      this.cameraRig.update();
    }

    this.renderer.render(this.scene, this.camera);
  }
}
