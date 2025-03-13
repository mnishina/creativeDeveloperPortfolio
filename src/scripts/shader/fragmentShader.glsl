varying vec2 vUv;

uniform sampler2D uTexture;
uniform float uAlpha;

void main() {
  vec4 textureColor = texture2D(uTexture, vUv);
  textureColor.a = uAlpha;

  gl_FragColor = textureColor;
}
