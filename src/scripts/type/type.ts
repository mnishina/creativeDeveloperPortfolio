import {
  PlaneGeometry,
  ShaderMaterial,
  Mesh,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Texture,
  LoadingManager,
} from "three";

import ShuffleText from "shuffle-text";

interface $ {
  $canvas: Element | null;
  $images: NodeListOf<Element>;
  $links: NodeListOf<Element>;
  $list: NodeListOf<Element>;
}

interface CompositionObjects {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
}

interface ImageStoreValue {
  texture: Texture | null;
  width: number;
  height: number;
}

interface MeshStore {
  geometry: PlaneGeometry | null;
  material: ShaderMaterial | null;
  mesh: Mesh | null;
}

interface Uniforms {
  [key: string]: {
    value: Texture | number | null;
  };
  uTexture: {
    value: Texture | null;
  };
  uTextureCurrent: {
    value: Texture | null;
  };
  uAlpha: {
    value: number | null;
  };
  uMosaicProgress: {
    value: number | null;
  };
  uProgress: {
    value: number | null;
  };
}

interface Loader {
  loadImages: () => Promise<unknown>;
  loadingManager: LoadingManager;
  imageStore: Map<string, ImageStoreValue>;
}

interface App {
  $canvas: Element | null;
  $images: NodeListOf<Element>;
  $links: NodeListOf<Element>;
  $list: NodeListOf<Element>;
  event: {
    timeoutID: number | null;
    RESIZE_TIME: number;
  };
  sizes: {
    segmentAmount: number;
  };
  meshStore: MeshStore;
  state: {
    isMeshVisible: boolean;
  };

  init: () => $;
  createMesh: (compositionObjects: CompositionObjects) => void;
  setupEvents: (
    $: $,
    compositionObjects: CompositionObjects,
    imageStore: Map<string, ImageStoreValue>,
  ) => void;
  render: (compositionObjects: CompositionObjects) => void;
}

interface Composition {
  scene: Scene | null;
  camera: PerspectiveCamera | null;
  renderer: WebGLRenderer | null;
  cameraInfo: {
    fov: number | undefined;
    aspect: number | undefined;
    near: number;
    far: number;
  };

  init: () => void;
  setupComposition: ($: $) => CompositionObjects | undefined;
}

interface Shuffle {
  opening: () => void;
  textShuffleTarget: NodeListOf<Element>;
  shuffleTexts: ShuffleText[];
  shuffleTextDuration: number;
  runningClass: string;
  rollover: {
    duration: number;
    states: Map<Element, string>;
  };
}

export type {
  $,
  App,
  MeshStore,
  ImageStoreValue,
  CompositionObjects,
  Uniforms,
  Loader,
  Composition,
  Shuffle,
};
