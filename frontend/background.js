let scene, camera, renderer, dna;

function init() {
    console.log("Initializing 3D scene");
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('bg-canvas').appendChild(renderer.domElement);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create DNA model
    dna = new THREE.Group();
    const material = new THREE.MeshPhongMaterial({ color: 0x00ffff, shininess: 100 });
    
    for (let i = 0; i < 20; i++) {
        const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), material);
        const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), material);
        
        sphere1.position.set(Math.sin(i * 0.3) * 2, i * 0.4, Math.cos(i * 0.3) * 2);
        sphere2.position.set(Math.sin((i * 0.3) + Math.PI) * 2, i * 0.4, Math.cos((i * 0.3) + Math.PI) * 2);
        
        dna.add(sphere1);
        dna.add(sphere2);
        
        if (i > 0) {
            const line1 = new THREE.Mesh(
                new THREE.CylinderGeometry(0.05, 0.05, 1),
                material
            );
            line1.position.set(
                (sphere1.position.x + dna.children[i*2-2].position.x) / 2,
                (sphere1.position.y + dna.children[i*2-2].position.y) / 2,
                (sphere1.position.z + dna.children[i*2-2].position.z) / 2
            );
            line1.lookAt(dna.children[i*2-2].position);
            dna.add(line1);
            
            const line2 = new THREE.Mesh(
                new THREE.CylinderGeometry(0.05, 0.05, 1),
                material
            );
            line2.position.set(
                (sphere2.position.x + dna.children[i*2-1].position.x) / 2,
                (sphere2.position.y + dna.children[i*2-1].position.y) / 2,
                (sphere2.position.z + dna.children[i*2-1].position.z) / 2
            );
            line2.lookAt(dna.children[i*2-1].position);
            dna.add(line2);
        }
    }

    // Increase the size of the DNA model
    const dnaScale = 2.1; // Adjust this value to make the DNA larger or smaller
    dna.scale.set(dnaScale+0.5, dnaScale, dnaScale+0.5);

    // Center the DNA vertically
    dna.position.y = -9 ; // Adjust this value to move the DNA up or down

    scene.add(dna);
    camera.position.z = 20; // Increased from 30 to accommodate the larger model
}

function animate() {
    console.log("Animating");
    requestAnimationFrame(animate);
    dna.rotation.y += 0.035;
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Adjust DNA position on window resize
    const aspectRatio = window.innerWidth / window.innerHeight;
    dna.position.y = aspectRatio > 1 ? -5 : -2; // Adjust vertical position based on aspect ratio
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();