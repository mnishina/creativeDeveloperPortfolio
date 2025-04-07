import type { $, Composition } from "~scripts/type/type";

import { Scene, PerspectiveCamera, WebGLRenderer } from "three";

import util from "~scripts/common/util";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const composition: Composition = {
  scene: null,
  camera: null,
  renderer: null,
  cameraInfo: {
    fov: undefined,
    aspect: undefined,
    near: 1,
    far: 10,
  },
  controls: null,

  init,
  setupComposition,
};

function init() {}

function setupComposition($: $) {
  const { $canvas } = $;
  if (!$canvas) return;

  const $canvasBounds = util.getCanvasBounds($canvas);

  composition.scene = new Scene();

  composition.cameraInfo.fov = util.getCameraFOV(
    $canvasBounds.height,
    composition.cameraInfo.far,
  );
  composition.cameraInfo.aspect = $canvasBounds.width / $canvasBounds.height;
  composition.camera = new PerspectiveCamera(
    composition.cameraInfo.fov,
    composition.cameraInfo.aspect,
    composition.cameraInfo.near,
    composition.cameraInfo.far,
  );
  composition.camera.position.z = composition.cameraInfo.far;

  composition.renderer = new WebGLRenderer({
    canvas: $canvas,
    alpha: true,
    antialias: true,
  });
  composition.renderer.setSize(
    $canvasBounds.width,
    $canvasBounds.height,
    false,
  );

  const controls = new OrbitControls(
    composition.camera,
    composition.renderer.domElement,
  );
  controls.enableDamping = true; // スムーズな動き
  controls.dampingFactor = 0.05; // 減衰係数
  controls.enableZoom = true; // ズーム可能
  controls.enablePan = true; // パン可能
  controls.enableRotate = true; // 回転可能
  composition.controls = controls;

  const compositionObjects = {
    scene: composition.scene,
    camera: composition.camera,
    renderer: composition.renderer,
  };

  return compositionObjects;
}

export default composition;
