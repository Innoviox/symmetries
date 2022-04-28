import * as THREE from 'three';
import { face_colors } from './utils.js';

function make_sided_material(piece) {
    const material = new THREE.MeshBasicMaterial({
        vertexColors: true
    });
    const colors = [];

    const color = new THREE.Color();

    const positionAttribute = piece.getAttribute('position');

    for (let i = 0; i < positionAttribute.count; i += 3) {
        color.setHex(face_colors[i / 3], 'srgb-linear');

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

export { make_sided_material, line };