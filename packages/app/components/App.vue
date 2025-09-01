<template>
  <div ref="rootEl" class="cw-app">
    <cw-renderer
      ref="rendererEl"
      debug
      :options="rendererOptions"
      :modules="[IntersectionRendererModule]" />
    <cw-app-playground v-if="app" :app="app" />
    <cw-dialog-user-settings ref="dialogUserSettings" />
  </div>
</template>

<script lang="ts" setup>
import { ref, markRaw, nextTick, onMounted, onUnmounted } from 'vue';
import App, { type AppConfig } from '../lib/classes/App';
import CwRenderer from './Renderer.vue';
import CwAppPlayground from './app/Playground.vue';
import CwDialogUserSettings, {
  type PlayerSettings
} from './dialogs/UserSettings.vue';

import setupFonts from './../utils/fonts';
import type { RendererOptions } from '../types';
import IntersectionRendererModule from '../lib/classes/rendererModule/Intersection';
import UnitFocusAppModule from '../lib/classes/appModule/UnitFocus';
import { fromEvent, Subscription } from 'rxjs';
import { Vector2 } from 'three';
import type Renderer from '../lib/classes/Renderer';
import Player from '../lib/classes/Player';
import { CUBY_COLOR } from '@cuby-world/units/cuby/Cuby';
import DefaultRoom from '../lib/rooms/Default';

setupFonts();
const $props = defineProps<{
  config: AppConfig;
  rendererOptions?: RendererOptions;
}>();

const rootEl = ref<HTMLElement>();
const dimension = ref<Vector2>();
const subscription = new Subscription();
const app = ref<App>();
const rendererEl = ref<InstanceType<typeof CwRenderer> | null>(null);
const ready = ref(false);
const dialogUserSettings = ref<InstanceType<
  typeof CwDialogUserSettings
> | null>(null);

onMounted(async () => {
  nextTick(() => {
    setup();
  });
});

onUnmounted(() => {
  app.value?.destroy();
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

  // ####
  // TODO: Raum muss noch aus der db kommen.
  app.modules.room.fromDescription(new DefaultRoom());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).cubyWorld = app;
}

const STORAGE_PLAYER_KEY = 'cuby-world:player';

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
  if (!playerSettings && dialogUserSettings.value) {
    playerSettings = await dialogUserSettings.value
      .getDialog()
      ?.open<PlayerSettings>();
    window.sessionStorage.setItem(
      STORAGE_PLAYER_KEY,
      JSON.stringify(playerSettings)
    );
  }
  return playerSettings;
}

async function setupApp(renderer: Renderer) {
  app.value = markRaw(new App($props.config, renderer, [UnitFocusAppModule]));
  await app.value.setup();
  ready.value = true;

  subscription.add(
    fromEvent(window, 'resize', {
      passive: true
    }).subscribe(() => {
      onResize();
    })
  );

  return app.value;
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
    transform: translate(-50%, -50%);
  }
}
</style>
