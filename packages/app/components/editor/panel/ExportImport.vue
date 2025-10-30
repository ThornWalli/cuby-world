<template>
  <cw-panel class="cw-panel-export-import" hide-title title="Export / Import">
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
import type App from '@cuby-world/app/lib/classes/App';
import { exportRoom, importRoom } from '@cuby-world/app/lib/utils/file';

const $props = defineProps<{
  app: App;
}>();

async function onClickExport() {
  await exportRoom($props.app.modules.room.getRoom()!.toDescription());
}

async function onFile(file?: File) {
  if (!file) return;
  $props.app.enterRoom(await importRoom(file));
}
</script>
