<template>
  <cw-dialog ref="dialog" v-bind="$attrs" class="cw-dialog-debug">
    <template #header>Debug</template>
    <template #default>
      <div class="previews">
        <cw-object-preview-wall-extension
          :app="app"
          :ratio="8 / 4"
          :width="64"
          :model-value="wallExtension" />
        <cw-object-preview-unit
          :app="app"
          :ratio="8 / 4"
          :width="64"
          :model-value="unit" />
      </div>
    </template>
  </cw-dialog>
</template>

<script lang="ts" setup>
import { markRaw, ref } from 'vue';
import CwDialog from '../../../components/Dialog.vue';
import type { RoomDescription } from '../../../lib/types/room';
import type App from '../../../lib/classes/App';

// import CwObjectPreviewWallExtension from '../../objectPreview/WallExtension.vue';
import CwObjectPreviewUnit from '../../objectPreview/Unit.vue';
import Cuby from '@cuby-world/units/cuby/Cuby';
import type WallExtension from '@cuby-world/app/lib/classes/WallExtension';
import type Unit from '@cuby-world/app/lib/classes/Unit';
import StandardWindow from '@cuby-world/walls/extensions/default/windows/standard/Standard';

const unit = ref(
  markRaw({
    unit: Cuby as typeof Unit
  })
);
const wallExtension = ref(
  markRaw({
    extension: StandardWindow as typeof WallExtension,
    state: { type: 'default', size: 'large' }
  })
);

const dialog = ref<InstanceType<typeof CwDialog> | null>(null);

const _$props = defineProps<{
  app: App;
}>();

defineOptions({
  inheritAttrs: false
});

function open() {
  return dialog.value!.dialog!.open<RoomDescription['info']>();
}

defineExpose({
  open
});
</script>

<style lang="postcss" scoped>
.cw-dialog-debug {
  & .spacer {
    flex: 1;
  }

  & .previews {
    display: flex;

    & > * {
      flex: 1;
    }
  }
}
</style>
