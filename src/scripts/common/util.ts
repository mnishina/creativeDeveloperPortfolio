const util = {
  getCanvasBounds,
  getCameraFOV,
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

function getCameraFOV($canvasHeight: number, $cameraFar: number) {
  const radian = 2 * Math.atan(($canvasHeight / 2) * $cameraFar);
  const degree = (radian * 180) / Math.PI;
  const fov = degree;

  return fov;
}

export default util;
