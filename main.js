import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);


renderer.render(scene,camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

//scene.add(torus);
torus.position.z = 0;
torus.position.x = 0;

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers
//const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);


function addStar(){
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new  THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star);
}

let numstars = 100;

Array(numstars).fill().forEach(addStar);

// Background
const spaceTexture = new THREE.TextureLoader().load('astronomy.jpg');
scene.background = spaceTexture;

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;


function moveCamera(){
  const t = document.body.getBoundingClientRect().top;

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;


  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;

  if(window.pageYOffset >= sticky){
    navbar.classList.add("sticky");
    console.log("pastnav")
  } else{
    navbar.classList.remove("sticky")
    console.log("not past nav")
  }
}


document.body.onscroll = moveCamera;
moveCamera()




function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // controls.update();

  renderer.render(scene,camera);
}
animate();




/*


function stickyNav (){
  if(window.pageYOffset >= menu.offsetTop){
    navbar.classList.add("sticky");
    console.log("heyo")
  }
  else{
    navbar.classList.remove("sticky")
  }
}



Auto Scroll

let autoscroll = false;

function toggleScroll(){
  if(autoscroll === false){
    autoscroll = true;
  } else{
    autoscroll = false;
  }
}

function pageScroll() {
  if(autoscroll === true){
    window.scrollBy(0,1);
    scrolldelay = setTimeout(pageScroll,10);  
  } else{
    //
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('startscroll');
  if (btn) {
    btn.addEventListener('click', toggleScroll());
  }
});

pageScroll()
*/
