import type { Composition } from "~scripts/type/type";

import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  ShaderMaterial,
  PlaneGeometry,
  Mesh,
} from "three";

const composition: Composition = {
  init,
  tick,
  scene: new Scene(),
  renderer: null,
  camera: null,
  material: null,
  geometry: null,
  mesh: null,
  sizes: {
    $canvasWidth: null,
    $canvasHeight: null,
    dpr: Math.min(window.devicePixelRatio, 2),
  },
  cameraData: {
    fov: 75,
    aspect: 0,
    near: 0.1,
    far: 1000,
  },
};

function init($canvas: HTMLCanvasElement) {
  const { width, height } = $canvas.getBoundingClientRect();
  composition.sizes.$canvasWidth = width;
  composition.sizes.$canvasHeight = height;

  composition.renderer = new WebGLRenderer({
    canvas: $canvas,
    alpha: true,
    antialias: true,
  });
  composition.renderer.setSize(
    composition.sizes.$canvasWidth,
    composition.sizes.$canvasHeight,
    false,
  );

  composition.camera = new PerspectiveCamera(
    composition.cameraData.fov,
    composition.sizes.$canvasWidth / composition.sizes.$canvasHeight,
    composition.cameraData.near,
    composition.cameraData.far,
  );
  composition.camera.position.z = 5;

  composition.material = new ShaderMaterial({ wireframe: true });
  composition.geometry = new PlaneGeometry(1, 1, 1, 1);
  composition.mesh = new Mesh(composition.geometry, composition.material);

  composition.scene.add(composition.mesh);
}

function tick() {
  if (composition.renderer && composition.camera) {
    composition.renderer.render(composition.scene, composition.camera);
  }

  if (composition.mesh) {
    composition.mesh.rotation.x += 0.01;
    composition.mesh.rotation.y += 0.0015;
    composition.mesh.rotation.z += 0.015;
  }

  requestAnimationFrame(() => {
    tick();
  });
}

export default composition;
