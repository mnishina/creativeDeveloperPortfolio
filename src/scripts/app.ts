import type {
  $,
  App,
  CompositionObjects,
  MeshStore,
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
    100,
    100,
    app.sizes.segmentAmount,
    app.sizes.segmentAmount,
  );
  const material = new ShaderMaterial({
    wireframe: true,
    vertexShader,
    fragmentShader,
    uniforms,
  });
  const mesh = new Mesh(geometry, material);

  scene.add(mesh);

  app.meshStore = {
    geometry,
    material,
    mesh,
  };
}

function setupEvents(
  $: $,
  compositionObjects: CompositionObjects,
  imageStore: Map<string, Texture>,
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
    camera.updateProjectionMatrix();

    //構成値アップデート
    composition.cameraInfo.aspect = $canvasBounds.aspect;

    app.event.timeoutID = null;
  }, app.event.RESIZE_TIME);
}

function _onMouseEnter(
  $link: Element,
  dataImagePath: string,
  imageStore: Map<string, Texture>,
) {
  // console.log(dataImagePath);

  // その属性値をmapで収集したキーと比較
  // 比較したキーからtextureを取得
  // 取得したtextureをuTextureに設定
  // fragmentShaderでuTextureを表示
  imageStore.forEach((value, key) => {
    if (dataImagePath === key) {
      console.log(key);
    }
  });
}

function _resizeMeshes() {}

export default app;
