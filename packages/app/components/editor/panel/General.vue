<template>
  <cw-panel class="cw-panel-general" hide-title title="General Settings">
    <cw-button mode="compact" @click="onClickExport">
      <template #icon><svg-indicator-download /></template>
      Export
    </cw-button>
    <cw-form-field-small-upload label="Import" @file="onFile" />
  </cw-panel>
</template>

<script lang="ts" setup>
import SvgIndicatorDownload from '@cuby-world/app/assets/icons/indicator/download.svg';
import CwPanel from '@cuby-world/app/components/Panel.vue';
import CwButton from '@cuby-world/app/components/Button.vue';
import CwFormFieldSmallUpload from '@cuby-world/app/components/formField/compact/Upload.vue';
import { exportRoom, importRoom } from '@cuby-world/room-editor/utils/file';
import type App from '@cuby-world/app/lib/classes/App';

const $props = defineProps<{
  app: App;
}>();

async function onClickExport() {
  await exportRoom(
    $props.app.modules.room.getRoom()!.toRoomEditorDescription()
  );
}

async function onFile(file?: File) {
  if (!file) return;
  $props.app.loadRoom(await importRoom(file));
}
</script>
