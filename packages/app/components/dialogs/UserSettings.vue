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
        <cw-form-field-select v-model="model.skin" label="Your Skin">
          <cw-form-field-select-option
            v-for="option in skinOptions"
            v-bind="option"
            :key="option.value" />
        </cw-form-field-select>
        <cw-form-field-select
          v-model="model.graphic.shadowQuality"
          label="Shadow Quality">
          <cw-form-field-select-option
            v-for="option in shadowQualityOptions"
            v-bind="option"
            :key="option.value" />
        </cw-form-field-select>
      </form>
    </template>
    <template #actions>
      <cw-button @click="onClickSave()"> Save </cw-button>
    </template>
  </cw-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import CwDialog from '../Dialog.vue';
import CwFormFieldTextfield from '../formField/Textfield.vue';
import CwFormFieldSelect from '../formField/Select.vue';
import CwFormFieldSelectOption from '../formField/select/Option.vue';

import CwButton from '../Button.vue';
import { catalog } from '@cuby-world/units';
import { ShadowQuality } from '@cuby-world/app/lib/classes/Renderer';
import { getDefaultPlayerSettings } from '@cuby-world/app/lib/utils/player';
import type { PlayerSettings } from '@cuby-world/app/lib/types/player';

const formEl = ref<HTMLFormElement | null>(null);

const model = ref<PlayerSettings>(getDefaultPlayerSettings());

defineOptions({
  inheritAttrs: false
});

const shadowQualityLabels = {
  [ShadowQuality.OFF]: 'Off',
  [ShadowQuality.LOW]: 'Low',
  [ShadowQuality.MEDIUM]: 'Medium',
  [ShadowQuality.HIGH]: 'High'
};
const shadowQualityOptions = Object.values(ShadowQuality).map(value => ({
  label: shadowQualityLabels[value as ShadowQuality],
  value: value
}));

const skinOptions = computed(() => {
  if (!model.value) {
    return [];
  }
  const catalogItem = catalog.get(model.value.characterType!);

  if (!catalogItem || !catalogItem.skins) return [];
  return catalogItem.skins.map(skin => ({
    label: skin.name,
    value: skin.id
  }));
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
