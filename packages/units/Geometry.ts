import { Color, type Object3D } from 'three';
import {
  BoxGeometry,
  CapsuleGeometry,
  ConeGeometry,
  CylinderGeometry,
  DodecahedronGeometry,
  IcosahedronGeometry,
  Mesh,
  MeshPhongMaterial,
  OctahedronGeometry,
  SphereGeometry,
  TorusGeometry,
  TorusKnotGeometry,
  Vector3
} from 'three';

import { OBJECT_NAME } from '@cuby-world/app/lib/utils/object';
import Unit, {
  type UnitConstructorOptions,
  type UnitOptions
} from '@cuby-world/app/lib/classes/Unit';
import { defaultMaterial } from './utils/material';

export enum GEOMETRY_TYPE {
  BOX = 'Box',
  CAPSULE = 'Capsule',
  CONE = 'Cone',
  CYLINDER = 'Cylinder',
  DODECAHEDRON = 'Dodecahedron',
  ICOSAHEDRON = 'Icosahedron',
  OCTAHEDRON = 'Octahedron',
  SPHERE = 'Sphere',
  TORUS = 'Torus',
  TORUSKNOT = 'TorusKnot'
}

export interface GeometryOptions extends UnitOptions {
  type: GEOMETRY_TYPE;
  color?: string | Color;
}
export default class Geometry extends Unit<GeometryOptions> {
  static override KEY = 'geometry';
  static override NAME = 'Geometry';

  constructor(
    options: Omit<
      UnitConstructorOptions<GeometryOptions>,
      'name' | 'selectable'
    > = {}
  ) {
    super({
      ...options,
      size: new Vector3(1, 1, 1),
      name: 'Geometry',
      selectable: true,
      placeable: true,
      options: {
        type: GEOMETRY_TYPE.BOX,
        ...options.options
      }
    });
  }
  override async createMesh() {
    // const material = new MeshPhysicalMaterial({
    //   color: 0xffd700,
    //   metalness: 1.0,
    //   roughness: 0.2,
    //   reflectivity: 1.0,
    //   clearcoat: 0.1, // dünner Klarlack-Effekt
    //   clearcoatRoughness: 0.1
    // });
    // const material = new MeshStandardMaterial({
    //   color: new Color(0xffd700), // Goldfarbe
    //   metalness: 1.0, // Metallisch
    //   roughness: 0.2 // Glatt, aber nicht spiegelglatt
    // });

    // const material = getRainbowMaterial();

    let material;
    if (this.options.color) {
      material = new MeshPhongMaterial({
        color: new Color(this.options.color)
      });
    } else {
      material = defaultMaterial();
    }

    const size = this.getSize();
    const geometry = getGeometryByType(this.options.type, size);

    const mesh: Object3D = new Mesh(geometry, material);
    mesh.name = OBJECT_NAME.MESH;
    mesh.castShadow = true;

    let y = size.y / 2;
    if (
      [
        GEOMETRY_TYPE.CAPSULE,
        GEOMETRY_TYPE.TORUSKNOT,
        GEOMETRY_TYPE.TORUS
      ].includes(this.options.type)
    ) {
      y += size.y / 2;
    }
    mesh.position.set(0, y, 0);

    this.observables.materialReady$.next();
    return mesh;
  }
}

function getGeometryByType(type: GEOMETRY_TYPE, size: Vector3) {
  switch (type) {
    case GEOMETRY_TYPE.CAPSULE:
      return new CapsuleGeometry(size.x / 2, size.y, 16, 32);
    case GEOMETRY_TYPE.CONE:
      return new ConeGeometry(size.x / 2, size.y, 32, 1);
    case GEOMETRY_TYPE.CYLINDER:
      return new CylinderGeometry(size.x / 2, size.x / 2, size.y, 32, 1);
    case GEOMETRY_TYPE.DODECAHEDRON:
      return new DodecahedronGeometry(size.x / 2, 0);
    case GEOMETRY_TYPE.ICOSAHEDRON:
      return new IcosahedronGeometry(size.x / 2, 0);
    case GEOMETRY_TYPE.OCTAHEDRON:
      return new OctahedronGeometry(size.x / 2, 0);
    case GEOMETRY_TYPE.SPHERE:
      return new SphereGeometry(size.x / 2, 32, 24);
    case GEOMETRY_TYPE.TORUS:
      return new TorusGeometry(size.x / 2, size.x / 4, 8, 16);
    case GEOMETRY_TYPE.TORUSKNOT:
      return new TorusKnotGeometry(size.x / 2, size.x / 4, 64, 8);
    // case GEOMETRY_TYPE.BOX:
    default:
      return new BoxGeometry(size.x, size.y, size.z);
  }
}
