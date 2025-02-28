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

export { getCanvasInfo };
