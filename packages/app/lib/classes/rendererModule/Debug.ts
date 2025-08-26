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

function debugGui(context: Renderer) {
  const gui = new GUI();
  const params = {
    pixelSize: context.pixelSize,
    normalEdgeStrength: 0,
    depthEdgeStrength: 1
  };
  if (context.passes.renderPixelated) {
    gui
      .add(params, 'pixelSize')
      .min(1)
      .max(16)
      .step(1)
      .onChange(() => {
        context.passes.renderPixelated?.setPixelSize(params.pixelSize);
      });
    gui
      .add(params, 'normalEdgeStrength')
      .min(0)
      .max(2)
      .step(0.05)
      .onChange(() => {
        context.passes.renderPixelated!.normalEdgeStrength =
          params.normalEdgeStrength;
      });
    gui
      .add(params, 'depthEdgeStrength')
      .min(0)
      .max(1)
      .step(0.05)
      .onChange(() => {
        context.passes.renderPixelated!.depthEdgeStrength =
          params.depthEdgeStrength;
      });
    return gui;
  }
}
