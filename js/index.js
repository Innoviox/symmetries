import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { chunk } from 'lodash';

const half = Math.PI / 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xd9d5ca);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 20, 100);
controls.update();

// let faces = { '0145': 0xff0000, '2367': 0x00ff00, '            '
let face_colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0x00ffff, 0xff00ff];

function make_sided_material(piece) {
    const material = new THREE.MeshBasicMaterial({
        vertexColors: true
    });
    const colors = [];

    const color = new THREE.Color();

    const positionAttribute = piece.getAttribute('position');

    for (let i = 0; i < positionAttribute.count; i += 3) {
        color.setHex(face_colors[i / 3], 'srgb-linear');

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
scene.add(cubeMesh);

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

var goal_diagonals = [];
goal_diagonals.push([spheres[7].position.clone(), spheres[0].position.clone()]);
goal_diagonals.push([spheres[2].position.clone(), spheres[5].position.clone()]);
goal_diagonals.push([spheres[3].position.clone(), spheres[4].position.clone()]);
goal_diagonals.push([spheres[6].position.clone(), spheres[1].position.clone()]);

var goal_spheres = spheres.map(i => i.position.clone());
var diagonals_to_spheres = { 0: [7, 0], 1: [2, 5], 2: [3, 4], 3: [6, 1] };

var goal_rotate = new THREE.Vector3(0, 0, 0);

console.log(goal_spheres);

for (let i = 0; i < spheres.length; i++) {
    scene.add(spheres[i]);
}

let diagonal_colors = [0xff0000, 0x00ff00, 0x0000ff, 0x8b32a8];

for (let i = 0; i < goal_diagonals.length; i++) {
    diagonals.push(line(goal_diagonals[i][0], goal_diagonals[i][1], diagonal_colors[i])); // todo color
    scene.add(diagonals[i]);
}

let time = 2001; // not hacky dw
let anim_length = 2000;

function get_points(line) {
    let points = line.geometry.attributes.position.array;
    return chunk(points, 3).map(i => new THREE.Vector3(...i));
}

function animateSigma(b) {
    let cycles = [];
    for (let i of b.target.id.substring(1).split("-")) {
        for (let j = 0; j < i.length; j++) {
            cycles.push([parseInt(i[j]) - 1, parseInt(i[(j + 1) % i.length]) - 1]);
        }
    }

    let x = 0, y = 0, z = 0;

    for (let i = 0; i < cycles.length; i++) {
        let from = cycles[i][0];
        let to = cycles[i][1];

        let from_spheres = diagonals_to_spheres[from];
        let to_spheres = diagonals_to_spheres[to];

        goal_diagonals[from] = [spheres[to_spheres[0]].position.clone(), spheres[to_spheres[1]].position.clone()];

        /* if (from === 1 || from === 2) {
            goal_spheres[from_spheres[0]].copy(spheres[to_spheres[1]].position);
            goal_spheres[from_spheres[1]].copy(spheres[to_spheres[0]].position);
        } else { */
        goal_spheres[from_spheres[0]].copy(spheres[to_spheres[0]].position);
        goal_spheres[from_spheres[1]].copy(spheres[to_spheres[1]].position);
        // }

        if (from === 0) {
            /* 4 => -1, 2 => -2, 3 => 1 */
            y = to === 3 ? -1 : to === 1 ? -2 : to === 2 ? 1 : 0;
        }
        if (from === 2) {
            z = to === 3 ? 2 : 0;
        }
    }

    // goal_rotate.x += x * half;
    // goal_rotate.y += y * half;
    // goal_rotate.z += z * half;

    // switch (b.target.id) {
    //     case "#1-2-3-4": goal_rotate = new THREE.Vector3(0, 0, 0); break;
    //     case "#1423": goal_rotate.y -= half; break;
    //     case "#12-34": goal_rotate.y -= 2 * half; break;
    //     case "#1324": goal_rotate.y += half; break;
    //     default: break;
    // }

    time = 0; // start animation
}

function calculate_faces() {

}

function flip(b) {
    let id = b.target.id;
    let from = parseInt(id.substring(4) - 1);
    console.log("flipping", from);

    let sph = diagonals_to_spheres[from];
    // let to_spheres = diagonals_to_spheres[to];

    // goal_diagonals[from] = [spheres[sph[1]].position.clone(), spheres[sph[0]].position.clone()];
    goal_spheres[sph[0]].copy(spheres[sph[1]].position);
    goal_spheres[sph[1]].copy(spheres[sph[0]].position);

    time = 1999; // start animation
}

function rot(b) {
    let id = b.target.id.substring(4);
    console.log("rotating", id);
    if (id === 'x') {
        goal_rotate.x += half;
    } else if (id === 'y') {
        goal_rotate.y += half;
    } else if (id === 'z') {
        goal_rotate.z += half;
    }
    time = 1999; // start animation
}

document.getElementById("sigmatable");

Array.from(document.getElementsByClassName("sigma")).forEach(function (element) {
    element.addEventListener('click', animateSigma);
});

Array.from(document.getElementsByClassName("helper-flip")).forEach(function (element) {
    element.addEventListener('click', flip);
});

Array.from(document.getElementsByClassName("helper-rot")).forEach(function (element) {
    element.addEventListener('click', rot);
});


function animate() {

    requestAnimationFrame(animate);

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();

    if (time < anim_length) {
        time += 1;
        for (let i = 0; i < goal_diagonals.length; i++) {
            let goal = goal_diagonals[i];
            let current = get_points(diagonals[i]);

            let new_points = []
            for (let j = 0; j < current.length; j++) {
                new_points.push(new THREE.Vector3(
                    current[j].x + (goal[j].x - current[j].x) * time / (anim_length),
                    current[j].y + (goal[j].y - current[j].y) * time / (anim_length),
                    current[j].z + (goal[j].z - current[j].z) * time / (anim_length)));
            }

            diagonals[i].geometry.setFromPoints(new_points);
        }

        for (let i = 0; i < goal_spheres.length; i++) {
            // spheres[i].position.copy(goal_spheres[i]);
            spheres[i].position.x = spheres[i].position.x + (goal_spheres[i].x - spheres[i].position.x) * time / (anim_length);
            spheres[i].position.y = spheres[i].position.y + (goal_spheres[i].y - spheres[i].position.y) * time / (anim_length);
            spheres[i].position.z = spheres[i].position.z + (goal_spheres[i].z - spheres[i].position.z) * time / (anim_length);
        }

        cubeMesh.rotation.x = cubeMesh.rotation.x + (goal_rotate.x - cubeMesh.rotation.x) * time / anim_length;
        cubeMesh.rotation.y = cubeMesh.rotation.y + (goal_rotate.y - cubeMesh.rotation.y) * time / anim_length;
        cubeMesh.rotation.z = cubeMesh.rotation.z + (goal_rotate.z - cubeMesh.rotation.z) * time / anim_length;
    } else if (time == anim_length) {
        console.log(calculate_faces());
        time += 1;
    }

    renderer.render(scene, camera);

}

animate()