import * as THREE from 'three';

import earthmap from './textures/8k_earth_daymap.jpeg';
import earthmapnight from './textures/8k_earth_nightmap.jpeg';
// import earthbump from './textures/earthbump1k.jpg';
import earthnormal from './textures/2k_earth_normal_map.jpg';
import earthspec from './textures/earthspec1k.jpg';

const shader = {
    vertex: `
        varying vec2 vUV;
        varying vec3 vNormal;
        varying vec3 vViewCoord;

        void main() {
            vUV = uv;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vViewCoord = vec3(mvPosition);
            vNormal = normalMatrix * normal;
            gl_Position = projectionMatrix * mvPosition;
        }
    `,
    fragment: `
        uniform sampler2D dayTexture;
        uniform sampler2D nightTexture;
        uniform sampler2D normalMap;
        uniform sampler2D specularMap;

        uniform vec3 sunDirection;

        varying vec2 vUV;
        varying vec3 vNormal;
        varying vec3 vViewCoord;

        void main(void) {
            vec3 specularColor = vec3(0.3, 0.3, 0.3);

            vec3 dayColor = texture2D(dayTexture, vUV).rgb;
            vec3 nightColor = texture2D(nightTexture, vUV).rgb;
            vec3 vSunDir = normalize(mat3(viewMatrix) * sunDirection);
            vec3 vNormalN = normalize(vNormal);
            vec3 vViewDir = normalize(-vViewCoord);

            vec3 halfVector = normalize(vViewDir + vSunDir);
            float shininess = 30.0;
            float specular_intensity = pow(max(dot(vNormalN, halfVector), 0.0), shininess);
            specular_intensity *= 0.3 + 0.7 * texture2D(specularMap, vUV).r;

            float cosineAngleSunToNormal = dot(vNormalN, vSunDir);
            float cosineAngleSunToNormalScaled = clamp(cosineAngleSunToNormal * 4.0, -1.0, 1.0);
            float mixAmount = cosineAngleSunToNormalScaled * 0.5 + 0.5;

            float intensity = 0.5 + 0.5 * clamp(cosineAngleSunToNormal, 0.0, 1.0);

            vec3 color = mix(nightColor, dayColor * intensity, mixAmount);
            color += specular_intensity * specularColor;
            color *= 0.8;
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
                value: new THREE.Vector3(1.0, 0, 0)
            },
            dayTexture: {
                value: THREE.ImageUtils.loadTexture(earthmap)
            },
            nightTexture: {
                value: THREE.ImageUtils.loadTexture(earthmapnight)
            },
            normalMap: {
                value: THREE.ImageUtils.loadTexture(earthnormal)
            },
            specularMap: {
                value: THREE.ImageUtils.loadTexture(earthspec)
            }
        },
        vertexShader: shader.vertex,
        fragmentShader: shader.fragment,
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

