import * as THREE from 'three';

export function createCanvas() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.001, 10);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(10, 0, 0);
    scene.add(light);

    const ambient_light = new THREE.AmbientLight(0xffffff, 0.3);
    ambient_light.position.set(10, 10, 10);
    scene.add(ambient_light);

    function animate() {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
    };

    animate();
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    return { scene, camera }
}
