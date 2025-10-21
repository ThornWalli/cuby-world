import type WallExtension from '../../../WallExtension';
import WindowWallExtension from '../../../wallExtension/Window';
import ExtensionController from './ExtensionController';
import type {
  Observables as ExtensionObservables,
  State as ExtensionState
} from './ExtensionController';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Observables extends ExtensionObservables {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface State extends ExtensionState {}
export default class WindowController extends ExtensionController<
  State,
  Observables
> {
  override extensionCheck(extension: WallExtension | null): boolean {
    return extension instanceof WindowWallExtension;
  }
}
