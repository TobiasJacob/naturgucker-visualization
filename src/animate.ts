import * as THREE from 'three';

export function startAnimation(renderer: THREE.Renderer, scene: THREE.Scene, camera: THREE.Camera, earthMesh: THREE.Mesh) {
    const start = new Date().getTime();
    function animate() {
        const time = new Date().getTime() - start;

        const ang = time / 100000;

        (earthMesh.material as any).uniforms.sunDirection.value = new THREE.Vector3(Math.sin(ang), 0, Math.cos(ang));
        earthMesh.setRotationFromEuler(new THREE.Euler(0, time / 20000, 0, "ZYX"))

        requestAnimationFrame(animate);

        renderer.render(scene, camera);
    };

    animate();
}