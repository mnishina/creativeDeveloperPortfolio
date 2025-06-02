varying vec2 vUv;

uniform sampler2D uTexture;
uniform sampler2D uTextureNew;
uniform float uAlpha;
uniform float uMosaicProgress;

void main() {

  vec4 tex = texture2D(uTextureNew, vUv);
  gl_FragColor = vec4(tex.rgb, uAlpha);

  // // モザイクのピクセルサイズを調整（uMosaicProgress=0で強いモザイク、uMosaicProgress=1で元画像）
  // float pixelSize = max(0.0025, 0.1 * (1.0 - uMosaicProgress));
  
  // // UVをピクセルサイズでグリッド化し、各グリッドの中心を取得
  // vec2 mosaicUV = floor(vUv / pixelSize) * pixelSize + (pixelSize * 0.5);
  
  // // uMosaicProgressに応じてモザイクUVと元のUVを補間
  // vec2 finalUV = mix(mosaicUV, vUv, uMosaicProgress);
  
  // // テクスチャをサンプリング
  // vec4 tex = texture2D(uTexture, finalUV);
  
  // // アルファ値は1.0に設定（不透明）
  // gl_FragColor = vec4(tex.rgb, uAlpha);
}
