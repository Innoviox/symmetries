import * as THREE from 'three';
import { make_sided_material, line } from './draw.js';
import { sphere_colors, diagonal_colors } from './utils.js';

function get_points(line) {
    let points = line.geometry.attributes.position.array;
    return chunk(points, 3).map(i => new THREE.Vector3(...i));
}

export default class Cube {
    constructor(width, position) {
        self.cube = new THREE.BoxGeometry(width, width, width);
        self.cubeMesh = new THREE.Mesh(self.cube, make_sided_material(self.cube));
        self.cubeMesh.position.copy(position);

        const edges = new THREE.EdgesGeometry(self.cube);
        self.lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));

        self.spheres = [];
        self.goal_spheres = [];

        for (let i = 0; i < 8; i++) {
            const sphere = new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({ color: sphere_colors[i] }));
            sphere.position.set(cubeMesh.position.x + (i % 2 == 0 ? 1 : -1) * 5,
                cubeMesh.position.y + (i % 4 < 2 ? 1 : -1) * 5,
                cubeMesh.position.z + (i < 4 ? 1 : -1) * 5);
            self.goal_spheres.push(sphere.position.clone());
            self.spheres.push(sphere);
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

        self.goal_rotate = new THREE.Vector3(0, 0, 0);
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

    animate(delta) {
        for (let i = 0; i < self.goal_diagonals.length; i++) {
            let goal = self.goal_diagonals[i];
            let current = get_points(self.diagonals[i]);

            let new_points = []
            for (let j = 0; j < current.length; j++) {
                new_points.push(new THREE.Vector3(
                    current[j].x + (goal[j].x - current[j].x) * delta,
                    current[j].y + (goal[j].y - current[j].y) * delta,
                    current[j].z + (goal[j].z - current[j].z) * delta));
            }

            self.diagonals[i].geometry.setFromPoints(new_points);
        }

        for (let i = 0; i < self.goal_spheres.length; i++) {
            // spheres[i].position.copy(goal_spheres[i]);
            self.spheres[i].position.x = self.spheres[i].position.x + (self.goal_spheres[i].x - self.spheres[i].position.x) * delta;
            self.spheres[i].position.y = self.spheres[i].position.y + (self.goal_spheres[i].y - self.spheres[i].position.y) * delta;
            self.spheres[i].position.z = self.spheres[i].position.z + (self.goal_spheres[i].z - self.spheres[i].position.z) * delta;
        }

        self.cubeMesh.rotation.x = self.cubeMesh.rotation.x + (self.goal_rotate.x - self.cubeMesh.rotation.x) * delta;
        self.cubeMesh.rotation.y = self.cubeMesh.rotation.y + (self.goal_rotate.y - self.cubeMesh.rotation.y) * delta;
        self.cubeMesh.rotation.z = self.cubeMesh.rotation.z + (self.goal_rotate.z - self.cubeMesh.rotation.z) * delta;
    }
};