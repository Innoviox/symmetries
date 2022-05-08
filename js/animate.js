import { data } from './data.js';
import { toggle_enabled } from './utils.js';

let anim_length = 100;
let time = anim_length + 1; // not hacky dw

var diagonals_to_spheres = { 0: [7, 0], 1: [2, 5], 2: [3, 4], 3: [6, 1] };
const half = Math.PI / 2;

var inversions_enabled = false;

function set_animate_speed(speed) {
    if (time == anim_length + 1) {
        time = speed + 1;
    }
    anim_length = speed;
}

let animateSigma = cube => b => {
    let id = b.target.id;
    if (id === '') { // workaround for clicking on span
        id = b.target.parentElement.id;
    }

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

        if (inversions_enabled && inversions[from] === 1) {
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


    cube.save_originals();
    time = 0; // start animation

    toggle_enabled('sigma');
    if (anim_length != 0) {
        cube.hide_cube();
    }
};

function anim_loop(cube) {
    if (anim_length == 0 && time == 0) {
        cube.animate(1);
    } else if (time < anim_length) {
        time += 1;
        cube.animate(time / anim_length);
        return;
    }

    if (time == anim_length) {
        // finished animation
        toggle_enabled('sigma');
        cube.show_cube();
        time += 1;
    }
}

export { animateSigma, anim_loop, set_animate_speed };