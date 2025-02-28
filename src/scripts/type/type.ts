import {
  LoadingManager,
  TextureLoader,
  Texture,
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  ShaderMaterial,
  PlaneGeometry,
  Mesh,
} from "three";
import ShuffleText from "shuffle-text";

interface App {
  init: ($canvas: HTMLCanvasElement) => void;
  tick: () => void;
  $canvas: null | HTMLCanvasElement;
}

interface Composition {
  init: ($canvas: HTMLCanvasElement) => void;
  scene: Scene;
  renderer: null | WebGLRenderer;
  camera: null | PerspectiveCamera;
  material: null | ShaderMaterial;
  geometry: null | PlaneGeometry;
  mesh: null | Mesh;
  sizes: {
    $canvasWidth: null | number;
    $canvasHeight: null | number;
    dpr: number;
    segmentAmount: number;
  };
  cameraInfo: {
    fov: number;
    aspect: number;
    near: number;
    far: number;
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
