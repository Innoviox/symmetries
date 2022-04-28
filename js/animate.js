import { data } from './data.js';
import { toggle_enabled } from './utils.js';

let time = 2001; // not hacky dw
let anim_length = 200;

var diagonals_to_spheres = { 0: [7, 0], 1: [2, 5], 2: [3, 4], 3: [6, 1] };
const half = Math.PI / 2;

let animateSigma = cube => b => {
    let id = b.target.id;
    let cycles = [];
    for (let i of id.substring(1).split("-")) {
        for (let j = 0; j < i.length; j++) {
            cycles.push([parseInt(i[j]) - 1, parseInt(i[(j + 1) % i.length]) - 1]);
        }
    }

    let inversions = data[id][0];

    for (let i = 0; i < cycles.length; i++) {
        let from = cycles[i][0];
        let to = cycles[i][1];

        let from_spheres = diagonals_to_spheres[from];
        let to_spheres = diagonals_to_spheres[to];

        if (inversions[from] === 1) {
            cube.goal_diagonals[from] = [cube.spheres[to_spheres[1]].position.clone(), cube.spheres[to_spheres[0]].position.clone()];
            cube.goal_spheres[from_spheres[0]].copy(cube.spheres[to_spheres[1]].position);
            cube.goal_spheres[from_spheres[1]].copy(cube.spheres[to_spheres[0]].position);
        } else {
            cube.goal_diagonals[from] = [cube.spheres[to_spheres[0]].position.clone(), cube.spheres[to_spheres[1]].position.clone()];
            cube.goal_spheres[from_spheres[0]].copy(cube.spheres[to_spheres[0]].position);
            cube.goal_spheres[from_spheres[1]].copy(cube.spheres[to_spheres[1]].position);
        }
    }

    cube.goal_rotate.x += data[id][1][0] * half;
    cube.goal_rotate.y += data[id][1][1] * half;
    cube.goal_rotate.z += data[id][1][2] * half;

    time = 0; // start animation
    toggle_enabled('sigma');
};

function anim_loop(cube) {
    if (time < anim_length) {
        time += 1;
        cube.animate(1 / anim_length);
        console.log(time, anim_length, time / anim_length);
    } else if (time == anim_length) {
        // finished animation
        toggle_enabled('sigma');
        time += 1;
    }
}

export { animateSigma, anim_loop };