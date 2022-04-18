const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry();
// const edges = new THREE.EdgesGeometry(geometry);
// const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
// geometry.faces[0].color.setHex(Math.random() * 0xffffff);
// geometry.faces[1].color.setHex(Math.random() * 0xffffff);
// geometry.faces[2].color.setHex(Math.random() * 0xffffff);
// geometry.faces[3].color.setHex(Math.random() * 0xffffff);
// geometry.faces[4].color.setHex(Math.random() * 0xffffff);
// geometry.faces[5].color.setHex(Math.random() * 0xffffff);
// scene.add(geometry);
// scene.add(line);

const piece = new THREE.BoxGeometry(1, 1, 1).toNonIndexed();
const material = new THREE.MeshBasicMaterial({
    vertexColors: true
});
const positionAttribute = piece.getAttribute('position');
const colors = [];

const color = new THREE.Color();

for (let i = 0; i < positionAttribute.count; i += 6) {

    color.setHex(0xffffff * Math.random());

    colors.push(color.r, color.g, color.b, 0.5);
    colors.push(color.r, color.g, color.b, 0.5);
    colors.push(color.r, color.g, color.b, 0.5);

    colors.push(color.r, color.g, color.b, 0.5);
    colors.push(color.r, color.g, color.b, 0.5);
    colors.push(color.r, color.g, color.b, 0.5);
} // for

// define the new attribute
piece.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));
cube = new THREE.Mesh(piece, material);


const edges = new THREE.EdgesGeometry(geometry);
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
scene.add(line);
scene.add(cube);

function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
};

camera.position.z = 5;

animate();