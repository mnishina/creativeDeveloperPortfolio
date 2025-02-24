import { LoadingManager, TextureLoader } from "three";

const loader = {
  init,
  loadAllImage,
  textureCashe: new Map(),
  loadingManager: new LoadingManager(),
};

function init() {}

function loadAllImage() {
  const $image = document.querySelectorAll("[data-element='image']");
  console.log($image);
}

export default loader;
