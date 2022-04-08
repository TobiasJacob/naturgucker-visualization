import * as THREE from 'three';

import earthmap1k from './textures/earthmap1k.jpg';
import earthbump1k from './textures/earthbump1k.jpg';

export function createEarth(scene: THREE.Scene) {
    const geometry = new THREE.SphereGeometry(1.0, 32, 32)
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const material = new THREE.MeshPhongMaterial()
    const earthMesh = new THREE.Mesh(geometry, material)
    scene.add(earthMesh)

    material.map = THREE.ImageUtils.loadTexture(earthmap1k);

    material.bumpMap = THREE.ImageUtils.loadTexture(earthbump1k)
    material.bumpScale = 0.05

};

