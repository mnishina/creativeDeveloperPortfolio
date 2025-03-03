function getCanvasInfo($canvas: HTMLCanvasElement) {
  const $canvasRect = $canvas.getBoundingClientRect();
  const { width, height } = $canvasRect;

  return {
    $canvasRect,
    $canvasWidth: width,
    $canvasHeight: height,
    $canvasAspect: width / height,
  };
}

function getCameraFOV($canvasHeight: number, cameraFar: number) {
  const radian = 2 * Math.atan($canvasHeight / 2 / cameraFar);
  const cameraFOV = (180 / Math.PI) * radian;

  return cameraFOV;
}

function getImageBounds($image: Element) {
  const $imageRect = $image.getBoundingClientRect();

  return {
    $imageRect,
    $imageWidth: $imageRect.width,
    $imageHeight: $imageRect.height,
    $imageX: $imageRect.x,
    $imageY: $imageRect.y,
  };
}

export { getCanvasInfo, getCameraFOV, getImageBounds };
