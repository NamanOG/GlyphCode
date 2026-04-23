export const auroraShader = `
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

float wave(float x, float speed, float freq, float amp, float phase) {
  return sin(x * freq + u_time * speed + phase) * amp;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_resolution.x / u_resolution.y;

  float drift = (u_mouse.x - 0.5) * 0.08;
  float x = p.x + drift;

  float curtainA = wave(x, 0.22, 2.6, 0.22, 0.0) + wave(x, 0.38, 4.4, 0.08, 1.6);
  float curtainB = wave(x, 0.17, 2.1, 0.24, 2.1) + wave(x, 0.35, 5.1, 0.06, 0.7);
  float curtainC = wave(x, 0.25, 2.9, 0.18, 3.4) + wave(x, 0.41, 4.8, 0.07, 2.6);

  float ribbonA = smoothstep(curtainA + 0.24, curtainA - 0.32, p.y);
  float ribbonB = smoothstep(curtainB + 0.28, curtainB - 0.3, p.y);
  float ribbonC = smoothstep(curtainC + 0.3, curtainC - 0.33, p.y);

  vec3 bg = vec3(0.01, 0.02, 0.03);
  vec3 cyan = vec3(0.0, 0.83, 1.0);
  vec3 purple = vec3(0.48, 0.38, 1.0);
  vec3 teal = vec3(0.02, 0.42, 0.4);

  vec3 color = bg;
  color += cyan * ribbonA * 0.22;
  color += purple * ribbonB * 0.13;
  color += teal * ribbonC * 0.18;

  float fadeTop = smoothstep(1.15, -0.25, p.y);
  float fadeBottom = smoothstep(-1.1, -0.1, p.y);
  color *= fadeTop * fadeBottom;

  float vignette = smoothstep(1.4, 0.2, length(p));
  color *= 0.75 + vignette * 0.25;

  gl_FragColor = vec4(color, 1.0);
}
`;
