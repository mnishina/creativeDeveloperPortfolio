import loader from "~scripts/common/loader";
import composition from "~scripts/common/composition";
import shuffle from "~scripts/shuffle";

import app from "~scripts/app";

await loader.loadAllImage();

const $canvas = document.querySelector(
  '[data-element="canvas"]',
) as HTMLCanvasElement;

composition.init($canvas);
composition.createMesh();

app.init($canvas);
app.tick();

shuffle.opening();
