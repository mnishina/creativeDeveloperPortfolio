import type {
  $,
  App,
  CompositionObjects,
  ImageStoreValue,
  Uniforms,
} from "~scripts/type/type";

import { PlaneGeometry, ShaderMaterial, Mesh } from "three";
import { gsap } from "gsap";

import composition from "~scripts/common/composition";
import util from "~scripts/common/util";

import vertexShader from "~scripts/shader/vertexShader.glsl";
import fragmentShader from "~scripts/shader/fragmentShader.glsl";

const app: App = {
  $canvas: document.querySelector("[data-element='canvas']"),
  $images: document.querySelectorAll("[data-element='image']"),
  $links: document.querySelectorAll("[data-element='link']"),
  $list: document.querySelectorAll('[data-element="list"]'),
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
  state: {
    isMeshVisible: false,
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
    $list: app.$list,
  };

  return $;
}

function createMesh(compositionObjects: CompositionObjects) {
  const { scene } = compositionObjects;

  const uniforms: Uniforms = {
    uTexture: { value: null },
    uTextureCurrent: { value: null },
    uAlpha: { value: 0 },
    uMosaicProgress: { value: 0 },
    uProgress: { value: 0 },
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
  $.$links.forEach(($link) => {
    // リンクからdataImage属性を取得
    const dataImagePath = $link.getAttribute("data-imagePath");

    const linkEnterHandler = () =>
      _onLinkEnter($link, dataImagePath!, imageStore);
    $link.addEventListener("mouseenter", linkEnterHandler);
  });

  $.$list.forEach(($list) => {
    $list.addEventListener("mouseenter", () => _onListEnter());
  });
  $.$list.forEach(($list) => {
    $list.addEventListener("mouseleave", () => _onListLeave());
  });

  // window.addEventListener("mousemove", (event) => {
  //   const { $canvas } = $;
  //   if (!$canvas) return;
  //   const $canvasBounds = util.getCanvasBounds($canvas);

  //   _onMouseMove(event, $canvasBounds.width, $canvasBounds.height);
  // });

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
    camera.fov = util.getCameraFOV(
      $canvasBounds.height,
      composition.cameraInfo.far,
    );
    camera.updateProjectionMatrix();

    //構成値アップデート
    composition.cameraInfo.aspect = $canvasBounds.aspect;
    composition.cameraInfo.fov = camera.fov;

    app.event.timeoutID = null;
  }, app.event.RESIZE_TIME);
}

function _onLinkEnter(
  $link: Element,
  dataImagePath: string,
  imageStore: Map<string, ImageStoreValue>,
) {
  imageStore.forEach((value, key) => {
    if (dataImagePath === key) {
      if (!app.meshStore.material || !app.meshStore.mesh) return;

      // 現在のテクスチャを保存
      // const currentTexture = app.meshStore.material.uniforms.uTextureCurrent.value;

      app.meshStore.material.uniforms.uTexture.value = value.texture;
      app.meshStore.mesh.scale.set(value.width, value.height, 0);
    }
  });
}

function _onListEnter() {
  if (!app.state.isMeshVisible && app.meshStore.material) {
    gsap.to(app.meshStore.material.uniforms.uAlpha, {
      value: 1,
      duration: 0.2,
      ease: "power4.out",
    });

    gsap.to(app.meshStore.material.uniforms.uMosaicProgress, {
      value: 1,
      duration: 1.2,
      ease: "power4.out",
      // onUpdate: () => {
      //   console.log(
      //     "Progress:",
      //     app.meshStore.material?.uniforms.uMosaicProgress.value,
      //   );
      // },
    });
  }

  app.state.isMeshVisible = true;
}
function _onListLeave() {
  if (app.state.isMeshVisible && app.meshStore.material) {
    gsap.to(app.meshStore.material.uniforms.uAlpha, {
      value: 0,
      duration: 0.2,
      ease: "power4.out",
    });

    gsap.to(app.meshStore.material.uniforms.uMosaicProgress, {
      value: 0,
      duration: 1.2,
      ease: "power4.out",
    });
  }

  app.state.isMeshVisible = false;
}

function _onMouseMove(
  event: MouseEvent,
  $canvasWidth: number,
  $canvasHeight: number,
) {
  //マウス座標を-1~1に正規化
  const mouseX = (event.clientX / $canvasWidth) * 2 - 1;
  const mouseY = -(event.clientY / $canvasHeight) * 2 + 1;

  const x = util.mapRange(mouseX, -1, 1, -$canvasWidth / 2, $canvasWidth / 2);
  const y = util.mapRange(mouseY, -1, 1, -$canvasHeight / 2, $canvasHeight / 2);

  if (!app.meshStore.mesh) return;

  app.meshStore.mesh?.position.set(x, y, 0);
}

export default app;
