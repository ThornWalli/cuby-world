<template>
  <div v-if="!hidden">
    {{ progress }}
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { Observable } from 'rxjs';
import { from, lastValueFrom, map, mergeMap, tap, toArray } from 'rxjs';
import {
  CubeTextureLoader,
  NearestFilter,
  SRGBColorSpace,
  TextureLoader
} from 'three';
import { ASSET_TYPE, type AssetDescription } from '../utils/assets';

const completes = ref(0);
const textureLoader = new TextureLoader();
const cubeTextureLoader = new CubeTextureLoader();

const $props = defineProps<{
  urls: AssetDescription[];
  hidden?: boolean;
}>();

const progress = computed(() => {
  return Math.round((completes.value / $props.urls.length) * 100);
});

const loadTextures =
  (concurrent = 6) =>
  (source: Observable<AssetDescription>) =>
    source.pipe(
      mergeMap(async ({ id, url, type }) => {
        let texture;
        switch (type) {
          case ASSET_TYPE.CUBE_TEXTURE:
            {
              texture = await cubeTextureLoader.loadAsync(url as string[]);
            }
            break;
          default: {
            texture = await textureLoader.loadAsync(url as string);
          }
        }

        texture.colorSpace = SRGBColorSpace;
        texture.minFilter = NearestFilter;
        texture.magFilter = NearestFilter;

        return [id, texture];
      }, concurrent)
    );

const start = () => {
  return lastValueFrom(
    from($props.urls).pipe(
      loadTextures(),
      tap(() => {
        completes.value++;
      }),
      toArray(),
      map(textures => Object.fromEntries(textures))
    )
  );
};

defineExpose({
  start
});
</script>
