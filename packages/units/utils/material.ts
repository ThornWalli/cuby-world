import { checkerboardTexture } from '@cuby-world/app/lib/utils/texture';
import { Color, MeshPhongMaterial, ShaderMaterial } from 'three';

export function defaultMaterial(size: number = 16, tileSize: number = 8) {
  const texture = checkerboardTexture(
    size,
    tileSize,
    '#ffffff',
    '#000000',
    2,
    2
  );
  return new MeshPhongMaterial({ map: texture, side: 2 });
}

export function getRainbowMaterial() {
  return new ShaderMaterial({
    uniforms: {
      lightColor: { value: new Color(0xffffff) }
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewDir = normalize(-mvPosition.xyz);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vViewDir;

      void main() {
        float angle = dot(normalize(vNormal), normalize(vViewDir));
        // Farbübergang je nach Winkel (hier HSL-Rainbow)
        vec3 color = vec3(0.5 + 0.5 * cos(6.2831 * angle + vec3(0.0, 2.0, 4.0)));
        gl_FragColor = vec4(color, 1.0);
      }
    `
  });
}
