import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { chunk } from 'lodash';

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

var goal_diagonals = [];
goal_diagonals.push([spheres[7].position, spheres[0].position]);
goal_diagonals.push([spheres[2].position, spheres[5].position]);
goal_diagonals.push([spheres[3].position, spheres[4].position]);
goal_diagonals.push([spheres[6].position, spheres[1].position]);

var goal_spheres = spheres.map(i => i.position.clone());
var diagonals_to_spheres = { 0: [7, 0], 1: [2, 5], 2: [3, 4], 3: [6, 1] };

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

    // let new_spheres = goal_spheres.map(i => i);
    // let goal_clone = goal_spheres.map(i => i);

    for (let i = 0; i < cycles.length; i++) {
        // todo clean
        goal_diagonals[cycles[i][0]] = get_points(diagonals[cycles[i][1]]);
        goal_diagonals[cycles[i][1]] = get_points(diagonals[cycles[i][0]]);

        goal_spheres[diagonals_to_spheres[cycles[i][0]][0]].copy(spheres[diagonals_to_spheres[cycles[i][1]][0]].position);
        goal_spheres[diagonals_to_spheres[cycles[i][0]][1]].copy(spheres[diagonals_to_spheres[cycles[i][1]][1]].position);
        // a[diagonals_to_spheres[cycles[i][0]][0]] = diagonals_to_spheres[cycles[i][1]][0]
        // a[diagonals_to_spheres[cycles[i][0]][1]] = diagonals_to_spheres[cycles[i][1]][1]
    }

    // for (let i = 0; i < goal_spheres.length; i++) {
    //     spheres[i].position.copy(goal_spheres[i]);
    //     // spheres[i].position.x = spheres[i].position.x + (goal_spheres[i].x - spheres[i].position.x) * time / (anim_length);
    //     // spheres[i].position.y = spheres[i].position.y + (goal_spheres[i].y - spheres[i].position.y) * time / (anim_length);
    //     // spheres[i].position.z = spheres[i].position.z + (goal_spheres[i].z - spheres[i].position.z) * time / (anim_length);
    // }

    // goal_spheres = new_spheres;
    // console.log(a);
    // console.log(goal_spheres.map(i => i));

    time = 0; // start animation
}

document.getElementById("sigmatable");

Array.from(document.getElementsByClassName("sigma")).forEach(function (element) {
    element.addEventListener('click', animateSigma);
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
    }

    renderer.render(scene, camera);

}

animate()