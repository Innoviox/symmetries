// palette from https://mokole.com/palette.html

let diagonal_colors = [0xc505ff, 0x00ff00, 0x0000ff, 0xff0000];
let sphere_colors = [0xc505ff, 0xff0000, 0x00ff00, 0x0000ff, 0x0000ff, 0x00ff00, 0xff0000, 0xc505ff];
let face_colors = [0xff0000, 0x00ff00, 0x0000ff, 0xc505ff, 0x000000, 0xffffff];

function toggle_enabled(class_name) {
    let elements = document.getElementsByClassName(class_name);
    for (let i = 0; i < elements.length; i++) {
        elements[i].disabled = !elements[i].disabled;
    }
}

export { diagonal_colors, sphere_colors, face_colors, toggle_enabled };