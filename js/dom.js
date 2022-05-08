import { animateSigma, set_animate_speed } from './animate.js';
import { credits } from './tour.js';

function add_listeners(cube) {
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
}

export { add_listeners };