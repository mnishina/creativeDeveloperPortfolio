varying vec2 vUv;

uniform sampler2D uTexture;
uniform float uAlpha;

void main() {

  vec4 tex = texture2D(uTexture, vUv);
  gl_FragColor = vec4(tex.rgb, uAlpha);
}
