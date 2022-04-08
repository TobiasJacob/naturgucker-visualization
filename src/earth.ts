import * as THREE from 'three';

import earthmap from './textures/8k_earth_daymap.jpeg';
import earthmapnight from './textures/8k_earth_nightmap.jpeg';
// import earthbump from './textures/earthbump1k.jpg';
import earthnormal from './textures/2k_earth_normal_map.jpg';
import earthspec from './textures/earthspec1k.jpg';

const shader = {
    vertex: `
        varying vec2 vUv;
        varying vec3 vNormal;

        void main() {
            vUv = uv;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vNormal = normalMatrix * normal;
            gl_Position = projectionMatrix * mvPosition;
        }
    `,
    fragment: `
        uniform sampler2D dayTexture;
        uniform sampler2D nightTexture;

        uniform vec3 sunDirection;

        varying vec2 vUv;
        varying vec3 vNormal;

        void main(void) {
            vec3 dayColor = texture2D(dayTexture, vUv).rgb;
            vec3 nightColor = texture2D(nightTexture, vUv).rgb;
            vec3 vSunDir = mat3(viewMatrix) * sunDirection;

            float cosineAngleSunToNormal = dot(normalize(vNormal), vSunDir);

            cosineAngleSunToNormal = clamp(cosineAngleSunToNormal * 5.0, -1.0, 1.0);

            float mixAmount = cosineAngleSunToNormal * 0.5 + 0.5;

            vec3 color = mix(nightColor, dayColor, mixAmount);

            gl_FragColor = vec4(color, 1.0);
        }
    `

}


export function createEarth(scene: THREE.Scene) {
    const geometry = new THREE.SphereGeometry(1.0, 32, 32)
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const material = new THREE.MeshPhongMaterial();
    const earthMaterial = new THREE.ShaderMaterial({
        // bumpScale: 5,
        // specular: new THREE.Color(0x333333),
        // shininess: 50,
        uniforms: {
            sunDirection: {
                value: new THREE.Vector3(1, 0, 0)
            },
            dayTexture: {
                value: THREE.ImageUtils.loadTexture(earthmap)
            },
            nightTexture: {
                value: THREE.ImageUtils.loadTexture(earthmapnight)
            }
        },
        vertexShader: shader.vertex,
        fragmentShader: shader.fragment
    });

    const earthMesh = new THREE.Mesh(geometry, earthMaterial)
    scene.add(earthMesh)

    material.map = THREE.ImageUtils.loadTexture(earthmap);

    // material.bumpMap = THREE.ImageUtils.loadTexture(earthbump);
    // material.bumpScale = 0.02;
    material.normalMap = THREE.ImageUtils.loadTexture(earthnormal);
    material.normalScale.set(2, 2);
    material.specularMap = THREE.ImageUtils.loadTexture(earthspec);
    material.specular = new THREE.Color('gray');
    material.shininess = 3;
};

