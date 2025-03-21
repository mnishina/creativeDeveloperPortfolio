import app from "~scripts/app";
import composition from "~scripts/common/composition";
import shuffle from "~scripts/shuffle";

init();

function init() {
  const $ = app.init();

  const compositionObjects = composition.setupComposition($);

  if (compositionObjects) {
    app.setupEvents($, compositionObjects);
    app.render(compositionObjects);
  }

  shuffle.opening();
}
