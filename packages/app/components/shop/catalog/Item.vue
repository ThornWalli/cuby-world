<template>
  <cw-shop-unit-item-select
    v-model="unit"
    class="cw-shop-catalog-item"
    :app="app"
    :items="items">
    <template #controls>
      <icon-button
        icon-size="very-small"
        style-type="round"
        :icon="ICON.ARROW_NAVIGATION_DEFAULT_LEFT"
        disabled />
      <cw-catalog-item-filter v-model="tag" :items="catalogItems" />
    </template>
  </cw-shop-unit-item-select>
</template>

<script setup lang="ts">
import type App from '@cuby-world/app/lib/classes/App';
import { catalog as unitCatalog } from '@cuby-world/units';
import CwShopUnitItemSelect from '../UnitItemSelect.vue';
import { computed, ref } from 'vue';
import type { CatalogItemIdentifier } from '@cuby-world/app/lib/types/catalog';

import CwCatalogItemFilter from '../../CatalogItemFilter.vue';
import IconButton from '../../button/IconButton.vue';
import type { CATALOG_TAG } from '@cuby-world/app/lib/utils/catalog';
import { ICON } from '@cuby-world/app/utils/icons';

const tag = ref<CATALOG_TAG | 'all'>('all');
const unit = ref<CatalogItemIdentifier | null>(null);

defineProps<{
  app: App;
}>();

const catalogItems = computed(() => {
  return Array.from(unitCatalog.values());
});
const items = computed(() => {
  return catalogItems.value
    .filter(
      item =>
        !item.hide && (tag.value === 'all' || item.tags?.includes(tag.value))
    )
    .map(item => ({
      item,
      preview: {
        type: item.id
      }
    }));
});
</script>

<style lang="postcss" scoped>
.cw-shop-catalog {
  align-items: center;
  align-self: center;
  width: 80%;
  pointer-events: auto;

  & :deep(.cw-panel-catalog-select-item-select) {
    width: 100%;
  }
}
</style>
