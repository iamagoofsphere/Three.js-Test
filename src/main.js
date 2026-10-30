import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';
import { PointerLockControls } from 'https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/controls/PointerLockControls.js';

const colors = [
    new THREE.Color( 0x112233 ),
    new THREE.Color( 0x445566 ),
    new THREE.Color( 0x778899 )
]

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 3;

const controls = new PointerLockControls(camera, document.body);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.domElement.addEventListener ('click', () => {
    controls.lock();
})

document.body.style.margin = '0';
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ 
    color: 0x00ff00,
    roughness: 0.6,
    metalness: 0.1
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const edges = new THREE.EdgesGeometry(geometry);
const outline = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0x000000 })
);
cube.add(outline);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(3, 4, 5);
scene.add(directionalLight);

const floorGeometry = new THREE.PlaneGeometry(200, 200);
const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x444444,
    side: THREE.DoubleSide
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -6;
scene.add(floor);

const grid = new THREE.GridHelper(200, 40);
grid.position.y = -6;
scene.add(grid)

const keys = {};

window.addEventListener('keydown', (event) => {
  keys[event.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (event) => {
  keys[event.key.toLowerCase()] = false;
});

const forward = new THREE.Vector3();

function animate() {
    requestAnimationFrame(animate);

    const speed = 0.12;

    camera.getWorldDirection(forward);

    if (keys['w']) {
        camera.position.addScaledVector(forward, speed);
    }

    if (keys['s']) {
        camera.position.addScaledVector(forward, -speed);
    }

    if (keys['a']) {
        controls.moveRight(-speed);
    }

    if (keys['d']) {
        controls.moveRight(speed);
    }

    if (keys[' ']) {
        camera.position.y += speed;
    }

    if (keys['shift']) {
        camera.position.y -= speed;
    }

    renderer.render(scene, camera);
}

animate();