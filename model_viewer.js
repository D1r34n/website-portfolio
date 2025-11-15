// ---------- Scene Setup ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// ---------- Camera ----------
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 5);

// ---------- Renderer ----------
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// ---------- Endless Grid Helper ----------
const gridSize = 100; // Make grid much larger
const gridDivisions = 100;
const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x000000, 0x000000);
scene.add(gridHelper);

// Optional: Add fog to create infinite appearance
scene.fog = new THREE.Fog(0xffffff, 10, 100);

// ---------- ADD LIGHTS HERE ----------
// Ambient light - soft overall illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// Directional light - main light source
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Optional: Add a second directional light from opposite side for better visibility
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
directionalLight2.position.set(-5, 5, -5);
scene.add(directionalLight2);

// ---------- Controls ----------
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 2;
controls.maxDistance = 50;

// ---------- Transform Controls (for moving/rotating model) ----------
let transformControls = null;

function setupTransformControls() {
    if (transformControls) {
        scene.remove(transformControls);
        transformControls.dispose();
    }
    
    if (window.currentModel) {
        transformControls = new THREE.TransformControls(camera, renderer.domElement);
        transformControls.attach(window.currentModel);
        transformControls.setMode('translate'); // Start with translate mode
        scene.add(transformControls);
        
        // Disable orbit controls when using transform controls
        transformControls.addEventListener('dragging-changed', (event) => {
            controls.enabled = !event.value;
        });
    }
}

// Keyboard shortcuts for transform modes
window.addEventListener('keydown', (event) => {
    if (!transformControls || !window.currentModel) return;
    
    switch(event.key.toLowerCase()) {
        case 'g': // Move (translate)
            transformControls.setMode('translate');
            break;
        case 'r': // Rotate
            transformControls.setMode('rotate');
            break;
        case 's': // Scale
            transformControls.setMode('scale');
            break;
    }
});

// ---------- Window Resize ----------
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ---------- Animation Loop ----------
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// ---------- Import Button ----------
const openImportBtn = document.getElementById('open-import-btn');
const importModelInput = document.getElementById('import-model-btn');
openImportBtn.addEventListener('click', () => importModelInput.click());

importModelInput.addEventListener('change', (event) => {
    const files = event.target.files;
    if (!files.length) return;

    // Map filenames to Blob URLs
    const fileMap = {};
    for (let file of files) {
        fileMap[file.name] = URL.createObjectURL(file);
    }

    // Find main model file
    const modelFile = Array.from(files).find(f =>
        f.name.toLowerCase().endsWith('.glb') ||
        f.name.toLowerCase().endsWith('.gltf') ||
        f.name.toLowerCase().endsWith('.obj') ||
        f.name.toLowerCase().endsWith('.fbx')
    );
    if (!modelFile) return alert("No supported model file found.");

    const modelName = modelFile.name;
    const url = fileMap[modelName];

    // Remove old model
    if (window.currentModel) {
        scene.remove(window.currentModel);
        window.currentModel = null;
    }

    // Loading manager to handle textures
    const manager = new THREE.LoadingManager();
    manager.setURLModifier((url) => {
        const filename = url.split('/').pop();
        return fileMap[filename] || url;
    });

    // ---------- GLTF/GLB ----------
    if (modelName.toLowerCase().endsWith('.glb') || modelName.toLowerCase().endsWith('.gltf')) {
        const loader = new THREE.GLTFLoader(manager);
        loader.load(url, (gltf) => {
            window.currentModel = gltf.scene;
            scene.add(gltf.scene);
            centerModel(gltf.scene);
            setupTransformControls();
        }, undefined, (err) => console.error(err));
    }
    // ---------- OBJ (+ optional MTL) ----------
    else if (modelName.toLowerCase().endsWith('.obj')) {
        const objLoader = new THREE.OBJLoader(manager);
        const mtlFile = Array.from(files).find(f => f.name.toLowerCase().endsWith('.mtl'));
        if (mtlFile) {
            const mtlLoader = new THREE.MTLLoader(manager);
            mtlLoader.load(fileMap[mtlFile.name], (mtl) => {
                mtl.preload();
                objLoader.setMaterials(mtl);
                objLoader.load(url, (obj) => {
                    window.currentModel = obj;
                    scene.add(obj);
                    centerModel(obj);
                    setupTransformControls();
                }, undefined, (err) => console.error(err));
            });
        } else {
            objLoader.load(url, (obj) => {
                window.currentModel = obj;
                scene.add(obj);
                centerModel(obj);
                setupTransformControls();
            }, undefined, (err) => console.error(err));
        }
    }
    // ---------- FBX ----------
    else if (modelName.toLowerCase().endsWith('.fbx')) {
        const fbxLoader = new THREE.FBXLoader(manager);
        fbxLoader.load(url, (fbx) => {
            window.currentModel = fbx;
            scene.add(fbx);
            centerModel(fbx);
            setupTransformControls();
        }, undefined, (err) => console.error(err));
    }
});

// ---------- Helper: Center Model ----------
function centerModel(obj) {
    const box = new THREE.Box3().setFromObject(obj);
    const center = box.getCenter(new THREE.Vector3());
    obj.position.sub(center);
}