<template>
  <cw-dialog
    ref="dialog"
    v-bind="$attrs"
    hide-close
    class="cw-dialog-settings-unit-settings-light">
    <template #header>Teleporter Settings</template>
    <template #default="ctx">
      <form
        :id="formId"
        ref="formEl"
        class="fields"
        @submit="onSubmit($event, { close: ctx.close })">
        <cw-form-field-text-field
          v-model="model.intensity"
          type="number"
          :min="0"
          :max="1"
          :step="0.01"
          label="Intensity"
          required />
      </form>
    </template>
    <template #actions>
      <cw-button :form="formId" type="submit"> Save </cw-button>
    </template>
  </cw-dialog>
</template>

<script lang="ts" setup>
import { reactive, useId } from 'vue';
import CwDialog from '../Dialog.vue';
import CwFormFieldTextField from '../formField/Textfield.vue';
import CwButton from '../Button.vue';
import type LightUnit from '@cuby-world/app/lib/classes/unit/Light';

const formId = useId();

defineOptions({
  inheritAttrs: false
});

const $props = defineProps<{
  unit: LightUnit;
}>();

const model = reactive<{
  intensity: number;
}>({
  intensity: $props.unit.modules.light.state.intensity ?? 0
});

function onSubmit(
  e: Event,
  { close }: { close: <Result = unknown>(value?: Result | undefined) => void }
) {
  e.preventDefault();
  $props.unit.modules.light.setIntensity(model.intensity);
  close();
}
</script>

<style lang="postcss" scoped>
.cw-dialog-settings-unit-settings-light {
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
