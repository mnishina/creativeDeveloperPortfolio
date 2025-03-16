const util = {
  getCanvasBounds,
};

function getCanvasBounds($canvas: Element) {
  const $canvasRect = $canvas.getBoundingClientRect();
  const $canvasBounds = {
    rect: $canvasRect,
    width: $canvasRect.width,
    height: $canvasRect.height,
    aspect: $canvasRect.width / $canvasRect.height,
  };

  return $canvasBounds;
}

export default util;
