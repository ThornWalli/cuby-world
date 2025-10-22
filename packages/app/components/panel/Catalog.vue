<template>
  <cw-panel
    class="cw-panel-catalog"
    hide-title
    title="Actions"
    style-type="none">
    <transition name="fade">
      <div v-if="inventoryOpened" class="test">
        <cw-catalog :app="$props.app" @close="inventoryOpened = false" />
      </div>
    </transition>
    <cw-toggle-icon
      v-model="inventoryOpened"
      :icon="inventoryOpened ? 'inventory_open' : 'inventory_close'"
      icon-size="very-large"
      label-direction="right" />
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../Panel.vue';
import CwToggleIcon from '../toggle/Icon.vue';
import CwCatalog from '../Catalog.vue';

import type App from '../../lib/classes/App';
import { ref } from 'vue';

const inventoryOpened = ref(false);

defineProps<{
  app: App;
}>();
</script>

<style lang="postcss" scoped>
.cw-panel-inventory {
  & :deep(> .content) {
    position: relative;
  }
}

.test {
  position: absolute;
  bottom: calc(100% + var(--cw-spacing-large));
  left: 0;
}
</style>
