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
        <cw-form-field-select v-model="model.color" label="Your Skin">
          <cw-form-field-select-option
            v-for="option in skinOptions"
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
import { ref } from 'vue';
import CwDialog from '../Dialog.vue';
import CwFormFieldTextfield from '../formField/Textfield.vue';
import CwFormFieldSelect from '../formField/Select.vue';
import CwFormFieldSelectOption from '../formField/select/Option.vue';

import CwButton from '../Button.vue';
import type { PlayerSettings } from '@cuby-world/app/lib/classes/Player';

const formEl = ref<HTMLFormElement | null>(null);

const model = ref();

defineOptions({
  inheritAttrs: false
});

const skinOptions = [
  { label: 'Blue', value: 'blue' },
  { label: 'Red', value: 'red' },
  { label: 'Green', value: 'green' },
  { label: 'Yellow', value: 'yellow' }
];

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
