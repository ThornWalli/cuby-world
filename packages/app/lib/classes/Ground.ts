// import { BoxGeometry, Mesh, MeshPhongMaterial } from 'three';
// import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
// import GroundTile from './GroundTile';

// export default class Ground {
//   material: MeshPhongMaterial = new MeshPhongMaterial({ color: 0xcccccc });
//   mesh: Mesh;

//   constructor() {
//     this.mesh = this.createMesh();
//   }

//   createTile(x, y, z) {
//     const height = 0.1;
//     const geometry = new BoxGeometry(1, height, 1);
//     geometry.translate(x, y - height / 2, z); // Verschiebe die Geometrie an die richtige Position
//     return geometry;
//   }

//   private createMesh() {
//     // Funktion zum Erstellen einer einzelnen Kachel

//     // Erstelle die endgültige Geometrie, die alle Kacheln enthält
//     const geometries = [];
//     const groundTiles = [];

//     const tileGrid = this.grid;
//     // Iteriere über das Grid und erstelle Kacheln
//     for (let row = 0; row < tileGrid.length; row++) {
//       for (let col = 0; col < tileGrid[row].length; col++) {
//         if (tileGrid[row][col] === 1) {
//           // Wenn der Wert 1 ist, erstelle eine Kachel
//           const x = col * 1.0;
//           const y = 0;
//           const z = row * 1.0;
//           geometries.push(this.createTile(x, y, z));
//           groundTiles.push(new GroundTile(x, y, z));
//         }
//       }
//     }

//     const geomentries = groundTiles.reduce((result, groundTile) => {
//       result[groundTile.type] = result[groundTile.type] || {
//         material: groundTile.material,
//         tiles: []
//       };
//       result[groundTile.type].tiles.push(groundTile.geometry);
//       return result;
//     }, {});

//     const floors = geomentries.map(({ tiles, material }) => {
//       const mergedGeometry = mergeGeometries(tiles);
//       const floor = new Mesh(mergedGeometry, material);
//       floor.receiveShadow = true; // Empfängt Schatten
//       return floor;
//     });

//     // Kombiniere alle Geometrien zu einer einzigen
//     const mergedGeometry = mergeGeometries(geometries);

//     // Lade eine Textur für die Kacheln
//     // const textureLoader = new THREE.TextureLoader();
//     // const tileTexture = textureLoader.load('path/to/your/tile_texture.png');
//     // tileTexture.wrapS = THREE.RepeatWrapping;
//     // tileTexture.wrapT = THREE.RepeatWrapping;
//     // tileTexture.repeat.set(1, 1); // Passt die Wiederholung an die Kachelgröße an

//     // // Erstelle das Material
//     // const material = new THREE.MeshStandardMaterial({ map: tileTexture });
//     const floor = new Mesh(
//       mergedGeometry,
//       new MeshPhongMaterial({ color: 0xcccccc })
//     );
//     floor.receiveShadow = true; // Empfängt Schatten
//     return floor;
//   }
// }

// function createGrounds(tileGrid: number[][]) {
//   const tiles = [];

//   for (let row = 0; row < tileGrid.length; row++) {
//     for (let col = 0; col < tileGrid[row].length; col++) {
//       if (tileGrid[row][col] === 1) {
//         // Wenn der Wert 1 ist, erstelle eine Kachel
//         const x = col * 1.0;
//         const y = 0;
//         const z = row * 1.0;
//         tiles.push(new GroundTile(x, y, z));
//       }
//     }
//   }

//   const splittedTiles = tiles.reduce((result, groundTile) => {
//     result[groundTile.type] = result[groundTile.type] || {
//       material: groundTile.material,
//       tiles: []
//     };
//     result[groundTile.type].tiles.push(groundTile.geometry);
//     return result;
//   }, {});

//   return splittedTiles.map(({ tiles, material }) => {
//     const mergedGeometry = mergeGeometries(tiles);
//     const ground = new Mesh(mergedGeometry, material);
//     ground.receiveShadow = true;
//     return ground;
//   });
// }
