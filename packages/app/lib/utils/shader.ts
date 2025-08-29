import type { WebGLProgramParametersWithUniforms } from 'three';

export const lightShader = {
  vertex: `
  varying vec3 vNormal;
  void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,

  fragment: `
  varying vec3 vNormal;
  uniform vec3 lightPosition;
  uniform vec3 lightColor;
  uniform float stepCount;

  void main() {
      vec3 lightDirection = normalize(lightPosition);

      // Berechne die Beleuchtungsintensität (dot-Produkt)
      float lightIntensity = max(dot(vNormal, lightDirection), 0.0);

      // Quantisiere die Intensität in Stufen
      float stepSize = 1.0 / stepCount;
      lightIntensity = floor(lightIntensity / stepSize) * stepSize;

      // Setze die Farbe
      vec3 color = vec3(1.0, 0.0, 0.0); // Eine rote Grundfarbe
      vec3 finalColor = color * lightIntensity * lightColor;

      gl_FragColor = vec4(finalColor, 1.0);
  }
`
};

export function useGroundTileShader(
  shader: WebGLProgramParametersWithUniforms
) {
  // Correctly declare and pass vUv from the vertex to the fragment shader
  shader.vertexShader = 'varying vec2 vUv;\n' + shader.vertexShader;
  shader.vertexShader = shader.vertexShader.replace(
    '#include <begin_vertex>',
    `
        #include <begin_vertex>
        vUv = uv;
        `
  );

  shader.fragmentShader = 'varying vec2 vUv;\n' + shader.fragmentShader;

  // Modify diffuseColor directly based on vUv, without scaling
  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <map_fragment>',
    `
        #include <map_fragment>

        vec2 uv = vUv;
        float border = 0.01;

        if (uv.x < border || uv.x > (1.0 - border) || uv.y < border || uv.y > (1.0 - border)) {
            // Ändern Sie die diffuseColor, um die Fugen zu erstellen
            diffuseColor.rgb = vec3(0.2, 0.2, 0.2);
        }
        `
  );
}
