import type { Composition } from "~scripts/type/type";

import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  ShaderMaterial,
  PlaneGeometry,
} from "three";
import { getCanvasInfo, getCameraFOV } from "~scripts/common/util";

import vertexShader from "~scripts/shader/vertexShader.glsl";
import fragmentShader from "~scripts/shader/fragmentShader.glsl";

const composition: Composition = {
  init,
  scene: new Scene(),
  renderer: null,
  camera: null,
  material: null,
  geometry: null,
  sizes: {
    $canvasWidth: null,
    $canvasHeight: null,
    dpr: Math.min(window.devicePixelRatio, 2),
    segmentAmount: 32,
  },
  cameraInfo: {
    fov: 0,
    aspect: 0,
    near: 0.1,
    far: 1000,
  },
};

function init($canvas: HTMLCanvasElement) {
  const { $canvasWidth, $canvasHeight, $canvasAspect } = getCanvasInfo($canvas);
  composition.sizes.$canvasWidth = $canvasWidth;
  composition.sizes.$canvasHeight = $canvasHeight;

  composition.renderer = new WebGLRenderer({
    canvas: $canvas,
    alpha: true,
    antialias: true,
  });
  composition.renderer.setSize(
    composition.sizes.$canvasWidth,
    composition.sizes.$canvasHeight,
    false,
  );

  composition.cameraInfo.fov = getCameraFOV(
    $canvasHeight,
    composition.cameraInfo.far,
  );
  composition.cameraInfo.aspect = $canvasAspect;
  composition.camera = new PerspectiveCamera(
    composition.cameraInfo.fov,
    composition.cameraInfo.aspect,
    composition.cameraInfo.near,
    composition.cameraInfo.far,
  );
  composition.camera.position.z = composition.cameraInfo.far;

  composition.material = new ShaderMaterial({
    // wireframe: true,
    vertexShader,
    fragmentShader,
    uniforms: {
      uTexture: { value: null },
      uProgress: { value: 0 },
      uAlpha: { value: 1 },
      uTime: { value: 0 },
    },
  });
  composition.geometry = new PlaneGeometry(
    1,
    1,
    composition.sizes.segmentAmount,
    composition.sizes.segmentAmount,
  );
}

export default composition;
