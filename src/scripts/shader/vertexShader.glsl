varying vec2 vUv;

uniform float uProgress;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // vec3 newPosition = position;
  
  // float posZ = 5.0;
  // newPosition.z = uProgress;
  float zOffset = 1.0 * uProgress;
  modelPosition.z = zOffset;
  
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
    
  gl_Position = projectedPosition;
  // gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  
  vUv = uv;
}
