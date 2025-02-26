import type { Composition } from "~scripts/type/type";

const composition: Composition = {
  init,
  sizes: {
    $canvasWidth: null,
    $canvasHeight: null,
  },
};

function init($canvas: HTMLCanvasElement) {
  const { width, height } = $canvas.getBoundingClientRect();
  composition.sizes.$canvasWidth = width;
  composition.sizes.$canvasHeight = height;
}

export default composition;
