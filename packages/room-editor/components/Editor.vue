<template>
  <div class="cw-room-editor-editor">
    <!-- <pre>{{ room }}</pre> -->
    <cw-room-editor-grid
      v-if="ready"
      :action-type="model.actionType"
      :model-value="{
        grid: model.roomModel.grid,
        startPosition: model.roomModel.start.position,
        walls: model.roomModel.walls,
        units: model.roomModel.units,
        selectedPosition: selectedGridPosition
      }"
      :dimension="gridDimension"
      @update:model-value="onUpdateModelValueGrid" />
    <cw-panel-group position="top">
      <cw-room-editor-panel-room-info v-model="model.roomModel" />
    </cw-panel-group>
    <cw-panel-group position="left">
      <cw-room-editor-panel-settings v-model="model" />
    </cw-panel-group>
    <cw-panel-group position="right">
      <cw-room-editor-panel-units
        :selected-unit="selectedUnit"
        :units="model.roomModel.units"
        :position="selectedGridPosition"
        @select-unit="onSelectUnit"
        @create-unit="onCreateUnit"
        @remove-unit="onRemoveUnit" />
    </cw-panel-group>
    <cw-panel-group position="bottom">
      <cw-room-editor-panel-unit-settings
        v-if="selectedUnit"
        :model-value="selectedUnit"
        @update:model-value="Object.assign(selectedUnit, $event)" />
    </cw-panel-group>
    <cw-panel-group position="bottom-left">
      <cw-room-editor-panel-import-export v-model="model.roomModel" />
    </cw-panel-group>
    <cw-panel-group position="bottom-right">
      <div id="panelsBottomRight" />
    </cw-panel-group>
  </div>
</template>
<script lang="ts" setup>
import CwPanelGroup from '@cuby-world/app/components/PanelGroup.vue';
import { computed, onMounted, ref } from 'vue';
import type { Vector3 } from 'three';
import { Vector2 } from 'three';
import CwRoomEditorGrid from './Grid.vue';
import CwRoomEditorPanelRoomInfo from './panel/RoomInfo.vue';
import CwRoomEditorPanelSettings from './panel/Settings.vue';
import CwRoomEditorPanelImportExport from './panel/ImportExport.vue';
import CwRoomEditorPanelUnits from './panel/Units.vue';
import CwRoomEditorPanelUnitSettings from './panel/UnitSettings.vue';

import { ACTION_TYPE, type GridModel, type RoomEditorModel } from '../types';
import { parseRoomDescription } from '../utils/parse';
import type { UnitDescription } from '@cuby-world/app/lib/classes/Unit';
import type { JsonRoomDescription } from '@cuby-world/app/lib/classes/RoomDescription';

const selectedUnit = ref<UnitDescription | undefined>();
const selectedGridPosition = ref<Vector3 | undefined>();

function onSelectUnit(unit: UnitDescription | undefined) {
  selectedUnit.value = unit;
}

function onCreateUnit(unit: UnitDescription) {
  const units = [...model.value.roomModel.units, unit];
  model.value.roomModel.units = units;
}

function onRemoveUnit(unit: UnitDescription) {
  const units = [...model.value.roomModel.units.filter(u => u !== unit)];
  model.value.roomModel.units = units;
}

const $props = defineProps<{
  room: JsonRoomDescription;
}>();

const model = ref<RoomEditorModel>({
  actionType: ACTION_TYPE.SET_WALL,
  roomModel: parseRoomDescription($props.room)
});

const gridDimension = computed(() => {
  const roomModel = model.value.roomModel;
  return new Vector2(roomModel.grid.length, roomModel.grid[0]!.length);
});

const ready = ref(false);
onMounted(() => {
  ready.value = true;
});

function onUpdateModelValueGrid(value: GridModel) {
  selectedUnit.value = undefined;
  selectedGridPosition.value = value.selectedPosition;
  const roomModel = model.value.roomModel;
  roomModel.grid = value.grid;
  roomModel.start.position = value.startPosition;
  roomModel.walls = value.walls;
}
</script>
<script lang="ts"></script>
<style lang="postcss" scoped>
.cw-room-editor-editor {
  display: flex;
  align-items: center;
  justify-content: center;

  & .toggles {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
