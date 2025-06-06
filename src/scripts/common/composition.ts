import type { $, Composition } from "~scripts/type/type";

import { Scene, PerspectiveCamera, WebGLRenderer } from "three";

import util from "~scripts/common/util";

const composition: Composition = {
  scene: null,
  camera: null,
  renderer: null,
  cameraInfo: {
    fov: undefined,
    aspect: undefined,
    near: 0.1,
    far: 1000,
  },

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

  const compositionObjects = {
    scene: composition.scene,
    camera: composition.camera,
    renderer: composition.renderer,
  };

  return compositionObjects;
}

export default composition;
