let scene, camera, renderer;
let keys = {};
let yaw = 0;
let pitch = 0;
let canLook = false;

function initGame() {
    const canvas = document.getElementById("game");

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    createWorld(scene);

    camera.position.set(0, 2, 5);

    document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
    document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

    canvas.addEventListener("click", () => {
        canvas.requestPointerLock();
    });

    document.addEventListener("pointerlockchange", () => {
        canLook = document.pointerLockElement === canvas;
    });

    document.addEventListener("mousemove", e => {
        if (!canLook) return;
        const sensitivity = 0.002;
        yaw -= e.movementX * sensitivity;
        pitch -= e.movementY * sensitivity;
        pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
    });

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    const speed = 0.2;
    const forward = new THREE.Vector3(
        Math.sin(yaw),
        0,
        Math.cos(yaw)
    );
    const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0,1,0)).negate();

    if (keys["z"] || keys["w"]) camera.position.addScaledVector(forward, -speed);
    if (keys["s"]) camera.position.addScaledVector(forward, speed);
    if (keys["q"] || keys["a"]) camera.position.addScaledVector(right, -speed);
    if (keys["d"]) camera.position.addScaledVector(right, speed);

    camera.rotation.set(pitch, yaw, 0);

    updateHUD(camera.position);
    renderer.render(scene, camera);
}

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("playBtn").addEventListener("click", () => {
        document.getElementById("menu").style.display = "none";
        initGame();
    });
});
