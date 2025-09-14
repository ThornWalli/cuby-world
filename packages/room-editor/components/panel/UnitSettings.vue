<template>
  <cw-panel class="cw-room-editor-panel-unit-settings" title="Unit Settings">
    <form @submit="onSubmit">
      <div class="fields">
        <cw-form-field-select
          :model-value="modelValue.options.rotation"
          hide-label
          style-type="dark"
          @update:model-value="
            onUpdateModelValue({
              options: {
                ...modelValue.options,
                rotation: $event as UNIT_ROTATION
              }
            })
          ">
          <cw-form-field-select-option
            v-for="{ value, label } in rotationOptions"
            :key="value"
            :value="value">
            {{ label }}
          </cw-form-field-select-option>
        </cw-form-field-select>
        <div class="position">
          <cw-form-field-textfield
            :model-value="modelValue.options.position.x"
            style-type="dark"
            label="x"
            :min="0"
            :step="1 / 3"
            type="number"
            hide-label
            @update:model-value="
              onUpdateModelValue({
                options: {
                  ...modelValue.options,
                  position: new Vector3(
                    Number($event),
                    modelValue.options.position.y,
                    modelValue.options.position.z
                  )
                }
              })
            " />/
          <cw-form-field-textfield
            :model-value="modelValue.options.position.y"
            style-type="dark"
            label="y"
            :min="0"
            :step="1 / 3"
            type="number"
            hide-label
            @update:model-value="
              onUpdateModelValue({
                options: {
                  ...modelValue.options,
                  position: new Vector3(
                    modelValue.options.position.x,
                    Number($event),
                    modelValue.options.position.z
                  )
                }
              })
            " />/
          <cw-form-field-textfield
            :model-value="modelValue.options.position.z"
            style-type="dark"
            label="z"
            :min="0"
            :step="1 / 3"
            type="number"
            hide-label
            @update:model-value="
              onUpdateModelValue({
                options: {
                  ...modelValue.options,
                  position: new Vector3(
                    modelValue.options.position.x,
                    modelValue.options.position.y,
                    Number($event)
                  )
                }
              })
            " />
        </div>
      </div>
      <cw-button type="submit"> Save </cw-button>
    </form>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '@cuby-world/app/components/Panel.vue';
import CwFormFieldSelect from '@cuby-world/app/components/formField/Select.vue';
import CwFormFieldSelectOption from '@cuby-world/app/components/formField/select/Option.vue';
import CwFormFieldTextfield from '@cuby-world/app/components/formField/Textfield.vue';
import CwButton from '@cuby-world/app/components/Button.vue';

import { ref } from 'vue';
import { Vector3 } from 'three';
import type { UnitDescription } from '@cuby-world/app/lib/classes/Unit';
import { UNIT_ROTATION } from '@cuby-world/app/lib/types/unit';

const $props = defineProps<{
  modelValue: UnitDescription;
}>();

function onUpdateModelValue(value: Partial<UnitDescription>) {
  if (value !== $props.modelValue) {
    // Emit only if value changed
    $emit('update:model-value', {
      ...$props.modelValue,
      ...value
    });
  }
}

const $emit = defineEmits<{
  (e: 'update:model-value', value: UnitDescription): void;
}>();

function onSubmit(e: Event) {
  e.preventDefault();
  $emit('update:model-value', model.value);
}

const model = ref($props.modelValue);

const rotationOptions = ref(
  Object.entries(UNIT_ROTATION).map(([key, value]) => ({
    label: key,
    value
  }))
);
</script>

<style lang="postcss" scoped>
.cw-room-editor-panel-unit-settings {
  & form {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  & .fields {
    display: flex;
    flex-direction: column;
    gap: 8px;

    & .position {
      display: flex;
      flex-direction: row;
      gap: 4px;
      align-items: center;

      & :deep(input) {
        text-align: center;
      }

      & > * {
        width: 64px;
      }
    }
  }
}
</style>
