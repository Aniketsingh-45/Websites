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
    const ambientLight = new THREE.AmbientLight(0xFFF6E8, 1.8);
    this.scene.add(ambientLight);

    // Warm Key Gold Sun Light
    const mainLight = new THREE.DirectionalLight(0xFFE4A0, 3.2);
    mainLight.position.set(6, 10, 6);
    this.scene.add(mainLight);

    // Soft Venetian Rose Rim Light
    const roseLight = new THREE.DirectionalLight(0xFF7597, 2.0);
    roseLight.position.set(-6, -3, 4);
    this.scene.add(roseLight);

    // Dynamic Specular Highlight Light for Gold & Mirror Gleam
    const pointLight = new THREE.PointLight(0xFFD700, 2.6, 15);
    pointLight.position.set(0, 3, 5);
    this.scene.add(pointLight);

    // Cool Backlight for Glass Depth
    const backLight = new THREE.DirectionalLight(0xE0F2FE, 1.5);
    backLight.position.set(0, -6, -6);
    this.scene.add(backLight);
  }

  createCompactModel() {
    this.compactGroup = new THREE.Group();

    // Premium Materials
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xE8B742,
      metalness: 0.95,
      roughness: 0.18,
      envMapIntensity: 1.8
    });

    const deepGoldMat = new THREE.MeshStandardMaterial({
      color: 0xC59324,
      metalness: 0.98,
      roughness: 0.25
    });

    const mirrorMat = new THREE.MeshPhysicalMaterial({
      color: 0xFAFAFA,
      metalness: 0.98,
      roughness: 0.02,
      reflectivity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05
    });

    const powderMat = new THREE.MeshStandardMaterial({
      color: 0xE69688, // Velvet Rose Champagne Highlighter
      roughness: 0.78,
      metalness: 0.22
    });

    const rubyMat = new THREE.MeshPhysicalMaterial({
      color: 0xBE285C,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.65,
      transparent: true,
      ior: 1.7
    });

    // ==========================================
    // 1. BASE PAN ASSEMBLY (Lower Compact)
    // ==========================================
    const basePanGroup = new THREE.Group();

    // Outer 24K Gold Lower Shell
    const baseGeo = new THREE.CylinderGeometry(2.35, 2.2, 0.42, 64);
    const baseMesh = new THREE.Mesh(baseGeo, goldMat);
    basePanGroup.add(baseMesh);

    // Fluted Outer Perimeter Bezel
    const rimGeo = new THREE.TorusGeometry(2.36, 0.10, 24, 64);
    const rimMesh = new THREE.Mesh(rimGeo, deepGoldMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 0.16;
    basePanGroup.add(rimMesh);

    // Inner Recessed Powder Well
    const powderGeo = new THREE.CylinderGeometry(2.08, 2.08, 0.32, 64);
    const powderMesh = new THREE.Mesh(powderGeo, powderMat);
    powderMesh.position.y = 0.10;
    basePanGroup.add(powderMesh);

    // Concentric Luxury Relief Rings on Highlighter Cake
    const outerRingGeo = new THREE.TorusGeometry(1.45, 0.04, 16, 64);
    const outerRing = new THREE.Mesh(outerRingGeo, goldMat);
    outerRing.rotation.x = Math.PI / 2;
    outerRing.position.y = 0.27;
    basePanGroup.add(outerRing);

    const innerRingGeo = new THREE.TorusGeometry(0.85, 0.035, 16, 64);
    const innerRing = new THREE.Mesh(innerRingGeo, goldMat);
    innerRing.rotation.x = Math.PI / 2;
    innerRing.position.y = 0.27;
    basePanGroup.add(innerRing);

    // Central Bella Monogram Star Crest
    const crestGeo = new THREE.OctahedronGeometry(0.35, 0);
    const crestMesh = new THREE.Mesh(crestGeo, goldMat);
    crestMesh.position.y = 0.30;
    crestMesh.scale.set(1, 0.4, 1);
    basePanGroup.add(crestMesh);

    // Front Push-Button Clasp with Ruby Gem
    const claspGeo = new THREE.BoxGeometry(0.35, 0.18, 0.22);
    const claspMesh = new THREE.Mesh(claspGeo, goldMat);
    claspMesh.position.set(0, 0.1, 2.38);
    basePanGroup.add(claspMesh);

    const rubyGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const rubyMesh = new THREE.Mesh(rubyGeo, rubyMat);
    rubyMesh.position.set(0, 0.1, 2.5);
    basePanGroup.add(rubyMesh);

    this.compactGroup.add(basePanGroup);

    // ==========================================
    // 2. OPEN UPPER LID ASSEMBLY (Hinged Back at ~108°)
    // ==========================================
    const lidHingePivot = new THREE.Group();
    lidHingePivot.position.set(0, 0.22, -2.3); // Rear hinge position
    lidHingePivot.rotation.x = -1.88; // Open angle ~108 degrees

    // Rear Gold Hinge Joint
    const hingeJointGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.4, 32);
    const hingeJoint = new THREE.Mesh(hingeJointGeo, deepGoldMat);
    hingeJoint.rotation.z = Math.PI / 2;
    lidHingePivot.add(hingeJoint);

    // Lid Shell Group (offset along hinge radius)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0, 2.3);

    // Upper Gold Lid Outer Casing
    const lidCasingGeo = new THREE.CylinderGeometry(2.35, 2.35, 0.25, 64);
    const lidCasing = new THREE.Mesh(lidCasingGeo, goldMat);
    lidGroup.add(lidCasing);

    // Vanity Mirror Glass on Inner Lid Surface
    const mirrorGeo = new THREE.CylinderGeometry(2.05, 2.05, 0.05, 64);
    const mirrorMesh = new THREE.Mesh(mirrorGeo, mirrorMat);
    mirrorMesh.position.y = -0.11;
    lidGroup.add(mirrorMesh);

    // Mirror Bevel Ring in Deep Gold
    const mirrorRingGeo = new THREE.TorusGeometry(2.06, 0.06, 16, 64);
    const mirrorRing = new THREE.Mesh(mirrorRingGeo, deepGoldMat);
    mirrorRing.rotation.x = Math.PI / 2;
    mirrorRing.position.y = -0.11;
    lidGroup.add(mirrorRing);

    lidHingePivot.add(lidGroup);
    this.compactGroup.add(lidHingePivot);

    // Initial Presentation Orientation
    this.compactGroup.rotation.x = 0.45;
    this.compactGroup.rotation.y = -0.35;
    this.compactGroup.position.y = -0.3;
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
