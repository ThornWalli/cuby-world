<template>
  <cw-form-field :label="preparedLabel" hide-colon class="cw-form-field-upload">
    <template #default="ctx">
      <input :id="ctx.id" :accept="accept" type="file" @change="onChange" />
      <div class="indicator">
        <svg-indicator-upload />
      </div>
    </template>
  </cw-form-field>
</template>

<script lang="ts" setup>
import CwFormField from '../base/FormField.vue';
import SvgIndicatorUpload from '../../assets/icons/indicator/upload.svg';
import { computed, ref } from 'vue';

const file = ref<File | undefined>(undefined);
defineProps<{
  accept?: string;
  label?: string;
}>();

const preparedLabel = computed(() => {
  return file.value?.name || 'Upload';
});

const $emit = defineEmits<{
  (e: 'file', value: File | undefined): void;
}>();

function onChange(e: Event) {
  const files = (e.target as HTMLInputElement)?.files;
  file.value = files && files.length > 0 ? files[0] : undefined;
  $emit('file', file.value);
}
</script>

<style lang="postcss" scoped>
.cw-form-field-upload {
  --indicator-width: 30px;
  --indicator-background: var(--color-blue-7);

  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 23px;
  overflow: hidden;
  cursor: pointer;
  background: rgb(var(--rgb-white) / 20%);
  border: solid 1px var(--color-white);
  border-radius: 3px;

  & :deep(label) {
    box-sizing: border-box;
    width: 100%;
    padding: 3px 6px;
    padding-right: calc(var(--indicator-width) + 6px);
    font-weight: bold;
  }

  & input {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: var(--indicator-width);
    height: 100%;
    margin: 0;
    appearance: none;
    opacity: 0;
  }

  & .indicator {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: var(--indicator-width);
    pointer-events: none;
    background-color: var(--indicator-background);

    & svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
