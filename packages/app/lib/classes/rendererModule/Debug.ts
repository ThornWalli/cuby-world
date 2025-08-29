import { AxesHelper } from 'three';
import RendererModule, { type RendererModuleState } from '../RendererModule';
import type Renderer from '../Renderer';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';

export function getDefaultOptions(): DebugState {
  return {
    gui: true,
    axes: true
  };
}

export interface DebugState extends RendererModuleState {
  gui: boolean;
  axes: boolean;
}

export default class DebugRendererModule extends RendererModule<DebugState> {
  static override TYPE = 'debug';

  axisHelper?: AxesHelper;
  gui?: GUI;

  state: DebugState = {
    gui: false,
    axes: false
  };

  setOptions(options: Partial<DebugState>) {
    this.state = { ...this.state, ...options };
    this.setup();
  }

  override setup(): void {
    const scene = this.renderer.scene;

    // #region Axes Helper
    if (this.axisHelper) {
      scene.remove(this.axisHelper);
      this.axisHelper = undefined;
    }
    if (this.state.axes) {
      this.axisHelper = new AxesHelper(5);
      scene.add(this.axisHelper);
    }
    // #endregion

    // #region GUI
    if (this.gui) {
      this.gui.destroy();
      this.gui = undefined;
    }

    if (this.state.gui) {
      this.gui = debugGui(this.renderer);
    }
    // #endregion
  }
}

function debugGui(_context: Renderer) {
  const gui = new GUI();
  // const params = {};
  return gui;
}
