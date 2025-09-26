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
      </form>
      <teleport to="#teleports">
        <cw-room-editor-dialog-room-grid-resize ref="dialogRoomGridResize" />
        <cw-room-editor-dialog-room-grid-ground ref="dialogRoomGridGround" />
      </teleport>
    </template>
    <template #actions>
      <cw-button style-type="tertiary" @click="onClickRoomGridResize()">
        Grid Resize
      </cw-button>
      <cw-button style-type="tertiary" @click="onClickRoomGridGround()">
        Grid Ground
      </cw-button>
      <span class="spacer"></span>
      <cw-button @click="onClickSave()"> Save </cw-button>
    </template>
  </cw-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CwDialog from '../../../components/Dialog.vue';
import CwFormFieldTextfield from '../../../components/formField/Textfield.vue';
import CwFormFieldTextarea from '../../../components/formField/Textarea.vue';
import CwButton from '../../../components/Button.vue';
import CwRoomEditorDialogRoomGridResize from './RoomGridResize.vue';
import CwRoomEditorDialogRoomGridGround from './RoomGridGround.vue';
import type { RoomDescription } from '../../../lib/classes/RoomDescription';
import { Vector2 } from 'three';
import type App from '@cuby-world/app/lib/classes/App';
import { resizeRoom } from '@cuby-world/app/lib/utils/editor/room';

const formEl = ref<HTMLFormElement | null>(null);

const dialogRoomGridResize = ref<InstanceType<
  typeof CwRoomEditorDialogRoomGridResize
> | null>(null);

const dialogRoomGridGround = ref<InstanceType<
  typeof CwRoomEditorDialogRoomGridGround
> | null>(null);

const model = ref<RoomDescription>({} as RoomDescription);

const $props = defineProps<{
  app: App;
}>();

defineOptions({
  inheritAttrs: false
});

function onClickSave() {
  formEl.value?.requestSubmit();
}

async function onClickRoomGridResize() {
  if (
    confirm('Changing the room grid will reset the current room. Continue?') ===
    false
  ) {
    return;
  }
  let description = model.value!;
  const dialogValue = await dialogRoomGridResize.value!.open(
    new Vector2(description.grid[0]!.length, description.grid.length)
  );
  if (dialogValue) {
    const { origin, dimension } = dialogValue;

    description = resizeRoom(description, origin, dimension);
    model.value = description;
    $props.app.loadRoom(description);
  }
}

async function onClickRoomGridGround() {
  const roomModel = model.value!;
  const { grid, start } = await dialogRoomGridGround.value!.open(model.value);
  if (grid && start) {
    const description: RoomDescription = {
      ...roomModel,
      grid,
      start
    };
    model.value = description;
    $props.app.loadRoom(description);
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
    description: String(formData.get('description'))
  };
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
