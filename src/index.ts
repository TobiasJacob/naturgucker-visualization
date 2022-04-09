import "./main.css"
import * as THREE from 'three';
import { createCanvas } from "./canvas";
import { createEarth } from "./earth";
import { cameraControls } from "./cameraControls";
import { startAnimation } from "./animate";

const { scene, camera, renderer } = createCanvas();
const earthMesh = createEarth(scene);
cameraControls(camera);

startAnimation(renderer, scene, camera, earthMesh);
