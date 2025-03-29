import type { $, App, CompositionObjects } from "~scripts/type/type";

import { PlaneGeometry, ShaderMaterial, Mesh } from "three";

import composition from "~scripts/common/composition";
import util from "~scripts/common/util";

import vertexShader from "~scripts/shader/vertexShader.glsl";
import fragmentShader from "~scripts/shader/fragmentShader.glsl";

const app: App = {
  $canvas: document.querySelector("[data-element='canvas']"),
  $images: document.querySelectorAll("[data-element='image']"),
  event: {
    timeoutID: null,
    RESIZE_TIME: 300,
  },
  sizes: {
    segmentAmount: 32,
  },

  init,
  createMesh,
  setupEvents,
  render,
};

function init() {
  const $ = {
    $canvas: app.$canvas,
    $images: app.$images,
  };

  return $;
}

function createMesh(compositionObjects: CompositionObjects) {
  const { scene } = compositionObjects;

  const geometry = new PlaneGeometry(
    100,
    100,
    app.sizes.segmentAmount,
    app.sizes.segmentAmount,
  );
  const material = new ShaderMaterial({
    wireframe: true,
    vertexShader,
    fragmentShader,
  });
  const mesh = new Mesh(geometry, material);

  scene.add(mesh);
}

function setupEvents($: $, compositionObjects: CompositionObjects) {
  window.addEventListener("resize", () => _onResize($, compositionObjects));
}

function render(compositionObjects: CompositionObjects) {
  const { scene, camera, renderer } = compositionObjects;

  if (scene && camera && renderer) {
    renderer.render(scene, camera);
  }

  requestAnimationFrame(() => render(compositionObjects));
}

function _onResize($: $, compositionObjects: CompositionObjects) {
  const { $canvas, $images } = $;
  const { scene, camera, renderer } = compositionObjects;

  if (!$canvas) return;

  if (app.event.timeoutID !== null) {
    clearTimeout(app.event.timeoutID);
  }

  app.event.timeoutID = setTimeout(() => {
    //canvasアップデート
    const $canvasBounds = util.getCanvasBounds($canvas);

    //rendererアップデート
    renderer.setSize($canvasBounds.width, $canvasBounds.height, false);

    //cameraアップデート
    camera.aspect = $canvasBounds.aspect;
    camera.updateProjectionMatrix();

    //構成値アップデート
    composition.cameraInfo.aspect = $canvasBounds.aspect;

    app.event.timeoutID = null;
  }, app.event.RESIZE_TIME);
}

function _resizeMeshes() {}

export default app;
