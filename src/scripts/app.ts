import type { App } from "~scripts/type/type";

import composition from "~scripts/common/composition";

import { Scene, Mesh } from "three";

const app: App = {
  init,
  createMesh,
  tick,
  scene: new Scene(),
  $canvas: null,
  meshes: null,
};

function init($canvas: HTMLCanvasElement) {
  app.$canvas = $canvas;
}

function createMesh() {
  if (!composition.geometry || !composition.material) return;

  const geometry = composition.geometry;
  const material = composition.material?.clone();
  const mesh = new Mesh(geometry, material);

  app.scene.add(mesh);

  const o = {};
}

function tick() {
  if (!composition.renderer || !composition.camera) return;
  composition.renderer.render(app.scene, composition.camera);

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
