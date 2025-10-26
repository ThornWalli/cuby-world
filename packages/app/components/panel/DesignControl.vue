<template>
  <cw-panel
    class="cw-panel-design-control"
    hide-title
    title="Actions"
    style-type="none">
    <cw-toggle-icon
      :model-value="modelValue === ACTION.EDITOR"
      :icon="'editor'"
      icon-size="very-large"
      label-direction="right"
      @update:model-value="
        $emit('update:model-value', $event ? ACTION.EDITOR : ACTION.NONE)
      " />
    <cw-toggle-icon
      :model-value="modelValue === ACTION.SHOP"
      :icon="'cart'"
      icon-size="very-large"
      label-direction="right"
      @update:model-value="
        $emit('update:model-value', $event ? ACTION.SHOP : ACTION.NONE)
      " />
    <!-- <cw-toggle-icon
      v-model="inventoryOpened"
      :icon="inventoryOpened ? 'inventory_open' : 'inventory_close'"
      icon-size="very-large"
      label-direction="right" /> -->
  </cw-panel>
  <transition name="fade">
    <teleport v-if="inventoryOpened" to="#teleports-panel-left">
      <cw-catalog
        class="test"
        :app="$props.app"
        @close="inventoryOpened = false" />
    </teleport>
  </transition>
  <transition name="fade">
    <teleport v-if="modelValue === ACTION.SHOP" to="#teleports-panel-bottom">
      <cw-shop-catalog :app="$props.app" />
    </teleport>
  </transition>
</template>

<script lang="ts" setup>
import CwPanel from '../Panel.vue';
import CwToggleIcon from '../toggle/Icon.vue';
import CwCatalog from '../shop/Catalog_.vue';
import CwShopCatalog from '../shop/Catalog.vue';

import type App from '../../lib/classes/App';
import { onMounted, ref } from 'vue';
import { ACTION } from '../app/Playground.vue';

const inventoryOpened = ref(false);

defineProps<{
  app: App;
  modelValue: ACTION;
}>();

onMounted(() => {
  // shopOpened.value = true;
});

const $emit = defineEmits<{
  (e: 'update:model-value', value: ACTION): void;
}>();
</script>

<style lang="postcss" scoped>
.cw-panel-design-control {
  & :deep(> .content) {
    /* position: relative; */
  }
}

.test {
  /* position: fixed;
  bottom: calc(100% + var(--cw-spacing-large));
  bottom: 0;
  left: 0; */
}
</style>
