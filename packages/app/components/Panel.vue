<template>
  <div class="cw-panel" :class="{ 'has-title': hasTitle }">
    <div v-if="hasTitle" class="title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSlots, computed } from 'vue';

const $slots = useSlots();

const $props = defineProps<{
  title?: string;
}>();

const hasTitle = computed(() => $props.title || $slots.title);
</script>

<style lang="postcss" scoped>
.cw-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 1em;
  color: white;
  background: rgb(0 0 0 / 80%);
  border: solid 1px rgb(255 255 255 / 80%);
  border-radius: 9px;
  box-shadow: 0 0 4px 0 rgb(0 0 0 / 40%);

  &.has-title {
    padding-top: 0.5em;
  }

  & .title {
    display: block;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
  }

  & .content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
