varying vec2 vUv;

uniform float uProgress;

void main() {
  vec3 newPosition = position;
  
  float zOffset = uProgress * 50.0; // 値を大きくして変化を見やすく

  // float posZ = 5.0;
  // newPosition.z = uProgress;
  newPosition.z = zOffset;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  
  vUv = uv;
}
