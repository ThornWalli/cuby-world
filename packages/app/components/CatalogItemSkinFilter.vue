<template>
  <ul class="cw-catalog-item-skin-filter">
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
    <li v-if="hasTag(SKIN_TAG.COLOR)">
      <input
        id="tag_color"
        :model-value="modelValue"
        :name="`tag-${id}`"
        type="radio"
        :value="SKIN_TAG.COLOR"
        @input="onUpdateModelValue(SKIN_TAG.COLOR)" />
      <label for="tag_color">Color</label>
    </li>
    <li v-if="hasTag(SKIN_TAG.TEXTURE)">
      <input
        id="tag_texture"
        :model-value="modelValue"
        :name="`tag-${id}`"
        type="radio"
        :value="SKIN_TAG.TEXTURE"
        @input="onUpdateModelValue(SKIN_TAG.TEXTURE)" />
      <label for="tag_texture">Texture</label>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { SKIN_TAG, type SkinDescription } from '@cuby-world/app/lib/types/skin';
import { useId } from 'vue';

const id = useId();
const $props = defineProps<{
  modelValue: SKIN_TAG | 'all';
  skins: SkinDescription[];
}>();

function hasTag(tag: SKIN_TAG): boolean {
  return $props.skins.some(skin => skin.tags?.includes(tag));
}

const $emit = defineEmits<{
  (e: 'update:model-value', value: SKIN_TAG | 'all'): void;
}>();

function onUpdateModelValue(value: SKIN_TAG | 'all') {
  $emit('update:model-value', value);
}
</script>

<style lang="postcss" scoped>
.cw-catalog-item-skin-filter {
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
