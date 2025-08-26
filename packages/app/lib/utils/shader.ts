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
