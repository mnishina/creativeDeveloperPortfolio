import type { App } from "~scripts/type/type";

import loader from "~scripts/common/loader";
import composition from "~scripts/common/composition";
import shuffle from "~scripts/shuffle";

const app: App = {
  init,
  $canvas: null,
};

init();
async function init() {
  app.$canvas = document.querySelector('[data-element="canvas"]');

  if (app.$canvas) {
    composition.init(app.$canvas);
  }

  await loader.loadAllImage();

  composition.tick();

  shuffle.opening();
}
