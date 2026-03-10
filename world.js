function createWorld(scene) {

    // --- SOL AVEC TEXTURE ---
    const textureLoader = new THREE.TextureLoader();
    const groundTexture = textureLoader.load("assets/textures/grass.jpg");
    groundTexture.wrapS = THREE.RepeatWrapping;
    groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(40, 40);

    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(500, 500),
        new THREE.MeshStandardMaterial({ map: groundTexture })
    );
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // --- CIEL ---
    const sky = new THREE.Mesh(
        new THREE.SphereGeometry(800, 32, 32),
        new THREE.MeshBasicMaterial({
            color: 0x87CEEB,
            side: THREE.BackSide
        })
    );
    scene.add(sky);

    // --- SOLEIL ---
    const sun = new THREE.DirectionalLight(0xffffff, 2);
    sun.position.set(100, 200, 100);
    scene.add(sun);

    // --- LUMIÈRE AMBIANTE ---
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    // --- COLLINES / ROCHERS ---
    const rockMaterial = new THREE.MeshStandardMaterial({ color: 0x777777 });

    for (let i = 0; i < 25; i++) {
        const rock = new THREE.Mesh(
            new THREE.DodecahedronGeometry(10 + Math.random() * 20),
            rockMaterial
        );
        rock.position.set(
            (Math.random() - 0.5) * 400,
            5,
            (Math.random() - 0.5) * 400
        );
        scene.add(rock);
    }
}
