<template>
  <cw-panel
    hide-title
    style-type="none"
    class="cw-panel-editor-stair-skin"
    title="Stair Skin">
    <cw-catalog-stair-item-select
      :app="app"
      :items="items"
      :model-value="modelValue"
      @update:model-value="value => $emit('update:model-value', value)">
      <template #controls>
        <icon-button
          icon-size="very-small"
          style-type="round"
          icon="arrow_navigation_default_left"
          @click="onClickBack" />
        <cw-editor-skin-filter v-model="tag" :skins="skins" />
      </template>
    </cw-catalog-stair-item-select>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../../Panel.vue';
import CwCatalogStairItemSelect from '../catalog/StairItemSelect.vue';
import CwEditorSkinFilter from '../../CatalogItemSkinFilter.vue';
import IconButton from '../../button/IconButton.vue';

import { computed, ref } from 'vue';
import type App from '../../../lib/classes/App';
import type { StairSkinIdentifier } from '@cuby-world/app/lib/types/stair/skins';
import type { StairSelectItem } from '../catalog/StairItemSelect.vue';
import type { SKIN_TAG, SkinDescription } from '@cuby-world/app/lib/types/skin';
import type { StairIdentifier } from '@cuby-world/app/lib/types/stair';

const tag = ref<SKIN_TAG | 'all'>('all');

function prepareItem(item: SkinDescription): StairSelectItem<SkinDescription> {
  return {
    item,
    preview: {
      type: $props.type,
      skin: item.id
    }
  };
}

function onClickBack() {
  $emit('update:model-value', null);
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
  type: StairIdentifier;
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
</style>
