<template>
  <div class="cw-shop-catalog">
    <transition name="fade" mode="out-in">
      <cw-shop-catalog-skin
        v-if="catalogItemId && skins.length > 1"
        v-model="skinId"
        :skins="skins"
        :catalog-item-id="catalogItemId"
        :app="app"
        @back="catalogItemId = null" />
      <cw-shop-catalog-item v-else v-model="catalogItemId" :app="app" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import type App from '@cuby-world/app/lib/classes/App';
import type { CatalogItemIdentifier } from '@cuby-world/app/lib/types/catalog';
import CwShopCatalogItem from './catalog/Item.vue';
import CwShopCatalogSkin from './catalog/Skin.vue';
import { computed, ref, watch } from 'vue';
import { catalog as unitCatalog } from '@cuby-world/units';

const $props = defineProps<{
  app: App;
}>();

const catalogItemId = ref<CatalogItemIdentifier | null>(null);
const skinId = ref<CatalogItemIdentifier | null>(null);

watch(catalogItemId, v => {
  if (v) {
    const catalogItem = unitCatalog.get(v);
    const hasSkins = (catalogItem?.skins?.length ?? 0) > 1;
    if (!hasSkins && catalogItem?.defaultSkinId) {
      const value = v
        ? {
            catalogItemId: v,
            skinId: catalogItem.defaultSkinId
          }
        : null;
      $props.app.modules.shop.setItem(value);
    }
  }
});

watch(
  () => skinId.value,
  skinId => {
    if (!skinId) {
      catalogItemId.value = null;
    }
    $props.app.modules.shop.setItem(
      catalogItemId.value && skinId
        ? {
            catalogItemId: catalogItemId.value!,
            skinId
          }
        : null
    );
  }
);

const skins = computed(() => {
  if (catalogItemId.value) {
    return unitCatalog.get(catalogItemId.value)!.skins ?? [];
  }
  return [];
});
</script>

<style lang="postcss" scoped>
.cw-shop-catalog {
  align-items: center;
  align-self: center;
  width: calc(100% - 96px * 2);
  pointer-events: auto;

  & :deep(.cw-panel-catalog-stair-item-select) {
    width: 100%;
  }
}
</style>
