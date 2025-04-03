import { Mesh } from "three";

const util = {
  getCanvasBounds,
  getCameraFOV,
  // getWorldPosition,
  mapRange,
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

function mapRange(
  value: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number,
): number {
  //数値の「マッピング」（値の範囲変換）を行うためのユーティリティ関数
  //ある範囲の数値を別の範囲に変換するための計算
  //例：0から100の範囲の値を0から1の範囲に変換したい
  return ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
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
