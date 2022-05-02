import * as THREE from 'three';
import { make_sided_material, line } from './draw.js';
import { sphere_colors, diagonal_colors } from './utils.js';
import { chunk } from 'lodash';

function get_points(line) {
    let points = line.geometry.attributes.position.array;
    return chunk(points, 3).map(i => new THREE.Vector3(...i));
}

export default class Cube {
    spheres = [];
    diagonals = [];

    goal_spheres = [];
    goal_diagonals = [];
    goal_rotate = new THREE.Vector3(0, 0, 0);

    constructor(width, position) {
        this.cube = new THREE.BoxGeometry(width, width, width);
        this.cubeMesh = new THREE.Mesh(this.cube, make_sided_material(this.cube));
        this.cubeMesh.position.copy(position);

        const edges = new THREE.EdgesGeometry(this.cube);
        this.lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));

        for (let i = 0; i < 8; i++) {
            const sphere = new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({ color: sphere_colors[i] }));
            sphere.position.set(this.cubeMesh.position.x + (i % 2 == 0 ? 1 : -1) * 5,
                this.cubeMesh.position.y + (i % 4 < 2 ? 1 : -1) * 5,
                this.cubeMesh.position.z + (i < 4 ? 1 : -1) * 5);
            this.goal_spheres.push(sphere.position.clone());
            this.spheres.push(sphere);
        }

        this.goal_diagonals.push([this.spheres[7].position.clone(), this.spheres[0].position.clone()]);
        this.goal_diagonals.push([this.spheres[2].position.clone(), this.spheres[5].position.clone()]);
        this.goal_diagonals.push([this.spheres[3].position.clone(), this.spheres[4].position.clone()]);
        this.goal_diagonals.push([this.spheres[6].position.clone(), this.spheres[1].position.clone()]);

        for (let i = 0; i < this.goal_diagonals.length; i++) {
            this.diagonals.push(line(this.goal_diagonals[i][0], this.goal_diagonals[i][1], diagonal_colors[i])); // todo color
        }
    }

    add_to_scene(scene) {
        scene.add(this.lines);
        for (let i = 0; i < this.spheres.length; i++) {
            scene.add(this.spheres[i]);
        }

        for (let i = 0; i < this.diagonals.length; i++) {
            scene.add(this.diagonals[i]);
        }

        scene.add(this.cubeMesh);
    }

    animate(delta) {
        for (let i = 0; i < this.goal_diagonals.length; i++) {
            let goal = this.goal_diagonals[i];
            let current = get_points(this.diagonals[i]);

            let new_points = []
            for (let j = 0; j < current.length; j++) {
                new_points.push(new THREE.Vector3(
                    current[j].x + (goal[j].x - current[j].x) * delta,
                    current[j].y + (goal[j].y - current[j].y) * delta,
                    current[j].z + (goal[j].z - current[j].z) * delta));
            }

            this.diagonals[i].geometry.setFromPoints(new_points);
        }

        for (let i = 0; i < this.goal_spheres.length; i++) {
            // spheres[i].position.copy(goal_spheres[i]);
            this.spheres[i].position.x = this.spheres[i].position.x + (this.goal_spheres[i].x - this.spheres[i].position.x) * delta;
            this.spheres[i].position.y = this.spheres[i].position.y + (this.goal_spheres[i].y - this.spheres[i].position.y) * delta;
            this.spheres[i].position.z = this.spheres[i].position.z + (this.goal_spheres[i].z - this.spheres[i].position.z) * delta;
        }

        this.cubeMesh.rotation.x = this.cubeMesh.rotation.x + (this.goal_rotate.x - this.cubeMesh.rotation.x) * delta;
        this.cubeMesh.rotation.y = this.cubeMesh.rotation.y + (this.goal_rotate.y - this.cubeMesh.rotation.y) * delta;
        this.cubeMesh.rotation.z = this.cubeMesh.rotation.z + (this.goal_rotate.z - this.cubeMesh.rotation.z) * delta;
    }
};