import "./main.css"
import * as THREE from 'three';
import { createCanvas } from "./canvas";
import { createEarth } from "./earth";

const { scene, camera } = createCanvas();
createEarth(scene);
