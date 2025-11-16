<template>
  <cw-dialog
    ref="dialog"
    v-bind="$attrs"
    hide-close
    class="cw-dialog-settings-unit-settings-teleporter">
    <template #header>Teleporter Settings</template>
    <template #default="ctx">
      <form
        :id="formId"
        ref="formEl"
        class="fields"
        @submit="onSubmit($event, { close: ctx.close })">
        <cw-form-field-text-field
          v-if="model.type === TELEPORTER_TYPE.TELEPORTER"
          :model-value="$props.unit.id"
          readonly
          label="Current Id" />
        <cw-form-field-select v-model="model.type" label="Teleport Type">
          <cw-form-field-select-option
            v-for="option in teleporterTypeOptions"
            v-bind="option"
            :key="option.value" />
        </cw-form-field-select>
        <cw-form-field-text-field
          v-if="model.type === TELEPORTER_TYPE.TELEPORTER"
          v-model="model.targetRoomId"
          label="Room Id" />
        <cw-form-field-text-field
          v-if="model.type === TELEPORTER_TYPE.TELEPORTER"
          v-model="model.targetRoomTeleporterId"
          label="Teleporter Id" />
      </form>
    </template>
    <template #actions>
      <cw-button
        :disabled="
          model.type === TELEPORTER_TYPE.TELEPORTER &&
          !(model.targetRoomId || model.targetRoomTeleporterId)
        "
        :form="formId"
        type="submit">
        Save
      </cw-button>
    </template>
  </cw-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, useId } from 'vue';
import CwDialog from '../Dialog.vue';
import CwFormFieldSelect from '../formField/Select.vue';
import CwFormFieldSelectOption from '../formField/select/Option.vue';
import CwFormFieldTextField from '../formField/Textfield.vue';

import CwButton from '../Button.vue';

import { TELEPORTER_TYPE } from '@cuby-world/app/lib/classes/unitModule/Teleporter';
import type TeleporterUnit from '@cuby-world/app/lib/classes/unit/Teleporter';

const formId = useId();

defineOptions({
  inheritAttrs: false
});

const $props = defineProps<{
  unit: TeleporterUnit;
}>();

const model = reactive<{
  type: TELEPORTER_TYPE;
  targetRoomId: string;
  targetRoomTeleporterId: string;
}>({
  type: $props.unit.modules.teleporter.getType() || TELEPORTER_TYPE.ENTRANCE,
  targetRoomId: $props.unit.modules.teleporter.getTargetRoomId() || '',
  targetRoomTeleporterId:
    $props.unit.modules.teleporter.getTargetRoomTeleporterId() || ''
});

const teleporterTypeOptions = ref(
  Object.entries(TELEPORTER_TYPE).map(([key, value]) => ({
    label: key.charAt(0) + key.slice(1).toLowerCase(),
    value
  }))
);

function onSubmit(
  e: Event,
  { close }: { close: <Result = unknown>(value?: Result | undefined) => void }
) {
  e.preventDefault();
  const targetRoomTeleporterId = model.targetRoomTeleporterId.trim();
  const targetRoomId = model.targetRoomId.trim();
  if (
    model.type === TELEPORTER_TYPE.ENTRANCE ||
    targetRoomTeleporterId ||
    targetRoomId
  ) {
    const teleporterUnit = $props.unit;
    teleporterUnit.modules.teleporter.setType(model.type);
    teleporterUnit.modules.teleporter.setTargetRoomId(targetRoomId);
    teleporterUnit.modules.teleporter.setTargetRoomTeleporterId(
      targetRoomTeleporterId
    );
    close();
  }
}
</script>

<style lang="postcss" scoped>
.cw-dialog-settings-unit-settings-teleporter {
  & form {
    display: flex;
    flex-direction: column;
    gap: var(--cw-spacing-small);
    width: 320px;
  }

  & :deep(.cw-base-form-field label) {
    min-width: 100px;
  }
}
</style>
