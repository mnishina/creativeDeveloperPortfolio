varying vec2 vUv;

uniform sampler2D uTexture;
uniform float uAlpha;

void main() {

  // vec4 tex = texture2D(uTexture, vUv);
  // gl_FragColor = vec4(tex.rgb, uAlpha);

  // モザイクのピクセルサイズを調整（uAlpha=0で強いモザイク、uAlpha=1で元画像）
  float pixelSize = max(0.005, 0.1 * (1.0 - uAlpha));
  
  // UVをピクセルサイズでグリッド化し、各グリッドの中心を取得
  vec2 mosaicUV = floor(vUv / pixelSize) * pixelSize + (pixelSize * 0.5);
  
  // uAlphaに応じてモザイクUVと元のUVを補間
  vec2 finalUV = mix(mosaicUV, vUv, uAlpha);
  
  // テクスチャをサンプリング
  vec4 tex = texture2D(uTexture, finalUV);
  
  // アルファ値は1.0に設定（不透明）
  gl_FragColor = vec4(tex.rgb, 1.0);
}
