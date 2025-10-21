<template>
  <cw-panel
    hide-title
    style-type="none"
    class="cw-panel-editor-stair-skin"
    title="Wall Skin">
    <cw-catalog-stair-item-select
      :app="app"
      :items="items"
      :model-value="modelValue"
      @update:model-value="value => $emit('update:model-value', value)">
      <template #before>
        <ul>
          <li>
            <input
              id="tag_all"
              v-model="tag"
              :name="`tag-${id}`"
              type="radio"
              value="all"
              checked />
            <label for="tag_all">All</label>
          </li>
          <li>
            <input
              id="tag_color"
              v-model="tag"
              :name="`tag-${id}`"
              type="radio"
              :value="CATALOG_TAG.COLOR" />
            <label for="tag_color">Color</label>
          </li>
          <li>
            <input
              id="tag_texture"
              v-model="tag"
              :name="`tag-${id}`"
              type="radio"
              :value="CATALOG_TAG.TEXTURE" />
            <label for="tag_texture">Texture</label>
          </li>
        </ul>
      </template>
    </cw-catalog-stair-item-select>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../../Panel.vue';
import CwCatalogStairItemSelect from '../catalog/StairItemSelect.vue';
import { computed, ref, useId } from 'vue';

import { CATALOG_TAG } from '../../../lib/utils/catalog';

import type App from '../../../lib/classes/App';
import type { StairSkinIdentifier } from '@cuby-world/app/lib/types/stair/skins';
import type { StairSelectItem } from '../catalog/StairItemSelect.vue';
import type { SKIN_TAG, SkinDescription } from '@cuby-world/app/lib/types/skin';

const id = useId();

const tag = ref<SKIN_TAG | 'all'>('all');

function prepareItem(item: SkinDescription): StairSelectItem<SkinDescription> {
  return {
    item,
    preview: {
      skin: item.id
    }
  };
}

const items = computed<StairSelectItem<SkinDescription>[]>(() =>
  $props.skins
    .filter(item => {
      return (
        item.tags == null ||
        tag.value === 'all' ||
        item.tags.includes(tag.value)
      );
    })
    .map(skin => prepareItem(skin))
);

const $props = defineProps<{
  app: App;
  skins: SkinDescription[];
  modelValue: StairSkinIdentifier | null;
}>();

const $emit = defineEmits<{
  (e: 'update:model-value', value: StairSkinIdentifier | null): void;
}>();
</script>

<style lang="postcss" scoped>
.cw-panel-editor-stair-skin {
  align-items: center;
  align-self: center;
  width: 90%;

  & :deep(.cw-panel-catalog-stair-item-select) {
    width: 100%;
  }
}

ul {
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
