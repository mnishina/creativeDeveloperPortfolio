import type { DOM } from "~scripts/type/type";

import loader from "~scripts/common/loader";
import composition from "~scripts/common/composition";
import shuffle from "~scripts/shuffle";

import app from "~scripts/app";

const $: DOM = {
  canvas: document.querySelector('[data-element="canvas"]'),
  images: document.querySelectorAll("[data-element='image']"),
};

await loader.loadAllImage($.images);

const textureCache = loader.textureCashe;

if ($.canvas) {
  composition.init($.canvas);

  app.init($.canvas);
  await app.createMesh({ $images: $.images, textureCache });
  app.tick();

  shuffle.opening();
}
