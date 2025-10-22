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
      <template #controls>
        <cw-editor-skin-filter v-model="tag" :skins="skins" />
      </template>
    </cw-catalog-wall-item-select>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../../Panel.vue';
import CwCatalogWallItemSelect, {
  type WallSelectItem
} from '../catalog/WallItemSelect.vue';
import CwEditorSkinFilter from '../SkinFilter.vue';
import { computed, ref } from 'vue';
import type App from '../../../lib/classes/App';
import type {
  WallSkinDescription,
  WallSkinIdentifier
} from '../../../lib/types/wall/skins';

import type { SKIN_TAG } from '@cuby-world/app/lib/types/skin';

const tag = ref<SKIN_TAG | 'all'>('all');

const $props = defineProps<{
  app: App;
  modelValue: WallSkinIdentifier | null;
  skins: WallSkinDescription[];
}>();

function prepareItem(
  item: WallSkinDescription
): WallSelectItem<WallSkinDescription> {
  return {
    item,
    preview: {
      type: 'default',
      skins: [item.id, item.id]
    }
  };
}

const items = computed<WallSelectItem<WallSkinDescription>[]>(() =>
  filteredSkins.value.map(skin => prepareItem(skin))
);

const filteredSkins = computed(() =>
  $props.skins.filter(item => {
    return (
      item.tags == null || tag.value === 'all' || item.tags.includes(tag.value)
    );
  })
);

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
