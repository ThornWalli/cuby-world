<template>
  <div class="cw-panel" :class="{ 'has-title': !hideTitle && hasTitle }">
    <div v-if="!hideTitle && hasTitle" class="title">
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
  hideTitle?: boolean;
}>();

const hasTitle = computed(() => $props.title || $slots.title);
</script>

<style lang="postcss" scoped>
.cw-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  color: white;
  background: rgb(0 0 0 / 80%);
  border: solid 2px rgb(255 255 255 / 80%);
  border-radius: 6px;
  box-shadow: 0 0 2px 0 rgb(0 0 0 / 80%);
  backdrop-filter: blur(5px);

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
