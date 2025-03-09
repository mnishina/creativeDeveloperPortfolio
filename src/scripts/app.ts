import type { App, CreateMesh, Meshes } from "~scripts/type/type";

import { Mesh } from "three";

import composition from "~scripts/common/composition";

import { getImageBounds, getImagePosition } from "~scripts/common/util";

const app: App = {
  init,
  createMesh,
  setupEvents,
  tick,
  $canvas: null,
  meshes: [],
};

function init($canvas: HTMLCanvasElement) {
  app.$canvas = $canvas;
}

async function createMesh({ $images, textureCache }: CreateMesh) {
  return new Promise((resolve) => {
    const meshes = [...$images].map(($image) => {
      if (!composition.geometry || !composition.material) return;

      const { $imageRect, $imageWidth, $imageHeight, $imageLeft, $imageTop } =
        getImageBounds($image);

      const { meshLeft, meshTop } = getImagePosition(app.$canvas!, $image);

      const imagePath = $image.getAttribute("src");
      const uTexture = textureCache.get(imagePath!);

      const geometry = composition.geometry;
      const material = composition.material?.clone();
      material.uniforms.uTexture.value = uTexture;

      const mesh = new Mesh(geometry, material);
      mesh.position.x = meshLeft;
      mesh.position.y = meshTop;
      mesh.scale.set($imageWidth, $imageHeight, 0);

      composition.scene.add(mesh);

      const o = {
        $image,
        $imageRect,
        $imageLeft,
        $imageTop,
        geometry,
        material,
        mesh,
      };

      app.meshes?.push(o);

      return o;
    });

    console.log(app.meshes);

    resolve(meshes);
  });
}

function setupEvents() {
  window.addEventListener("resize", () => {
    // 新しいcanvas取得とapp.$canvasに再設定
    // camera, rendererのサイズ再設定
    // メッシュの設定
    app.meshes?.forEach((mesh) => _onResize(mesh));
  });
}

function tick() {
  if (!composition.renderer || !composition.camera) return;
  composition.renderer.render(composition.scene, composition.camera);

  // if (composition.mesh) {
  //   composition.mesh.rotation.x += 0.01;
  //   composition.mesh.rotation.y += 0.0015;
  //   composition.mesh.rotation.z += 0.015;
  // }

  requestAnimationFrame(() => {
    tick();
  });
}

function _onResize(mesh: Meshes) {
  if (!app.$canvas) return;
  console.log("resize");
  const { meshLeft, meshTop } = getImagePosition(app.$canvas, mesh.$image);

  mesh.mesh.position.x = meshLeft;
  mesh.mesh.position.y = meshTop;
}

export default app;
