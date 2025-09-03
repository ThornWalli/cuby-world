<template>
  <cw-panel class="cw-panel-general" hide-title title="General Settings">
    <cw-button @click="onClickUserSettings">User settings</cw-button>
    <teleport to="#teleports">
      <cw-dialog-user-settings ref="dialogUserSettings" />
    </teleport>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../Panel.vue';
import CwButton from '../Button.vue';
import { onUnmounted, ref } from 'vue';
import { Subscription } from 'rxjs';
import CwDialogUserSettings from '../dialogs/UserSettings.vue';
import type App from '@cuby-world/app/lib/classes/App';

const $props = defineProps<{
  app: App;
}>();

const subscription = new Subscription();
const dialogUserSettings = ref<InstanceType<
  typeof CwDialogUserSettings
> | null>(null);

async function onClickUserSettings() {
  const player = $props.app.modules.player.state.currentPlayer;
  if (!player) {
    throw new Error('No current player');
  }
  if (!dialogUserSettings.value) {
    throw new Error('Dialog not ready');
  }

  const data = await dialogUserSettings.value?.open(player?.getSettings());

  if (data) {
    $props.app.modules.player.state.currentPlayer?.setSettings({
      name: data.name,
      color: data.color
    });
  }
}

onUnmounted(() => {
  subscription.unsubscribe();
});
</script>
