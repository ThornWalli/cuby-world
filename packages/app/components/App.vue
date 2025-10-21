<template>
  <div
    ref="rootEl"
    class="cw-app"
    :style="{
      '--cursor': currentCursor?.src
        ? `url(${currentCursor?.src}) 0 0, auto`
        : currentCursor?.type
    }">
    <cw-renderer
      ref="rendererEl"
      debug
      :options="rendererOptions"
      :modules="[IntersectionRendererModule]" />
    <transition name="fade">
      <component :is="currentComponent" v-if="ready && hasPlayer" :app="app!" />
    </transition>
    <!-- Dialogs -->
    <teleport to="#teleports">
      <cw-dialog-create-user ref="dialogCreateUser" />
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  nextTick,
  onMounted,
  onUnmounted,
  computed,
  defineAsyncComponent,
  markRaw
} from 'vue';
import App, { APP_MODE, EditorApp, type AppConfig } from '../lib/classes/App';
import CwRenderer from './Renderer.vue';
import CwDialogCreateUser from './dialogs/CreateUser.vue';

import setupFonts from './../utils/fonts';
import type { RendererOptions } from '../types';
import IntersectionRendererModule from '../lib/classes/rendererModule/Intersection';
import { fromEvent, Subscription } from 'rxjs';
import { Vector2 } from 'three';
import type Renderer from '../lib/classes/Renderer';
import Player, { type PlayerSettings } from '../lib/classes/Player';
import { CUBY_COLOR } from '@cuby-world/units/cuby/Cuby';
import { DEFAULT_ROOM_ID } from '../lib/classes/appModule/Multiplayer';
import type { RoomDescription } from '../lib/types/room';
import type { Cursor } from '../lib/classes/appModule/Cursor';

setupFonts();
const $props = defineProps<{
  roomDescription: RoomDescription;
  config: AppConfig;
  rendererOptions?: RendererOptions;
}>();

const rendererEl = ref<InstanceType<typeof CwRenderer> | null>(null);
const dialogCreateUser = ref<InstanceType<typeof CwDialogCreateUser> | null>(
  null
);

const rootEl = ref<HTMLElement>();
const dimension = ref<Vector2>();
const subscription = new Subscription();
const app = ref<App>();
const ready = ref(false);
const hasPlayer = ref(false);

const currentComponent = computed(() => {
  if ($props.config.mode === APP_MODE.EDITOR) {
    return defineAsyncComponent(() => import('./app/Editor.vue'));
  }
  return defineAsyncComponent(() => import('./app/Playground.vue'));
});

onMounted(async () => {
  nextTick(() => {
    setup();
    app.value!.loadRoom($props.roomDescription);
  });
});

onUnmounted(() => {
  // app.value?.destroy();
  subscription.unsubscribe();
});

async function setup() {
  const { renderer } = rendererEl.value!;

  if (!renderer) {
    throw new Error('Renderer not ready');
  }

  onResize();

  const app = await setupApp(renderer);
  await setupPlayer(app);
  await app.modules.multiplayer?.joinRoom(DEFAULT_ROOM_ID);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).cubyWorld = app;
}

const STORAGE_PLAYER_KEY = 'cuby-world:player';

const currentCursor = ref<Cursor>();

async function setupApp(renderer: Renderer) {
  app.value = markRaw(
    getAppByMode(
      $props.config.mode ?? APP_MODE.PLAYGROUND,
      $props.config,
      renderer
    )
  );

  await app.value.setup();
  ready.value = true;

  subscription.add(
    app.value.modules.cursor.observables.current$.subscribe(cursor => {
      console.log('Cursor changed', cursor);
      currentCursor.value = cursor;
    })
  );

  subscription.add(
    fromEvent(window, 'resize', {
      passive: true
    }).subscribe(() => {
      onResize();
    })
  );

  return app.value;
}

async function getPlayerSettings() {
  let playerSettings: PlayerSettings | undefined = undefined;
  if (window.sessionStorage.getItem(STORAGE_PLAYER_KEY)) {
    try {
      playerSettings = JSON.parse(
        window.sessionStorage.getItem(STORAGE_PLAYER_KEY)!
      );
    } catch (e) {
      console.warn('Failed to parse player settings from localStorage', e);
    }
  }
  if (!playerSettings && dialogCreateUser.value) {
    playerSettings = await dialogCreateUser.value?.open();
    window.sessionStorage.setItem(
      STORAGE_PLAYER_KEY,
      JSON.stringify(playerSettings)
    );
  }
  return playerSettings;
}

async function setupPlayer(app: App) {
  const playerSettings = await getPlayerSettings();

  if (!playerSettings) {
    throw new Error('No player settings');
  }
  console.log('Player Settings', playerSettings);

  // Login
  let player: Player;
  if (app.modules.multiplayer) {
    player = await app.modules.multiplayer.login(playerSettings);
  } else {
    player = new Player({
      client: true,
      name: playerSettings.name,
      color: playerSettings.color || CUBY_COLOR.BLUE
    });
  }
  app.modules.player.addPlayer(player);
  hasPlayer.value = true;
}

function getAppByMode(mode: APP_MODE, config: AppConfig, renderer: Renderer) {
  if (mode === APP_MODE.EDITOR) {
    return new EditorApp(config, renderer);
  } else {
    return new App(config, renderer);
  }
}

function onResize() {
  const { width, height } = rootEl.value!.getBoundingClientRect();
  dimension.value = new Vector2(width, height);
  rendererEl.value?.renderer?.resize(dimension.value);
}
</script>
<style lang="postcss" scoped>
.cw-app {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  & .cw-renderer {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    cursor: var(--cursor);
    transform: translate(-50%, -50%);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
