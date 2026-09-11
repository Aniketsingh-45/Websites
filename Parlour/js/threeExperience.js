/**
 * Bella Beauty Makeup Studio - Haute Bridal Vanity Ensemble 3D Experience
 * Built with Three.js (WebGL)
 * 
 * Features:
 * - High-end Salon Vanity Composition: 24K Gold Mirrored Compact, Parisian Couture Lipstick,
 *   Sculpted Kabuki Blush Brush, Floating Rose Quartz Gemstones & Golden Ambient Stardust.
 * - Interactive Salon Shade Palette Switcher (Ruby, Champagne, Rose, Plum, Coral).
 * - Multi-Angle Camera Focus (Vanity Set, Compact, Lipstick, Brush).
 * - Kinetic Mouse/Touch Parallax, Specular Highlight Tracking & Auto-Orbit Runway Mode.
 */

class Beauty3DExperience {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;

    // Master Display Groups
    this.vanityGroup = null;
    this.compactGroup = null;
    this.lipstickGroup = null;
    this.brushGroup = null;
    this.crystalsGroup = null;
    this.particleSystem = null;

    // Lights
    this.specularPointLight = null;

    // Materials that respond to interactive shade switching
    this.lipstickMat = null;
    this.powderMat = null;

    // Interactive State
    this.isAutoOrbit = true;
    this.currentShadeKey = "ruby";
    this.currentViewKey = "all";

    // Mouse & Touch interaction
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.manualRotation = { x: 0.22, y: -0.32 };
    this.velocity = { x: 0, y: 0 };

    // Camera Navigation Lerp
    this.cameraCurrentPos = new THREE.Vector3(0, 0.1, 8.4);
    this.cameraTargetPos = new THREE.Vector3(0, 0.1, 8.4);
    this.cameraCurrentLookAt = new THREE.Vector3(0, 0, 0);
    this.cameraTargetLookAt = new THREE.Vector3(0, 0, 0);

    // Salon Signature Shades Database
    this.SHADES = {
      ruby: {
        name: "Royal Bridal Ruby",
        lipstick: 0xB82255,
        powder: 0xE8739E,
        glow: 0xFF4D88,
        hex: "#B82255"
      },
      champagne: {
        name: "24K Liquid Gold",
        lipstick: 0xD4A838,
        powder: 0xFAD97B,
        glow: 0xF5D272,
        hex: "#DFB74C"
      },
      rose: {
        name: "Rose Quartz Blush",
        lipstick: 0xE85285,
        powder: 0xF7A8C4,
        glow: 0xFFAEC9,
        hex: "#E85285"
      },
      plum: {
        name: "Midnight Velvet Plum",
        lipstick: 0x6E1A47,
        powder: 0xA24874,
        glow: 0xB8326D,
        hex: "#6E1A47"
      },
      coral: {
        name: "Parisian Sunset Coral",
        lipstick: 0xC95B42,
        powder: 0xECA48D,
        glow: 0xFA8062,
        hex: "#C95B42"
      }
    };

    // Camera View Positions
    this.VIEWS = {
      all: { pos: new THREE.Vector3(0, 0.1, 8.4), look: new THREE.Vector3(0, 0, 0) },
      compact: { pos: new THREE.Vector3(-0.95, 0.1, 5.6), look: new THREE.Vector3(-0.95, -0.35, 0.35) },
      lipstick: { pos: new THREE.Vector3(1.45, 0.25, 5.0), look: new THREE.Vector3(1.45, -0.2, 0.25) },
      brush: { pos: new THREE.Vector3(-1.8, 0.2, 5.2), look: new THREE.Vector3(-1.8, -0.2, -0.25) }
    };

    this.init();
  }

  init() {
    if (typeof THREE === "undefined") {
      console.warn("Three.js library is not loaded. 3D Vanity cannot initialize.");
      return;
    }

    const width = this.canvas.clientWidth || 400;
    const height = this.canvas.clientHeight || 490;

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    this.camera.position.copy(this.cameraCurrentPos);

    // 3. High-Quality WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;

    // 4. Lighting Studio
    this.setupStudioLighting();

    // 5. Build Haute Vanity Ensemble
    this.buildVanityEnsemble();

    // 6. Floating Crystal Gemstones & Golden Dust
    this.buildFloatingCrystals();
    this.buildAmbientStardust();

    // 7. Bind Interactive Events
    this.bindDOMControls();
    this.bindInteractionEvents();

    // 8. Start Animation Loop
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  setupStudioLighting() {
    // Soft Ambient Studio Light
    const ambientLight = new THREE.AmbientLight(0xFFF7EC, 1.9);
    this.scene.add(ambientLight);

    // Key Sun Light (Warm 24K Gold Glint)
    const keyGoldLight = new THREE.DirectionalLight(0xFFE8A8, 3.4);
    keyGoldLight.position.set(6, 9, 6);
    this.scene.add(keyGoldLight);

    // Soft Venetian Rose Contour Rim Light
    const roseRimLight = new THREE.DirectionalLight(0xFF7597, 2.2);
    roseRimLight.position.set(-6, -2, 5);
    this.scene.add(roseRimLight);

    // Interactive Specular Flare Light (follows mouse cursor for realistic metallic sheen)
    this.specularPointLight = new THREE.PointLight(0xFFD700, 2.8, 14);
    this.specularPointLight.position.set(0, 3, 5);
    this.scene.add(this.specularPointLight);

    // Subtle Cool Fill Light for Glass and Metallic Reflections
    const coolBackLight = new THREE.DirectionalLight(0xE0F2FE, 1.4);
    coolBackLight.position.set(0, -6, -6);
    this.scene.add(coolBackLight);
  }

  buildVanityEnsemble() {
    this.vanityGroup = new THREE.Group();

    // Common Luxury Master Materials
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xE8B742,
      metalness: 0.96,
      roughness: 0.17,
      envMapIntensity: 1.8
    });

    const deepGoldMat = new THREE.MeshStandardMaterial({
      color: 0xC59324,
      metalness: 0.98,
      roughness: 0.25
    });

    const roseGoldMat = new THREE.MeshStandardMaterial({
      color: 0xD9778E,
      metalness: 0.92,
      roughness: 0.2
    });

    const mirrorMat = new THREE.MeshPhysicalMaterial({
      color: 0xFAFAFA,
      metalness: 0.98,
      roughness: 0.02,
      reflectivity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04
    });

    const rubyGemMat = new THREE.MeshPhysicalMaterial({
      color: 0xBE285C,
      roughness: 0.12,
      metalness: 0.1,
      transmission: 0.65,
      transparent: true,
      ior: 1.7
    });

    // Dynamic Pigment Materials
    const initialShade = this.SHADES[this.currentShadeKey];
    this.powderMat = new THREE.MeshStandardMaterial({
      color: initialShade.powder,
      roughness: 0.74,
      metalness: 0.25
    });

    this.lipstickMat = new THREE.MeshStandardMaterial({
      color: initialShade.lipstick,
      roughness: 0.52,
      metalness: 0.18
    });

    // =========================================================================
    // ITEM 1: THE 24K ROYAL MIRRORED COMPACT
    // =========================================================================
    this.compactGroup = new THREE.Group();
    this.compactGroup.position.set(-0.95, -0.42, 0.35);

    // Lower Pan Base
    const baseGeo = new THREE.CylinderGeometry(1.68, 1.56, 0.32, 48);
    const baseMesh = new THREE.Mesh(baseGeo, goldMat);
    this.compactGroup.add(baseMesh);

    // Outer Fluted Bezel
    const rimGeo = new THREE.TorusGeometry(1.69, 0.08, 16, 48);
    const rimMesh = new THREE.Mesh(rimGeo, deepGoldMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 0.12;
    this.compactGroup.add(rimMesh);

    // Inner Recessed Highlighter Cake
    const powderGeo = new THREE.CylinderGeometry(1.48, 1.48, 0.24, 48);
    const powderMesh = new THREE.Mesh(powderGeo, this.powderMat);
    powderMesh.position.y = 0.08;
    this.compactGroup.add(powderMesh);

    // Concentric Guilloche Rings
    const ring1Geo = new THREE.TorusGeometry(1.05, 0.03, 16, 48);
    const ring1 = new THREE.Mesh(ring1Geo, goldMat);
    ring1.rotation.x = Math.PI / 2;
    ring1.position.y = 0.21;
    this.compactGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(0.58, 0.025, 16, 48);
    const ring2 = new THREE.Mesh(ring2Geo, goldMat);
    ring2.rotation.x = Math.PI / 2;
    ring2.position.y = 0.21;
    this.compactGroup.add(ring2);

    // Embossed Star Crest in Center
    const crestGeo = new THREE.OctahedronGeometry(0.24, 0);
    const crestMesh = new THREE.Mesh(crestGeo, goldMat);
    crestMesh.position.y = 0.24;
    crestMesh.scale.set(1, 0.35, 1);
    this.compactGroup.add(crestMesh);

    // Front Gold Clasp + Ruby Gemstone
    const claspGeo = new THREE.BoxGeometry(0.26, 0.14, 0.18);
    const claspMesh = new THREE.Mesh(claspGeo, goldMat);
    claspMesh.position.set(0, 0.08, 1.72);
    this.compactGroup.add(claspMesh);

    const rubyGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const rubyMesh = new THREE.Mesh(rubyGeo, rubyGemMat);
    rubyMesh.position.set(0, 0.08, 1.82);
    this.compactGroup.add(rubyMesh);

    // Hinged Lid with Vanity Mirror
    const lidHingePivot = new THREE.Group();
    lidHingePivot.position.set(0, 0.16, -1.65);
    lidHingePivot.rotation.x = -1.86; // ~107 degrees tilt

    // Rear Hinge Cylinder
    const hingeGeo = new THREE.CylinderGeometry(0.09, 0.09, 1.1, 24);
    const hingeMesh = new THREE.Mesh(hingeGeo, deepGoldMat);
    hingeMesh.rotation.z = Math.PI / 2;
    lidHingePivot.add(hingeMesh);

    // Lid Casing
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0, 1.65);

    const lidCasingGeo = new THREE.CylinderGeometry(1.68, 1.68, 0.18, 48);
    const lidCasing = new THREE.Mesh(lidCasingGeo, goldMat);
    lidGroup.add(lidCasing);

    // Mirror Glass
    const mirrorGeo = new THREE.CylinderGeometry(1.46, 1.46, 0.04, 48);
    const mirrorMesh = new THREE.Mesh(mirrorGeo, mirrorMat);
    mirrorMesh.position.y = -0.08;
    lidGroup.add(mirrorMesh);

    // Mirror Gold Bezel Ring
    const mirrorRingGeo = new THREE.TorusGeometry(1.47, 0.04, 16, 48);
    const mirrorRing = new THREE.Mesh(mirrorRingGeo, deepGoldMat);
    mirrorRing.rotation.x = Math.PI / 2;
    mirrorRing.position.y = -0.08;
    lidGroup.add(mirrorRing);

    lidHingePivot.add(lidGroup);
    this.compactGroup.add(lidHingePivot);

    this.vanityGroup.add(this.compactGroup);

    // =========================================================================
    // ITEM 2: HAUTE COUTURE FRENCH BRIDAL LIPSTICK
    // =========================================================================
    this.lipstickGroup = new THREE.Group();
    this.lipstickGroup.position.set(1.45, -0.62, 0.28);
    this.lipstickGroup.rotation.set(0.12, -0.28, -0.08);

    // 8-Sided Faceted Rose Gold Outer Case
    const caseGeo = new THREE.CylinderGeometry(0.48, 0.48, 1.85, 8);
    const caseMesh = new THREE.Mesh(caseGeo, roseGoldMat);
    this.lipstickGroup.add(caseMesh);

    // 24K Gold Band with Embellishment
    const bandGeo = new THREE.CylinderGeometry(0.49, 0.49, 0.22, 16);
    const bandMesh = new THREE.Mesh(bandGeo, goldMat);
    bandMesh.position.y = 0.82;
    this.lipstickGroup.add(bandMesh);

    // Inner Polished Gold Twist Barrel
    const barrelGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.95, 32);
    const barrelMesh = new THREE.Mesh(barrelGeo, goldMat);
    barrelMesh.position.y = 1.35;
    this.lipstickGroup.add(barrelMesh);

    // Sculpted Velvet Matte Angled Bullet
    const bulletGeo = new THREE.CylinderGeometry(0.32, 0.34, 1.15, 32);
    // Bevel top vertices along slant plane to create iconic angled teardrop tip
    const posAttr = bulletGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const y = posAttr.getY(i);
      const z = posAttr.getZ(i);
      if (y > 0.15) {
        posAttr.setY(i, y - z * 0.45);
      }
    }
    bulletGeo.computeVertexNormals();

    const bulletMesh = new THREE.Mesh(bulletGeo, this.lipstickMat);
    bulletMesh.position.y = 2.05;
    this.lipstickGroup.add(bulletMesh);

    this.vanityGroup.add(this.lipstickGroup);

    // =========================================================================
    // ITEM 3: SCULPTED KABUKI BRIDAL BLUSH BRUSH
    // =========================================================================
    this.brushGroup = new THREE.Group();
    this.brushGroup.position.set(-1.95, -0.65, -0.3);
    this.brushGroup.rotation.set(0.18, 0.42, 0.32);

    // Pearlescent Lacquered Handle
    const handleMat = new THREE.MeshPhysicalMaterial({
      color: 0x180814,
      roughness: 0.18,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05
    });

    const handleGeo = new THREE.CylinderGeometry(0.32, 0.24, 2.2, 32);
    const handleMesh = new THREE.Mesh(handleGeo, handleMat);
    this.brushGroup.add(handleMesh);

    // Handle End-Cap Gold Sphere
    const capGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const capMesh = new THREE.Mesh(capGeo, goldMat);
    capMesh.position.y = -1.1;
    this.brushGroup.add(capMesh);

    // 24K Gold Ferrule
    const ferruleGeo = new THREE.CylinderGeometry(0.38, 0.32, 0.85, 32);
    const ferruleMesh = new THREE.Mesh(ferruleGeo, goldMat);
    ferruleMesh.position.y = 1.4;
    this.brushGroup.add(ferruleMesh);

    // Ferrule Crimp Rings
    const crimpGeo = new THREE.TorusGeometry(0.38, 0.02, 16, 32);
    const crimp1 = new THREE.Mesh(crimpGeo, deepGoldMat);
    crimp1.rotation.x = Math.PI / 2;
    crimp1.position.y = 1.25;
    this.brushGroup.add(crimp1);

    const crimp2 = new THREE.Mesh(crimpGeo, deepGoldMat);
    crimp2.rotation.x = Math.PI / 2;
    crimp2.position.y = 1.55;
    this.brushGroup.add(crimp2);

    // Ombre Sculpted Soft Bristles (Dual-Tone Dome)
    const baseBristlesMat = new THREE.MeshStandardMaterial({
      color: 0x5C1935,
      roughness: 0.88,
      metalness: 0.05
    });

    const tipBristlesMat = new THREE.MeshStandardMaterial({
      color: 0xF5DEBA, // Silky Cashmere Champagne tips
      roughness: 0.82,
      metalness: 0.08
    });

    // Lower darker bristles
    const lowerBristlesGeo = new THREE.SphereGeometry(0.48, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.7);
    const lowerBristles = new THREE.Mesh(lowerBristlesGeo, baseBristlesMat);
    lowerBristles.position.y = 1.95;
    lowerBristles.scale.set(0.9, 1.45, 0.85);
    this.brushGroup.add(lowerBristles);

    // Upper soft tips
    const tipBristlesGeo = new THREE.SphereGeometry(0.44, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.45);
    const tipBristles = new THREE.Mesh(tipBristlesGeo, tipBristlesMat);
    tipBristles.position.y = 2.25;
    tipBristles.scale.set(0.92, 1.5, 0.88);
    this.brushGroup.add(tipBristles);

    this.vanityGroup.add(this.brushGroup);

    // Presentation default orientation
    this.vanityGroup.rotation.x = 0.22;
    this.vanityGroup.rotation.y = -0.32;
    this.vanityGroup.position.y = -0.15;
    this.scene.add(this.vanityGroup);
  }

  buildFloatingCrystals() {
    this.crystalsGroup = new THREE.Group();

    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xF5A3BE,
      roughness: 0.1,
      metalness: 0.05,
      transmission: 0.78,
      transparent: true,
      ior: 1.58
    });

    const goldFlakeMat = new THREE.MeshStandardMaterial({
      color: 0xF5D272,
      metalness: 0.98,
      roughness: 0.15
    });

    const crystalCoords = [
      { x: -2.8, y: 1.6, z: 0.8, s: 0.22, mat: crystalMat },
      { x: 2.6, y: 1.4, z: -0.5, s: 0.26, mat: crystalMat },
      { x: 0.5, y: 2.2, z: 0.2, s: 0.18, mat: goldFlakeMat },
      { x: -1.2, y: 2.0, z: -1.2, s: 0.19, mat: crystalMat },
      { x: 2.2, y: -1.5, z: 1.2, s: 0.20, mat: goldFlakeMat },
      { x: -2.4, y: -1.4, z: 0.4, s: 0.24, mat: crystalMat }
    ];

    this.crystalMeshes = [];

    crystalCoords.forEach(c => {
      const geo = new THREE.OctahedronGeometry(c.s, 0);
      const mesh = new THREE.Mesh(geo, c.mat);
      mesh.position.set(c.x, c.y, c.z);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      mesh.userData = {
        baseY: c.y,
        speed: 0.8 + Math.random() * 0.8,
        rotSpeed: 0.008 + Math.random() * 0.012
      };
      this.crystalsGroup.add(mesh);
      this.crystalMeshes.push(mesh);
    });

    this.scene.add(this.crystalsGroup);
  }

  buildAmbientStardust() {
    const particleCount = 140;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 11;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      scales[i] = Math.random() * 0.8 + 0.2;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xF5D77F,
      size: 0.14,
      transparent: true,
      opacity: 0.82,
      blending: THREE.AdditiveBlending
    });

    this.particleSystem = new THREE.Points(geometry, particleMat);
    this.scene.add(this.particleSystem);
  }

  setShade(shadeKey) {
    const shade = this.SHADES[shadeKey];
    if (!shade) return;

    this.currentShadeKey = shadeKey;

    // Smoothly set material colors
    if (this.lipstickMat) {
      this.lipstickMat.color.setHex(shade.lipstick);
    }

    if (this.powderMat) {
      this.powderMat.color.setHex(shade.powder);
    }

    if (this.specularPointLight) {
      this.specularPointLight.color.setHex(shade.glow);
    }

    // Update DOM indicators
    const nameLabel = document.getElementById("shade-name-label");
    const dotPreview = document.getElementById("shade-dot-preview");

    if (nameLabel) nameLabel.textContent = shade.name;
    if (dotPreview) {
      dotPreview.style.background = shade.hex;
      dotPreview.style.boxShadow = `0 0 10px ${shade.hex}`;
    }

    // Update active swatch state
    const swatches = document.querySelectorAll(".shade-swatch");
    swatches.forEach(sw => {
      sw.classList.toggle("active", sw.getAttribute("data-shade") === shadeKey);
    });
  }

  setView(viewKey) {
    const view = this.VIEWS[viewKey];
    if (!view) return;

    this.currentViewKey = viewKey;
    this.cameraTargetPos.copy(view.pos);
    this.cameraTargetLookAt.copy(view.look);

    // Update tab button state
    const tabs = document.querySelectorAll(".three-tab-btn");
    tabs.forEach(tab => {
      tab.classList.toggle("active", tab.getAttribute("data-view") === viewKey);
    });
  }

  toggleAutoOrbit() {
    this.isAutoOrbit = !this.isAutoOrbit;
    const btn = document.getElementById("three-spin-btn");
    const textSpan = document.getElementById("spin-btn-text");

    if (btn) btn.classList.toggle("active", this.isAutoOrbit);
    if (textSpan) textSpan.textContent = this.isAutoOrbit ? "Orbit On" : "Orbit Off";
  }

  bindDOMControls() {
    // Shade Swatches
    const swatchContainer = document.getElementById("three-swatches-wrap");
    if (swatchContainer) {
      swatchContainer.addEventListener("click", (e) => {
        const btn = e.target.closest(".shade-swatch");
        if (btn) {
          const shade = btn.getAttribute("data-shade");
          if (shade) this.setShade(shade);
        }
      });
    }

    // View Switcher Tabs
    const viewTabsContainer = document.getElementById("three-view-tabs");
    if (viewTabsContainer) {
      viewTabsContainer.addEventListener("click", (e) => {
        const btn = e.target.closest(".three-tab-btn");
        if (btn) {
          const view = btn.getAttribute("data-view");
          if (view) this.setView(view);
        }
      });
    }

    // Auto-Orbit Button
    const spinBtn = document.getElementById("three-spin-btn");
    if (spinBtn) {
      spinBtn.addEventListener("click", () => this.toggleAutoOrbit());
    }
  }

  bindInteractionEvents() {
    window.addEventListener("resize", () => this.onResize());

    const container = this.canvas.parentElement;
    if (!container) return;

    // Mouse movement parallax
    container.addEventListener("mousemove", (e) => {
      const rect = container.getBoundingClientRect();
      this.mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      // Specular highlight tracks mouse
      if (this.specularPointLight) {
        this.specularPointLight.position.x = this.mouse.targetX * 3.5;
        this.specularPointLight.position.y = this.mouse.targetY * 3.0 + 2.0;
      }
    });

    container.addEventListener("mouseleave", () => {
      this.mouse.targetX = 0;
      this.mouse.targetY = 0;
    });

    // Drag to rotate with momentum
    container.addEventListener("mousedown", (e) => {
      this.isDragging = true;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
      this.velocity = { x: 0, y: 0 };
    });

    window.addEventListener("mousemove", (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      this.velocity.x = deltaX * 0.007;
      this.velocity.y = deltaY * 0.007;

      this.manualRotation.y += this.velocity.x;
      this.manualRotation.x += this.velocity.y;

      // Clamp vertical tilt to prevent unnatural flips
      this.manualRotation.x = Math.max(-0.6, Math.min(0.8, this.manualRotation.x));

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener("mouseup", () => {
      this.isDragging = false;
    });

    // Touch events for tablets & smartphones
    container.addEventListener("touchstart", (e) => {
      if (e.touches.length > 0) {
        this.isDragging = true;
        const touch = e.touches[0];
        this.previousMousePosition = { x: touch.clientX, y: touch.clientY };
      }
    }, { passive: true });

    container.addEventListener("touchmove", (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        this.mouse.targetX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.targetY = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);

        if (this.isDragging) {
          const deltaX = touch.clientX - this.previousMousePosition.x;
          const deltaY = touch.clientY - this.previousMousePosition.y;

          this.manualRotation.y += deltaX * 0.007;
          this.manualRotation.x += deltaY * 0.007;
          this.manualRotation.x = Math.max(-0.6, Math.min(0.8, this.manualRotation.x));

          this.previousMousePosition = { x: touch.clientX, y: touch.clientY };
        }
      }
    }, { passive: true });

    window.addEventListener("touchend", () => {
      this.isDragging = false;
    });
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

    const time = Date.now() * 0.001;

    // Smooth inertia for mouse tilt
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // Auto-Orbit or Inertia Decay
    if (!this.isDragging) {
      if (this.isAutoOrbit) {
        this.manualRotation.y += 0.0035;
      } else {
        // Friction decay
        this.velocity.x *= 0.92;
        this.velocity.y *= 0.92;
        this.manualRotation.y += this.velocity.x;
        this.manualRotation.x += this.velocity.y;
      }
    }

    // Smooth Camera Navigation Lerp
    this.cameraCurrentPos.lerp(this.cameraTargetPos, 0.05);
    this.cameraCurrentLookAt.lerp(this.cameraTargetLookAt, 0.05);
    this.camera.position.copy(this.cameraCurrentPos);
    this.camera.lookAt(this.cameraCurrentLookAt);

    // Vanity Master Group Float & Parallax
    if (this.vanityGroup) {
      const floatOffset = Math.sin(time * 1.2) * 0.08;
      this.vanityGroup.position.y = -0.15 + floatOffset;

      this.vanityGroup.rotation.y = this.manualRotation.y + this.mouse.x * 0.35;
      this.vanityGroup.rotation.x = this.manualRotation.x - this.mouse.y * 0.25;
    }

    // Floating Crystal Gems Rotation & Sway
    if (this.crystalMeshes && this.crystalMeshes.length) {
      this.crystalMeshes.forEach(mesh => {
        mesh.rotation.x += mesh.userData.rotSpeed;
        mesh.rotation.y += mesh.userData.rotSpeed * 1.2;
        mesh.position.y = mesh.userData.baseY + Math.sin(time * mesh.userData.speed) * 0.12;
      });
    }

    // Ambient Stardust Gentle Swirl
    if (this.particleSystem) {
      this.particleSystem.rotation.y += 0.0012;
      this.particleSystem.rotation.x += 0.0006;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// Global initialization helper
window.initThreeExperience = function() {
  if (document.getElementById("threejs-canvas")) {
    window.bella3DExperience = new Beauty3DExperience("threejs-canvas");
  }
};
