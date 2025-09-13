<template>
  <cw-dialog ref="dialog" v-bind="$attrs" class="cw-dialog-room-info">
    <template #header>Room Size</template>
    <template #default="ctx">
      <form
        ref="formEl"
        class="fields"
        @submit="onSubmit($event, { close: ctx.close })">
        <cw-form-field-textfield
          v-model="model.name"
          name="name"
          label="Name" />
        <cw-form-field-textarea
          v-model="model.description"
          name="description"
          label="Description" />
      </form>
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
import CwFormFieldTextarea from '@cuby-world/app/components/formField/Textarea.vue';
import CwButton from '@cuby-world/app/components/Button.vue';
import type { EditorRoomDescription } from '../../types';

const formEl = ref<HTMLFormElement | null>(null);

const model = ref<
  {
    description: string;
  } & EditorRoomDescription['info']
>({
  name: '',
  description: ''
});

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
    name: String(formData.get('name')),
    description: String(formData.get('description'))
  };
  close<EditorRoomDescription['info']>(model.value);
}

const dialog = ref<InstanceType<typeof CwDialog> | null>(null);

function open(data: EditorRoomDescription['info']) {
  model.value = { description: '', ...data };
  return dialog.value!.dialog!.open<EditorRoomDescription['info']>();
}

defineExpose({
  open
});
</script>

<style lang="postcss" scoped>
.cw-dialog-room-info {
  .fields {
    display: flex;
    flex-direction: column;
    gap: 10px;

    & :deep(.cw-base-form-field label) {
      min-width: 100px;
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
