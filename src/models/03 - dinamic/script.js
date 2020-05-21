import * as THREE from '../../node_modules/three/build/three.module.js'
import * as TRACK from '../../node_modules/three/examples/jsm/controls/TrackballControls.js'
import Stats from '../../node_modules/three/examples/jsm/libs/stats.module.js'

((doc, win) => {

    init()

    function init() 
    {
        //? Cena e Relógio
        const clock = new THREE.Clock()
        const scene = new THREE.Scene()

        //? Camera
        const camera = new THREE.PerspectiveCamera(45, win.innerWidth / win.innerHeight, 1, 2000)
        camera.position.set(1, 1, -5);
		camera.lookAt(scene.position);
        camera.updateMatrixWorld();

        let container = doc.querySelector('#container')

        let stats = new Stats()
        stats.showPanel(0);
        container.appendChild(stats.dom);

        //? Renderizador
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setClearColor('snow', 1)
        renderer.setSize(win.innerWidth, win.innerHeight)
        doc.body.appendChild(renderer.domElement)

        win.addEventListener('resize', () => {
            let width = win.innerWidth
            let height = win.innerHeight
            camera.aspect = width / height
            camera.updateProjectionMatrix()

            renderer.setSize(width, height)
        })

        //? Camera Trackball 
        const trackballControls = new TRACK.TrackballControls(camera, renderer.domElement)
        trackballControls.rotateSpeed = 1.0
        trackballControls.zoomSpeed = 1.0
        trackballControls.panSpeed = 1.0

        const urls = [
            'cube-map/posx.jpg', 'cube-map/negx.jpg',
            'cube-map/posy.jpg', 'cube-map/negy.jpg',
            'cube-map/posz.jpg', 'cube-map/negz.jpg'
        ]

        //? Colocando uma textura de fundo
        const textureBackground = new THREE.CubeTextureLoader().load(urls)

        //? Criar uma camera para o efeito de reflexão da esfera
        const sphereCamera = new THREE.CubeCamera(1, 1000, 1000)
        sphereCamera.position.set(0, 0, 0)
        
        scene.background = textureBackground

        const cube = createCube(1, 1, 1, 2, 1, 0)
        const sphere = createSphere(1, 30, 30, sphereCamera)
        scene.add(sphereCamera)
        
        function createCube
        (width, height, depth, pos_x = 0, pos_y = 0, pos_z = 0) 
        {
            //? Carregando uma textura para o objeto 
            const texture = new THREE.TextureLoader().load('textures/crate.gif')
            
            const cubeGeometry = new THREE.BoxGeometry(width, height, depth, 5, 5, 5)
            const cubeMaterial = new THREE.MeshBasicMaterial({ map: texture })

            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
            cube.position.set(pos_x, pos_y, pos_z)
            scene.add(cube)

            return cube
        }

        function createSphere
        (radius, widthSmooth, heightSmooth, sphereCamera, pos_x = 0, pos_y = 0, pos_z = 0) 
        {
            //? Criando uma luz direcional
            const light = new THREE.DirectionalLight('white')
            light.position.set(1, 0, 0).normalize()
            scene.add(light)

            const sphereGeometry = new THREE.SphereGeometry(radius, widthSmooth, heightSmooth)
            const sphereMaterial = new THREE.MeshBasicMaterial({
                envMap: sphereCamera.renderTarget
            })

            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
            sphere.position.set(pos_x, pos_y, pos_z)
            scene.add(sphere)

            return sphere
        }

        function animate() {

            stats.begin();

            const delta = clock.getDelta()

            //? Atualiza a possição da camera e altera o cursor
            trackballControls.update(delta)
            renderer.domElement.style.cursor = 'grab'
    
            //? Animação
            cube.rotation.x += 0.01
            cube.rotation.y += 0.01
    
            sphere.rotation.y += 0.01
    
            //? Renderizando a cena e a camera
            renderer.render(scene, camera)

            //? Atualiza a camera da esfera com reflexão
            sphereCamera.update(renderer, scene)

            stats.end();

            requestAnimationFrame(animate)
        }
    
        animate()
    }

})(document, window);