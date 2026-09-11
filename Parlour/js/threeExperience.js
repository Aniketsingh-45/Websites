/**
 * Bella Beauty Makeup Studio - Interactive 3D Model Showcase
 * Built with Three.js (WebGL)
 * Creates a sculpted luxury cosmetic compact with rose gold & gold PBR materials,
 * dynamic sparkling ambient dust, and mouse-follow tilt mechanics.
 */

class Beauty3DExperience {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.compactGroup = null;
    this.particleSystem = null;
    this.mirrorMesh = null;

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.manualRotation = { x: 0.2, y: -0.4 };

    this.init();
  }

  init() {
    if (typeof THREE === 'undefined') {
      console.warn("Three.js not loaded. Skipping 3D experience.");
      return;
    }

    const width = this.canvas.clientWidth || 400;
    const height = this.canvas.clientHeight || 480;

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 8.5);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    // 4. Lights
    this.setupLights();

    // 5. 3D Model - Luxury Compact & Gemstone
    this.createCompactModel();

    // 6. Sparkling Gold Dust Particles
    this.createSparkleParticles();

    // 7. Event Listeners
    this.bindEvents();

    // 8. Animation Loop
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  setupLights() {
    const ambientLight = new THREE.AmbientLight(0xfff0f5, 1.4);
    this.scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffe8ba, 2.5);
    mainLight.position.set(5, 8, 5);
    this.scene.add(mainLight);

    const roseLight = new THREE.DirectionalLight(0xff6699, 1.8);
    roseLight.position.set(-6, -4, 4);
    this.scene.add(roseLight);

    const pointLight = new THREE.PointLight(0xd4af37, 2.2, 12);
    pointLight.position.set(0, 2, 4);
    this.scene.add(pointLight);
  }

  createCompactModel() {
    this.compactGroup = new THREE.Group();

    // Luxury Rose Gold Compact Base (Cylinder)
    const baseGeo = new THREE.CylinderGeometry(2.3, 2.3, 0.35, 64);
    const roseGoldMat = new THREE.MeshStandardMaterial({
      color: 0xc45d7a,
      metalness: 0.85,
      roughness: 0.22,
      clearcoat: 0.5,
      clearcoatRoughness: 0.1
    });
    const baseMesh = new THREE.Mesh(baseGeo, roseGoldMat);
    baseMesh.rotation.x = Math.PI / 6;
    this.compactGroup.add(baseMesh);

    // Champagne Gold Rim Ring
    const rimGeo = new THREE.TorusGeometry(2.32, 0.08, 16, 64);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xe5c365,
      metalness: 0.95,
      roughness: 0.15
    });
    const rimMesh = new THREE.Mesh(rimGeo, goldMat);
    rimMesh.rotation.x = Math.PI / 2 + Math.PI / 6;
    this.compactGroup.add(rimMesh);

    // Inner Cosmetic Powder / Pressed Shimmer Palette
    const powderGeo = new THREE.CylinderGeometry(2.05, 2.05, 0.38, 64);
    const powderMat = new THREE.MeshStandardMaterial({
      color: 0xe89cb2,
      roughness: 0.85,
      metalness: 0.1
    });
    const powderMesh = new THREE.Mesh(powderGeo, powderMat);
    powderMesh.position.set(0, 0.02, 0);
    powderMesh.rotation.x = Math.PI / 6;
    this.compactGroup.add(powderMesh);

    // Embossed Bella 'B' Monogram Crown Crest in Gold
    const crestGeo = new THREE.RingGeometry(0.7, 0.85, 32);
    const crestMesh = new THREE.Mesh(crestGeo, goldMat);
    crestMesh.position.set(0, 0.22, 0);
    crestMesh.rotation.x = Math.PI / 2 + Math.PI / 6;
    this.compactGroup.add(crestMesh);

    // Faceted Crystal Highlight Gem at center
    const gemGeo = new THREE.OctahedronGeometry(0.55, 1);
    const gemMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.75,
      opacity: 1,
      transparent: true,
      roughness: 0.05,
      ior: 1.55,
      reflectivity: 0.9
    });
    const gemMesh = new THREE.Mesh(gemGeo, gemMat);
    gemMesh.position.set(0, 0.35, 0);
    gemMesh.rotation.x = Math.PI / 6;
    this.compactGroup.add(gemMesh);

    // Tilting group slightly for elegant editorial presentation
    this.compactGroup.rotation.x = 0.4;
    this.compactGroup.rotation.y = -0.3;
    this.scene.add(this.compactGroup);
  }

  createSparkleParticles() {
    const count = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      scales[i] = Math.random() * 0.8 + 0.2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xf5d77f,
      size: 0.12,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    this.particleSystem = new THREE.Points(geometry, particleMat);
    this.scene.add(this.particleSystem);
  }

  bindEvents() {
    window.addEventListener('resize', () => this.onResize());

    // Mouse movement inside canvas container
    const container = this.canvas.parentElement;
    if (container) {
      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        this.mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      });

      container.addEventListener('mouseleave', () => {
        this.mouse.targetX = 0;
        this.mouse.targetY = 0;
      });

      // Drag to rotate
      container.addEventListener('mousedown', (e) => {
        this.isDragging = true;
        this.previousMousePosition = { x: e.clientX, y: e.clientY };
      });

      window.addEventListener('mousemove', (e) => {
        if (!this.isDragging) return;
        const deltaX = e.clientX - this.previousMousePosition.x;
        const deltaY = e.clientY - this.previousMousePosition.y;

        this.manualRotation.y += deltaX * 0.008;
        this.manualRotation.x += deltaY * 0.008;

        this.previousMousePosition = { x: e.clientX, y: e.clientY };
      });

      window.addEventListener('mouseup', () => {
        this.isDragging = false;
      });

      // Touch interactions
      container.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
          const touch = e.touches[0];
          const rect = container.getBoundingClientRect();
          this.mouse.targetX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
          this.mouse.targetY = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        }
      }, { passive: true });
    }
  }

  onResize() {
    if (!this.canvas || !this.renderer || !this.camera) return;
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    requestAnimationFrame(this.animate);

    // Smooth inertia for mouse tilt
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    if (this.compactGroup) {
      // Gentle auto idle floating + mouse interaction + manual rotation
      const time = Date.now() * 0.0012;
      this.compactGroup.position.y = Math.sin(time) * 0.15;
      
      this.compactGroup.rotation.y = this.manualRotation.y + this.mouse.x * 0.5 + Math.sin(time * 0.5) * 0.05;
      this.compactGroup.rotation.x = this.manualRotation.x - this.mouse.y * 0.4 + Math.cos(time * 0.6) * 0.05;
    }

    if (this.particleSystem) {
      this.particleSystem.rotation.y += 0.001;
      this.particleSystem.rotation.x += 0.0005;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// Global initialization helper
window.initThreeExperience = function() {
  if (document.getElementById('threejs-canvas')) {
    new Beauty3DExperience('threejs-canvas');
  }
};
