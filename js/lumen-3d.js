/**
 * LUMEN — THE IMPOSSIBLE MUSEUM
 * Core 3D WebGL Engine (Three.js)
 * -------------------------------------------------------------------------
 * Implements procedural non-Euclidean artifacts, luminous stardust,
 * scroll-driven camera choreography, and interactive shader morphs.
 */

(function () {
  'use strict';

  // Global Engine State
  window.LumenEngine = {
    scene: null,
    camera: null,
    renderer: null,
    clock: new THREE.Clock(),
    objects: {},
    particles: null,
    activeExhibitIndex: 0,
    materialMode: 'physical', // 'physical' | 'wireframe' | 'specular'
    params: {
      displacement: 0.35,
      frequency: 2.2,
      roughness: 0.22,
      metalness: 0.18,
      rotationSpeed: 0.003,
      interactiveTilt: { x: 0, y: 0, targetX: 0, targetY: 0 },
      isDragging: false,
      previousMousePosition: { x: 0, y: 0 }
    }
  };

  const state = window.LumenEngine;

  function initThree() {
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) return;

    // 1. Scene
    state.scene = new THREE.Scene();
    state.scene.background = new THREE.Color(0x0A0A0C);
    state.scene.fog = new THREE.FogExp2(0x0A0A0C, 0.045);

    // 2. Camera
    const aspect = window.innerWidth / window.innerHeight;
    state.camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 100);
    state.camera.position.set(0, 0, 7.5);
    state.camera.lookAt(0, 0, 0);

    // 3. High-Craft Renderer
    state.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    state.renderer.setSize(window.innerWidth, window.innerHeight);
    state.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if (THREE.ACESFilmicToneMapping) {
      state.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      state.renderer.toneMappingExposure = 1.15;
    }
    state.renderer.shadowMap.enabled = true;
    state.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 4. Lighting Rig
    setupLighting();

    // 5. Construct 3D Artifacts
    createHeroArtifact();
    createCosmicParticles();
    createExhibitHallObjects();

    // 6. Event Listeners
    setupInteractions();
    window.addEventListener('resize', onWindowResize);

    // 7. Start Render Loop
    render();
  }

  function setupLighting() {
    // Ambient celestial void fill
    const ambientLight = new THREE.AmbientLight(0x111218, 1.2);
    state.scene.add(ambientLight);

    // Warm bone key light
    const keyLight = new THREE.DirectionalLight(0xE8D5B7, 2.4);
    keyLight.position.set(5, 8, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    state.scene.add(keyLight);
    state.objects.keyLight = keyLight;

    // Cool slate fill light
    const fillLight = new THREE.PointLight(0x6C7A89, 2.0, 20);
    fillLight.position.set(-6, -3, -4);
    state.scene.add(fillLight);
    state.objects.fillLight = fillLight;

    // Muted gold dramatic rim light
    const rimLight = new THREE.PointLight(0xC9A96E, 2.8, 18);
    rimLight.position.set(0, -5, 5);
    state.scene.add(rimLight);
    state.objects.rimLight = rimLight;
  }

  /* -------------------------------------------------------------------------
     HERO ARTIFACT: THE SEED OF IMPOSSIBLE GEOMETRY
     A self-modulating super-toroidal knot with procedural displacement.
     ------------------------------------------------------------------------- */
  function createHeroArtifact() {
    const heroGroup = new THREE.Group();
    heroGroup.name = 'HeroArtifactGroup';
    heroGroup.position.set(0, 0, 0);

    // Primary Torus Knot Geometry
    const geometry = new THREE.TorusKnotGeometry(1.65, 0.42, 220, 36, 2, 3);
    
    // Store original positions for procedural wave displacement
    geometry.userData = {
      originalPositions: geometry.attributes.position.clone()
    };

    // Alabaster Bone Physical Material
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xE8D5B7,
      metalness: 0.15,
      roughness: 0.22,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      transmission: 0.15, // Subtle internal scattering
      thickness: 1.0,
      reflectivity: 0.6
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    heroGroup.add(mesh);

    // Delicate Outer Gold Wireframe Cage
    const wireframeGeo = new THREE.TorusKnotGeometry(1.68, 0.43, 80, 16, 2, 3);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xC9A96E,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeo, wireframeMat);
    heroGroup.add(wireframeMesh);

    // Glowing Inner Energy Core
    const coreGeo = new THREE.IcosahedronGeometry(0.7, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xC9A96E,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    heroGroup.add(coreMesh);

    state.scene.add(heroGroup);
    state.objects.heroArtifact = heroGroup;
    state.objects.heroMesh = mesh;
    state.objects.heroWireframe = wireframeMesh;
    state.objects.heroCore = coreMesh;
  }

  /* -------------------------------------------------------------------------
     COSMIC PARTICLES: 1,500 LUMINOUS STARDUST SPECS
     ------------------------------------------------------------------------- */
  function createCosmicParticles() {
    const count = 1400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    const boneColor = new THREE.Color(0xE8D5B7);
    const goldColor = new THREE.Color(0xC9A96E);
    const slateColor = new THREE.Color(0x6C7A89);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Ellipsoidal dispersion around museum void
      const radius = 3.5 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      positions[i3] = radius * Math.cos(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) + (Math.random() - 0.5) * 4;
      positions[i3 + 2] = radius * Math.cos(phi) * Math.sin(theta);

      // Color variation across museum palette
      const r = Math.random();
      const chosenColor = r < 0.5 ? boneColor : (r < 0.8 ? goldColor : slateColor);
      colors[i3] = chosenColor.r;
      colors[i3 + 1] = chosenColor.g;
      colors[i3 + 2] = chosenColor.b;

      scales[i] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Custom Canvas Circular Particle Texture
    const particleTexture = createParticleTexture();

    const material = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particleSystem = new THREE.Points(geometry, material);
    state.scene.add(particleSystem);
    state.particles = particleSystem;
  }

  function createParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(232, 213, 183, 0.7)');
    grad.addColorStop(0.7, 'rgba(201, 169, 110, 0.2)');
    grad.addColorStop(1, 'rgba(10, 10, 12, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  /* -------------------------------------------------------------------------
     EXHIBIT HALL: 4 IMPOSSIBLE 3D FORMS
     Arranged along the horizontal camera path (X: -8 to 10)
     ------------------------------------------------------------------------- */
  function createExhibitHallObjects() {
    state.exhibitObjects = [];

    // Base materials
    const boneMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xE8D5B7,
      metalness: 0.18,
      roughness: 0.25,
      clearcoat: 0.9,
      transmission: 0.2,
      thickness: 1.2
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xC9A96E,
      metalness: 0.85,
      roughness: 0.28
    });

    const slateWireframe = new THREE.MeshBasicMaterial({
      color: 0x6C7A89,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });

    // --- EXHIBIT 01: THE KLEIN TORUS (Continuous Surface) ---
    const kleinGroup = new THREE.Group();
    kleinGroup.name = 'Exhibit_01_KleinTorus';
    kleinGroup.position.set(-8.5, -14, 0); // Positioned in Exhibit Hall act

    const kleinMainGeo = new THREE.TorusGeometry(1.5, 0.5, 32, 100);
    const kleinMainMesh = new THREE.Mesh(kleinMainGeo, boneMaterial.clone());
    kleinGroup.add(kleinMainMesh);

    const kleinRingGeo = new THREE.TorusGeometry(1.5, 0.08, 16, 100);
    const kleinRingMesh = new THREE.Mesh(kleinRingGeo, goldMaterial.clone());
    kleinRingMesh.rotation.x = Math.PI / 2;
    kleinGroup.add(kleinRingMesh);

    state.scene.add(kleinGroup);
    state.exhibitObjects.push(kleinGroup);

    // --- EXHIBIT 02: HYPER-CRYSTALLINE POLYTOPE (Fractured Symmetry) ---
    const crystalGroup = new THREE.Group();
    crystalGroup.name = 'Exhibit_02_Polytope';
    crystalGroup.position.set(-2.8, -14, 0);

    const icosaGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const icosaMesh = new THREE.Mesh(icosaGeo, boneMaterial.clone());
    crystalGroup.add(icosaMesh);

    const outerFacetGeo = new THREE.IcosahedronGeometry(1.9, 0);
    const outerFacetMesh = new THREE.Mesh(outerFacetGeo, slateWireframe.clone());
    crystalGroup.add(outerFacetMesh);

    const innerCoreGeo = new THREE.OctahedronGeometry(0.8, 0);
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, goldMaterial.clone());
    crystalGroup.add(innerCoreMesh);

    state.scene.add(crystalGroup);
    state.exhibitObjects.push(crystalGroup);

    // --- EXHIBIT 03: FERROFLUID MONOLITH (Liquid Geometry) ---
    const fluidGroup = new THREE.Group();
    fluidGroup.name = 'Exhibit_03_Ferrofluid';
    fluidGroup.position.set(3.2, -14, 0);

    // High subdivision sphere for wave displacement
    const fluidGeo = new THREE.SphereGeometry(1.5, 64, 64);
    fluidGeo.userData = { originalPositions: fluidGeo.attributes.position.clone() };
    const fluidMat = new THREE.MeshPhysicalMaterial({
      color: 0x1A1B22,
      metalness: 0.9,
      roughness: 0.12,
      clearcoat: 1.0,
      reflectivity: 0.95
    });
    const fluidMesh = new THREE.Mesh(fluidGeo, fluidMat);
    fluidGroup.add(fluidMesh);

    const cageGeo = new THREE.BoxGeometry(2.6, 2.6, 2.6);
    const cageMesh = new THREE.Mesh(cageGeo, slateWireframe.clone());
    fluidGroup.add(cageMesh);

    state.scene.add(fluidGroup);
    state.exhibitObjects.push(fluidGroup);

    // --- EXHIBIT 04: CHRONO-SPHERICAL DISRUPTION (Fragmented Time) ---
    const chronoGroup = new THREE.Group();
    chronoGroup.name = 'Exhibit_04_Chrono';
    chronoGroup.position.set(9.0, -14, 0);

    // 3 Gyroscopic Rings
    const ring1Geo = new THREE.TorusGeometry(1.7, 0.06, 16, 80);
    const ring1 = new THREE.Mesh(ring1Geo, goldMaterial.clone());
    chronoGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.35, 0.08, 16, 80);
    const ring2 = new THREE.Mesh(ring2Geo, boneMaterial.clone());
    ring2.rotation.x = Math.PI / 3;
    chronoGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(1.0, 0.05, 16, 80);
    const ring3 = new THREE.Mesh(ring3Geo, slateWireframe.clone());
    ring3.rotation.y = Math.PI / 4;
    chronoGroup.add(ring3);

    const chronoCore = new THREE.DodecahedronGeometry(0.5, 0);
    const chronoCoreMesh = new THREE.Mesh(chronoCore, goldMaterial.clone());
    chronoGroup.add(chronoCoreMesh);

    chronoGroup.userData = { ring1, ring2, ring3, chronoCoreMesh };

    state.scene.add(chronoGroup);
    state.exhibitObjects.push(chronoGroup);
  }

  /* -------------------------------------------------------------------------
     INTERACTION HANDLERS & MOUSE INERTIA
     ------------------------------------------------------------------------- */
  function setupInteractions() {
    window.addEventListener('mousemove', (e) => {
      // Normalized coordinates (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;

      state.params.interactiveTilt.targetX = x * 0.35;
      state.params.interactiveTilt.targetY = y * 0.35;
    });

    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) return;

    // Interactive Drag to Warp Object
    window.addEventListener('mousedown', (e) => {
      state.params.isDragging = true;
      state.params.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      state.params.isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!state.params.isDragging) return;

      const deltaX = e.clientX - state.params.previousMousePosition.x;
      const deltaY = e.clientY - state.params.previousMousePosition.y;

      if (state.objects.heroArtifact) {
        state.objects.heroArtifact.rotation.y += deltaX * 0.005;
        state.objects.heroArtifact.rotation.x += deltaY * 0.005;
      }

      state.params.previousMousePosition = { x: e.clientX, y: e.clientY };
    });
  }

  function onWindowResize() {
    if (!state.camera || !state.renderer) return;
    state.camera.aspect = window.innerWidth / window.innerHeight;
    state.camera.updateProjectionMatrix();
    state.renderer.setSize(window.innerWidth, window.innerHeight);
    state.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  /* -------------------------------------------------------------------------
     DISPLACEMENT SHADER SIMULATION
     Deforms vertex positions mathematically to create organic impossible forms
     ------------------------------------------------------------------------- */
  function updateVertexDisplacement(mesh, time, amplitude, frequency) {
    if (!mesh || !mesh.geometry || !mesh.geometry.userData.originalPositions) return;

    const original = mesh.geometry.userData.originalPositions;
    const positions = mesh.geometry.attributes.position;
    const count = positions.count;

    for (let i = 0; i < count; i++) {
      const ox = original.getX(i);
      const oy = original.getY(i);
      const oz = original.getZ(i);

      // Spherical / non-euclidean harmonic displacement
      const wave = Math.sin(ox * frequency + time * 1.5) *
                   Math.cos(oy * frequency + time * 1.2) *
                   Math.sin(oz * frequency + time * 0.8);

      const disp = wave * amplitude;
      positions.setXYZ(i, ox + ox * disp, oy + oy * disp, oz + oz * disp);
    }
    positions.needsUpdate = true;
    mesh.geometry.computeVertexNormals();
  }

  /* -------------------------------------------------------------------------
     MAIN RENDER ANIMATION LOOP (60 FPS)
     ------------------------------------------------------------------------- */
  function render() {
    requestAnimationFrame(render);

    const delta = state.clock.getDelta();
    const elapsedTime = state.clock.getElapsedTime();

    // 1. Mouse Tilt Damping (Spring-like interpolation)
    state.params.interactiveTilt.x += (state.params.interactiveTilt.targetX - state.params.interactiveTilt.x) * 0.05;
    state.params.interactiveTilt.y += (state.params.interactiveTilt.targetY - state.params.interactiveTilt.y) * 0.05;

    // 2. Animate Hero Artifact
    if (state.objects.heroArtifact) {
      if (!state.params.isDragging) {
        state.objects.heroArtifact.rotation.y += state.params.rotationSpeed;
        state.objects.heroArtifact.rotation.x = Math.sin(elapsedTime * 0.3) * 0.15 + state.params.interactiveTilt.y;
        state.objects.heroArtifact.rotation.z = Math.cos(elapsedTime * 0.2) * 0.1 + state.params.interactiveTilt.x;
      }

      // Procedural wave displacement on hero mesh
      if (state.objects.heroMesh) {
        updateVertexDisplacement(
          state.objects.heroMesh,
          elapsedTime,
          state.params.displacement,
          state.params.frequency
        );
      }

      // Pulse inner core
      if (state.objects.heroCore) {
        state.objects.heroCore.rotation.y -= 0.01;
        state.objects.heroCore.rotation.x += 0.008;
        const scale = 1.0 + Math.sin(elapsedTime * 2.0) * 0.08;
        state.objects.heroCore.scale.set(scale, scale, scale);
      }
    }

    // 3. Cosmic Particles Drift
    if (state.particles) {
      state.particles.rotation.y = elapsedTime * 0.015;
      state.particles.rotation.x = Math.sin(elapsedTime * 0.01) * 0.05;
    }

    // 4. Animate Exhibit Hall Sculptures
    if (state.exhibitObjects && state.exhibitObjects.length === 4) {
      // Exhibit 1: Klein Torus
      state.exhibitObjects[0].rotation.x += 0.008;
      state.exhibitObjects[0].rotation.y += 0.005;

      // Exhibit 2: Polytope
      state.exhibitObjects[1].rotation.y += 0.006;
      state.exhibitObjects[1].rotation.z += 0.004;

      // Exhibit 3: Ferrofluid
      state.exhibitObjects[2].rotation.y += 0.004;
      const fluidMesh = state.exhibitObjects[2].children[0];
      if (fluidMesh) {
        updateVertexDisplacement(fluidMesh, elapsedTime * 1.5, 0.28, 3.2);
      }

      // Exhibit 4: Chrono Spherical Gyroscope
      const rings = state.exhibitObjects[3].userData;
      if (rings && rings.ring1) {
        rings.ring1.rotation.x += 0.018;
        rings.ring2.rotation.y += 0.014;
        rings.ring3.rotation.z += 0.022;
        rings.chronoCoreMesh.rotation.y -= 0.01;
      }
    }

    // 5. Render Scene
    state.renderer.render(state.scene, state.camera);
  }

  // Material & Shader parameter API for Studio section
  window.LumenEngine.setMaterialMode = function (mode) {
    state.materialMode = mode;
    const heroMesh = state.objects.heroMesh;
    if (!heroMesh) return;

    if (mode === 'wireframe') {
      heroMesh.material.wireframe = true;
    } else if (mode === 'specular') {
      heroMesh.material.wireframe = false;
      heroMesh.material.metalness = 0.85;
      heroMesh.material.roughness = 0.15;
    } else {
      // Physical Default
      heroMesh.material.wireframe = false;
      heroMesh.material.metalness = 0.15;
      heroMesh.material.roughness = 0.22;
    }
  };

  window.LumenEngine.updateUniforms = function (displacement, frequency, roughness) {
    if (displacement !== undefined) state.params.displacement = displacement;
    if (frequency !== undefined) state.params.frequency = frequency;
    if (roughness !== undefined && state.objects.heroMesh) {
      state.objects.heroMesh.material.roughness = roughness;
    }
  };

  // Auto-init when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThree);
  } else {
    initThree();
  }
})();
