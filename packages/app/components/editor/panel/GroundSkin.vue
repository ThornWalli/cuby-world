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
      <template #controls>
        <cw-editor-skin-filter v-model="tag" :skins="skins" />
      </template>
    </cw-catalog-ground-item-select>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../../Panel.vue';
import CwCatalogGroundItemSelect, {
  type GroundItem
} from '../catalog/GroundItemSelect.vue';
import CwEditorSkinFilter from '../SkinFilter.vue';
import { computed, ref } from 'vue';

import type App from '../../../lib/classes/App';
import type {
  GroundSkinDescription,
  GroundSkinIdentifier
} from '../../../lib/types/ground/skins';
import type { SKIN_TAG } from '@cuby-world/app/lib/types/skin';
import { catalog as groundCatalog } from '@cuby-world/grounds/grounds/catalog';

const tag = ref<SKIN_TAG | 'all'>('all');

function prepareItem(
  item: GroundSkinDescription
): GroundItem<GroundSkinDescription> {
  return {
    item,
    preview: {
      skin: item.id
    }
  };
}

const skins = groundCatalog.get('default')?.skins || [];

const items = computed<GroundItem<GroundSkinDescription>[]>(() =>
  filteredSkins.value.map(skin => prepareItem(skin))
);

const filteredSkins = computed(() =>
  skins.filter(item => {
    return (
      item.tags == null || tag.value === 'all' || item.tags.includes(tag.value)
    );
  })
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
