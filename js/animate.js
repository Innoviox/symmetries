import * as THREE from 'three';
import { data } from './data.js';
import { chunk } from 'lodash';

let time = 2001; // not hacky dw
let anim_length = 2000;

var diagonals_to_spheres = { 0: [7, 0], 1: [2, 5], 2: [3, 4], 3: [6, 1] };

var goal_rotate = new THREE.Vector3(0, 0, 0);

function get_points(line) {
    let points = line.geometry.attributes.position.array;
    return chunk(points, 3).map(i => new THREE.Vector3(...i));
}

function animateSigma(b) {
    let id = b.target.id;
    let cycles = [];
    for (let i of id.substring(1).split("-")) {
        for (let j = 0; j < i.length; j++) {
            cycles.push([parseInt(i[j]) - 1, parseInt(i[(j + 1) % i.length]) - 1]);
        }
    }

    let x = 0, y = 0, z = 0;
    let inversions = data[id][0];

    for (let i = 0; i < cycles.length; i++) {
        let from = cycles[i][0];
        let to = cycles[i][1];

        let from_spheres = diagonals_to_spheres[from];
        let to_spheres = diagonals_to_spheres[to];

        if (inversions[from] === 1) {
            goal_diagonals[from] = [spheres[to_spheres[1]].position.clone(), spheres[to_spheres[0]].position.clone()];
            goal_spheres[from_spheres[0]].copy(spheres[to_spheres[1]].position);
            goal_spheres[from_spheres[1]].copy(spheres[to_spheres[0]].position);
        } else {
            goal_diagonals[from] = [spheres[to_spheres[0]].position.clone(), spheres[to_spheres[1]].position.clone()];
            goal_spheres[from_spheres[0]].copy(spheres[to_spheres[0]].position);
            goal_spheres[from_spheres[1]].copy(spheres[to_spheres[1]].position);
        }
    }

    goal_rotate.x += data[id][1][0] * half;
    goal_rotate.y += data[id][1][1] * half;
    goal_rotate.z += data[id][1][2] * half;

    time = 0; // start animation
}

function animate_cube() {
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
}

Array.from(document.getElementsByClassName("sigma")).forEach(function (element) {
    element.addEventListener('click', animateSigma);
});

function anim_loop() {
    if (time < anim_length) {
        time += 1;
        animate_cube();
    } else if (time == anim_length) {
        // console.log(calculate_faces());
        time += 1;
    }
}

export { anim_loop };