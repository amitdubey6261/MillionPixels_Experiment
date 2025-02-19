import * as THREE from 'three';
import './style.css'
import { OrbitControls, RoomEnvironment } from 'three/examples/jsm/Addons.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { color } from 'three/tsl';

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let oControls: OrbitControls;
let stats: Stats;
let lod : THREE.LOD ; 

const c_scene = () => {
    scene = new THREE.Scene();
    stats = new Stats();
    document.body.appendChild(stats.dom) ; 

    c_Objects();
}

const c_Objects = () => {

    const geometry1 = new THREE.CircleGeometry(undefined , 3 , 0 , Math.PI*2 ); 
    const geometry2 = new THREE.CircleGeometry(undefined , 5 , 0 , Math.PI*2 ); 
    const geometry3 = new THREE.IcosahedronGeometry();
    const material = new THREE.MeshPhysicalMaterial({color : 0xffff00 , side : THREE.DoubleSide } ); 

    const m1 = new THREE.Mesh(geometry1 , material)
    const m2 = new THREE.Mesh(geometry2 , material)
    const m3 = new THREE.Mesh(geometry3 , material); 

    scene.add(m1)
    scene.add(m2)
    scene.add(m3)

    lod = new THREE.LOD();

    lod.addLevel( m1  , 10);
    lod.addLevel( m2 , 5);
    lod.addLevel( m3 , 0); 

    scene.add(lod); 



    // const count = 10 ;
    // const geometry = new THREE.IcosahedronGeometry();
    // const material = new THREE.MeshPhysicalMaterial({ wireframe: false });

    // const instancedMesh = new THREE.InstancedMesh(geometry, material, count) ; 

    // scene.add(instancedMesh);

    // const dummy = new THREE.Object3D() ; 

    // for( let i = 0  ; i<count ; i++ ){
    //     dummy.position.x = Math.random() * 10 - 5 ; 
    //     dummy.position.y = 0 ; 
    //     dummy.position.z = Math.random() * 10 - 5 ; 

    //     dummy.updateMatrix() ; 
    //     instancedMesh.setMatrixAt( i  , dummy.matrix ); 
    // }

}

const c_camera = () => {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, .5, 1000);
    camera.position.set(0, 0, -5);
    scene.add(camera);
}

const c_renderer = () => {
    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    oControls = new OrbitControls(camera, renderer.domElement);

    //   scene.add( new THREE.AmbientLight(0xffffff , 1));
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 1.0).texture;

    document.body.appendChild(renderer.domElement);
}

const animate = () => {

    renderer.render(scene, camera);

    stats.update()

    window.requestAnimationFrame(animate);
}

const _init = () => {
    c_scene();
    c_camera();
    c_renderer();
    animate();
}

_init(); 