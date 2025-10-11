<template>
  <cw-object-preview
    v-if="root"
    :cache-key="description ? JSON.stringify(description) : undefined"
    hide-ground
    :root="root"
    :app="app"
    :width="width ?? 'auto'"
    :ratio="ratio"
    :hydrate-when-visible="hydrateWhenVisible"
    class="cw-wall-extension-preview"></cw-object-preview>
</template>

<script lang="ts" setup>
import { Object3D, Vector3 } from 'three';
import { markRaw, ref, watch } from 'vue';
import { ReplaySubject } from 'rxjs';

import type App from '../../lib/classes/App';
import Wall, {
  type WallConstructorOptions
} from '@cuby-world/app/lib/classes/Wall';
import {
  WALL_DIRECTION,
  type WallDescription,
  type WallGeometryMap
} from '@cuby-world/app/lib/types/wall';
import { loadWallGeometries } from '@cuby-world/app/lib/utils/wall';
import wallGlb from '../../assets/wall/wall.glb?url';

import { textureMap as wallTextureMap } from '@cuby-world/app/lib/utils/wall/textures';
import type { AnimationLoopValue } from '@cuby-world/app/lib/classes/Renderer';
import type WallExtension from '@cuby-world/app/lib/classes/WallExtension';
import type {
  WallExtensionDescription,
  WallExtensionState
} from '@cuby-world/app/lib/classes/WallExtension';

import CwObjectPreview from '../ObjectPreview.vue';
import { getDefaultSkin } from '@cuby-world/app/lib/utils/wall/skins';

const $props = defineProps<{
  app: App;
  width?: number | 'auto';
  ratio: number;
  modelValue: WallPreview;
  hydrateWhenVisible?: boolean;
}>();

const wallGeometryMap: WallGeometryMap = await loadWallGeometries(wallGlb);

const root = ref<Object3D>(new Object3D());

function getWallDescription({
  extensions,
  skins
}: {
  extensions?: WallExtensionDescription[];
  skins?: [string, string];
}): WallDescription {
  return {
    direction: WALL_DIRECTION.VERTICAL,
    position: new Vector3(0, 0, 0),
    skins: skins ?? getDefaultSkin(),
    extensions: extensions ?? []
  };
}

const animationLoop$ = new ReplaySubject<AnimationLoopValue>(1);
animationLoop$.next({ time: 0, delta: 0 });

let wall: Wall;
const description = ref<WallDescription>();
async function setupWall({
  extensions,
  skins
}: {
  extensions?: {
    extension: typeof WallExtension;
    state: WallExtensionState;
  }[];
  skins?: [string, string];
}) {
  if (wall) {
    wall.destroy();
  }

  extensions = extensions ?? [];

  description.value = markRaw(
    getWallDescription({
      extensions: extensions.map(ext => ({
        key: ext.extension.KEY,
        state: ext.state
      })),
      skins
    })
  );

  const preparedExtensions: [typeof WallExtension, WallExtensionState][] =
    extensions.map(
      ext =>
        [ext.extension, ext.state] as [typeof WallExtension, WallExtensionState]
    );

  wall = new Wall({
    center: true,
    ...description.value,
    extensions: preparedExtensions
  } as WallConstructorOptions);

  // wallGeo

  wall.update([
    {
      ...getWallDescription({ skins }),
      position: new Vector3(0, 0, -1)
    },
    {
      ...getWallDescription({ skins }),
      position: new Vector3(0, 0, 1)
    }
  ]);

  await wall.setup({
    animationLoop$,
    wallGeometryMap,
    wallTextureMap
  });

  const root = wall.root;

  root.position.set(0, -0.5, 0);

  return root;
}

if ($props.modelValue) {
  root.value = await setupWall($props.modelValue);
}

watch(
  () => $props.modelValue,
  async data => {
    root.value = await setupWall(data);
  }
);
</script>

<script lang="ts">
export interface WallPreview {
  extensions?: {
    extension: typeof WallExtension;
    state: WallExtensionState;
  }[];
  skins?: [string, string];
}
</script>

<style lang="postcss" scoped>
.cw-wall-extension-preview {
  /* empty */
}
</style>
