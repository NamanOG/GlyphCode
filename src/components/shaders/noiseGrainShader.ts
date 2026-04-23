export const noiseGrainShader = `
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

float rand(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 drift = vec2(u_time * 0.03, u_time * 0.02);
  float grain = rand((uv + drift) * u_resolution.xy * 0.85);
  float n = (grain - 0.5) * 0.22;
  vec3 col = vec3(0.03 + n);
  gl_FragColor = vec4(col, 1.0);
}
`;
