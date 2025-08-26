import type { Observable } from 'rxjs';
import { concatMap, ReplaySubject, Subscription } from 'rxjs';
import {
  CubeTexture,
  Texture,
  CubeTextureLoader,
  NearestFilter,
  SRGBColorSpace,
  TextureLoader
} from 'three';
import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js';

export enum LOADER {
  CUBE_TEXTURE = 'CubeTextureLoader',
  TEXTURE = 'TextureLoader',
  GLTF = 'GLTFLoader'
}

interface Loaders {
  [LOADER.CUBE_TEXTURE]: CubeTextureLoader;
  [LOADER.TEXTURE]: TextureLoader;
  [LOADER.GLTF]: GLTFLoader;
}

export interface LoadDescription {
  loader: LOADER;
  url: string | string[];
  id?: string;
}

export default class AssetLoader {
  loaders: Loaders;
  subscription = new Subscription();

  addDescription$ = new ReplaySubject<{
    resolve: CallableFunction;
    reject: CallableFunction;
    description: LoadDescription;
  }>(0);

  private textures: Map<string, Texture | CubeTexture> = new Map();

  getTexture(id: string) {
    return this.textures.get(id);
  }

  constructor() {
    this.loaders = {
      [LOADER.CUBE_TEXTURE]: new CubeTextureLoader(),
      [LOADER.TEXTURE]: new TextureLoader(),
      [LOADER.GLTF]: new GLTFLoader()
    };

    this.subscription.add(
      this.addDescription$
        .pipe(loadTexture(this.loaders))
        .subscribe(([id, texture]) => {
          this.textures.set(id, texture);
        })
    );
  }

  add<T = Texture | CubeTexture | GLTF>(description: LoadDescription) {
    return new Promise<T>((resolve, reject) => {
      this.addDescription$.next({ resolve, reject, description });
    });
  }
}

function loadTexture(loaders: Loaders) {
  return (
    source: Observable<{
      resolve: CallableFunction;
      reject: CallableFunction;
      description: LoadDescription;
    }>
  ) =>
    source.pipe(
      concatMap(
        async ({
          resolve,
          description: { id, url, loader }
        }: {
          resolve: CallableFunction;
          reject: CallableFunction;
          description: LoadDescription;
        }) => {
          let result: Texture | CubeTexture | GLTF;
          switch (loader) {
            case LOADER.GLTF:
              {
                result = await loaders[LOADER.GLTF].loadAsync(url as string);
              }
              break;
            case LOADER.CUBE_TEXTURE:
              {
                result = await loaders[LOADER.CUBE_TEXTURE].loadAsync(
                  url as string[]
                );
              }
              break;
            default: {
              result = await loaders[LOADER.TEXTURE].loadAsync(url as string);
            }
          }

          if (result instanceof Texture || result instanceof CubeTexture) {
            result.colorSpace = SRGBColorSpace;
            result.minFilter = NearestFilter;
            result.magFilter = NearestFilter;
          }
          resolve(result);
          return [id, result] as [string, Texture | CubeTexture];
        }
      )
    );
}
