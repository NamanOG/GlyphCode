export const eventHorizonShader = `
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

#define PI 3.141592653589793

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 34.45);
  return fract(p.x * p.y);
}

void main() {
  vec2 uv = (gl_FragCoord.xy / u_resolution.xy) * 2.0 - 1.0;
  uv.x *= u_resolution.x / u_resolution.y;

  // push the focal disk further to the right so it can act as a large background element
  vec2 targetCenter = vec2(0.85, 0.0);
  vec2 center = mix(targetCenter, (u_mouse - 0.5) * 0.12 + targetCenter, 0.25);
  vec2 p = uv - center;

  float r = length(p);
  float angle = atan(p.y, p.x);

  float spin = angle + u_time * 0.18;
  float pulse = 0.75 + 0.25 * sin(u_time * 1.2);

  float lens = 0.03 / (r + 0.06);
  vec2 warped = p + normalize(p + 0.0001) * lens;
  float wr = length(warped);

  // larger disk/ring so the shader fills more horizontal space
  float ring = smoothstep(0.62, 0.48, abs(wr - 0.48 - 0.02 * sin(spin * 3.0 + u_time * 0.8)));
  float swirl = sin(spin * 8.0 - u_time * 1.5) * 0.5 + 0.5;
  float accretion = ring * (0.5 + swirl * 0.5) * pulse;

  float shadowCore = smoothstep(0.18, 0.0, r);
  float halo = smoothstep(3.2, 0.1, r) * 0.45;

  vec3 deepBlue = vec3(0.01, 0.04, 0.09);
  vec3 cyan = vec3(0.0, 0.83, 1.0);
  vec3 bg = mix(vec3(0.0), deepBlue, smoothstep(1.8, 0.1, r));

  vec3 disk = mix(deepBlue, cyan, accretion);
  disk += cyan * ring * 0.35;

  float grain = (hash(gl_FragCoord.xy * 0.35 + u_time * 0.25) - 0.5) * 0.03;

  vec3 color = bg;
  color += disk;
  color += vec3(0.0, 0.15, 0.22) * halo;
  color -= vec3(shadowCore * 0.8);
  color += grain;

  float vignette = smoothstep(2.5, 0.2, length(p));
  color *= vignette;

  gl_FragColor = vec4(color, 1.0);
}
`;
