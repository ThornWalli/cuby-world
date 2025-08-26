import UnitModule from '../UnitModule';

export default abstract class ActionUnitModule extends UnitModule {
  static override TYPE = 'actions';
  abstract rotateLeft(): void;
  abstract rotateRight(): void;
}
