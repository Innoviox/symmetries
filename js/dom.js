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
    console.log(goal_rotate);
    time = 1999; // start animation
}

// Array.from(document.getElementsByClassName("helper-flip")).forEach(function (element) {
//     element.addEventListener('click', flip);
// });

// Array.from(document.getElementsByClassName("helper-rot")).forEach(function (element) {
//     element.addEventListener('click', rot);
// });
function add_listeners(cube) {
    document.getElementById("switched").addEventListener('click', function (b) {
        if (b.target.checked) {
            cube.show_cube();
        } else {
            cube.hide_cube();
        }
    });

    Array.from(document.getElementsByClassName("sigma")).forEach(function (element) {
        element.addEventListener('click', animateSigma(cube));
    });
}

export { add_listeners };