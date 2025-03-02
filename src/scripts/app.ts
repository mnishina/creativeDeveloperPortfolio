import type { App, CreateMesh } from "~scripts/type/type";

import { Mesh } from "three";

import composition from "~scripts/common/composition";

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

      const imagePath = image.getAttribute("src");
      const uTexture = textureCache.get(imagePath!);

      const geometry = composition.geometry;
      const material = composition.material?.clone();
      material.uniforms.uTexture.value = uTexture;

      const mesh = new Mesh(geometry, material);

      composition.scene.add(mesh);

      const o = {
        geometry,
        material,
        mesh,
      };

      return o;
    });

    console.log(aaa);

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
