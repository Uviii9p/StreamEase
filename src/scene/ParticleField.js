import * as THREE from 'three';

export class ParticleField {
  constructor(scene) {
    this.scene = scene;
    this.particles = null;
    this.gridHelper = null;
    this.nebulaPoints = null;
    this.init();
  }

  init() {
    this.createCosmicParticles();
    this.createSubtleGrid();
    this.createAmbientNodes();
  }

  createCosmicParticles() {
    const count = 800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Muted, realistic star-field palette
    const color1 = new THREE.Color(0x8090b8); // Soft slate blue
    const color2 = new THREE.Color(0x6878a0); // Muted steel
    const color3 = new THREE.Color(0xa0a8c0); // Light periwinkle

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Spherical distribution
      const radius = 30 + Math.random() * 90;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = radius * Math.cos(phi) - 30;

      // Color — mostly monochrome with subtle hue
      const mixedColor = color1.clone();
      const rand = Math.random();
      if (rand < 0.5) {
        mixedColor.lerp(color2, Math.random() * 0.6);
      } else if (rand < 0.85) {
        mixedColor.lerp(color3, Math.random() * 0.5);
      } else {
        mixedColor.setHex(0xc8c8d0); // Near-white accent
      }

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Soft, round dot texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
    grad.addColorStop(0.25, 'rgba(200, 210, 230, 0.5)');
    grad.addColorStop(0.7, 'rgba(100, 110, 140, 0.1)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 1.0,
      map: texture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  createSubtleGrid() {
    // Very faint depth-reference grid — barely visible
    const size = 120;
    const divisions = 30;
    this.gridHelper = new THREE.GridHelper(size, divisions, 0x1a2040, 0x121830);
    this.gridHelper.position.y = -18;
    this.gridHelper.position.z = -20;
    this.gridHelper.material.opacity = 0.12;
    this.gridHelper.material.transparent = true;
    this.scene.add(this.gridHelper);
  }

  createAmbientNodes() {
    const nodeCount = 12;
    this.nebulaGroup = new THREE.Group();

    const sphereGeo = new THREE.SphereGeometry(0.2, 12, 12);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x4a5580,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });

    for (let i = 0; i < nodeCount; i++) {
      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      mesh.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 60 - 20
      );
      this.nebulaGroup.add(mesh);
    }
    this.scene.add(this.nebulaGroup);
  }

  update(time) {
    if (this.particles) {
      this.particles.rotation.y = time * 0.02;
      this.particles.rotation.x = Math.sin(time * 0.01) * 0.04;
    }

    if (this.gridHelper) {
      this.gridHelper.position.z = -20 + ((time * 1.5) % 3);
    }

    if (this.nebulaGroup) {
      this.nebulaGroup.rotation.y = -time * 0.015;
      this.nebulaGroup.children.forEach((node, i) => {
        node.position.y += Math.sin(time * 1.5 + i) * 0.002;
      });
    }
  }
}
