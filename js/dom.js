import { animateSigma } from './animate.js';

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

    Array.from(document.getElementsByClassName("sigma")).forEach(function (element) {
        element.addEventListener('click', animateSigma(cube));
    });
}

export { add_listeners };