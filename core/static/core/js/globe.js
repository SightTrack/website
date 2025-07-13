// Globe animation for SightTrack
class GlobeVisualization {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('Globe container not found:', containerId);
            return;
        }
        
        console.log('Container found:', this.container, 'Size:', this.container.clientWidth, 'x', this.container.clientHeight);
        
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.globe = null;
        this.controls = null;
        this.animationId = null;
        
        // Configuration
        this.config = {
            globeColor: '#0a1929',
            atmosphereColor: '#4a90e2',
            polygonColor: 'rgba(70, 130, 226, 0.4)',
            pointColor: '#4a90e2',
            arcColor: '#00ff88',
            emissive: '#001122',
            emissiveIntensity: 0.2,
            shininess: 0.9
        };
        
        this.sampleData = [
            // North America connections
            {
                startLat: 49.2827, // Vancouver
                startLng: -123.1207,
                endLat: 45.5017, // Montreal
                endLng: -73.5673,
                color: '#00bfff', // Deep sky blue
                arcAlt: 0.1,
                order: 1
            },
            {
                startLat: 43.6532, // Toronto
                startLng: -79.3832,
                endLat: 40.7128, // New York
                endLng: -74.0060,
                color: '#1e90ff', // Dodger blue
                arcAlt: 0.08,
                order: 2
            },
            // Global connections from Canada
            {
                startLat: 45.5017, // Montreal
                startLng: -73.5673,
                endLat: 51.5074, // London
                endLng: -0.1278,
                color: '#4169e1', // Royal blue
                arcAlt: 0.15,
                order: 3
            },
            {
                startLat: 49.2827, // Vancouver
                startLng: -123.1207,
                endLat: 35.6762, // Tokyo
                endLng: 139.6503,
                color: '#0080ff', // Azure
                arcAlt: 0.18,
                order: 4
            },
            // Research connections
            {
                startLat: 55.7558, // Moscow
                startLng: 37.6176,
                endLat: 53.5461, // Edmonton (close to boreal research)
                endLng: -113.4938,
                color: '#6495ed', // Cornflower blue
                arcAlt: 0.12,
                order: 5
            },
            {
                startLat: -33.8688, // Sydney
                startLng: 151.2093,
                endLat: 49.2827, // Vancouver
                endLng: -123.1207,
                color: '#00ced1', // Dark turquoise
                arcAlt: 0.2,
                order: 6
            }
        ];
    }

    async init() {
        try {
            // Wait for Three.js to be available
            if (typeof THREE === 'undefined') {
                console.warn('Three.js not loaded yet, retrying...');
                setTimeout(() => this.init(), 100);
                return false;
            }

            // Wait for ThreeGlobe to be available
            if (typeof ThreeGlobe === 'undefined') {
                console.warn('ThreeGlobe not loaded yet, retrying...');
                setTimeout(() => this.init(), 100);
                return false;
            }

            console.log('Starting globe initialization...');

            // Create scene
            this.setupScene();
            console.log('Scene created');
            
            // Load countries data
            const countriesData = await this.loadCountriesData();
            console.log('Countries data loaded:', countriesData.features?.length || 0, 'countries');
            
            // Create globe
            await this.createGlobe(countriesData);
            console.log('Globe created');
            
            // Setup camera and controls
            this.setupCamera();
            console.log('Camera set up');
            
            this.setupControls();
            console.log('Controls set up');
            
            // Setup lighting
            this.setupLighting();
            console.log('Lighting set up');
            
            // Start animation
            this.animate();
            console.log('Animation started');
            
            // Handle window resize
            this.handleResize();
            
            console.log('Globe initialized successfully');
            return true;
        } catch (error) {
            console.error('Failed to initialize globe:', error);
            this.showFallback();
            return false;
        }
    }

    showFallback() {
        const fallback = document.getElementById('globe-fallback');
        if (fallback) {
            fallback.style.display = 'block';
        }
    }

    setupScene() {
        // Create scene
        this.scene = new THREE.Scene();
        // Remove fog for cleaner look
        // this.scene.fog = new THREE.Fog(0x000000, 400, 2000);

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true 
        });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setClearColor(0x000000, 0); // Completely transparent
        this.container.appendChild(this.renderer.domElement);
    }

    async loadCountriesData() {
        try {
            const response = await fetch('/static/core/data/globe.json');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to load countries data:', error);
            return { features: [] };
        }
    }

    async createGlobe(countriesData) {
        // Create globe instance without texture backgrounds
        this.globe = new ThreeGlobe();

        // Configure globe material - solid color instead of texture
        const globeMaterial = this.globe.globeMaterial();
        globeMaterial.color = new THREE.Color(this.config.globeColor);
        globeMaterial.emissive = new THREE.Color(this.config.emissive);
        globeMaterial.emissiveIntensity = this.config.emissiveIntensity;
        globeMaterial.shininess = this.config.shininess;
        globeMaterial.transparent = true;
        globeMaterial.opacity = 0.8;

        // Add countries
        this.globe
            .hexPolygonsData(countriesData.features)
            .hexPolygonResolution(3)
            .hexPolygonMargin(0.7)
            .hexPolygonColor(() => this.config.polygonColor)
            .showAtmosphere(true)
            .atmosphereColor(this.config.atmosphereColor)
            .atmosphereAltitude(0.15);

        // Add arcs
        this.setupArcs();
        
        // Add points
        this.setupPoints();
        
        // Add rings
        this.setupRings();

        this.scene.add(this.globe);
    }

    setupArcs() {
        this.globe
            .arcsData(this.sampleData)
            .arcStartLat(d => d.startLat)
            .arcStartLng(d => d.startLng)
            .arcEndLat(d => d.endLat)
            .arcEndLng(d => d.endLng)
            .arcColor(d => d.color)
            .arcAltitude(d => d.arcAlt)
            .arcStroke(1.0)
            .arcDashLength(0.4)
            .arcDashGap(4)
            .arcDashInitialGap(d => d.order)
            .arcDashAnimateTime(2000)
            .arcCircularResolution(128)
            .arcCurveResolution(128);
    }

    setupPoints() {
        // Create points from arcs data
        let points = [];
        this.sampleData.forEach(arc => {
            points.push({
                lat: arc.startLat,
                lng: arc.startLng,
                color: arc.color,
                size: 1.2
            });
            points.push({
                lat: arc.endLat,
                lng: arc.endLng,
                color: arc.color,
                size: 1.2
            });
        });

        // Remove duplicates
        const filteredPoints = points.filter((v, i, a) =>
            a.findIndex(v2 => v2.lat === v.lat && v2.lng === v.lng) === i
        );

        this.globe
            .pointsData(filteredPoints)
            .pointColor(d => d.color)
            .pointAltitude(0.01)
            .pointRadius(d => d.size)
            .pointResolution(12)
            .pointsMerge(false);
    }

    setupRings() {
        this.globe
            .ringsData([])
            .ringColor(d => d.color || '#4a90e2')
            .ringMaxRadius(5)
            .ringPropagationSpeed(2)
            .ringRepeatPeriod(3000);

        // Animate rings
        setInterval(() => {
            if (!this.globe) return;
            
            const randomIndices = this.getRandomNumbers(0, this.sampleData.length, Math.floor(this.sampleData.length * 0.6));
            
            const ringsData = this.sampleData
                .filter((d, i) => randomIndices.includes(i))
                .map(d => ({
                    lat: d.startLat,
                    lng: d.startLng,
                    color: d.color
                }));

            this.globe.ringsData(ringsData);
        }, 3000);
    }

    setupCamera() {
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(50, aspect, 50, 2000);
        
        // Position camera to face Canada - simplified approach
        this.camera.position.set(-200, 100, 200);
        this.camera.lookAt(0, 0, 0);
    }

    setupControls() {
        if (typeof THREE.OrbitControls === 'undefined') {
            console.warn('OrbitControls not available');
            return;
        }

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enablePan = true;
        this.controls.enableZoom = true;
        this.controls.minDistance = 120;
        this.controls.maxDistance = 600;
        this.controls.autoRotate = false;
        this.controls.autoRotateSpeed = 0;
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.minPolarAngle = 0;
        this.controls.maxPolarAngle = Math.PI;
    }

    setupLighting() {
        // Ambient light for overall illumination
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);

        // Main directional light from top-left
        const directionalLight1 = new THREE.DirectionalLight(0x8ec5ff, 1.2);
        directionalLight1.position.set(-400, 300, 400);
        directionalLight1.castShadow = true;
        this.scene.add(directionalLight1);

        // Secondary light from bottom-right
        const directionalLight2 = new THREE.DirectionalLight(0x4a90e2, 0.8);
        directionalLight2.position.set(200, -200, 200);
        this.scene.add(directionalLight2);

        // Point lights for glass reflections
        const pointLight1 = new THREE.PointLight(0x00d4ff, 1.0, 1000);
        pointLight1.position.set(-200, 400, 200);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x0088ff, 0.8, 800);
        pointLight2.position.set(400, -100, -200);
        this.scene.add(pointLight2);

        // Hemisphere light for soft ambient
        const hemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0x1e3a5f, 0.6);
        this.scene.add(hemisphereLight);
        
        // Add environment map for reflections
        const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
        const envTexture = pmremGenerator.fromScene(new THREE.Scene(), 0.04).texture;
        this.scene.environment = envTexture;
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        if (this.controls) {
            this.controls.update();
        }
        
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    handleResize() {
        const resizeObserver = new ResizeObserver(() => {
            if (!this.container) return;
            
            const width = this.container.clientWidth;
            const height = this.container.clientHeight;
            
            if (this.camera) {
                this.camera.aspect = width / height;
                this.camera.updateProjectionMatrix();
            }
            
            if (this.renderer) {
                this.renderer.setSize(width, height);
            }
        });
        
        resizeObserver.observe(this.container);
    }

    getRandomNumbers(min, max, count) {
        const arr = [];
        while (arr.length < count) {
            const r = Math.floor(Math.random() * (max - min)) + min;
            if (arr.indexOf(r) === -1) arr.push(r);
        }
        return arr;
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        if (this.renderer) {
            this.renderer.dispose();
            if (this.renderer.domElement && this.renderer.domElement.parentNode) {
                this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
            }
        }
        
        if (this.globe) {
            this.scene.remove(this.globe);
        }
        
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.globe = null;
        this.controls = null;
    }
}

// Initialize globe when DOM is ready
function initGlobe() {
    // Wait for all required libraries to load
    let retryCount = 0;
    const maxRetries = 50;
    
    function checkAndInit() {
        retryCount++;
        
        if (typeof THREE === 'undefined' || typeof ThreeGlobe === 'undefined') {
            if (retryCount < maxRetries) {
                console.log(`Waiting for libraries to load... (${retryCount}/${maxRetries})`);
                setTimeout(checkAndInit, 100);
                return;
            } else {
                console.error('Failed to load required libraries after maximum retries');
                return;
            }
        }

        const globeContainer = document.getElementById('globe-container');
        if (!globeContainer) {
            console.warn('Globe container not found');
            return;
        }

        // Wait for container to have proper dimensions
        if (globeContainer.clientWidth === 0 || globeContainer.clientHeight === 0) {
            console.log('Container not ready, waiting...');
            setTimeout(checkAndInit, 200);
            return;
        }

        console.log('Initializing globe...');
        const globe = new GlobeVisualization('globe-container');
        
        if (!globe.container) {
            console.error('Failed to create globe - container issue');
            return;
        }
        
        globe.init().then(success => {
            if (success) {
                console.log('Globe initialized successfully');
            } else {
                console.error('Failed to initialize globe');
            }
        }).catch(error => {
            console.error('Globe initialization error:', error);
        });
    }
    
    checkAndInit();
}

// Export for global use
window.GlobeVisualization = GlobeVisualization;
window.initGlobe = initGlobe;
