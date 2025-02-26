import { LoadingManager, TextureLoader, Texture } from "three";
import ShuffleText from "shuffle-text";

interface App {
  init: ($canvas: HTMLCanvasElement) => void;
  $canvas: null | HTMLCanvasElement;
}

interface Composition {
  init: ($canvas: HTMLCanvasElement) => void;
  sizes: {
    $canvasWidth: null | number;
    $canvasHeight: null | number;
  };
}

interface Loader {
  init: () => void;
  loadAllImage: () => Promise<void>;
  textureCashe: Map<string, Texture>;
  textureLoader: null | TextureLoader;
  loadingManager: LoadingManager;
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

export type { App, Composition, Loader, Shuffle };
