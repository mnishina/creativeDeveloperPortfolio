import type { Loader } from "~scripts/type/type";

import { LoadingManager, TextureLoader } from "three";

import app from "~scripts/app";

const loader: Loader = {
  loadImages,
  loadingManager: new LoadingManager(),
  imageCache: new Map(),
};

async function loadImages() {
  _manager();

  app.$images.forEach(($image) => {
    const imagePath = $image.getAttribute("src");

    const texture = new TextureLoader(loader.loadingManager);
    if (imagePath) {
      texture.load(imagePath, (loadedTexture) => {
        loader.imageCache.set(imagePath, loadedTexture);
      });
    }
  });
}

function _manager() {
  loader.loadingManager.onProgress = (url, loaded, total) =>
    _onProgress(url, loaded, total);
  loader.loadingManager.onLoad = () => _onLoad();
}
function _onProgress(url: string, loaded: number, total: number) {
  console.log(url, loaded, total);
}
function _onLoad() {
  console.log("loaded");
}

export default loader;
