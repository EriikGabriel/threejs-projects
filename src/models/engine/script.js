import * as THREE from '../../node_modules/three/src/Three.js';
import { PointerLockControls } from '../../node_modules/three/examples/jsm/controls/PointerLockControls.js';
import { MTLLoader } from '../../node_modules/three/examples/jsm/loaders/MTLLoader.js'
import { OBJLoader } from '../../node_modules/three/examples/jsm/loaders/OBJLoader.js'
import Pause from './menu/Pause.js'
import Objects from './objects/Objects.js'
import ControlModels from './models/ControlModels.js'
import Player from './player/Player.js'

export default function Game() {
    const doc = document
    const win = window
    
    const blocker = doc.querySelector('#blocker')

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(90, win.innerWidth / win.innerHeight, 0.1, 2000)
    camera.position.set(0, 1, 5)

    const ambientLight = new THREE.AmbientLight('white', 0.2)
    scene.add(ambientLight)

    const light = new THREE.PointLight('white', 0.8, 18)
    light.position.set(-3, 6, -3)
    light.castShadow = true
    light.shadow.camera.near = 0.1
    light.shadow.camera.far = 25
    scene.add(light)

    const renderer = new THREE.WebGLRenderer()
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.BasicShadowMap
    renderer.setSize(win.innerWidth, win.innerHeight)
    doc.body.appendChild(renderer.domElement)

    var controls = new PointerLockControls(camera, document.body);
    scene.add(controls.getObject());
    Pause(controls)

    var prevTime = performance.now();
    var objects = [];

    var moveForward = false;
	var moveBackward = false;
	var moveLeft = false;
	var moveRight = false;
    var canJump = false;
    var numObjects = 0
    
    sessionStorage.setItem('models', [])

	var velocity = new THREE.Vector3();
    var direction = new THREE.Vector3();
    var raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);
    
    const objLoader = new OBJLoader()
    const mtlLoader = new MTLLoader()
    
    const controlModels = new ControlModels(objLoader, mtlLoader, objects)

    const object = new Objects(scene, objects)
    let player = new Player(2)
    
    function controller(event) {
        var moves = player.playerControls(event, moveForward, moveBackward, moveLeft, moveRight, canJump, velocity)
        moveForward = moves.forward
        moveBackward = moves.backward
        moveLeft = moves.left
        moveRight = moves.right
        canJump = moves.jump
    }

    doc.addEventListener('keydown', controller, false);
	doc.addEventListener('keyup', controller, false);     
    
    const cube = object.createCube(3, 1, 3, { 
        type: 'Phong', 
        texture: {
            textureMap: 'textures/crate/crate_diffuse.png',
            textureBump: 'textures/crate/crate_bump.png',
            textureNormal: 'textures/crate/crate_normal.png'
        }
        
    })
    cube.position.set(0, 0.5, 0)

    const floor = object.createFloor(200, 200, { type: 'Phong', color: 'darkolivegreen' }) 

    controlModels.createTrees(scene)

    //? Game Logic
    function update() 
    {

        //? Player Logic
        if (blocker.style.display == 'none') {      
            raycaster.ray.origin.copy(controls.getObject().position);
			raycaster.ray.origin.y -= -1;
			var intersections = raycaster.intersectObjects(objects, true);
            var onObject = intersections.length > 0;
                         
			var time = performance.now();
			var delta = (time - prevTime) / 1000;

			velocity.x -= velocity.x * 10.0 * delta;
            velocity.z -= velocity.z * 10.0 * delta;
            
            velocity.y -= 18.5 * 55.0 * delta; // 200.0 = mass
                    
			direction.z = Number( moveForward ) - Number(moveBackward);
			direction.x = Number(moveRight) - Number(moveLeft);
			direction.normalize(); // this ensures consistent movements in all directions

			if(moveForward || moveBackward) velocity.z -= direction.z * 100.0 * delta;
			if(moveLeft || moveRight) velocity.x -= direction.x * 100.0 * delta;

			if(onObject === true) {           
                if(intersections[0].object.name != 'tree_oak_dark') {
                    let objectHeight = intersections[0].object.geometry.parameters.height

                    if(objectHeight <= player.height) {
                        velocity.y = Math.max(0, velocity.y);
                        controls.getObject().position.y = player.height + 2 
                    }else {
                        velocity.x = 5
                        velocity.z = 5
                    }
                    canJump = false;
                } else {
                    velocity.x = 7
                    velocity.z = 7
                }
			}

			controls.moveRight(-velocity.x * delta);
			controls.moveForward(-velocity.z * delta);
			controls.getObject().position.y += (velocity.y * delta); // new behavior

			if(controls.getObject().position.y < player.height) {
				velocity.y = 0;
				controls.getObject().position.y = player.height;
				canJump = false;
            }
			prevTime = time
        }     
    }

    //? Render Scene
    function render() 
    {
        renderer.render(scene, camera)
    }

    //? Run game Loop (Update -> Render -> Repeat)
    function GameLoop() 
    {
        requestAnimationFrame(GameLoop)

        update()
        render()
    }

    //? Resize Window
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    win.addEventListener('resize', onWindowResize, false)

    GameLoop()

}