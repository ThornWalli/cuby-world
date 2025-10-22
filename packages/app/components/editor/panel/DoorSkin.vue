<template>
  <cw-panel
    hide-title
    style-type="none"
    class="cw-panel-editor-door-skin"
    title="Door Skin">
    <cw-catalog-wall-item-select
      :app="app"
      :items="items"
      :model-value="modelValue"
      @update:model-value="value => $emit('update:model-value', value)">
      <template #controls>
        <icon-button
          icon-size="very-small"
          style-type="round"
          icon="arrow_navigation_default_left"
          @click="onClickBack" />
        <cw-editor-skin-filter v-model="tag" :skins="skins" />
      </template>
    </cw-catalog-wall-item-select>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../../Panel.vue';
import CwCatalogWallItemSelect from '../catalog/WallItemSelect.vue';
import CwEditorSkinFilter from '../SkinFilter.vue';
import IconButton from '../../button/IconButton.vue';
import { computed, ref } from 'vue';
import { getWallExtensionMap } from '../../../lib/utils/catalog';
import { doorCatalog } from '@cuby-world/walls';
import type App from '../../../lib/classes/App';
import type { StairSkinIdentifier } from '@cuby-world/app/lib/types/stair/skins';
import type { SkinDescription, SKIN_TAG } from '@cuby-world/app/lib/types/skin';
import type { WallExtensionSkinIdentifier } from '@cuby-world/app/lib/types/wall/extension/skins';
import type { WallSelectItem } from '../catalog/WallItemSelect.vue';
import type { DoorWallExtensionItem } from '@cuby-world/app/lib/types/wall/extension/catalog';
import type WallExtension from '@cuby-world/app/lib/classes/WallExtension';
import type { WallType } from '@cuby-world/app/lib/types/wall/catalog';

const extensionTypes = await getWallExtensionMap<DoorWallExtensionItem>(
  Array.from(doorCatalog.values())
);

const tag = ref<SKIN_TAG | 'all'>('all');

const $props = defineProps<{
  app: App;
  type: WallType;
  item: DoorWallExtensionItem;
  skins: SkinDescription[];
  modelValue: WallExtensionSkinIdentifier | null;
}>();

function prepareItem(item: SkinDescription): WallSelectItem<SkinDescription> {
  return {
    item,
    preview: {
      type: $props.type,
      extensions: [
        {
          extension: extensionTypes.get(
            $props.item.extension
          ) as typeof WallExtension,
          skin: item.id,
          state: { ...$props.item.options, skin: item.id }
        }
      ]
    }
  };
}
const items = computed<WallSelectItem<SkinDescription>[]>(() =>
  filteredSkins.value.map(skin => prepareItem(skin))
);

const filteredSkins = computed(() =>
  $props.skins.filter(item => {
    return (
      item.tags == null || tag.value === 'all' || item.tags.includes(tag.value)
    );
  })
);

const $emit = defineEmits<{
  (e: 'back'): void;
  (e: 'update:model-value', value: StairSkinIdentifier | null): void;
}>();

function onClickBack() {
  $emit('back');
}
</script>

<style lang="postcss" scoped>
.cw-panel-editor-door-skin {
  align-items: center;
  align-self: center;
  width: 90%;

  & :deep(.cw-editor-catalog-item-select) {
    position: relative;
    width: 100%;
  }
}
</style>
