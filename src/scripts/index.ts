import loader from "~scripts/common/loader";
import app from "~scripts/app";
import composition from "~scripts/common/composition";
import shuffle from "~scripts/shuffle";

init();

async function init() {
  await loader.loadImages();

  const $ = app.init();

  const compositionObjects = composition.setupComposition($);

  if (compositionObjects) {
    app.createMesh(compositionObjects);
    app.setupEvents($, compositionObjects, loader.imageStore);
    app.render(compositionObjects);
  }

  shuffle.opening();
}
