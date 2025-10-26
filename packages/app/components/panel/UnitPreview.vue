<template>
  <cw-panel
    v-if="unit && ready"
    class="cw-panel-unit-preview"
    :title="panelTitle">
    <div :key="unit.key" class="preview">
      <div>
        <cw-object-preview-unit
          :app="app"
          :ratio="1"
          :model-value="{
            type: unit.key
          }" />
      </div>
    </div>

    <p>
      <span>Pos.:</span> {{ unit.getPosition().toArray().join(' / ') }}<br />
      <span>Rot.:</span> {{ unit.rotation }}
    </p>
  </cw-panel>
</template>

<script lang="ts" setup>
import type Unit from '../../lib/classes/Unit';
import CwObjectPreviewUnit from '../objectPreview/Unit.vue';
import { computed, markRaw, onMounted, onUnmounted, ref, type Raw } from 'vue';

import CwPanel from '../Panel.vue';
import type App from '../../lib/classes/App';
import { Subscription } from 'rxjs';

const $props = defineProps<{
  app: App;
}>();

const unit = ref<Raw<Unit> | null>(null);

const player = computed(() => unit.value?.modules.player.player);
const panelTitle = computed(
  () => player.value?.state.name || unit.value?.name || 'n/a'
);

const ready = ref(false);
const subscription = new Subscription();

async function setup() {
  const app = $props.app;

  subscription.add(
    app.modules.selection.observables.selectUnit$.subscribe(u => {
      unit.value = u ? markRaw(u) : null;
    })
  );
  ready.value = true;
}

onMounted(() => {
  setup();
});

onUnmounted(() => {
  subscription.unsubscribe();
});
</script>

<style lang="postcss" scoped>
.cw-panel-unit-preview {
  & .preview {
    position: relative;
    width: 128px;
    padding: var(--cw-spacing-medium);
    background-color: rgb(255 255 255 / 40%);
    border-radius: var(--cw-border-radius-medium);

    & > div {
      position: relative;

      &::before {
        display: block;
        width: 100%;
        padding-top: calc(100% * 1);
        content: '';
      }

      & > * {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
      }
    }
  }

  p {
    font-size: 12px;

    & span {
      font-weight: bold;
    }
  }

  & .actions {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
  }
}
</style>
