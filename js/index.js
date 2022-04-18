import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xd9d5ca);


const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 20, 100);
controls.update();

function make_sided_material(piece) {
    const material = new THREE.MeshBasicMaterial({
        vertexColors: true
    });
    const colors = [];

    const color = new THREE.Color();

    for (let i = 0; i < 3; i += 6) {

        color.setHex(0xffffff * Math.random());

        colors.push(color.r, color.g, color.b);
        colors.push(color.r, color.g, color.b);
        colors.push(color.r, color.g, color.b);

        colors.push(color.r, color.g, color.b);
        colors.push(color.r, color.g, color.b);
        colors.push(color.r, color.g, color.b);
    }

    // define the new attribute
    piece.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    return material;
}

function line(from, to, color) {
    const material = new THREE.LineBasicMaterial({ color: color });

    const points = [];
    points.push(from);
    points.push(to);

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    return new THREE.Line(geometry, material);
}

const cube = new THREE.BoxGeometry(10, 10, 10);
const cubeMesh = new THREE.Mesh(cube, make_sided_material(cube));
cubeMesh.position.set(0, 0, 0);
const edges = new THREE.EdgesGeometry(cube);
const lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
scene.add(lines);

// palette from https://mokole.com/palette.html
let spheres = [];
spheres.push(new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({ color: 0x191970 })));
spheres.push(new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({ color: 0x006400 })));
spheres.push(new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({ color: 0xff0000 })));
spheres.push(new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({ color: 0xffd700 })));
spheres.push(new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({ color: 0x00ff00 })));
spheres.push(new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({ color: 0x00ffff })));
spheres.push(new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({ color: 0xff00ff })));
spheres.push(new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({ color: 0xffb6c1 })));

spheres[0].position.set(cubeMesh.position.x + 5, cubeMesh.position.y + 5, cubeMesh.position.z + 5);
spheres[1].position.set(cubeMesh.position.x - 5, cubeMesh.position.y + 5, cubeMesh.position.z + 5);
spheres[2].position.set(cubeMesh.position.x + 5, cubeMesh.position.y - 5, cubeMesh.position.z + 5);
spheres[3].position.set(cubeMesh.position.x - 5, cubeMesh.position.y - 5, cubeMesh.position.z + 5);
spheres[4].position.set(cubeMesh.position.x + 5, cubeMesh.position.y + 5, cubeMesh.position.z - 5);
spheres[5].position.set(cubeMesh.position.x - 5, cubeMesh.position.y + 5, cubeMesh.position.z - 5);
spheres[6].position.set(cubeMesh.position.x + 5, cubeMesh.position.y - 5, cubeMesh.position.z - 5);
spheres[7].position.set(cubeMesh.position.x - 5, cubeMesh.position.y - 5, cubeMesh.position.z - 5);

let diagonals = [];

let goal_positions = [];
goal_positions.push([spheres[7].position, spheres[0].position]);
goal_positions.push([spheres[5].position, spheres[2].position]);
goal_positions.push([spheres[4].position, spheres[3].position]);
goal_positions.push([spheres[1].position, spheres[6].position]);

for (let i = 0; i < spheres.length; i++) {
    scene.add(spheres[i]);
}

for (let i = 0; i < goal_positions.length; i++) {
    diagonals.push(line(goal_positions[i][0], goal_positions[i][1], 0x000000)); // todo color
    scene.add(diagonals[i]);
}

let time = 0;

function animateSigma(b) {
    let cycles = [];
    for (let i of b.target.id.substring(1).split("-")) {
        for (let j = 0; j < i.length; j++) {
            cycles.push([parseInt(i[j]) - 1, parseInt(i[(j + 1) % i.length]) - 1]);
        }
    }

    time = 0;
    console.log(goal_positions);
    for (let i = 0; i < cycles.length; i++) {
        goal_positions[cycles[i][0]] = diagonals[cycles[i][1]].geometry.vertices;
        goal_positions[cycles[i][1]] = diagonals[cycles[i][2]].geometry.vertices;
    }
    console.log(goal_positions);
}

Array.from(document.getElementsByClassName("sigma")).forEach(function (element) {
    element.addEventListener('click', animateSigma);
});

function animate() {

    requestAnimationFrame(animate);

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();

    renderer.render(scene, camera);

}

animate()