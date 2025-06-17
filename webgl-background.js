// Fixed WebGL Background with Three.js
function initWebGLBackground(elementId, textureUrl, options = {}) {
    try {
        // Default options
        const { scale = 1.0, speed = 0.5, intensity = 1.0 } = options;
        
        // Create scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        camera.position.z = 1;

        // Create renderer
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true,
            antialias: true 
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        const container = document.getElementById(elementId);
        if (!container) {
            console.error(`Container ${elementId} not found`);
            return;
        }
        container.appendChild(renderer.domElement);

        // Load texture
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(textureUrl, undefined, undefined, (err) => {
            console.error('Texture loading failed:', err);
        });

        // Create shader material
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uTexture: { value: texture },
                uScale: { value: scale },
                uSpeed: { value: speed },
                uIntensity: { value: intensity }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D uTexture;
                uniform float uTime;
                uniform float uScale;
                uniform float uSpeed;
                uniform float uIntensity;
                varying vec2 vUv;
                
                void main() {
                    vec2 uv = vUv;
                    uv.x += sin(uv.y * 10.0 + uTime * uSpeed) * 0.01 * uIntensity;
                    uv.y += cos(uv.x * 10.0 + uTime * uSpeed) * 0.01 * uIntensity;
                    vec4 tex = texture2D(uTexture, uv * uScale);
                    gl_FragColor = tex;
                }
            `
        });

        // Create plane
        const geometry = new THREE.PlaneGeometry(2, 2);
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            material.uniforms.uTime.value += 0.01;
            renderer.render(scene, camera);
        }
        animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    } catch (error) {
        console.error(`Error initializing ${elementId}:`, error);
    }
}

// Wait for both DOM and Three.js to be ready
document.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE === 'undefined') {
        console.error('Three.js not loaded');
        return;
    }

    // Initialize backgrounds
    try {
        // Main background
        if (document.getElementById('webgl-background')) {
            initWebGLBackground('webgl-background', 'https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7', {
                scale: 1.0,
                speed: 0.5,
                intensity: 1.0
            });
        }
        
        // Header background
        if (document.getElementById('header-webgl-background')) {
            initWebGLBackground('header-webgl-background', 'https://images.unsplash.com/photo-1518770660439-4636190af475', {
                scale: 1.2,
                speed: 0.3,
                intensity: 0.7
            });
        }
    } catch (error) {
        console.error('WebGL initialization failed:', error);
    }
});
