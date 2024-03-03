import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/**********
** SETUP **
***********/
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

/**********
** SCENE **
***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(
    60,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(1, -.00211, 0)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/***********
** MESHES **
************/
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('cyan'),
    side: THREE.DoubleSide
})

// caveWall
const caveWallGeometry = new THREE.PlaneGeometry(20, 20)
const caveWall = new THREE.Mesh(caveWallGeometry, caveMaterial)
caveWall.rotation.y = Math.PI * 0.5
caveWall.position.set(-5, 0, 0)
caveWall.receiveShadow = true
scene.add(caveWall)

// barrierWall
const barrierWallGeometry = new THREE.PlaneGeometry(20, 2)
const barrierWall = new THREE.Mesh(barrierWallGeometry, caveMaterial)
barrierWall.rotation.y = Math.PI * 0.5
barrierWall.position.set(10, -1.5, 0)
scene.add(barrierWall)

// caveFloor
const caveFloorGeometry = new THREE.PlaneGeometry(20, 20)
const caveFloor = new THREE.Mesh(caveFloorGeometry, caveMaterial)
caveFloor.rotation.x = Math.PI * 0.5
caveFloor.position.set(0, -2.5, 0)
scene.add(caveFloor)

// OBJECTS
// torusKnot( 5, 3, 5, 16 )
const torusKnotGeometry = new THREE.TorusKnotGeometry( 1, .6, 5.5, 16 );
const torusKnotMaterial = new THREE.MeshNormalMaterial()
const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial)
torusKnot.position.set(1.5, 3, 30)
torusKnot.castShadow = true
scene.add(torusKnot)

// const torusGeometry = new THREE.TorusKnotGeometry( 1, .6, 5.5, 16 );
// const torusMaterial = new THREE.MeshNormalMaterial()
// const torus = new THREE.Mesh(torusGeometry, torusMaterial)
// torusKnot.position.set(1.5, 3, 30)
// torusKnot.castShadow = true
// scene.add(torus)

const geometry = new THREE.TorusGeometry( 2.5, .2, 20, 30 ); 
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
const torus = new THREE.Mesh( geometry, material ); scene.add( torus );
torus.position.set(1.5, -5, -.1)
torus.rotation.set(0,80,10)
torus.castShadow = true



// SUN
const sunGeometry = new THREE.SphereGeometry()
const sunMaterial = new THREE.MeshLambertMaterial({
    emissive: new THREE.Color('orange'),
    emissiveIntensity: 40
})
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
scene.add(sun)

/***********
** LIGHTS **
************/
// /*
// // Ambient Light
// const ambientLight = new THREE.AmbientLight(
//     new THREE.Color('white')
// )
// scene.add(ambientLight)
// */

// Direcional Light
// const directionalLight = new THREE.DirectionalLight(
//     new THREE.Color('white'),
//     0.5
// )

const light = new THREE.PointLight( 0x0b0A17, 57500, 900 );
// THREE.PointLightLight.target = caveWall
light.position.set(23, 9, 0)
light.castShadow = true; // default false
// THREE.PointLightLight.castShadow = true
// directionalLight.shadow.mapSize.width = 1024
// directionalLight.shadow.mapSize.height = 1024
scene.add( light );

light.shadow.mapSize.width = 2000; // default
light.shadow.mapSize.height = 2000; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default


// Directional Light Helper
//const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)




/*******
** UI **
********/
//

/*
const ui = new dat.GUI()

const uiObject = {}

uiObject.reset = () =>
{
    directionalLight.position.set(8.6, 1.7, 0)
}

// Directional Light
const lightPositionFolder = ui.addFolder('Directional Light Position')

lightPositionFolder
    .add(directionalLight.position, 'x')
    .min(-10)
    .max(20)
    .step(0.1)

lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)

lightPositionFolder
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(10)
    .step(0.1)

lightPositionFolder
    .add(uiObject, 'reset')
    .name('Reset position')
   
   
    /*
/*********************
** DOM INTERACTIONS **
**********************/

// domObject
const domObject = {
    firstChange: false,
    secondChange: false,
    thirdChange: false,
    fourthChange: false,
    fifthChange: false,
    sixthChange: false,
    seventhChange: false,
}

//continue-reading
document.querySelector('#continue-reading').onclick = function() {
    document.querySelector('#part-two').classList.remove('hidden')
    document.querySelector('#part-one').classList.add('hidden')
    domObject.part = 2
    domObject.fourthChange = true;
}

// restart
document.querySelector('#restart').onclick = function() {
    document.querySelector("#part-two").classList.add('hidden')
    document.querySelector('#part-one').classList.remove('hidden')
}


// first change
document.querySelector('#first-change').onclick = function() {
    domObject.firstChange = true

}

// second change
document.querySelector('#second-change').onclick = function() {
 domObject.secondChange = true
}
// third change
document.querySelector('#third-change').onclick = function() {
    domObject.thirdChange = true
    
}

// fourth change
document.querySelector('#fourth-change').onclick = function() {
    
}

// fifth change
document.querySelector('#fifth-change').onclick = function() {
 
}

//sixth change
document.querySelector('#sixth-change').onclick = function() {
 
}


/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

// Animate
const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Animate Objects
    torusKnot.rotation.y = elapsedTime

    torusKnot.position.z = Math.sin(elapsedTime * 0.5) 

    // Update directionalLightHelper
    //directionalLightHelper.update()

    // Update sun position to match directionalLight position
    sun.position.copy( light.position)

    console.log(camera.position)

    // Controls
    controls.update()

    // DOM INTERACTIONS
// first-change
if(domObject.firstChange){
    // torusKnot.rotation.y = Math.sin(elapsedTime * 1)
    // torusKnot.rotation.z = elapsedTime
    // torus.position.y = elapsedTime
    torus.castShadow = true
    torus.position.y = Math.cos(elapsedTime *2.6) *4;     
}

//second-change
if(domObject.secondChange){
    // torus.position.y = 3.5
    domObject.firstChange = false
    domObject.secondChange = true
}

// third-change
if(domObject.thirdChange){
    light.position.set(25, 9, 0)

}

// fourth-change
if(domObject.fourthChange){
    camera.position.set(20, 10, 25)
 
}

// fifth-change
if(domObject.fifthChange){

}

// sixth-change
if(domObject.sixthChange){

}
    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)

    //FOG MODIFIER
    scene.fog = new THREE.Fog( 0x2c50cc, 1, 17 );
}

animation()