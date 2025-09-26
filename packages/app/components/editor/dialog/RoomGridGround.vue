<template>
  <cw-dialog
    ref="dialog"
    show-fullscreen
    v-bind="$attrs"
    class="cw-dialog-room-grid-resize"
    embed-content>
    <template #header>Grid Ground</template>
    <template #default>
      <div class="wrapper">
        <div>
          <div
            class="grid"
            :style="{
              '--grid-x': gridDimension.x,
              '--grid-y': gridDimension.y
            }">
            <div class="cells">
              <base-button
                v-for="(cell, index) in gridCells"
                :key="index"
                class="cell"
                :class="{
                  active: cell,
                  'start-position': getStartPositionCell(index)
                }"
                @pointerenter="onPointerEnterCell(index)"
                @pointerdown="onPointerDownCell(index, !!cell)"
                @pointerup="onPointerUpCell"></base-button>
            </div>
            <div class="indicator north">N</div>
            <div class="indicator south">S</div>
            <div class="indicator west">W</div>
            <div class="indicator east">E</div>
          </div>
        </div>
      </div>
    </template>
    <template #actions="{ close }">
      <cw-form-field-select
        v-model="mode"
        mode="compact"
        label="Mode"
        hide-label>
        <cw-form-field-select-option :value="MODE.GRID">
          Edit Ground Grid
        </cw-form-field-select-option>
        <cw-form-field-select-option :value="MODE.START">
          Edit Start Position
        </cw-form-field-select-option>
      </cw-form-field-select>
      <cw-button @click="onClickMarkAllCells">Mark All</cw-button>
      <cw-button @click="onClickUnarkAllCells">Unmark All</cw-button>
      <span class="spacer"></span>
      <cw-button @click="onClickSave($event, { close })"> Save </cw-button>
    </template>
  </cw-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import CwDialog from '../../../components/Dialog.vue';
import CwButton from '../../../components/Button.vue';
import BaseButton from '../../../components/base/Button.vue';
import CwFormFieldSelect from '../../../components/formField/Select.vue';
import CwFormFieldSelectOption from '../../../components/formField/select/Option.vue';

import type {
  Grid,
  StartPosition
} from '@cuby-world/app/lib/classes/RoomDescription';

enum MODE {
  GRID = 'grid',
  START = 'start'
}

const mode = ref<MODE>(MODE.GRID);

const model = ref<{
  grid: Grid;
  start: StartPosition;
}>();

const gridCells = computed(() => model.value?.grid.flat() ?? []);
const gridDimension = computed(() => {
  return {
    x: model.value?.grid[0]?.length ?? 0,
    y: model.value?.grid.length ?? 0
  };
});
defineOptions({
  inheritAttrs: false
});

function getStartPositionCell(index: number) {
  if (!model.value) return false;
  const y = Math.floor(index / model.value.grid[0]!.length);
  const x = index % model.value.grid[0]!.length;
  return (
    model.value.start.position.x === x && model.value.start.position.z === y
  );
}

function onClickMarkAllCells() {
  if (model.value?.grid) {
    model.value.grid = model.value.grid.map(row => row.map(() => 1));
    model.value = {
      ...model.value
    };
  }
}
function onClickUnarkAllCells() {
  if (model.value?.grid) {
    model.value.grid = model.value.grid.map(row => row.map(() => 0));
    model.value = {
      ...model.value
    };
  }
}

function onClickSave(
  e: Event,
  { close }: { close: <Result = unknown>(value?: Result | undefined) => void }
) {
  close<{
    grid: Grid;
    start: StartPosition;
  }>(model.value);
}

const dialog = ref<InstanceType<typeof CwDialog> | null>(null);

const clicked = ref(false);
const setMode = ref(false);
function onPointerDownCell(index: number, active: boolean) {
  setMode.value = !active;

  const grid = model.value!.grid;
  const y = Math.floor(index / grid[0]!.length);
  const x = index % grid[0]!.length;

  if (mode.value === MODE.START) {
    model.value!.start.position.set(x, 0, y);
    return;
  }

  modifyCell(index);
  clicked.value = true;
}

function onPointerUpCell() {
  clicked.value = false;
}

function modifyCell(index: number) {
  if (model.value?.grid) {
    const y = Math.floor(index / model.value.grid[0]!.length);
    const x = index % model.value.grid[0]!.length;

    model.value!.grid[y]![x] = setMode.value ? 1 : 0;
  }
}

function onPointerEnterCell(index: number) {
  if (clicked.value && model.value?.grid) {
    console.log('enter', index);
    modifyCell(index);
  }
}

function open(data: { grid: Grid; start: StartPosition }) {
  model.value = {
    grid: [...data.grid],
    start: {
      position: data.start.position.clone(),
      rotation: data.start.rotation
    }
  };
  return dialog.value!.dialog!.open<{
    grid: Grid;
    start: StartPosition;
  }>();
}

defineExpose({
  open
});
</script>

<style lang="postcss" scoped>
.cw-dialog-room-grid-resize {
  --grid-cell-size: 16px;

  & .spacer {
    flex: 1;
  }

  & .wrapper {
    position: relative;
    box-sizing: border-box;
    min-width: 480px;
    height: 100%;
    overflow: scroll;
    background: #333;

    & > div {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 100%;
      min-height: 100%;
    }

    &::before {
      display: block;
      padding-top: calc(2 / 3 * 100%);
      content: '';
    }
  }

  & .grid {
    & .cells {
      display: grid;
      grid-template-columns: repeat(var(--grid-x), 1fr);
    }

    & .cell {
      position: relative;
      display: block;
      width: var(--grid-cell-size);
      height: var(--grid-cell-size);
      cursor: pointer;
      border: 1px solid #ccc;

      &::before {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1;
        display: block;
        width: 100%;
        height: 100%;
        content: '';
        transform: translate(-50%, -50%);
      }

      &.start-position {
        border: 2px solid #f00;
      }

      &.active {
        &::before {
          background-color: #666;
        }
      }

      &:hover {
        border-color: #000;

        &::before {
          transform: translate(-50%, -50%) scale(1.2);
        }

        &.start-position {
          &::before {
            background-color: #f00;
          }
        }
      }

      &:active {
        &::before {
          background-color: #333;
        }
      }
    }
  }

  & .indicator {
    position: absolute;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    font-size: 12px;
    font-weight: bold;
    line-height: 1;
    color: var(--color-white);
    pointer-events: none;
    opacity: 0.4;

    &.north {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    &.south {
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    &.west {
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }

    &.east {
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
  }
}
</style>
