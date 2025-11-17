<template>
  <cw-dialog
    ref="dialog"
    hide-close
    v-bind="$attrs"
    class="cw-dialog-create-user">
    <template #header>Dein Cuby</template>
    <template #default="ctx">
      <form
        ref="formEl"
        class="fields"
        @submit="onSubmit($event, { close: ctx.close })">
        <cw-form-field-textfield
          v-model="name"
          required
          placeholder="Your Name…"
          label="Your Name" />
        <div class="preview-characters">
          <base-button
            v-for="previewUnit in previewUnits"
            :key="`${previewUnit.skin}_${previewUnit.key}_${previewUnit.selected}`"
            type="button"
            class="character"
            :class="{
              [previewUnit.key]: true,
              selected: previewUnit.selected
            }"
            @click="onClickSelectCharacter(previewUnit.key)">
            <div>
              <cw-object-preview-unit
                :key="previewUnit.selected ? skin : previewUnit.skin"
                :app="app"
                mode="loop"
                :ratio="1"
                :size="new Vector3(1, 1.8, 1)"
                :model-value="{
                  type: previewUnit.key,
                  skin: previewUnit.selected ? skin : previewUnit.skin,
                  action: previewUnit.selected
                    ? ANIMATION_ACTION.WALK
                    : ANIMATION_ACTION.IDLE
                }" />
            </div>
          </base-button>
        </div>

        <cw-form-field-select v-model="skin" label="Your Skin">
          <cw-form-field-select-option
            v-for="option in skinOptions"
            v-bind="option"
            :key="option.value" />
        </cw-form-field-select>
      </form>
    </template>
    <template #actions>
      <cw-button @click="onClickSave()"> Save </cw-button>
    </template>
  </cw-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import CwDialog from '../Dialog.vue';
import CwFormFieldTextfield from '../formField/Textfield.vue';
import CwFormFieldSelect from '../formField/Select.vue';
import CwFormFieldSelectOption from '../formField/select/Option.vue';
import CwObjectPreviewUnit from '../objectPreview/Unit.vue';
import BaseButton from '../base/Button.vue';
import CwButton from '../Button.vue';
import {
  CHARACHTER_TYPE,
  DEFAULT_PLAYER_SKIN_ID
} from '@cuby-world/app/lib/classes/Player';
import type App from '@cuby-world/app/lib/classes/App';

import { catalog } from '@cuby-world/units';
import { Vector3 } from 'three';
import { ShadowQuality } from '@cuby-world/app/lib/classes/Renderer';
import type { PlayerSettings } from '@cuby-world/app/lib/types/player';
import { ANIMATION_ACTION } from '@cuby-world/app/lib/types/animation';

const formEl = ref<HTMLFormElement | null>(null);

const name = ref('');
const characterType = ref<CHARACHTER_TYPE>(CHARACHTER_TYPE.CUBY);
const skin = ref(DEFAULT_PLAYER_SKIN_ID);

const previewUnits = computed(() => [
  {
    key: CHARACHTER_TYPE.CUBY,
    selected: characterType.value === CHARACHTER_TYPE.CUBY,
    skin: DEFAULT_PLAYER_SKIN_ID
  },
  {
    key: CHARACHTER_TYPE.DEFAULT,
    selected: characterType.value === CHARACHTER_TYPE.DEFAULT,
    skin: DEFAULT_PLAYER_SKIN_ID
  },
  {
    key: CHARACHTER_TYPE.POLY_CHARACTER,
    selected: characterType.value === CHARACHTER_TYPE.POLY_CHARACTER,
    skin: DEFAULT_PLAYER_SKIN_ID
  }
]);

defineOptions({
  inheritAttrs: false
});

defineProps<{
  app: App;
}>();

const skinOptions = computed(() => {
  const skins = Array.from(
    Array.from(catalog.get(characterType.value)!.skinMap!.values()).map(
      skin => ({
        label: skin.name,
        value: skin.id
      })
    ) || []
  );

  if (skins.length < 1) {
    return [{ label: 'Default', value: 'default' }];
  }
  return skins;
});

function onClickSave() {
  formEl.value?.requestSubmit();
}

function onClickSelectCharacter(type: CHARACHTER_TYPE) {
  skin.value = DEFAULT_PLAYER_SKIN_ID;
  characterType.value = type;
}

function onSubmit(
  e: Event,
  { close }: { close: <Result = unknown>(value?: Result | undefined) => void }
) {
  e.preventDefault();
  close<PlayerSettings>({
    name: name.value,
    characterType: characterType.value,
    skin: skin.value,
    graphic: {
      shadowQuality: ShadowQuality.LOW
    }
  });
}

const dialog = ref<InstanceType<typeof CwDialog> | null>(null);

function open() {
  return dialog.value!.dialog!.open<PlayerSettings>();
}

defineExpose({
  open
});
</script>

<style lang="postcss" scoped>
.fields {
  display: flex;
  flex-direction: column;
  gap: var(--cw-spacing-medium);

  & :deep(.cw-base-form-field) {
    & :deep(label) {
      min-width: 100px;
    }
  }

  & .preview-characters {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--cw-spacing-medium);
    padding: var(--cw-spacing-medium) var(--cw-spacing-large);
    margin: 0 calc(var(--cw-spacing-medium) * -1);
    background-color: var(--color-blue-7);

    & > button {
      gap: var(--cw-spacing-medium);
      padding: var(--cw-spacing-small) var(--cw-spacing-medium);
      padding-bottom: var(--cw-spacing-medium);
      font-family: var(--font-base);
      font-size: 12px;
      font-weight: bold;
      cursor: pointer;
      user-select: none;
      background: var(--color);
      background-color: rgb(var(--rgb-white) / 40%);
      border: solid var(--color-black) 2px;
      border-radius: var(--cw-border-radius-medium);
      box-shadow: inset 0 0 0 black;
      transition:
        box-shadow var(--cw-easing-duration-short) var(--cw-easing-base),
        background-color var(--cw-easing-duration-short) var(--cw-easing-base),
        border-color var(--cw-easing-duration-short) var(--cw-easing-base),
        color var(--cw-easing-duration-short) var(--cw-easing-base);

      &:hover,
      &.selected {
        background-color: white;
        box-shadow: inset 0 0 4px black;
      }

      & > div {
        position: relative;

        &::before {
          display: block;
          padding-top: 100%;
          content: '';
        }

        & > * {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

.test-enter-active,
.test-leave-active {
  transition: opacity 3s var(--cw-easing-base);
}

.test-enter-from,
.test-leave-to {
  opacity: 0;
}
</style>
