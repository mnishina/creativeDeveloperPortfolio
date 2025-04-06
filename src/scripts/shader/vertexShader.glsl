varying vec2 vUv;

uniform float uProgress;

void main() {
  vec3 newPosition = position;
  
  // float posZ = 5.0;
  newPosition.z = uProgress;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  
  vUv = uv;
}
