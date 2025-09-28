<template>
  <div
    class="cw-room-editor-grid"
    :class="{
      [`mode-${actionType ?? ACTION_TYPE.NONE}`]: true
    }"
    :style="{
      '--x': dimension.x,
      '--y': dimension.y
    }">
    <cw-room-editor-grid-cell
      v-for="(cell, index) in gridCells"
      :key="index"
      :action-type="actionType"
      :type="cell.value === 1 ? 'floor' : 'empty'"
      :start-position="model.startPosition.equals(cell.position)"
      :selected="model.selectedPosition?.equals(cell.position)"
      :units="unitsMap.get([cell.position.x, cell.position.z].toString()) ?? []"
      :index="index"
      @pointerenter="onPointerEnterCell"
      @pointerdown="onPointerDownCell"
      @pointerup="onPointerUpCell" />
    <div class="walls">
      <cw-room-editor-grid-wall
        v-for="(value, index) in walls"
        v-bind="value"
        :key="index"
        :action-type="actionType"
        :visible="hasWall(value)"
        :selected="selectedWall === getWall(value)"
        @click="onClickWall" />
    </div>
    <teleport to="#panelsBottomRight">
      <cw-room-editor-panel-wall-settings
        v-if="selectedWall"
        :model-value="selectedWall"
        @update:model-value="onUpdateSelectedWall" />
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { Vector2, Vector3 } from 'three';
import CwRoomEditorGridCell from './grid/Cell.vue';
import CwRoomEditorGridWall, { type WallData } from './grid/Wall.vue';
import { ACTION_TYPE, type GridCell, type GridModel } from '../types';

import CwRoomEditorPanelWallSettings from './panel/WallSettings.vue';
import type { UnitDescription } from '@cuby-world/app/lib/classes/Unit';
import {
  WALL_TYPE,
  type WallDescription
} from '@cuby-world/app/lib/types/wall';

function onUpdateSelectedWall(wall: WallDescription) {
  model.value.walls = model.value.walls?.map(w =>
    w === selectedWall.value ? wall : w
  );
  selectedWall.value = wall;
  $emit('update:model-value', model.value);
}

function hasWall(wall: WallData) {
  return !!getWall(wall);
}

function getWall({
  startPosition,
  endPosition
}: {
  startPosition: WallData['startPosition'];
  endPosition: WallData['endPosition'];
}) {
  return model.value.walls?.find(
    w =>
      w.startPosition!.equals(startPosition) &&
      w.endPosition!.equals(endPosition)
  );
}
const selectedWall = ref<WallDescription | null>(null);
function onClickWall(wall: WallData) {
  if ($props.actionType === ACTION_TYPE.EDIT_WALL) {
    if (
      selectedWall.value &&
      wall.startPosition.equals(selectedWall.value.startPosition!) &&
      wall.endPosition.equals(selectedWall.value.endPosition!)
    ) {
      selectedWall.value = null;
    } else {
      selectedWall.value = getWall(wall) ?? null;
    }
  } else {
    setWall(wall);
    $emit('update:model-value', model.value);
  }
}

const $props = defineProps<{
  modelValue: GridModel;
  dimension: Vector2;
  actionType?: ACTION_TYPE;
}>();

const walls = computed(() => {
  const walls: WallData[] = [];
  const width = $props.dimension.x + 1;
  const height = $props.dimension.y + 1;

  for (let y = 0; y < width; y++) {
    for (let x = 0; x < height; x++) {
      if (x + 1 < height) {
        const wall = getWall({
          startPosition: new Vector2(x, y),
          endPosition: new Vector2(x + 1, y)
        });
        walls.push({
          type: wall?.type ?? WALL_TYPE.DEFAULT,
          startPosition: new Vector2(x, y),
          endPosition: new Vector2(x + 1, y)
        });
      }
      if (y + 1 < width) {
        const wall = getWall({
          startPosition: new Vector2(x, y),
          endPosition: new Vector2(x, y + 1)
        });
        walls.push({
          type: wall?.type ?? WALL_TYPE.DEFAULT,
          startPosition: new Vector2(x, y),
          endPosition: new Vector2(x, y + 1)
        });
      }
    }
  }
  return walls;
});

const unitsMap = computed(() => {
  return $props.modelValue.units.reduce((result, u) => {
    const key = [u.options.position.x, u.options.position.z].toString();
    const units = result.get(key) ?? [];
    units.push(u);
    result.set(key, units);
    return result;
  }, new Map<string, UnitDescription[]>());
});

const model = ref<GridModel>($props.modelValue);
watch(
  () => $props.modelValue,
  v => {
    if (model.value !== v) {
      model.value = {
        ...v
      };
    }
  }
);

const gridCells = computed(() => {
  return (model.value?.grid ?? []).flat().map((value, index) => {
    const z = Math.floor(index / $props.dimension.y);
    const x = index % $props.dimension.y;
    return {
      position: new Vector3(x, 0, z),
      value
    } as GridCell;
  });
});

const $emit = defineEmits<{
  (e: 'update:model-value', value: GridModel): void;
}>();

const clicked = ref(false);
function onPointerDownCell(index: number) {
  const z = Math.floor(index / $props.dimension.y);
  const x = index % $props.dimension.y;

  clicked.value = true;
  if ($props.actionType === ACTION_TYPE.START_POSITION) {
    model.value.startPosition = new Vector3(x, 0, z);
  } else if ($props.actionType === ACTION_TYPE.SET_UNIT) {
    const position = new Vector3(x, 0, z);
    if (model.value.selectedPosition?.equals(position)) {
      // Deselect if already selected
      model.value.selectedPosition = undefined;
      $emit('update:model-value', model.value);
      return;
    }
    model.value.selectedPosition = position;
    $emit('update:model-value', model.value);
    return;
  }
  modifyCell(index);
}

function onPointerUpCell() {
  clicked.value = false;
}

function onPointerEnterCell(index: number) {
  if (clicked.value && model.value?.grid) {
    modifyCell(index);

    $emit('update:model-value', model.value);
  }
}

function modifyCell(index: number) {
  if (model.value?.grid) {
    const z = Math.floor(index / $props.dimension.y);
    const x = index % $props.dimension.y;
    if ($props.actionType === ACTION_TYPE.ADD) {
      model.value.grid[z]![x] = 1;
    } else if ($props.actionType === ACTION_TYPE.REMOVE) {
      model.value.grid[z]![x] = 0;
    }
    // else if ($props.actionType === ACTION_TYPE.ADD_WALL) {
    //   setWall(x, z, true);
    // } else if ($props.actionType === ACTION_TYPE.REMOVE_WALL) {
    //   setWall(x, z, false);
    // }
  }
  $emit('update:model-value', model.value);
}

function setWall(wallData: WallData) {
  if (!model.value) return;

  const walls = model.value.walls ?? [];
  let wall = walls.find(
    w =>
      w.startPosition!.equals(wallData.startPosition) &&
      w.endPosition!.equals(wallData.endPosition)
  )!;
  if (!wall) {
    wall = {
      ...wallData
    } as WallDescription;
    walls.push(wall);
  } else {
    model.value.walls = walls.filter(w => w !== wall);
  }
}
</script>

<style lang="postcss" scoped>
.cw-room-editor-grid {
  --cell-size: 48px;

  position: relative;
  display: grid;
  grid-template-rows: repeat(var(--x), var(--cell-size));
  grid-template-columns: repeat(var(--y), var(--cell-size));
  gap: 1px;

  /* width: 100%;
    height: 100%; */
  border: 1px solid #000;

  /* stylelint-disable-next-line selector-class-pattern */
  &.mode-start_position {
    & .cw-room-editor-grid-cell:not(.start-position) {
      opacity: 0.6;
    }
  }
  /* stylelint-disable-next-line selector-class-pattern */
  &.mode-set_wall,
  /* stylelint-disable-next-line selector-class-pattern */
  &.mode-add_remove_wall {
    & .cw-room-editor-grid-cell:not(.start-position) {
      opacity: 0.6;
    }

    & .walls {
      pointer-events: auto;
    }
  }

  & .walls {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
}
</style>
