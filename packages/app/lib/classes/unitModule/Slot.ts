import UnitModule, {
  type UnitModuleObservables,
  type UnitModuleOptions,
  type UnitModuleSetupContext,
  type UnitModuleState
} from '../UnitModule';
import type Unit from '../Unit';
import {
  type Vector2,
  Mesh,
  BoxGeometry,
  MeshBasicMaterial,
  Vector3
} from 'three';
import { ReplaySubject, Subject } from 'rxjs';
import { removeMesh } from '@cuby-world/units/utils/mesh';
import type { ROTATION } from '../../utils/rotation';
import type { ANIMATION_ACTION } from '../../types/animation';

export enum SLOT_TYPE {
  LIE = 'lie',
  SEAT = 'seat',
  STAND = 'stand'
}
export interface SlotObervables extends UnitModuleObservables {
  addUnit$: Subject<{ slot: SlotDescription | null; unit: Unit }>;
  removeUnit$: Subject<{ slot: SlotDescription | null; unit: Unit }>;
  usedUnits$: ReplaySubject<Unit[]>;
}

export interface SlotOptions<Position = Vector2> {
  type: SLOT_TYPE;
  position: Position;
  blocked?: boolean;
  rotation?: ROTATION;
}
export interface SlotDescription extends SlotOptions<Vector3> {
  origin: Vector2;
  worldPosition: Vector3;
}
export interface SlotUnitModuleOptions extends UnitModuleOptions {
  slots: SlotOptions[];
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SlotState extends UnitModuleState {}
export default abstract class SlotUnitModule<
  Options extends SlotUnitModuleOptions = SlotUnitModuleOptions,
  State extends SlotState = SlotState,
  Obervables extends SlotObervables = SlotObervables
> extends UnitModule<Options, State, Obervables> {
  private debugMeshes: Mesh[] = [];
  constructor(unit: Unit, options: Options, state: State, debug: boolean) {
    options = {
      ...options,
      slots: options.slots ?? []
    };
    super(unit, options, state, debug);

    //#region observables
    this.observables.addUnit$ = new Subject<{
      slot: SlotDescription | null;
      unit: Unit;
    }>();
    this.observables.removeUnit$ = new Subject<{
      slot: SlotDescription | null;
      unit: Unit;
    }>();
    this.observables.usedUnits$ = new ReplaySubject<Unit[]>(1);
    //#endregion
  }

  override async setup(context: UnitModuleSetupContext) {
    const root = await super.setup(context);
    if (this.debug) {
      //#region Debug Entry Position
      const entryPosition = this.unit.getEntryPosition();
      const startMesh = new Mesh(
        new BoxGeometry(0.1, 0.2, 0.1),
        new MeshBasicMaterial({ color: 0x00ff00 })
      );
      startMesh.position.set(entryPosition.y, 1, entryPosition.x);
      root.add(startMesh);
      //#endregion

      //#region Slots
      this.getSlots()
        .filter(slot => slot.worldPosition)
        .forEach(slot => {
          const slotMesh = new Mesh(
            new BoxGeometry(0.2, 0.1, 0.2),
            new MeshBasicMaterial({ color: slot.blocked ? 0xff0000 : 0xff00ff })
          );
          slotMesh.position.set(slot.origin.x, 1, slot.origin.y);
          root.add(slotMesh);
        });
      //#endregion
    }

    return root;
  }

  override destroy(): void {
    this.debugMeshes.forEach(removeMesh);
    super.destroy();
  }

  isType(type: SLOT_TYPE) {
    return this.options.slots.some(slot => slot.type === type);
  }

  getSlots(): SlotDescription[] {
    const matrixPositionMap = this.unit.getMatrixPositionMap();
    console.log(
      'matrixPositionMap',
      Array.from(matrixPositionMap.values().map(v => v.toArray())).flat()
    );
    return this.options.slots.map(slot => {
      const matrixPosition = matrixPositionMap.get(
        slot.position.toArray().toString()
      )!;
      const blocked =
        this.usedUnits.some(unit => {
          return unit.getPosition().equals(matrixPosition!);
        }) || slot.blocked;
      return {
        type: slot.type,
        origin: slot.position,
        worldPosition: matrixPosition
          ?.clone()
          .add(new Vector3(0, this.unit.getPosition().y, 0)),
        position:
          matrixPosition
            ?.clone()

            .sub(
              new Vector3(
                this.unit.getPosition().x,
                0,
                this.unit.getPosition().z
              )
            ) ?? new Vector3(),
        blocked
      };
    });
  }

  findFreeSlotPosition(position: Vector3): Vector3 | null {
    return this.findFreeSlot(position)?.worldPosition || null;
  }

  getSlotByPosition(position: Vector3): SlotDescription | null {
    const slot = this.getSlots().find(
      ({ worldPosition }) => worldPosition && position.equals(worldPosition)
    );
    return slot || null;
  }

  findFreeSlot(position: Vector3): SlotDescription | null {
    if (this.canUsed()) {
      const matrixPositionMap = this.unit.getMatrixPositionMap();
      console.log('matrixPositionMap', matrixPositionMap);

      // position = position.clone().sub(this.unit.getPosition());

      const sitablePositions = this.getSlots().filter(slot => !slot.blocked);
      const test =
        sitablePositions.find(
          ({ worldPosition }) => worldPosition && position.equals(worldPosition)
        ) ||
        sitablePositions[0] ||
        null;
      return test;
    }
    return null;
  }
  static override TYPE = 'slot';
  usedUnits: Unit[] = [];

  getUsedUnits() {
    return this.usedUnits;
  }

  canUsed() {
    return this.usedUnits.length < 2;
  }

  addUsedUnit(unit: Unit) {
    if (this.canUsed()) {
      unit.observables.destroy$!.subscribe(() => {
        this.removeUsedUnit(unit);
      });
      this.usedUnits.push(unit);
      this.observables.usedUnits$.next(this.usedUnits);
      const slot = this.getSlotByPosition(unit.getPosition());
      this.observables.addUnit$.next({ slot, unit });
      return true;
    } else {
      return false;
    }
  }

  removeUsedUnit(unit: Unit) {
    this.usedUnits = this.usedUnits.filter(u => u !== unit);
    this.observables.usedUnits$.next(this.usedUnits);
    const slot = this.getSlotByPosition(unit.getPosition());
    this.observables.removeUnit$.next({ slot, unit });
  }

  /**
   * override to provide specific animation action for the slot usage
   */
  getAnimationAction(): ANIMATION_ACTION {
    throw new Error('Method not implemented.');
  }
}
