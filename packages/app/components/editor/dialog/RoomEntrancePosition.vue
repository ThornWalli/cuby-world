<template>
  <cw-dialog ref="dialog" v-bind="$attrs" class="cw-dialog-room-grid-resize">
    <template #header>Resize Grid</template>
    <template #default="ctx">
      <form
        ref="formEl"
        class="fields"
        @submit="onSubmit($event, { close: ctx.close })">
        <cw-form-field-textfield
          :model-value="model.position.x"
          type="number"
          :min="0"
          :max="gridSize.x"
          :step="1"
          name="positionX"
          label="X" />
        <cw-form-field-textfield
          :model-value="model.position.y"
          type="number"
          :min="0"
          :step="1"
          name="positionY"
          label="Y" />
        <cw-form-field-textfield
          :model-value="model.position.z"
          type="number"
          :min="0"
          :max="gridSize.y"
          :step="1"
          name="positionZ"
          label="Z" />
        <cw-form-field-select
          name="rotation"
          :model-value="model.rotation"
          style-type="light"
          label="Rotation">
          <cw-form-field-select-option
            v-for="option in rotationOptions"
            :key="option.value"
            v-bind="option" />
        </cw-form-field-select>
      </form>
    </template>
    <template #actions>
      <cw-button @click="onClickSave()"> Save </cw-button>
    </template>
  </cw-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CwDialog from '../../../components/Dialog.vue';
import CwFormFieldTextfield from '../../../components/formField/Textfield.vue';
import CwFormFieldSelect from '../../../components/formField/Select.vue';
import CwFormFieldSelectOption from '../../../components/formField/select/Option.vue';
import CwButton from '../../../components/Button.vue';
import type { Vector2 } from 'three';
import { Vector3 } from 'three';
import {
  TELEPORT_TYPE,
  type EntranceTeleportDescription,
  type TELEPORT_ROTATION
} from '@cuby-world/app/lib/types/room';
import { ROTATION } from '@cuby-world/app/lib/types';

const formEl = ref<HTMLFormElement | null>(null);

function getDefaultEntranceTeleport(): EntranceTeleportDescription {
  return {
    type: TELEPORT_TYPE.ENTRANCE,
    position: new Vector3(0, 0, 0),
    rotation: ROTATION.EAST
  };
}

const model = ref<EntranceTeleportDescription>(getDefaultEntranceTeleport());

const rotationOptions = ref([
  { value: ROTATION.NORTH, label: 'North' },
  { value: ROTATION.EAST, label: 'East' },
  { value: ROTATION.SOUTH, label: 'South' },
  { value: ROTATION.WEST, label: 'West' }
]);

defineProps<{
  gridSize: Vector2;
}>();

defineOptions({
  inheritAttrs: false
});

function onClickSave() {
  formEl.value?.requestSubmit();
}

function onSubmit(
  e: Event,
  { close }: { close: <Result = unknown>(value?: Result | undefined) => void }
) {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  if (
    !Object.values(ROTATION).includes(
      formData.get('rotation') as TELEPORT_ROTATION
    )
  ) {
    throw new Error('Invalid rotation value');
  }
  model.value = {
    ...model.value,
    position: new Vector3(
      Number(formData.get('positionX') || 0),
      Number(formData.get('positionY') || 0),
      Number(formData.get('positionZ') || 0)
    ),
    rotation: formData.get('rotation') as TELEPORT_ROTATION
  };

  close<EntranceTeleportDescription>(model.value);
}

const dialog = ref<InstanceType<typeof CwDialog> | null>(null);

function open(entranceTeleport?: EntranceTeleportDescription) {
  model.value = {
    ...model.value,
    ...entranceTeleport
  };
  return dialog.value!.dialog!.open<EntranceTeleportDescription>();
}

defineExpose({
  open
});
</script>

<style lang="postcss" scoped>
.cw-dialog-room-grid-resize {
  .fields {
    display: flex;
    flex-direction: column;
    gap: 10px;

    & :deep(.cw-base-form-field label) {
      min-width: 30px;
    }
  }

  & .info {
    padding-top: 5px;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }
}
</style>
