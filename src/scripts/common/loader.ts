import type { Loader } from "~scripts/type/type";

import { LoadingManager, TextureLoader } from "three";

import app from "~scripts/app";

const loader: Loader = {
  init,
  loadImages,
  loadingManager: new LoadingManager(),
  imageCache: new Map(),
};

function init() {}

async function loadImages() {
  const promises = [...app.$images].map(($image) => {
    const imagePath = $image.getAttribute("src");

    if (imagePath) {
      return new Promise((resolve) => {
        const texture = new TextureLoader(loader.loadingManager);
        texture.load(imagePath, (loadedTexture) => {
          // console.log("1");
          loader.imageCache.set(imagePath, loadedTexture);

          resolve(loadedTexture);
        });
      });
    }
  });

  loader.loadingManager.onProgress = (url, loaded, total) => {
    _onProgress(url, loaded, total);
  };
  loader.loadingManager.onLoad = () => {
    _onLoad();
  };

  return Promise.all(promises).then(() => {
    console.log("2");
    // console.log(loader.imageCache);
  });
}

function _onProgress(url: string, loaded: number, total: number) {
  console.log(url, loaded, total);
}
function _onLoad() {
  console.log("loaded");
}

export default loader;
