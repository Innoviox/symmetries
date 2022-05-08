import { animateSigma, set_animate_speed, reset_cube } from './animate.js';
import { credits, rotation_table } from './tour.js';

function add_listeners(cube, controls) {
    document.getElementById("switched").addEventListener('click', function (b) {
        if (b.target.checked) {
            cube.on = true;
            cube.show_cube();
        } else {
            cube.on = false;
            cube.hide_cube();
        }
    });

    document.getElementById("slider").addEventListener('mouseup', function (b) {
        set_animate_speed(b.target.value);
    });

    Array.from(document.getElementsByClassName("sigma")).forEach(function (element) {
        element.addEventListener('click', animateSigma(cube));
    });

    document.getElementById("credits").addEventListener('click', credits);
    document.getElementById("rot-table").addEventListener('click', rotation_table);

    document.getElementById("reset-cube").addEventListener('click', () => reset_cube(cube, controls));
}

export { add_listeners };