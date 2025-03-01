import type { Composition } from "~scripts/type/type";

import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  ShaderMaterial,
  PlaneGeometry,
  Mesh,
} from "three";
import { getCanvasInfo } from "~scripts/common/util";

const composition: Composition = {
  init,
  createMesh,
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
    fov: 75,
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

  composition.cameraInfo.aspect = $canvasAspect;
  composition.camera = new PerspectiveCamera(
    composition.cameraInfo.fov,
    composition.cameraInfo.aspect,
    composition.cameraInfo.near,
    composition.cameraInfo.far,
  );
  composition.camera.position.z = 5;

  composition.material = new ShaderMaterial({ wireframe: true });
  composition.geometry = new PlaneGeometry(
    3,
    3,
    composition.sizes.segmentAmount,
    composition.sizes.segmentAmount,
  );
}

function createMesh() {
  if (composition.geometry && composition.material) {
    const geometry = composition.geometry;
    const material = composition.material?.clone();
    const mesh = new Mesh(geometry, material);

    composition.scene.add(mesh);
  }
}

export default composition;
