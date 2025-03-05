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
    $imageTop: $imageRect.top,
  };
}

function getImagePosition($canvas: HTMLCanvasElement, $image: Element) {
  const { $canvasWidth, $canvasHeight } = getCanvasInfo($canvas);
  const { $imageWidth, $imageHeight, $imageLeft, $imageTop } =
    getImageBounds($image);

  const meshLeft = $imageLeft + $imageWidth / 2 - $canvasWidth / 2;
  const meshTop = 0;

  return { meshLeft, meshTop };
}

export { getCanvasInfo, getCameraFOV, getImageBounds, getImagePosition };
