import { PerspectiveCamera, Scene, WebGLRenderer } from "three";

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

interface App {
  $canvas: Element | null;
  $images: NodeListOf<Element>;

  init: () => $;
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
  sizes: {
    segmentAmount: number;
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

export type { $, App, CompositionObjects, Composition, Shuffle };
