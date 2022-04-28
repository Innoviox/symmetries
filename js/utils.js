// palette from https://mokole.com/palette.html

let diagonal_colors = [0xff0000, 0x00ff00, 0x0000ff, 0x8b32a8];
let sphere_colors = [0x191970, 0x006400, 0xff0000, 0xffd600, 0x00ff00, 0x00ffff, 0xff00ff, 0xffb6c1];
let face_colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0x00ffff, 0xff00ff];

function toggle_enabled(class_name) {
    console.log("toggling");
    let elements = document.getElementsByClassName(class_name);
    for (let i = 0; i < elements.length; i++) {
        elements[i].disabled = !elements[i].disabled;
    }
}

export { diagonal_colors, sphere_colors, face_colors, toggle_enabled };