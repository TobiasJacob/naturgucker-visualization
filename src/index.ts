import "./main.css"
import * as THREE from 'three';
import { createCanvas } from "./canvas";
import { createEarth } from "./earth";
import { cameraControls } from "./cameraControls";

const { scene, camera } = createCanvas();
cameraControls(camera);
createEarth(scene);
