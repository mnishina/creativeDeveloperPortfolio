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

interface DOM {
  canvas: HTMLCanvasElement | null;
  images: NodeListOf<Element>;
}

interface App {
  init: ($canvas: HTMLCanvasElement) => void;
  createMesh: () => void;
  tick: () => void;
  scene: Scene;
  $canvas: null | HTMLCanvasElement;
  meshes: null;
}

interface Composition {
  init: ($canvas: HTMLCanvasElement) => void;
  renderer: null | WebGLRenderer;
  camera: null | PerspectiveCamera;
  material: null | ShaderMaterial;
  geometry: null | PlaneGeometry;
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
  loadAllImage: ($images: NodeListOf<Element>) => Promise<void>;
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

export type { DOM, App, Composition, Loader, Shuffle };
