<template>
  <cw-panel title="Settings">
    <cw-form-field-select
      hide-label
      :model-value="modelValue.actionType"
      mode="compact"
      label="Mode"
      @update:model-value="
        onUpdateModelValue({ actionType: $event as ACTION_TYPE })
      ">
      <cw-form-field-select-option :value="ACTION_TYPE.NONE">
        Select Action
      </cw-form-field-select-option>
      <cw-form-field-select-group label="Actions">
        <cw-form-field-select-option
          v-for="{ value, label } in actionTypes"
          :key="value"
          :value="value">
          {{ label }}
        </cw-form-field-select-option>
      </cw-form-field-select-group>
    </cw-form-field-select>
    <cw-button mode="compact" @click="onClickRoomInfo">Room Info</cw-button>
    <cw-button mode="compact" @click="onClickRoomGrid">Room Grid</cw-button>
    <teleport to="#teleports">
      <cw-room-editor-dialog-room-grid ref="dialogRoomGrid" />
      <cw-room-editor-dialog-room-info ref="dialogRoomInfo" />
    </teleport>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '@cuby-world/app/components/Panel.vue';
import CwButton from '@cuby-world/app/components/Button.vue';
import CwFormFieldSelect from '@cuby-world/app/components/formField/Select.vue';
import CwFormFieldSelectOption from '@cuby-world/app/components/formField/select/Option.vue';
import CwFormFieldSelectGroup from '@cuby-world/app/components/formField/select/Group.vue';
import CwRoomEditorDialogRoomGrid from '../dialog/RoomGrid.vue';
import CwRoomEditorDialogRoomInfo from '../dialog/RoomInfo.vue';
import { ref } from 'vue';
import { Vector2 } from 'three';
import { ACTION_TYPE, ORIGIN, type RoomEditorModel } from '../../types';

type Model = RoomEditorModel;

const dialogRoomGrid = ref<InstanceType<
  typeof CwRoomEditorDialogRoomGrid
> | null>(null);

const dialogRoomInfo = ref<InstanceType<
  typeof CwRoomEditorDialogRoomInfo
> | null>(null);

const $props = defineProps<{
  modelValue: Model;
}>();

const actionTypes = ref([
  { value: ACTION_TYPE.SET_UNIT, label: 'Set Unit' },
  { value: ACTION_TYPE.ADD, label: 'Add' },
  { value: ACTION_TYPE.REMOVE, label: 'Remove' },
  { value: ACTION_TYPE.START_POSITION, label: 'Start Position' },
  { value: ACTION_TYPE.SET_WALL, label: 'Add/Remove Wall' },
  { value: ACTION_TYPE.EDIT_WALL, label: 'Set Wall' }
]);

const $emit = defineEmits<{
  (e: 'update:model-value', value: Model): void;
}>();

function onUpdateModelValue(value: Partial<Model>) {
  if (value !== $props.modelValue) {
    // Emit only if value changed
    $emit('update:model-value', {
      ...$props.modelValue,
      ...value
    });
  }
}

async function onClickRoomInfo() {
  const info = await dialogRoomInfo.value!.open(
    $props.modelValue.roomModel.info
  );

  onUpdateModelValue({
    roomModel: {
      ...$props.modelValue.roomModel,
      info
    }
  });
}

// eslint-disable-next-line complexity
async function onClickRoomGrid() {
  const dialogValue = await dialogRoomGrid.value!.open(
    new Vector2(
      $props.modelValue.roomModel.grid[0]!.length,
      $props.modelValue.roomModel.grid.length
    )
  );
  if (dialogValue) {
    const { origin, dimension } = dialogValue;
    const grid = Array(dimension.y)
      .fill(0)
      .map(() => Array(dimension.x).fill({ value: 0 }));

    switch (origin) {
      case ORIGIN.TOP_LEFT:
        for (let z = 0; z < dimension.y; z++) {
          grid[z] = [];
          for (let x = 0; x < dimension.x; x++) {
            grid[z]![x] = $props.modelValue.roomModel.grid[z]?.[x] ?? 0;
          }
        }
        break;
      case ORIGIN.TOP_RIGHT:
        for (let z = 0; z < dimension.y; z++) {
          grid[z] = [];
          for (let x = 0; x < dimension.x; x++) {
            grid[z]![x] =
              $props.modelValue.roomModel.grid[z]?.[
                x + $props.modelValue.roomModel.grid[0]!.length - dimension.x
              ] ?? 0;
          }
        }
        break;
      case ORIGIN.BOTTOM_LEFT:
        for (let z = 0; z < dimension.y; z++) {
          grid[z] = [];
          for (let x = 0; x < dimension.x; x++) {
            grid[z]![x] =
              $props.modelValue.roomModel.grid[
                z + $props.modelValue.roomModel.grid.length - dimension.y
              ]?.[x] ?? 0;
          }
        }
        break;
      case ORIGIN.BOTTOM_RIGHT:
        for (let z = 0; z < dimension.y; z++) {
          grid[z] = [];
          for (let x = 0; x < dimension.x; x++) {
            grid[z]![x] =
              $props.modelValue.roomModel.grid[
                z + $props.modelValue.roomModel.grid.length - dimension.y
              ]?.[
                x + $props.modelValue.roomModel.grid[0]!.length - dimension.x
              ] ?? 0;
          }
        }
        break;
    }

    onUpdateModelValue({
      roomModel: {
        ...$props.modelValue.roomModel,
        grid
      }
    });
  }
}
</script>
