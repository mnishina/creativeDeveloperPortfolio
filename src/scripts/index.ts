import loader from "~scripts/common/loader";
import shuffle from "~scripts/shuffle";

init();

async function init() {
  await loader.loadAllImage();

  shuffle.opening();
}
