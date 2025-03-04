import type { App, CreateMesh } from "~scripts/type/type";

import { Mesh } from "three";

import composition from "~scripts/common/composition";

import { getImageBounds, getImagePosition } from "~scripts/common/util";

const app: App = {
  init,
  createMesh,
  tick,
  $canvas: null,
  meshes: null,
};

function init($canvas: HTMLCanvasElement) {
  app.$canvas = $canvas;
}

async function createMesh({ $images, textureCache }: CreateMesh) {
  return new Promise((resolve) => {
    const aaa = [...$images].map((image) => {
      if (!composition.geometry || !composition.material) return;

      const { $imageRect, $imageWidth, $imageHeight, $imageX, $imageY } =
        getImageBounds(image);

      const { meshX, meshY } = getImagePosition(app.$canvas!, image);

      const imagePath = image.getAttribute("src");
      const uTexture = textureCache.get(imagePath!);

      const geometry = composition.geometry;
      const material = composition.material?.clone();
      material.uniforms.uTexture.value = uTexture;

      const mesh = new Mesh(geometry, material);
      mesh.position.x = meshX;
      mesh.position.y = meshY;
      mesh.scale.set($imageWidth, $imageHeight, 0);

      composition.scene.add(mesh);

      const o = {
        $imageRect,
        $imageX,
        $imageY,
        geometry,
        material,
        mesh,
      };

      return o;
    });

    resolve(aaa);
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

export default app;
