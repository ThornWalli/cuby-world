<template>
  <cw-dialog ref="dialog" v-bind="$attrs" class="cw-dialog-room-grid">
    <template #header>Room Grid</template>
    <template #default="ctx">
      <form
        ref="formEl"
        class="fields"
        @submit="onSubmit($event, { close: ctx.close })">
        <cw-form-field-textfield
          v-model="model.dimension.x"
          type="number"
          :min="1"
          name="roomDimensionX"
          label="X" />
        <cw-form-field-textfield
          v-model="model.dimension.y"
          type="number"
          :min="1"
          name="roomDimensionY"
          label="Y" />
        <cw-form-field-select
          v-model="model.origin"
          style-type="light"
          label="Origin">
          <cw-form-field-select-option
            v-for="option in originOptions"
            :key="option.value"
            v-bind="option" />
        </cw-form-field-select>
      </form>
      <div class="info">{{ model.dimension.x * model.dimension.y }} tiles</div>
    </template>
    <template #actions>
      <cw-button @click="onClickSave()"> Save </cw-button>
    </template>
  </cw-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CwDialog from '@cuby-world/app/components/Dialog.vue';
import CwFormFieldTextfield from '@cuby-world/app/components/formField/Textfield.vue';
import CwFormFieldSelect from '@cuby-world/app/components/formField/Select.vue';
import CwFormFieldSelectOption from '@cuby-world/app/components/formField/select/Option.vue';
import CwButton from '@cuby-world/app/components/Button.vue';
import { Vector2 } from 'three';
import { ORIGIN } from '../../types';

const formEl = ref<HTMLFormElement | null>(null);

const model = ref<{
  dimension: Vector2;
  origin: ORIGIN;
}>({
  dimension: new Vector2(10, 10),
  origin: ORIGIN.TOP_LEFT
});

const originLabels: Record<ORIGIN, string> = {
  [ORIGIN.TOP_LEFT]: 'Top Left',
  [ORIGIN.TOP_RIGHT]: 'Top Right',
  [ORIGIN.BOTTOM_LEFT]: 'Bottom Left',
  [ORIGIN.BOTTOM_RIGHT]: 'Bottom Right'
};
const originOptions = Object.values(ORIGIN).map(value => ({
  label: originLabels[value],
  value
}));

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
  model.value = {
    ...model.value,
    dimension: new Vector2(
      Number(formData.get('roomDimensionX') || 0),
      Number(formData.get('roomDimensionY') || 0)
    )
  };
  close<{
    dimension: Vector2;
    origin: ORIGIN;
  }>(model.value);
}

const dialog = ref<InstanceType<typeof CwDialog> | null>(null);

function open(data: Vector2) {
  model.value = {
    dimension: data.clone(),
    origin: model.value.origin
  };
  return dialog.value!.dialog!.open<{
    dimension: Vector2;
    origin: ORIGIN;
  }>();
}

defineExpose({
  open
});
</script>

<style lang="postcss" scoped>
.cw-dialog-room-grid {
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
