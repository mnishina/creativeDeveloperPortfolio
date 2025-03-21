import type { $, Composition } from "~scripts/type/type";

import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PlaneGeometry,
  ShaderMaterial,
  Mesh,
} from "three";

import util from "~scripts/common/util";

import vertexShader from "~scripts/shader/vertexShader.glsl";
import fragmentShader from "~scripts/shader/fragmentShader.glsl";

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
  sizes: {
    segmentAmount: 32,
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

  const geometry = new PlaneGeometry(
    100,
    100,
    composition.sizes.segmentAmount,
    composition.sizes.segmentAmount,
  );
  const material = new ShaderMaterial({
    wireframe: true,
    vertexShader,
    fragmentShader,
  });
  const mesh = new Mesh(geometry, material);

  composition.scene.add(mesh);

  const compositionObjects = {
    scene: composition.scene,
    camera: composition.camera,
    renderer: composition.renderer,
  };

  return compositionObjects;
}

export default composition;
