<template>
  <ul class="cw-catalog-item-filter">
    <li>
      <input
        id="tag_all"
        :model-value="modelValue"
        :name="`tag-${id}`"
        type="radio"
        value="all"
        checked
        @input="onUpdateModelValue('all')" />
      <label for="tag_all">All</label>
    </li>
    <li v-if="hasTag(CATALOG_TAG.LIGHT)">
      <input
        id="tag_color"
        :model-value="modelValue"
        :name="`tag-${id}`"
        type="radio"
        :value="CATALOG_TAG.LIGHT"
        @input="onUpdateModelValue(CATALOG_TAG.LIGHT)" />
      <label for="tag_color">Light</label>
    </li>
    <li v-if="hasTag(CATALOG_TAG.FURNITURE)">
      <input
        id="tag_texture"
        :model-value="modelValue"
        :name="`tag-${id}`"
        type="radio"
        :value="CATALOG_TAG.FURNITURE"
        @input="onUpdateModelValue(CATALOG_TAG.FURNITURE)" />
      <label for="tag_texture">Furniture</label>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useId } from 'vue';
import type { UnitItem } from '../lib/types/unit/catalog';
import { CATALOG_TAG } from '../lib/utils/catalog';

const id = useId();
const $props = defineProps<{
  modelValue: CATALOG_TAG | 'all';
  items: UnitItem[];
}>();

function hasTag(tag: CATALOG_TAG): boolean {
  return $props.items.some(item => item.tags?.includes(tag));
}

const $emit = defineEmits<{
  (e: 'update:model-value', value: CATALOG_TAG | 'all'): void;
}>();

function onUpdateModelValue(value: CATALOG_TAG | 'all') {
  $emit('update:model-value', value);
}
</script>

<style lang="postcss" scoped>
.cw-catalog-item-filter {
  display: flex;
  gap: 10px;
  padding: 0 10px;
  font-size: 12px;
  color: white;
  list-style: none;

  & li {
    position: relative;

    & input {
      position: absolute;
      z-index: -1;
      opacity: 0;
    }

    & label {
      cursor: pointer;
    }

    & input:checked + label {
      font-weight: bold;
    }
  }
}
</style>
