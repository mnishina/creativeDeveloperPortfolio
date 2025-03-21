import type { $, App, CompositionObjects } from "~scripts/type/type";

const app: App = {
  $canvas: document.querySelector("[data-element='canvas']"),
  $images: document.querySelectorAll("[data-element='image']"),

  init,
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

function setupEvents($: $, compositionObjects: CompositionObjects) {
  _onResize($, compositionObjects);
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
}

export default app;
