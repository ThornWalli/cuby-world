<template>
  <div
    class="cw-room-editor-grid-cell"
    :class="{
      [`type-${type}`]: true,
      selected,
      'start-position': startPosition
    }"
    :data-wall="JSON.stringify(wall)">
    <base-button
      @pointerenter="onPointerEnterCell(index)"
      @pointerdown="onPointerDownCell(index)">
      <span v-if="wall" class="wall">w</span>
      <span class="units">
        {{ units?.length ?? 0 }}
      </span>
    </base-button>
  </div>
</template>

<script lang="ts" setup>
import type { ACTION_TYPE, UnitDescription } from '../../types';
import { fromEvent } from 'rxjs';
import BaseButton from '@cuby-world/app/components/base/Button.vue';
import type { WallDescription } from '@cuby-world/app/lib/classes/RoomDescription';

defineProps<{
  type: 'floor' | 'empty';
  startPosition?: boolean;
  selected?: boolean;
  units: UnitDescription[];
  wall?: WallDescription;
  index: number;
  actionType?: ACTION_TYPE;
}>();

const $emit = defineEmits<{
  (e: 'pointerenter' | 'pointerdown', index: number): void;
  (e: 'pointerup'): void;
}>();

function onPointerDownCell(index: number) {
  $emit('pointerdown', index);

  const subsription = fromEvent(document, 'pointerup').subscribe(() => {
    $emit('pointerup');
    subsription.unsubscribe();
  });
}

function onPointerEnterCell(index: number) {
  $emit('pointerenter', index);
}

// "blaublause-farben": [
// "hintergrund": {
//     "name": "Dunkelblauer Hintergrund",
//     "hex": "#21304A",
//     "rgb": "rgb(33, 48, 74)"
//   },
//   "linien": {
//     "name": "Hellblaue/Weiße Linien",
//     "hex": "#C7E0FF",
//     "rgb": "rgb(199, 224, 255)"
//   }
// ],
</script>

<style lang="postcss" scoped>
.cw-room-editor-grid-cell {
  position: relative;

  /* &.selected {
    outline: 2px solid yellow;
  } */

  & .wall {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2px;
  }

  & .units {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2px;
  }

  & button {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0;
    appearance: none;
    border: none;
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
    content: '';
    border: solid #fff 1px;
    mix-blend-mode: difference;
    opacity: 0;
  }

  &:hover {
    &::after {
      opacity: 1;
    }
  }

  &.type-empty {
    & > button {
      background-color: #eee;
    }
  }

  &.type-floor {
    & > button {
      background-color: #aaa;
    }
  }

  &.start-position {
    opacity: 1;

    & > button {
      background-color: yellow;
    }
  }

  & .wall-sides {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &.set-wall {
      & button {
        opacity: 0;

        &.visible {
          opacity: 1;
        }
      }

      &:hover {
        & button {
          pointer-events: auto;

          &:hover {
            opacity: 1;
          }
        }
      }
    }

    &.edit-wall {
      & button {
        opacity: 0;

        &.visible {
          pointer-events: auto;
          opacity: 0.6;
        }

        &.selected {
          opacity: 1;
        }

        &:hover {
          opacity: 1;
        }
      }
    }

    & button {
      --width: 100%;
      --height: 50%;

      position: absolute;
      pointer-events: none;
      background-color: blue;

      &.north {
        top: calc(var(--height) / -2);
        left: 50%;
        width: var(--width);
        height: var(--height);
        transform: translateX(-50%);
      }

      &.east {
        top: 50%;
        right: calc(var(--height) / -2);
        width: var(--height);
        height: var(--width);
        transform: translateY(-50%);
      }

      &.south {
        bottom: calc(var(--height) / -2);
        left: 50%;
        width: var(--width);
        height: var(--height);
        transform: translateX(-50%);
      }

      &.west {
        top: 50%;
        left: calc(var(--height) / -2);
        width: var(--height);
        height: var(--width);
        transform: translateY(-50%);
      }
    }
  }
}
</style>
