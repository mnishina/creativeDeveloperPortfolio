import {
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
}

interface CompositionObjects {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
}

interface Loader {
  loadImages: () => Promise<unknown>;
  loadingManager: LoadingManager;
  imageCache: Map<string, Texture>;
}

interface App {
  $canvas: Element | null;
  $images: NodeListOf<Element>;
  event: {
    timeoutID: number | null;
    RESIZE_TIME: number;
  };
  sizes: {
    segmentAmount: number;
  };

  init: () => $;
  createMesh: (compositionObjects: CompositionObjects) => void;
  setupEvents: ($: $, compositionObjects: CompositionObjects) => void;
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

export type { $, App, CompositionObjects, Loader, Composition, Shuffle };
