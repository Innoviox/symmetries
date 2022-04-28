import * as THREE from 'three';
import { make_sided_material, line } from './draw.js';

export class Cube {
    constructor(width, position) {
        self.cube = new THREE.BoxGeometry(width, width, width);
        self.cubeMesh = new THREE.Mesh(self.cube, make_sided_material(self.cube));
        cubeMesh.position.copy(position);

        const edges = new THREE.EdgesGeometry(cube);
        const lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
        // scene.add(lines);

        // palette from https://mokole.com/palette.html
        let spheres = [];
        spheres.push(new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({ color: 0x191970 })));
        spheres.push(new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({ color: 0x006400 })));
        spheres.push(new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({ color: 0xff0000 })));
        spheres.push(new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({ color: 0xffd700 })));
        spheres.push(new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({ color: 0x00ff00 })));
        spheres.push(new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({ color: 0x00ffff })));
        spheres.push(new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({ color: 0xff00ff })));
        spheres.push(new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({ color: 0xffb6c1 })));

        spheres[0].position.set(cubeMesh.position.x + 5, cubeMesh.position.y + 5, cubeMesh.position.z + 5);
        spheres[1].position.set(cubeMesh.position.x - 5, cubeMesh.position.y + 5, cubeMesh.position.z + 5);
        spheres[2].position.set(cubeMesh.position.x + 5, cubeMesh.position.y - 5, cubeMesh.position.z + 5);
        spheres[3].position.set(cubeMesh.position.x - 5, cubeMesh.position.y - 5, cubeMesh.position.z + 5);
        spheres[4].position.set(cubeMesh.position.x + 5, cubeMesh.position.y + 5, cubeMesh.position.z - 5);
        spheres[5].position.set(cubeMesh.position.x - 5, cubeMesh.position.y + 5, cubeMesh.position.z - 5);
        spheres[6].position.set(cubeMesh.position.x + 5, cubeMesh.position.y - 5, cubeMesh.position.z - 5);
        spheres[7].position.set(cubeMesh.position.x - 5, cubeMesh.position.y - 5, cubeMesh.position.z - 5);
        var goal_spheres = spheres.map(i => i.position.clone());

        for (let i = 0; i < spheres.length; i++) {
            scene.add(spheres[i]);
        }

        var goal_diagonals = [];
        goal_diagonals.push([spheres[7].position.clone(), spheres[0].position.clone()]);
        goal_diagonals.push([spheres[2].position.clone(), spheres[5].position.clone()]);
        goal_diagonals.push([spheres[3].position.clone(), spheres[4].position.clone()]);
        goal_diagonals.push([spheres[6].position.clone(), spheres[1].position.clone()]);

        let diagonals = [];
        let diagonal_colors = [0xff0000, 0x00ff00, 0x0000ff, 0x8b32a8];
        for (let i = 0; i < goal_diagonals.length; i++) {
            diagonals.push(line(goal_diagonals[i][0], goal_diagonals[i][1], diagonal_colors[i])); // todo color
            scene.add(diagonals[i]);
        }
    }

    add_to_scene(scene) {

    }

    animate() { }
};