import * as THREE from "../../../node_modules/three/src/Three.js";

export default class Objects
{
    
    constructor(scene, objects) 
    {
        this.scene = scene
        this.objects = objects
    }

    createCube(width, height, depth, material = {type: 'type', color: 'color', texture: {
        textureMap: 'map',
        textureBump: 'bump',
        textureNormal: 'normal'
    }}) 
    {
        const cubeGeometry = new THREE.BoxGeometry(width, height, depth, 5, 5)
        
        switch (material.type) {
            case 'Basic':
                if(material.texture != null) {
                    var textureMap = new THREE.TextureLoader().load(material.texture.textureMap)
                    var textureBump = new THREE.TextureLoader().load(material.texture.textureBump)
                    var textureNormal = new THREE.TextureLoader().load(material.texture.textureNormal)
                    var cubeMaterial = new THREE.MeshBasicMaterial({ map: textureMap, bumpMap: textureBump, normalMap: textureNormal })         
                } else if(material.color != null) {
                    var cubeMaterial = new THREE.MeshBasicMaterial({ color: material.color })
                } else {
                    var cubeMaterial = new THREE.MeshBasicMaterial()
                }
                break;
            case 'Phong':
                if(material.texture != null) {
                    var textureMap = new THREE.TextureLoader().load(material.texture.textureMap)
                    var textureBump = new THREE.TextureLoader().load(material.texture.textureBump)
                    var textureNormal = new THREE.TextureLoader().load(material.texture.textureNormal)
                    var cubeMaterial = new THREE.MeshPhongMaterial({ map: textureMap, bumpMap: textureBump, normalMap: textureNormal }) 
                } else if(material.color != null) {
                    var cubeMaterial = new THREE.MeshPhongMaterial({ color: material.color })
                } else {
                    var cubeMaterial = new THREE.MeshPhongMaterial()
                }
                break;
        
            default:
                break;
        }

        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
        cube.receiveShadow = true
        cube.castShadow = true
        this.objects.push(cube)
        this.scene.add(cube)

        return cube
    }

    createFloor(width, height, material = {type: 'type', color: 'color', texture: 'texture'})
    {
        const floorGeometry =  new THREE.PlaneGeometry(width, height, 100, 100)
        switch (material.type) {
            case 'Basic':
                if(material.texture != null) {
                    console.log(material.texture.textureMap)
                    var texture = new THREE.TextureLoader().load(material.texture)
                    var floorMaterial = new THREE.MeshBasicMaterial({ map: texture })          
                } else if(material.color != null) {
                    var floorMaterial = new THREE.MeshBasicMaterial({ color: material.color })
                } else {
                    var floorMaterial = new THREE.MeshBasicMaterial()
                }
                break;
            case 'Phong':
                if(material.texture != null) {
                    var texture = new THREE.TextureLoader().load(material.texture)
                    var floorMaterial = new THREE.MeshPhongMaterial({ map: texture }) 
                } else if(material.color != null) {
                    var floorMaterial = new THREE.MeshPhongMaterial({ color: material.color })
                } else {
                    var floorMaterial = new THREE.MeshPhongMaterial()
                }
                break;
        
            default:
                break;
        }

        const floor = new THREE.Mesh(floorGeometry, floorMaterial)
        floor.rotation.x -= Math.PI / 2
        floor.receiveShadow = true
        floor.castShadow = true
        this.scene.add(floor)


        return floor
    }
}