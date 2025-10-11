<template>
  <cw-panel
    hide-title
    style-type="none"
    class="cw-panel-editor-wall-skin"
    title="Wall Skin">
    <cw-catalog-wall-item-select
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
    </cw-catalog-wall-item-select>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../../Panel.vue';
import CwCatalogWallItemSelect, {
  type WallItem
} from '../catalog/WallItemSelect.vue';
import { computed, ref, useId } from 'vue';

import type App from '../../../lib/classes/App';
import skins, { type WallSkinItem } from '@cuby-world/app/lib/utils/wall/skins';
import { CATALOG_TAG } from '@cuby-world/app/lib/utils/catalog';
import type { WallSkinIdentifier } from '@cuby-world/app/lib/types/wall/skins';

const id = useId();

const tag = ref<CATALOG_TAG | 'all'>('all');

function prepareItem(item: WallSkinItem): WallItem<WallSkinItem> {
  return {
    item,
    wall: {
      skins: [item.id, item.id]
    }
  };
}

const items = computed<WallItem<WallSkinItem>[]>(() =>
  Array.from(skins.values())
    .filter(item => {
      return (
        item.tags == null ||
        tag.value === 'all' ||
        item.tags.includes(tag.value)
      );
    })
    .map(prepareItem)
);

defineProps<{
  app: App;
  modelValue: WallSkinIdentifier | null;
}>();

const $emit = defineEmits<{
  (e: 'update:model-value', value: WallSkinIdentifier | null): void;
}>();
</script>

<style lang="postcss" scoped>
.cw-panel-editor-wall-skin {
  align-items: center;
  align-self: center;
  width: 90%;

  & :deep(.cw-panel-catalog-wall-item-select) {
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
