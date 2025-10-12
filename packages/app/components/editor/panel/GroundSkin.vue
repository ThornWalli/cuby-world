<template>
  <cw-panel
    hide-title
    style-type="none"
    class="cw-panel-editor-ground-skin"
    title="Wall Skin">
    <cw-catalog-ground-item-select
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
    </cw-catalog-ground-item-select>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../../Panel.vue';
import CwCatalogGroundItemSelect, {
  type GroundItem
} from '../catalog/GroundItemSelect.vue';
import { computed, ref, useId } from 'vue';

import type App from '../../../lib/classes/App';
import { CATALOG_TAG } from '../../../lib/utils/catalog';
import type { GroundSkinIdentifier } from '../../../lib/types/ground/skins';
import { skins } from '@cuby-world/grounds';
import type { GroundSkinItem } from '../../../lib/types/ground/catalog';

const id = useId();

const tag = ref<CATALOG_TAG | 'all'>('all');

function prepareItem(item: GroundSkinItem): GroundItem<GroundSkinItem> {
  return {
    item,
    ground: {
      skin: item.id
    }
  };
}

const items = computed<GroundItem<GroundSkinItem>[]>(() =>
  Array.from(skins.values())
    .filter(item => {
      return (
        item.tags == null ||
        tag.value === 'all' ||
        item.tags.includes(tag.value)
      );
    })
    .map(skin => prepareItem(skin))
);

defineProps<{
  app: App;
  modelValue: GroundSkinIdentifier | null;
}>();

const $emit = defineEmits<{
  (e: 'update:model-value', value: GroundSkinIdentifier | null): void;
}>();
</script>

<style lang="postcss" scoped>
.cw-panel-editor-ground-skin {
  align-items: center;
  align-self: center;
  width: 90%;

  & :deep(.cw-panel-catalog-ground-item-select) {
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
