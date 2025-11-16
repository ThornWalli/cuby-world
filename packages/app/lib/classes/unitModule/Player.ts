import { ConeGeometry, Mesh, MeshStandardMaterial } from 'three';
import type Player from '../Player';
import UnitModule, {
  type UnitModuleOptions,
  type UnitModuleSetupContext,
  type UnitModuleState
} from '../UnitModule';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { AnimationLoopValue } from '../Renderer';

type Options = UnitModuleOptions;
type State = UnitModuleState;

export default class PlayerUnitModule extends UnitModule<Options, State> {
  isClient() {
    return this.player?.client || false;
  }
  static override TYPE = 'player';

  player?: Player;

  setPlayer(player: Player) {
    this.player = player;
  }

  override async setup(context: UnitModuleSetupContext) {
    const root = await super.setup(context);
    if (!this.unit.isPreview() && this.player?.client) {
      this.indicatorMesh = this.createIndicator();
      root.add(this.indicatorMesh);
    }
    return root;
  }

  createIndicator() {
    const radius = 0.1;
    const height = 0.2;
    const radialSegments = 4;
    const coneTop = new ConeGeometry(radius, height, radialSegments);
    const coneBottom = new ConeGeometry(radius, height, radialSegments);

    coneBottom.rotateX(Math.PI);
    coneBottom.translate(0, -height, 0);

    const mergedGeometry = mergeGeometries([coneTop, coneBottom]);

    const mesh = new Mesh(
      mergedGeometry,
      new MeshStandardMaterial({
        color: 0x0066ff,
        transparent: true,
        opacity: 0.7,
        metalness: 0.0,
        roughness: 0.1,
        envMapIntensity: 1.0
      })
    );

    // Oder direkt die Höhe berechnen
    const d = this.unit.getSize().y + height + 0.1;

    mesh.position.y = d;

    return mesh;
  }

  indicatorMesh: Mesh | null = null;
  override update({ delta }: AnimationLoopValue): void {
    if (this.indicatorMesh) {
      this.indicatorMesh.rotation.y += 1 / 100;
      // Vertical bobbing
      const bobbingHeight = 0.05;
      const bobbingSpeed = 2; // Adjust speed as needed
      this.indicatorMesh.position.y +=
        Math.sin(Date.now() * 0.001 * bobbingSpeed) * bobbingHeight * delta;
    }
  }
}
