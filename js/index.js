import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Cube from './cube.js';
import { anim_loop } from './animate.js';
import { add_listeners } from './dom.js';
import { make_global_tour } from './tour.js';
import { toggle_enabled } from './utils.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xd9d5ca);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 20, 100);
controls.update();

let cube = new Cube(10, new THREE.Vector3(0, 0, 0));
cube.add_to_scene(scene);

add_listeners(cube);

function animate() {
    requestAnimationFrame(animate);

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();

    anim_loop(cube);
    renderer.render(scene, camera);
}

animate();

toggle_enabled('sigma'); // don't use buttons during the tour
make_global_tour().start() 