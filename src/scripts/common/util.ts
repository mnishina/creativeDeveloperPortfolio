import { Mesh } from "three";

const util = {
  getCanvasBounds,
  getCameraFOV,
  // getWorldPosition,
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

function getCameraFOV($canvasHeight: number, cameraFar: number) {
  const radian = 2 * Math.atan($canvasHeight / 2 / cameraFar);
  const degree = (radian * 180) / Math.PI;
  const fov = degree;

  return fov;
}

// function getWorldPosition($canvas: Element) {
//   const $canvasBounds = getCanvasBounds($canvas);

//   // 画像の半分戻して、画像の左ぶん戻す。
//   // キャンバスの左ぶん進める

//   // canvas、mesh,
//   // canvas width
//   //メッシュの左、

//   const x = $canvasBounds.width / 2;
//   const y = 0;

//   //x, yをメッシュのポジションにセットする
//   return { x, y };
// }

export default util;
