import { Main, PerspectiveCameraAuto } from '@three.ez/main';
import { AmbientLight, Color, DirectionalLight, IcosahedronGeometry, MeshLambertMaterial, Scene } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { InstancedMesh2 } from '@three.ez/instanced-mesh';
import { PRNG } from './random.js';
import './style.css'

const count = 1000000
const spawnRange = 5000;

const main = new Main();
const random = new PRNG(count);
const white = new Color('white');
const camera = new PerspectiveCameraAuto(70, 0.1, 500).translateZ(100).translateY(20);
const scene = new Scene();
scene.continuousRaycasting = true;

const geometry = new IcosahedronGeometry(1 , 5);
const material = new MeshLambertMaterial();
const instancedMesh = new InstancedMesh2(geometry, material);

instancedMesh.addLOD(new IcosahedronGeometry(1, 1), new MeshLambertMaterial({ color: 'white', wireframe: false }), 100);
instancedMesh.addLOD(new IcosahedronGeometry(1, 0), new MeshLambertMaterial({ color: 'white', wireframe: false }), 50);


instancedMesh.addInstances(count, (object) => {
    object.color = 'white';
});

instancedMesh.updateInstances((object) => {
    object.position.x = random.range(-spawnRange, spawnRange);
    object.position.y = 0;
    object.position.z = random.range(-spawnRange, spawnRange);
});


instancedMesh.computeBVH();

instancedMesh.on('pointerintersection', (e) => {
    const id = e.intersection.instanceId;

    if (instancedMesh.getColorAt(id).equals(white)) {
        instancedMesh.setColorAt(id, random.next() * 0xffffff);
    }
});

instancedMesh.raycastOnlyFrustum = true;

const dirLight = new DirectionalLight();
camera.add(dirLight);

scene.add(instancedMesh, new AmbientLight());

const controls = new OrbitControls(camera, main.renderer.domElement);
controls.autoRotate = true;

main.createView({ scene, camera, backgroundColor: 'white' });