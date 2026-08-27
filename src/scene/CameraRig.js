import * as THREE from 'three';

export class CameraRig {
  constructor(camera) {
    this.camera = camera;
    this.targetPos = new THREE.Vector3(0, 0, 15);
    this.targetLookAt = new THREE.Vector3(0, 0, 0);
    this.currentLookAt = new THREE.Vector3(0, 0, 0);
    
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.touchOffset = { x: 0, y: 0 };
    this.scrollProgress = 0;

    this.initEvents();
  }

  initEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('scroll', () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      this.scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      this.updateScrollPath();
    }, { passive: true });
  }

  handleTouchDelta(dx, dy) {
    this.touchOffset.x += dx * 0.005;
    this.touchOffset.y += dy * 0.005;
  }

  updateScrollPath() {
    const p = this.scrollProgress;
    
    if (p < 0.20) {
      // 1. Hero Zone (Overview)
      const t = p / 0.20;
      this.targetPos.set(0, 0 - t * 2, 15 - t * 4);
      this.targetLookAt.set(0, 0, 0);
    } else if (p < 0.45) {
      // 2. About / Profile Zone
      const t = (p - 0.20) / 0.25;
      this.targetPos.set(6 * Math.sin(t * Math.PI), -4 - t * 4, 11 - t * 6);
      this.targetLookAt.set(-3, -4, -10);
    } else if (p < 0.70) {
      // 3. Projects Zone
      const t = (p - 0.45) / 0.25;
      this.targetPos.set(
        Math.sin(t * Math.PI * 2) * 7,
        -8 - t * 8,
        5 - t * 14
      );
      this.targetLookAt.set(0, -10 - t * 6, -25);
    } else if (p < 0.88) {
      // 4. Dossier & Arsenal Skills
      const t = (p - 0.70) / 0.18;
      this.targetPos.set(-5 + t * 7, -16 - t * 5, -16 - t * 8);
      this.targetLookAt.set(0, -18, -32);
    } else {
      // 5. Contact Zone
      const t = (p - 0.88) / 0.12;
      this.targetPos.set(0, -20 - t * 3, -24 - t * 6);
      this.targetLookAt.set(0, -22, -40);
    }
  }

  update() {
    // Damp touch offsets back to 0 slowly
    this.touchOffset.x *= 0.94;
    this.touchOffset.y *= 0.94;

    // Mouse & Touch tilt parallax interpolation
    this.mouse.x = THREE.MathUtils.lerp(this.mouse.x, this.mouse.targetX + this.touchOffset.x, 0.06);
    this.mouse.y = THREE.MathUtils.lerp(this.mouse.y, this.mouse.targetY + this.touchOffset.y, 0.06);

    // Smooth position interpolation
    this.camera.position.x = THREE.MathUtils.lerp(
      this.camera.position.x, 
      this.targetPos.x + this.mouse.x * 2.5, 
      0.06
    );
    this.camera.position.y = THREE.MathUtils.lerp(
      this.camera.position.y, 
      this.targetPos.y + this.mouse.y * 2.0, 
      0.06
    );
    this.camera.position.z = THREE.MathUtils.lerp(
      this.camera.position.z, 
      this.targetPos.z, 
      0.06
    );

    // Smooth LookAt interpolation
    this.currentLookAt.lerp(this.targetLookAt, 0.06);
    this.camera.lookAt(this.currentLookAt);
  }
}
