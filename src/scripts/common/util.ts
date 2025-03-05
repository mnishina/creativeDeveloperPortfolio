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
    $imageLeft: $imageRect.left,
    $imageY: $imageRect.y,
  };
}

function getImagePosition($canvas: HTMLCanvasElement, $image: Element) {
  const { $canvasWidth, $canvasHeight } = getCanvasInfo($canvas);
  const { $imageWidth, $imageHeight, $imageLeft, $imageY } =
    getImageBounds($image);

  const meshX = $imageLeft + $imageWidth / 2 - $canvasWidth / 2;
  const meshY = 0;

  return { meshX, meshY };
}

export { getCanvasInfo, getCameraFOV, getImageBounds, getImagePosition };
