<template>
  <cw-dialog ref="dialog" v-bind="$attrs" class="cw-dialog-room-info">
    <template #header>Room Size</template>
    <template #default="ctx">
      <form
        ref="formEl"
        class="fields"
        @submit="onSubmit($event, { close: ctx.close })">
        <cw-form-field-textfield
          v-model="model!.info.name"
          name="name"
          label="Name" />
        <cw-form-field-textarea
          :model-value="model!.info.description ?? ''"
          name="description"
          label="Description"
          @update:model-value="val => (model!.info.description = val)" />
        <cww-form-field-select
          v-model="model!.info.timezone"
          label="Timezone"
          name="timezone">
          <option
            v-for="option in timezoneOptions"
            :key="option.value"
            :value="option.value">
            {{ option.label }}
          </option>
        </cww-form-field-select>
      </form>
      <teleport to="#teleports">
        <cw-room-editor-dialog-room-grid-resize ref="dialogRoomGridResize" />
      </teleport>
    </template>
    <template #actions>
      <cw-button style-type="tertiary" @click="onClickRoomGridResize()">
        Grid Resize
      </cw-button>
      <span class="spacer"></span>
      <cw-button @click="onClickSave()"> Save </cw-button>
    </template>
  </cw-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import CwDialog from '../../../components/Dialog.vue';
import CwFormFieldTextfield from '../../../components/formField/Textfield.vue';
import CwFormFieldTextarea from '../../../components/formField/Textarea.vue';
import CwwFormFieldSelect from '../../formField/Select.vue';
import CwButton from '../../../components/Button.vue';
import CwRoomEditorDialogRoomGridResize from './RoomGridResize.vue';

import type App from '@cuby-world/app/lib/classes/App';
import { resizeRoom } from '@cuby-world/app/lib/utils/editor/room';
import type { RoomDescription } from '@cuby-world/app/lib/types/room';

const formEl = ref<HTMLFormElement | null>(null);

const dialogRoomGridResize = ref<InstanceType<
  typeof CwRoomEditorDialogRoomGridResize
> | null>(null);

const model = ref<RoomDescription>({} as RoomDescription);

const $props = defineProps<{
  app: App;
}>();

defineOptions({
  inheritAttrs: false
});

const timezoneOptions = computed(() => {
  return Intl.supportedValuesOf('timeZone').map(tz => ({
    label: tz,
    value: tz
  }));
});

function onClickSave() {
  formEl.value?.requestSubmit();
}

async function onClickRoomGridResize() {
  let description = model.value!;
  const dialogValue = await dialogRoomGridResize.value!.open(
    description.gridSize
  );
  if (dialogValue) {
    const { dimension, origin } = dialogValue;
    if (dimension && origin) {
      description = resizeRoom(description, dimension, origin);
      model.value = description;
      $props.app.enterRoom(description);
    }
  }
}

function onSubmit(
  e: Event,
  { close }: { close: <Result = unknown>(value?: Result | undefined) => void }
) {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  model.value.info = {
    name: String(formData.get('name')),
    description: String(formData.get('description')),
    timezone: String(formData.get('timezone'))
  };
  $props.app.enterRoom(model.value);
  close<RoomDescription>(model.value);
}

const dialog = ref<InstanceType<typeof CwDialog> | null>(null);

function open(data: RoomDescription) {
  model.value = { ...data };
  return dialog.value!.dialog!.open<RoomDescription['info']>();
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

  & .spacer {
    flex: 1;
  }
}
</style>
