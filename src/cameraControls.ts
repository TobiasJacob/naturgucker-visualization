import * as THREE from 'three';


function lla2xyz({ lat, lon, r }: { lat: number, lon: number, r: number }) {
    var x = r * Math.cos(lat) * Math.cos(lon);
    var z = r * Math.cos(lat) * Math.sin(lon);
    var y = r * Math.sin(lat);
    return { x, y, z };
}

function updateCam(camera: THREE.PerspectiveCamera, ang: { lat: number, lon: number, r: number }) {
    const camPos = lla2xyz(ang);
    camera.up = new THREE.Vector3(0, 1, 0);
    camera.position.x = camPos.x;
    camera.position.y = camPos.y;
    camera.position.z = camPos.z;
    camera.lookAt(0, 0, 0);
}

export function cameraControls(camera: THREE.PerspectiveCamera) {
    const ang = { lat: 0.4, lon: 0.1, r: 4.0 };
    updateCam(camera, ang);

    window.onmousemove = ((ev: MouseEvent) => {
        if (ev.buttons == 1) {
            ang.lon += ev.movementX / 1000. * ang.r;
            ang.lat += ev.movementY / 1000. * ang.r;
            ang.lat = Math.max(Math.min(ang.lat, Math.PI / 2 - 0.01), -Math.PI / 2 + 0.01)

            updateCam(camera, ang);
        }
    })

    window.onwheel = ((ev: WheelEvent) => {
        const closest = 1.00;
        ang.r += -ev.deltaY / 2000. * (ang.r - closest);
        ang.r = Math.max(Math.min(ang.r, 10), closest + 0.02)
        updateCam(camera, ang);
    })

}