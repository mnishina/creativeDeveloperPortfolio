import type { Loader } from "~scripts/type/type";

import { LoadingManager, TextureLoader } from "three";

const loader: Loader = {
  init,
  loadAllImage,
  textureCache: new Map(),
  textureLoader: null,
  loadingManager: new LoadingManager(),
};

function init() {}

async function loadAllImage($images: NodeListOf<Element>) {
  loader.textureLoader = new TextureLoader(loader.loadingManager);

  for (const el of $images) {
    const url = el.getAttribute("src");

    if (url) {
      const texture = loader.textureLoader.load(url);
      loader.textureCache.set(url, texture);
    }
  }

  await _manager();
}

function _manager() {
  return new Promise((resolve, reject) => {
    _manageOnProgress();
    _managerOnLoad(resolve);
    _managerOnError(reject);
  });
}

function _manageOnProgress() {
  loader.loadingManager.onProgress = (url, loaded, total) => {
    console.log(`${loaded} / ${total} ::: ${url}`);
  };
}

function _managerOnLoad(resolve: (value: unknown) => void) {
  loader.loadingManager.onLoad = () => {
    console.log("loaded.");
    resolve(null);
  };
}

function _managerOnError(reject: (reason?: any) => void) {
  loader.loadingManager.onError = (url) => {
    reject(new Error(`Failed to load texture: ${url}`));
  };
}

export default loader;
