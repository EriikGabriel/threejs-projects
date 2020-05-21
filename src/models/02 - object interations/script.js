import * as THREE from '../../node_modules/three/src/Three.js';
import { GUI } from '../../node_modules/three/examples/jsm/libs/dat.gui.module.js';
import * as TRACK from '../../node_modules/three/examples/jsm/controls/TrackballControls.js'

((doc, win) => {
    function init() {

        //? Armazena instantes de tempo da aplicação 
        const clock = new THREE.Clock()

        //? Cena
        const scene = new THREE.Scene()

        

        //? Cameras
        function perpectiveCameraInit() 
        {
            const camera = new THREE.PerspectiveCamera(45, win.innerWidth / win.innerHeight, 0.1, 2000)
            camera.position.set(5, 5, 5)
            camera.lookAt(scene.position)
            camera.updateMatrixWorld();

            return camera
        }
        
        function trackballCameraInit(camera) {
            var trackballControls = new TRACK.TrackballControls(camera, renderer.domElement)
            trackballControls.rotateSpeed = 1.0
            trackballControls.zoomSpeed = 1.0
            trackballControls.panSpeed = 1.0
            
            return trackballControls
        }
        
        const camera = perpectiveCameraInit()

        //? Renderizador
        function rendererInit() {
            const renderer = new THREE.WebGLRenderer()
            renderer.setClearColor('snow', 1)
            renderer.setSize(win.innerWidth, win.innerHeight)
            doc.body.appendChild(renderer.domElement)

            return renderer
        }

        const renderer = rendererInit()

        //? Objetos
        function createCube
        (width, height, depth, mesh, pos_x = 0, pos_y = 0, pos_z = 0) 
        {
            const cubeGeometry = new THREE.BoxGeometry(width, height, depth, 5, 5, 5)
            const cubeMaterial = new THREE.MeshBasicMaterial({ color: mesh, wireframe: true })

            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
            cube.position.set(pos_x, pos_y, pos_z)
            scene.add(cube)

            return cube
        }

        function createSphere
        (radius, widthSmooth, heightSmooth, mesh, pos_x = 0, pos_y = 0, pos_z = 0) 
        {
            const sphereGeometry = new THREE.SphereGeometry(radius, widthSmooth, heightSmooth)
            const sphereMaterial = new THREE.MeshBasicMaterial({ color: mesh, wireframe: true })

            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
            sphere.position.set(pos_x, pos_y, pos_z)
            scene.add(sphere)

            return sphere
        }

        function createCylinder
        (radiusTop, radiusBottom, height, radiusSegments, heightSegments, mesh, pos_x = 0, pos_y = 0, pos_z = 0) 
        {
            const cylinderGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments)
            const cylinderMaterial = new THREE.MeshBasicMaterial({ color: mesh, wireframe: true })

            const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
            cylinder.position.set(pos_x, pos_y, pos_z)
            scene.add(cylinder)

            return cylinder
        }

        //? Criando e inserindo objetos na cena
        const cube = createCube(1, 1, 1, '#F9C54D')
        const sphere = createSphere(0.5, 30, 30, '#00D1DB', -1, 1, 2)
        const cylinder = createCylinder(0.5, 0.5, 2, 20, 0, '#FF5656', 3, 0, -1)
        
        doc.addEventListener('mousedown', onDocMouseDown)

        //? Declarando os controles da interface dat.GUI
        const controls = {
            velx: 0.05,
            velz: 0.05,
            stop: function() {
                this.velx = 0.01;
                this.velz = 0.01;
            },
            reset: function() {
                this.velx = 0.05;
                this.velz = 0.05;
                cube.scale.x = 1;
                cube.scale.y = 1;
                cube.scale.z = 1;
                sphere.scale.x = 1;
                sphere.scale.y = 1;
                sphere.scale.z = 1;
                cylinder.scale.x = 1;
                cylinder.scale.y = 1;
                cylinder.scale.z = 1;
                cube.material.wireframe = true;
                sphere.material.wireframe = true;
                cylinder.material.wireframe = true;
                cube.material.opacity = 1;
                sphere.material.opacity = 1;
                cylinder.material.opacity = 1;
            },
            enableTrackball: true
        }

        //? Interface dat.GUI: Painel de controle e manipulação dos objetos na cena
        const gui = new GUI({ 
            autoplace: false,
            width: 600
        })

        const velocity = gui.addFolder('Velocity');
        velocity.add(controls, 'velx', 0.05, 0.3).name('Eixo X').listen();
        velocity.add(controls, 'velz', 0.05, 0.3).name('Eixo Z').listen();
        velocity.open();

        const cubeBox = gui.addFolder('Cubo');
        cubeBox.add(cube.scale, 'x', 0, 3).name('Largura').listen();
        cubeBox.add(cube.scale, 'y', 0, 3).name('Altura').listen();
        cubeBox.add(cube.scale, 'z', 0, 3).name('Comprimento').listen();
        cubeBox.add(cube.material, 'wireframe').listen();

        const sphereBox = gui.addFolder('Esfera');
        sphereBox.add(sphere.scale, 'x', 0, 3).name('Largura').listen();
        sphereBox.add(sphere.scale, 'y', 0, 3).name('Altura').listen();
        sphereBox.add(sphere.scale, 'z', 0, 3).name('Comprimento').listen();
        sphereBox.add(sphere.material, 'wireframe').listen();
        
        const cylinderBox = gui.addFolder('Cilindro');
        cylinderBox.add(cylinder.scale, 'x', 0, 3).name('Largura').listen();
        cylinderBox.add(cylinder.scale, 'y', 0, 3).name('Altura').listen();
        cylinderBox.add(cylinder.scale, 'z', 0, 3).name('Comprimento').listen();
        cylinderBox.add(cylinder.material, 'wireframe').listen();

        gui.add(controls, 'stop').name('Parar');
        gui.add(controls, 'reset').name('Resetar');
        gui.add(controls, 'enableTrackball').name('Ativar Trackball')
        
        if(controls.enableTrackball)
        {
            var trackballControls = trackballCameraInit(camera)  
        }
        
        function animate() 
        {
            if(controls.enableTrackball) 
            {
                renderer.domElement.style.cursor = 'grab'
                //? Delta é o tempo passado entre o ultimo frame e o frame atual (Frames per Second)
                const delta = clock.getDelta()

                //? Atualiza a possição da camera
                trackballControls.update(delta)
            } else {
                renderer.domElement.style.cursor = 'default'
            }

            //? Sempre a cena for atualizada, a função é executada
            requestAnimationFrame(animate)

            //? Animação
            cube.rotation.x += controls.velx
            cube.rotation.z += controls.velz

            sphere.rotation.z += controls.velz

            cylinder.rotation.x += controls.velx
            cylinder.rotation.z += controls.velz

            //? Renderizando a cena e a camera
            renderer.render(scene, camera)
        }

        animate()

        function onDocMouseDown(event) 
        {
            let xMouse = event.clientX;
            let yMouse = event.clientY;

            //? Normalizando as coordenadas
            xMouse =  (xMouse / innerWidth) * 2 - 1
            yMouse = -(yMouse / innerHeight) * 2 + 1

            let vectorClick = new THREE.Vector3(xMouse, yMouse, 1)

            //? Converte as coordenadas de tela normalizada, para coordenadas de mundo
            vectorClick = vectorClick.unproject(camera)  

            //? Raycasting: Traça um raio de um ponto ao outro, verificando se houve colisão com algum objeto
            const raycaster = new THREE.Raycaster(camera.position, vectorClick.sub(camera.position).normalize())

            //? Função que 'testa' se o raio colidiu (interceptou) com algum objeto
            const intersects = raycaster.intersectObjects([cube, sphere, cylinder])

            //? Se o vetor intersects não for vazo, houve interseção de um objeto
            if(intersects.length > 0) 
            {
                //? Houve uma colisão (ou seja, clicou em um objeto)
                if(intersects[0].object.material.opacity == 1) { //? Se a opacidade do objeto for 1
                    intersects[0].object.material.transparent = true;
                    intersects[0].object.material.opacity = 0.1;
                } else { //? Se a opacidade do objeto for diferente de 1
                    intersects[0].object.material.transparent = true;
                    intersects[0].object.material.opacity = 1;
                }
            }
        }
    }

    init()

})(document, window);