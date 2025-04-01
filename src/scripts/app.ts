import type {
  $,
  App,
  CompositionObjects,
  ImageStoreValue,
  Uniforms,
} from "~scripts/type/type";

import { PlaneGeometry, ShaderMaterial, Mesh, Texture } from "three";

import composition from "~scripts/common/composition";
import util from "~scripts/common/util";

import vertexShader from "~scripts/shader/vertexShader.glsl";
import fragmentShader from "~scripts/shader/fragmentShader.glsl";

const app: App = {
  $canvas: document.querySelector("[data-element='canvas']"),
  $images: document.querySelectorAll("[data-element='image']"),
  $links: document.querySelectorAll("[data-element='link']"),
  event: {
    timeoutID: null,
    RESIZE_TIME: 300,
  },
  sizes: {
    segmentAmount: 32,
  },
  meshStore: {
    geometry: null,
    material: null,
    mesh: null,
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
    $links: app.$links,
  };

  return $;
}

function createMesh(compositionObjects: CompositionObjects) {
  const { scene } = compositionObjects;

  const uniforms: Uniforms = {
    uTexture: { value: null },
  };

  const geometry = new PlaneGeometry(
    1,
    1,
    app.sizes.segmentAmount,
    app.sizes.segmentAmount,
  );
  const material = new ShaderMaterial({
    wireframe: false,
    vertexShader,
    fragmentShader,
    uniforms,
  });
  const mesh = new Mesh(geometry, material);

  scene.add(mesh);

  app.meshStore.geometry = geometry;
  app.meshStore.material = material;
  app.meshStore.mesh = mesh;
}

function setupEvents(
  $: $,
  compositionObjects: CompositionObjects,
  imageStore: Map<string, ImageStoreValue>,
) {
  window.addEventListener("resize", () => _onResize($, compositionObjects));

  $.$links.forEach(($link) => {
    // リンクからdataImage属性を取得
    const dataImagePath = $link.getAttribute("data-imagePath");

    const mouseEnterHandler = () =>
      _onMouseEnter($link, dataImagePath!, imageStore);
    $link.addEventListener("mouseenter", mouseEnterHandler);
  });
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
    camera.fov = util.getCameraFOV(
      $canvasBounds.height,
      composition.cameraInfo.far,
    );
    camera.updateProjectionMatrix();

    //構成値アップデート
    composition.cameraInfo.aspect = $canvasBounds.aspect;

    app.event.timeoutID = null;
  }, app.event.RESIZE_TIME);
}

function _onMouseEnter(
  $link: Element,
  dataImagePath: string,
  imageStore: Map<string, ImageStoreValue>,
) {
  imageStore.forEach((value, key) => {
    if (dataImagePath === key) {
      if (!app.meshStore.material || !app.meshStore.mesh) return;
      // app.meshStore.material.uniforms.uTexture.value = value.texture;
      app.meshStore.mesh.scale.set(value.width, value.height, 0);
    }
  });
}

function _resizeMeshes() {}

export default app;
