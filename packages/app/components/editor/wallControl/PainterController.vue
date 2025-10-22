<template>
  <teleport to="#teleports-panel-bottom">
    <cw-panel-editor-wall-skin v-model="skin" :skins="skins" :app="app" />
  </teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import CwPanelEditorWallSkin from '../panel/WallSkin.vue';
import type { EditorApp } from '@cuby-world/app/lib/classes/App';
import type PainterController from '@cuby-world/app/lib/classes/appModule/editor/wall/PainterController';
import type {
  WallSkinDescription,
  WallSkinIdentifier
} from '@cuby-world/app/lib/types/wall/skins';
import { skinMap } from '@cuby-world/walls/skins';
import { wallCatalog } from '@cuby-world/walls';

const skins = ref<WallSkinDescription[]>(
  wallCatalog.get('default')?.skins || []
);
const skin = ref<WallSkinIdentifier>('');

watch(
  () => skin.value,
  skin => {
    controller.value.setSkin(skin ? skinMap.get(skin) : null);
  }
);

const $props = defineProps<{
  app: EditorApp;
}>();

const controller = computed(() => {
  return $props.app.modules.editorWall.currentController as PainterController;
});
</script>
