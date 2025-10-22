<template>
  <cw-dialog ref="dialog" v-bind="$attrs" class="cw-dialog-user-settings">
    <template #header>Dein Cuby</template>
    <template #default="ctx">
      <form
        ref="formEl"
        class="fields"
        @submit="onSubmit($event, { close: ctx.close })">
        <cw-form-field-textfield
          v-model="model.name"
          required
          placeholder="Name…"
          label="Your Name" />
        <cw-form-field-select v-model="model.color" label="Your Color">
          <cw-form-field-select-option
            v-for="option in colorOptions"
            v-bind="option"
            :key="option.value"></cw-form-field-select-option>
        </cw-form-field-select>
      </form>
    </template>
    <template #actions>
      <cw-button @click="onClickSave()"> Save </cw-button>
    </template>
  </cw-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import CwDialog from '../Dialog.vue';
import CwFormFieldTextfield from '../formField/Textfield.vue';
import CwFormFieldSelect from '../formField/Select.vue';
import CwFormFieldSelectOption from '../formField/select/Option.vue';

import CwButton from '../Button.vue';
import { CUBY_COLOR, CUBY_NAME } from '@cuby-world/units/cuby/Cuby';
import type { PlayerSettings } from '@cuby-world/app/lib/classes/Player';

const formEl = ref<HTMLFormElement | null>(null);
const colorOptions = computed(() => {
  return Object.values(CUBY_COLOR).map(index => ({
    label: CUBY_NAME[index as CUBY_COLOR],
    value: index
  }));
});

const model = ref();

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
  close<PlayerSettings>(model.value);
}

const dialog = ref<InstanceType<typeof CwDialog> | null>(null);

function open(data: PlayerSettings) {
  model.value = { ...data };
  return dialog.value!.dialog!.open<PlayerSettings>();
}

defineExpose({
  open
});
</script>

<style lang="postcss" scoped>
.fields {
  display: flex;
  flex-direction: column;
  gap: 10px;

  & :deep(.cw-base-form-field label) {
    min-width: 100px;
  }
}
</style>
