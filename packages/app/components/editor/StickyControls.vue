<template>
  <base-sticky-wrapper
    class="cw-editor-sticky-controls"
    :app="app"
    :value="value">
    <div v-for="[groupKey, groupItems] in itemsGroups" :key="groupKey">
      <base-button
        v-for="item in groupItems"
        :key="item.label"
        :disabled="item.disabled"
        @click="item.action">
        <base-icon :name="item.icon" size="small" />
        <span>{{ item.label }}</span>
      </base-button>
    </div>
  </base-sticky-wrapper>
</template>

<script setup lang="ts">
import type { Icon } from '@cuby-world/app/lib/types/icon';
import BaseStickyWrapper, {
  type StickyWrapperValue
} from '../base/StickyWrapper.vue';
import BaseIcon from '../base/Icon.vue';
import BaseButton from '../base/Button.vue';
import { computed } from 'vue';
import type App from '@cuby-world/app/lib/classes/App';

const $props = defineProps<{
  app: App;
  value: StickyWrapperValue;
  items: StickyControlItem[];
}>();

const itemsGroups = computed(() => {
  return Object.entries(
    $props.items.reduce(
      (result, item) => {
        if (!result[item.group ?? 'default']) {
          result[item.group ?? 'default'] =
            result[item.group ?? 'default'] ?? [];
        }
        result[item.group ?? 'default']!.push(item);
        return result;
      },
      {} as Record<string, StickyControlItem[]>
    )
  );
});
</script>

<script lang="ts">
export interface StickyControlItem {
  disabled?: boolean;
  group?: string | 'default';
  label: string;
  icon: Icon;
  action: CallableFunction;
}
</script>

<style lang="postcss" scoped>
.cw-editor-sticky-controls {
  display: flex;
  gap: var(--cw-spacing-medium);
  align-items: flex-end;

  & > div {
    display: flex;
    flex-direction: column;
    gap: var(--cw-spacing-medium);
  }

  & button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--cw-spacing-medium);
    overflow: hidden;
    pointer-events: auto;
    cursor: pointer;
    background: rgb(0 0 0 / 60%);
    border-radius: 50%;
    box-shadow: 0 0 2px 0 rgb(0 0 0 / 80%);
    backdrop-filter: blur(var(--cw-blur-default));
    transition: background-color var(--cw-easing-duration-short)
      var(--cw-easing-base);

    &[disabled] {
      pointer-events: none;
      opacity: 0.8;
    }

    &:not([disabled]) {
      &:hover {
        background: var(--color-blue-7);
      }
    }

    & span {
      display: none;
    }

    & svg {
      display: block;
      width: 24px;
    }
  }
}
</style>
