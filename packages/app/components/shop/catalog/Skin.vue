<template>
  <cw-shop-unit-item-select
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
      <cw-skin-filter v-model="tag" :skins="skins" />
    </template>
  </cw-shop-unit-item-select>
</template>

<script lang="ts" setup>
import CwShopUnitItemSelect, {
  type UnitSelectItem
} from '../UnitItemSelect.vue';

import { computed, ref } from 'vue';
import type App from '../../../lib/classes/App';
import type { SKIN_TAG, SkinDescription } from '@cuby-world/app/lib/types/skin';
import type { UnitSkinIdentifier } from '@cuby-world/app/lib/utils/unit/skins';
import type { CatalogItemIdentifier } from '@cuby-world/app/lib/types/catalog';
import CwSkinFilter from '../../CatalogItemSkinFilter.vue';
import IconButton from '../../button/IconButton.vue';

const tag = ref<SKIN_TAG | 'all'>('all');

function prepareItem(item: SkinDescription): UnitSelectItem<SkinDescription> {
  return {
    item,
    preview: {
      type: $props.catalogItemId,
      skin: item.id
    }
  };
}

function onClickBack() {
  $emit('update:model-value', null);
  $emit('back');
}

const items = computed<UnitSelectItem<SkinDescription>[]>(() =>
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
  catalogItemId: CatalogItemIdentifier;
  skins: SkinDescription[];
  modelValue: UnitSkinIdentifier | null;
}>();

const $emit = defineEmits<{
  (e: 'update:model-value', value: UnitSkinIdentifier | null): void;
  (e: 'back'): void;
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
