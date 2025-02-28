import type { App } from "~scripts/type/type";

import composition from "~scripts/common/composition";

const app: App = {
  init,
  tick,
  $canvas: null,
};

function init($canvas: HTMLCanvasElement) {
  app.$canvas = $canvas;
}

function tick() {
  if (composition.renderer && composition.camera) {
    composition.renderer.render(composition.scene, composition.camera);
  }

  if (composition.mesh) {
    composition.mesh.rotation.x += 0.01;
    composition.mesh.rotation.y += 0.0015;
    composition.mesh.rotation.z += 0.015;
  }

  requestAnimationFrame(() => {
    tick();
  });
}

export default app;
