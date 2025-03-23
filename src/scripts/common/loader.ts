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
          console.log("1");
          loader.imageCache.set(imagePath, loadedTexture);

          resolve(loadedTexture);
        });
      });
    }
  });

  return Promise.all(promises).then(() => {
    console.log("2");
    // console.log(loader.imageCache);
  });
}

export default loader;
