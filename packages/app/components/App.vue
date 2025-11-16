<template>
  <div
    ref="rootEl"
    class="cw-app"
    :style="{
      '--cursor': currentCursor?.src
        ? `url(${currentCursor?.src}) 0 0, auto`
        : currentCursor?.type
    }">
    <cw-renderer ref="rendererEl" debug :options="rendererOptions" />
    <transition name="fade-short">
      <component :is="currentComponent" v-if="ready && hasPlayer" :app="app!" />
    </transition>
    <!-- Dialogs -->
    <teleport to="#teleports">
      <cw-dialog-create-user v-if="app" ref="dialogCreateUser" :app="app" />
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  nextTick,
  onMounted,
  onUnmounted,
  defineAsyncComponent,
  markRaw,
  computed
} from 'vue';
import App, { type AppConfig } from '../lib/classes/App';
import CwRenderer from './Renderer.vue';
import CwDialogCreateUser from './dialogs/CreateUser.vue';

import setupFonts from './../utils/fonts';
import type { RendererOptions } from '../types';
import { fromEvent, Subscription } from 'rxjs';
import { Vector2 } from 'three';
import type Renderer from '../lib/classes/Renderer';
import Player, {
  CHARACHTER_TYPE,
  DEFAULT_PLAYER_SKIN_ID
} from '../lib/classes/Player';
import type { RoomDescription } from '../lib/types/room';
import type { Cursor } from '../lib/classes/appModule/Cursor';
import type { PlayerSettings } from '../lib/types/player';
import { STORAGE_PLAYER_KEY } from '../lib/utils/storage';

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

const currentComponent = computed(() =>
  defineAsyncComponent(() => import('./app/Playground.vue'))
);

onMounted(() => {
  nextTick(async () => {
    await setup();
    await app.value!.enterRoom($props.roomDescription);
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).cubyWorld = app;
}

const currentCursor = ref<Cursor>();

async function setupApp(renderer: Renderer) {
  app.value = markRaw(new App($props.config, renderer));

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
      settings: {
        name: playerSettings.name,
        characterType: playerSettings.characterType || CHARACHTER_TYPE.CUBY,
        skin: playerSettings.skin || DEFAULT_PLAYER_SKIN_ID
      }
    });
  }
  app.modules.player.addPlayer({
    player: markRaw(player)
  });
  hasPlayer.value = true;
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
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: var(--cursor);
  }
}
</style>
