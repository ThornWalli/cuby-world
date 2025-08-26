<template>
  <div class="cw-panel">
    <div v-if="title || $slots.title" class="title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title?: string;
}>();
</script>

<style lang="postcss" scoped>
.cw-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 1em;
  color: white;
  background: rgb(0 0 0 / 60%);
  border-radius: 9px;

  & .title {
    display: block;
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
