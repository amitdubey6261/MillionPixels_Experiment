import * as THREE from 'three' ; 
import './style.css'
import { OrbitControls} from 'three/examples/jsm/Addons.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { WebGPURenderer } from 'three/webgpu';

let scene : THREE.Scene ; 
let camera : THREE.PerspectiveCamera ; 
let renderer : WebGPURenderer ; 
let oControls : OrbitControls ; 
let stats : Stats ; 

const c_scene = () =>{
  scene = new THREE.Scene() ;
  stats = new Stats() ; 
  document.body.appendChild(stats.dom)

  // const geometry = new THREE.IcosahedronGeometry(1  , 0) ; 
  // const material = new THREE.MeshBasicMaterial({wireframe : true}) ; 

  // scene.add(new THREE.Mesh(geometry , material)) ; 

  c_Objects();  
}

const c_Objects = () =>{
  const count = 1000000 ; 
  const color = new THREE.Color();
  // const geometry = new THREE.SphereGeometry(.3 , 8 , 6 ) ; 
  const geometry = new THREE.IcosahedronGeometry( 1 , 0 ) ; 
  const material = new THREE.MeshPhysicalMaterial({wireframe : false});   

  const instancedMesh = new THREE.InstancedMesh(geometry , material , count)


  const amount = 100;
  const spacing = 5 ; 

  let i = 0;
  const offset = ( amount - 1 ) / 2;

  const matrix = new THREE.Matrix4();

  for ( let x = 0; x < amount; x ++ ) {

    for ( let y = 0; y < amount; y ++ ) {

      for ( let z = 0; z < amount; z ++ ) {

        matrix.setPosition( (offset - x)*spacing, (offset - y)*spacing, (offset - z )*spacing);

        instancedMesh.setMatrixAt( i, matrix );
        instancedMesh.setColorAt( i, color );

        i ++;

      }

    }

  }

  scene.add(instancedMesh) ; 
}

const c_camera = () =>{
  camera = new THREE.PerspectiveCamera(60 , window.innerWidth/window.innerHeight , .5 , 10000 ) ; 
  camera.position.set( 0 , 0 , -50 ) ; 
  scene.add(camera) ; 
}

const c_renderer = () =>{
  renderer = new WebGPURenderer({antialias : false}) ; 
  renderer.setSize(window.innerWidth , window.innerHeight); 
  oControls = new OrbitControls(camera , renderer.domElement ); 

  scene.add( new THREE.AmbientLight(0xffffff , 1));

  document.body.appendChild(renderer.domElement);
}

const animate = () =>{

  renderer.render(scene , camera ); 

  stats.update()

  window.requestAnimationFrame(animate); 
}

const _init = () => {
  c_scene() ; 
  c_camera();
  c_renderer();
  animate(); 
}

_init() ; 