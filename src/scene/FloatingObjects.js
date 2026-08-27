import * as THREE from 'three';

export class FloatingObjects {
  constructor(scene) {
    this.scene = scene;
    this.objects = [];
    this.hoveredObject = null;
    this.init();
  }

  init() {
    // 1. Pinterest Visual Discovery — warm coral / crimson planet
    const pinterest = this.createProjectObject({
      id: 'pinterest-clone',
      name: 'Pinterest: Visual Discovery & Boards',
      color: 0xd44b58,
      glowColor: 0xb83845,
      position: new THREE.Vector3(-12, 4, -15),
      geometryType: 'gyroscopicTorus'
    });

    // 2. Date4U Social Platform — rose pink planet
    const date4u = this.createProjectObject({
      id: 'date4u',
      name: 'Date4U: Modern Match & Social Hub',
      color: 0xc75a82,
      glowColor: 0xa84268,
      position: new THREE.Vector3(12, 1, -22),
      geometryType: 'torusKnot'
    });

    // 3. StreamEase Media Hub — cyan / ocean planet
    const streamease = this.createProjectObject({
      id: 'streamease',
      name: 'StreamEase: Movie & Series Hub',
      color: 0x4aa4be,
      glowColor: 0x388a9e,
      position: new THREE.Vector3(-10, -5, -30),
      geometryType: 'dodecahedron'
    });

    // 4. Zombie Attack WebGL — crimson core planet
    const zombieAttack = this.createProjectObject({
      id: 'zombie-attack',
      name: 'Zombie Attack: 3D Survival WebGL',
      color: 0x9e4050,
      glowColor: 0x7a3040,
      position: new THREE.Vector3(11, -12, -38),
      geometryType: 'skullCore'
    });

    // 5. Student Life — teal companion planet
    const studentLife = this.createProjectObject({
      id: 'student-life',
      name: 'Student Life Companion',
      color: 0x4a8ea0,
      glowColor: 0x3a7888,
      position: new THREE.Vector3(0, -18, -45),
      geometryType: 'octahedron'
    });

    // 6. RAG AI Chatbot — deep violet intelligence planet
    const ragAi = this.createProjectObject({
      id: 'rag-ai-chatbot',
      name: 'RAG Enterprise AI Document Agent',
      color: 0x7068e0,
      glowColor: 0x5850c0,
      position: new THREE.Vector3(-11, -24, -52),
      geometryType: 'octahedron'
    });

    this.objects.push(pinterest, date4u, streamease, zombieAttack, studentLife, ragAi);
  }

  createProjectObject({ id, name, color, glowColor, position, geometryType }) {
    const group = new THREE.Group();
    group.position.copy(position);
    group.userData = {
      id,
      name,
      baseScale: 1,
      targetScale: 1,
      initialY: position.y,
      isInteractive: true
    };

    let mainMesh, wireMesh, ringMesh;

    switch (geometryType) {
      case 'skullCore': {
        const coreGeo = new THREE.IcosahedronGeometry(2.2, 1);
        const coreMat = new THREE.MeshStandardMaterial({
          color: color,
          roughness: 0.4,
          metalness: 0.6,
          emissive: color,
          emissiveIntensity: 0.12
        });
        mainMesh = new THREE.Mesh(coreGeo, coreMat);

        const wireGeo = new THREE.IcosahedronGeometry(2.6, 1);
        const wireMat = new THREE.MeshBasicMaterial({
          color: glowColor,
          wireframe: true,
          transparent: true,
          opacity: 0.2
        });
        wireMesh = new THREE.Mesh(wireGeo, wireMat);

        const ringGeo = new THREE.RingGeometry(3.2, 3.3, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: glowColor,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.15
        });
        ringMesh = new THREE.Mesh(ringGeo, ringMat);
        break;
      }

      case 'octahedron': {
        const coreGeo = new THREE.OctahedronGeometry(2.2, 0);
        const coreMat = new THREE.MeshStandardMaterial({
          color: color,
          roughness: 0.3,
          metalness: 0.7,
          emissive: color,
          emissiveIntensity: 0.15
        });
        mainMesh = new THREE.Mesh(coreGeo, coreMat);

        const wireGeo = new THREE.OctahedronGeometry(2.7, 0);
        const wireMat = new THREE.MeshBasicMaterial({
          color: 0x889ab0,
          wireframe: true,
          transparent: true,
          opacity: 0.15
        });
        wireMesh = new THREE.Mesh(wireGeo, wireMat);

        const ringGeo = new THREE.TorusGeometry(3.2, 0.06, 16, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          color: glowColor,
          transparent: true,
          opacity: 0.2
        });
        ringMesh = new THREE.Mesh(ringGeo, ringMat);
        break;
      }

      case 'gyroscopicTorus': {
        const coreGeo = new THREE.TorusGeometry(2.2, 0.6, 16, 50);
        const coreMat = new THREE.MeshStandardMaterial({
          color: color,
          roughness: 0.45,
          metalness: 0.6,
          emissive: color,
          emissiveIntensity: 0.1
        });
        mainMesh = new THREE.Mesh(coreGeo, coreMat);

        const wireGeo = new THREE.SphereGeometry(1.2, 16, 16);
        const wireMat = new THREE.MeshBasicMaterial({
          color: 0x889ab0,
          wireframe: true,
          transparent: true,
          opacity: 0.12
        });
        wireMesh = new THREE.Mesh(wireGeo, wireMat);

        const ringGeo = new THREE.TorusGeometry(3.5, 0.04, 16, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          color: glowColor,
          transparent: true,
          opacity: 0.15
        });
        ringMesh = new THREE.Mesh(ringGeo, ringMat);
        break;
      }

      case 'torusKnot': {
        const coreGeo = new THREE.TorusKnotGeometry(1.8, 0.45, 100, 16);
        const coreMat = new THREE.MeshStandardMaterial({
          color: color,
          roughness: 0.35,
          metalness: 0.7,
          emissive: color,
          emissiveIntensity: 0.12
        });
        mainMesh = new THREE.Mesh(coreGeo, coreMat);

        const wireGeo = new THREE.TorusKnotGeometry(2.1, 0.2, 64, 8);
        const wireMat = new THREE.MeshBasicMaterial({
          color: 0x889ab0,
          wireframe: true,
          transparent: true,
          opacity: 0.1
        });
        wireMesh = new THREE.Mesh(wireGeo, wireMat);

        const ringGeo = new THREE.RingGeometry(3.0, 3.1, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: glowColor,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.12
        });
        ringMesh = new THREE.Mesh(ringGeo, ringMat);
        break;
      }

      case 'dodecahedron':
      default: {
        const coreGeo = new THREE.DodecahedronGeometry(2.2, 0);
        const coreMat = new THREE.MeshStandardMaterial({
          color: color,
          roughness: 0.35,
          metalness: 0.65,
          emissive: color,
          emissiveIntensity: 0.12
        });
        mainMesh = new THREE.Mesh(coreGeo, coreMat);

        const wireGeo = new THREE.DodecahedronGeometry(2.7, 0);
        const wireMat = new THREE.MeshBasicMaterial({
          color: 0x889ab0,
          wireframe: true,
          transparent: true,
          opacity: 0.12
        });
        wireMesh = new THREE.Mesh(wireGeo, wireMat);

        const ringGeo = new THREE.TorusGeometry(3.3, 0.05, 16, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          color: glowColor,
          transparent: true,
          opacity: 0.15
        });
        ringMesh = new THREE.Mesh(ringGeo, ringMat);
        break;
      }
    }

    group.add(mainMesh);
    if (wireMesh) group.add(wireMesh);
    if (ringMesh) group.add(ringMesh);

    group.mainMesh = mainMesh;
    group.wireMesh = wireMesh;
    group.ringMesh = ringMesh;

    this.scene.add(group);
    return group;
  }

  update(time) {
    this.objects.forEach((obj, idx) => {
      // Gentle floating levitation — slower
      obj.position.y = obj.userData.initialY + Math.sin(time * 0.8 + idx) * 0.3;
      
      // Slower, calmer rotations
      if (obj.mainMesh) {
        obj.mainMesh.rotation.x = time * 0.15 + idx;
        obj.mainMesh.rotation.y = time * 0.2;
      }
      if (obj.wireMesh) {
        obj.wireMesh.rotation.y = -time * 0.12;
        obj.wireMesh.rotation.z = time * 0.08;
      }
      if (obj.ringMesh) {
        obj.ringMesh.rotation.x = Math.PI / 2 + Math.sin(time * 0.6 + idx) * 0.15;
        obj.ringMesh.rotation.z = time * 0.25;
      }

      // Smooth Scale Lerp on Hover
      const currentScale = obj.scale.x;
      const targetScale = obj.userData.targetScale;
      const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.08);
      obj.scale.set(newScale, newScale, newScale);
    });
  }

  setHover(objId, isHovered) {
    const obj = this.objects.find(o => o.userData.id === objId);
    if (obj) {
      obj.userData.targetScale = isHovered ? 1.15 : 1.0;
      if (obj.mainMesh && obj.mainMesh.material) {
        obj.mainMesh.material.emissiveIntensity = isHovered ? 0.35 : 0.12;
      }
    }
  }

  getRaycastMeshes() {
    const meshes = [];
    this.objects.forEach(obj => {
      if (obj.mainMesh) meshes.push(obj.mainMesh);
      if (obj.wireMesh) meshes.push(obj.wireMesh);
    });
    return meshes;
  }
}
