<template>
  <cw-panel title="Units">
    <cw-form-field-select
      ref="createUnitSelect"
      :disabled="!$props.position"
      :model-value="''"
      style-type="dark"
      mode="compact"
      label="Create Unit"
      @update:model-value="onCreateUnit">
      <cw-form-field-select-option value="">
        Create Unit
      </cw-form-field-select-option>
      <cw-form-field-select-group label="Units">
        <cw-form-field-select-option
          v-for="{ value, label } in unitOptions"
          :key="value"
          :value="value">
          {{ label }}
        </cw-form-field-select-option>
      </cw-form-field-select-group>
    </cw-form-field-select>
    <ul v-if="unitsByPosition.length > 0">
      <li
        v-for="(description, index) in unitsByPosition"
        :key="index"
        :class="{ selected: selectedUnit === description }"
        @click="onClick(description)">
        <div class="info">
          <span class="name">{{ description.unit }}</span>
          <span class="position">
            {{
              description.options.position
                .toArray()
                .map(v => v.toFixed(2))
                .join(' / ')
            }}
          </span>
        </div>

        <base-button
          style-type="quaternary"
          @click="onClickRemoveUnit(description)">
          Del.
        </base-button>
      </li>
    </ul>
    <div v-else>
      <p class="no-units">No units at this position.</p>
    </div>
  </cw-panel>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import CwPanel from '@cuby-world/app/components/Panel.vue';
import BaseButton from '@cuby-world/app/components/Button.vue';
import { Vector3 } from 'three';

import CwFormFieldSelect from '@cuby-world/app/components/formField/Select.vue';
import CwFormFieldSelectGroup from '@cuby-world/app/components/formField/select/Group.vue';
import CwFormFieldSelectOption from '@cuby-world/app/components/formField/select/Option.vue';
import unitList from '../../units';
import type { ComponentExposed } from 'vue-component-type-helpers';
import type { UnitDescription } from '@cuby-world/app/lib/classes/Unit';
import { UNIT_ROTATION } from '@cuby-world/app/lib/types/unit';
const createUnitSelect = ref<ComponentExposed<typeof CwFormFieldSelect> | null>(
  null
);

const preparedUnits = ref(
  unitList.map(UnitClass => ({
    name: UnitClass.NAME,
    value: UnitClass.KEY,
    class: UnitClass
  }))
);
const unitOptions = computed(() =>
  preparedUnits.value.map(u => ({
    label: u.name,
    value: u.value
  }))
);

const $props = defineProps<{
  selectedUnit?: UnitDescription;
  units: UnitDescription[];
  position?: Vector3;
}>();

const unitsByPosition = computed(() => {
  if (!$props.position) {
    return [];
  }
  const units = $props.units.filter(
    u =>
      $props.position?.x === u.options.position.x &&
      $props.position?.z === u.options.position.z
  );

  units.sort((a, b) => {
    return a.options.position.y - b.options.position.y;
  });

  return units;
});

function onClick(unit: UnitDescription) {
  $emit('select-unit', $props.selectedUnit !== unit ? unit : undefined);
}

function onClickRemoveUnit(unit: UnitDescription) {
  if (window.confirm('Unit wirlich löschen?')) {
    $emit('remove-unit', unit);
  }
}

const $emit = defineEmits<{
  (e: 'select-unit', value: UnitDescription | undefined): void;
  (e: 'create-unit' | 'remove-unit', value: UnitDescription): void;
}>();

function onCreateUnit(value: string) {
  if (value) {
    createUnitSelect.value?.reset();
    $emit('create-unit', {
      unit: value,
      options: {
        position: $props.position?.clone() ?? new Vector3(0, 0, 0),
        rotation: UNIT_ROTATION.NORTH
      }
    });
  }
}
</script>

<style lang="postcss" scoped>
.tiles,
.description {
  font-size: 10px;
  font-style: italic;
  text-align: center;
}

.info {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2px;
  font-size: 12px;
  line-height: 1;
}

.no-units {
  margin: 0;
  font-size: 12px;
  font-style: italic;
  text-align: center;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 4px;
  border: solid 1px rgb(var(--rgb-white) / 20%);
  border-radius: 3px;

  & span {
    font-size: 12px;
  }

  &:hover,
  &.selected {
    background: rgb(var(--rgb-white) / 10%);
  }
}
</style>
