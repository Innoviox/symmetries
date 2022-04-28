import * as THREE from 'three';
import { make_sided_material, line } from './draw.js';
import { sphere_colors, diagonal_colors } from './utils.js';
export default class Cube {
    constructor(width, position) {
        self.cube = new THREE.BoxGeometry(width, width, width);
        self.cubeMesh = new THREE.Mesh(self.cube, make_sided_material(self.cube));
        self.cubeMesh.position.copy(position);

        const edges = new THREE.EdgesGeometry(self.cube);
        self.lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
        // scene.add(lines);

        // palette from https://mokole.com/palette.html
        self.spheres = [];
        self.goal_spheres = [];


        for (let i = 0; i < 8; i++) {
            const sphere = new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({ color: sphere_colors[i] }));
            sphere.position.set(cubeMesh.position.x + (i % 2 == 0 ? 1 : -1) * 5,
                cubeMesh.position.y + (i % 4 < 2 ? 1 : -1) * 5,
                cubeMesh.position.z + (i < 4 ? 1 : -1) * 5);
            self.goal_spheres.push(sphere.position.clone());
            self.spheres.add(sphere);
        }


        self.goal_diagonals = [];
        self.goal_diagonals.push([self.spheres[7].position.clone(), self.spheres[0].position.clone()]);
        self.goal_diagonals.push([self.spheres[2].position.clone(), self.spheres[5].position.clone()]);
        self.goal_diagonals.push([self.spheres[3].position.clone(), self.spheres[4].position.clone()]);
        self.goal_diagonals.push([self.spheres[6].position.clone(), self.spheres[1].position.clone()]);

        self.diagonals = [];

        for (let i = 0; i < self.goal_diagonals.length; i++) {
            self.diagonals.push(line(self.goal_diagonals[i][0], self.goal_diagonals[i][1], diagonal_colors[i])); // todo color
        }
    }

    add_to_scene(scene) {
        scene.add(self.lines);
        for (let i = 0; i < self.spheres.length; i++) {
            scene.add(self.spheres[i]);
        }

        for (let i = 0; i < self.diagonals.length; i++) {
            scene.add(diagonals[i]);
        }
    }

    animate() { }
};