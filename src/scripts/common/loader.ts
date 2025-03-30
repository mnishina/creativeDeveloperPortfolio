import type { Loader } from "~scripts/type/type";

import { LoadingManager, TextureLoader } from "three";

import app from "~scripts/app";

const loader: Loader = {
  loadImages,
  loadingManager: new LoadingManager(),
  imageStore: new Map(),
};

async function loadImages() {
  return new Promise<void>((resolve, reject) => {
    _manager(resolve, reject);

    app.$images.forEach(($image) => {
      const imagePath = $image.getAttribute("src");

      const imageWidth = ($image as HTMLImageElement).naturalWidth;
      const imageHeight = ($image as HTMLImageElement).naturalHeight;
      const texture = new TextureLoader(loader.loadingManager);
      if (imagePath) {
        texture.load(imagePath, (loadedTexture) => {
          loader.imageStore.set(imagePath, {
            texture: loadedTexture,
            width: imageWidth,
            height: imageHeight,
          });
        });
      }
    });
  });
}

function _manager(
  resolve: (value: void) => void,
  reject: (reason?: Error) => void,
) {
  loader.loadingManager.onProgress = (url, loaded, total) =>
    _onProgress(url, loaded, total);
  loader.loadingManager.onLoad = () => _onLoad(resolve);
  loader.loadingManager.onError = (url) => _onError(url, reject);
}
function _onProgress(url: string, loaded: number, total: number) {
  console.log(url, loaded, total);
}
function _onLoad(resolve: (value: void) => void) {
  console.log("loaded");
  resolve();
}
function _onError(url: string, reject: (reason?: Error) => void) {
  reject(new Error(`Failed to load texture: ${url}`));
}

export default loader;
