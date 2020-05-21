import * as THREE from '../../../node_modules/three/src/Three.js'

export default class ControlModels {
    constructor(objLoader, mtlLoader, objectsList) {
        this.objLoader = objLoader
        this.mtlLoader = mtlLoader
        this.objectsList = objectsList
    }

    createTrees(scene) {
        this.mtlLoader.setPath('models/Used/')
        this.objLoader.setPath('models/Used/')
        
        this.mtlLoader.load('tree_oak_dark.mtl', (material) => {
            material.preload()
            this.objLoader.setMaterials(material)
            this.objLoader.load('tree_oak_dark.obj', (model) => {
                var obj = model
                var sorteados = []
                var max = 60
                var min = 60

                function randomNumber(valorMaximo, valorMinimo) {
                    if (sorteados.length == valorMaximo) {
                        return
                    }
                    var sugestao = Math.ceil(Math.random() * valorMaximo) - valorMinimo ; // Escolher um numero ao acaso
                    while (sorteados.indexOf(sugestao) >= 0) {  // Enquanto o numero já existir, escolher outro
                        sugestao = Math.ceil(Math.random() * valorMaximo);
                    }
                    sorteados.push(sugestao); // adicionar este numero à array de numeros sorteados para futura referência
                    return sugestao; // devolver o numero único
                }

                for (let index = 0; index < max; index++) {
                    const object = obj.clone()
                    object.traverse((node) => {
                        node.castShadow = true
                    })
                    object.position.set(randomNumber(max, min), 0, randomNumber(max, min))
                    this.objectsList.push(object)
                    scene.add(object)
                }
            });  
        })
    }
}
