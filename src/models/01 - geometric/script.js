import * as THREE from '../../node_modules/three/src/Three.js';
import { Vector3, Triangle, Face3 } from '../../node_modules/three/src/Three.js';

((doc, win) => {
    function init() {
        //? Cena
        const scene = new THREE.Scene()

        //? Camera - FOG, Aspect Ratio, View, Far
        const camera = new THREE.PerspectiveCamera(45, win.innerWidth / win.innerHeight, 0.1, 2000)

        //? Renderizador
        const renderer = new THREE.WebGLRenderer()
        renderer.setClearColor('snow', 1)
        renderer.setSize(win.innerWidth, win.innerHeight)
        doc.body.appendChild(renderer.domElement)

        //? Criando objetos

        //* Cube
        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
        const cubeMaterial = new THREE.MeshBasicMaterial({ color: '#22AA1E' })
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

        //* Triangle
        const triangleGeometry = new THREE.Geometry()
        //? Vertices do Triângulo
        const vertice1 = new Vector3(0, 0, 0) //? x y z coordenadas
        const vertice2 = new Vector3(2, 0, 0) //? x y z coordenadas
        const vertice3 = new Vector3(1.5, 2, 0) //? x y z coordenadas

        //? Face do Triângulo
        const face = new THREE.Face3(0, 1, 2)

        triangleGeometry.vertices.push(vertice1) //? Definindo 1º vertice do triangulo
        triangleGeometry.vertices.push(vertice2) //? Definindo 2º vertice do triangulo
        triangleGeometry.vertices.push(vertice3) //? Definindo 3º vertice do triangulo
        triangleGeometry.faces.push(face) //? Definindo face do triângulo

        const triangleMaterial = new THREE.MeshBasicMaterial({ color: 'darkred' })
        const triagle = new THREE.Mesh(triangleGeometry, triangleMaterial)

        //* Sphere
        const sphereGeometry = new THREE.SphereGeometry(0.5, 30, 30)
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 'dodgerblue' })
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

        //? Criando eixos visiveis nos objetos
        const axes = new THREE.AxesHelper(10)

        //? Adicionando os elementos na cena
        scene.add(cube)
        scene.add(triagle)
        scene.add(sphere)
        scene.add(axes)

        //? Posicionando objetos
        triagle.position.set(2, 1, 1)
        sphere.position.set(0, 2, 0)

        //? Posicionando a camera na cena
        camera.position.set(5, 5, 5)
        camera.lookAt(scene.position)

        //? Exibindo uma animação no objeto
        function animate() 
        {
            //? Sempre a cena for atualizada, a função é executada
            requestAnimationFrame(animate)

            //? Animação
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            sphere.rotation.x += 0.01;
            sphere.rotation.y += 0.01;

            triagle.rotation.x += 0.01;

            //? Renderizando a cena e a camera
            renderer.render(scene, camera)
        }

        animate()
    }

    init()

})(document, window);