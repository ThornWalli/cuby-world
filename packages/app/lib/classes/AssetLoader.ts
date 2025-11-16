import type { Observable } from 'rxjs';
import { concatMap, ReplaySubject, Subscription } from 'rxjs';
import type { Vector2, CubeTexture, Texture } from 'three';
import { CubeTextureLoader, TextureLoader, CanvasTexture } from 'three';
import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export enum LOADER {
  CUBE_TEXTURE = 'CubeTextureLoader',
  TEXTURE = 'TextureLoader',
  GLTF = 'GLTFLoader',
  SPRITE = 'loadSpriteFromAtlas'
}

interface Loaders {
  [LOADER.CUBE_TEXTURE]: CubeTextureLoader;
  [LOADER.TEXTURE]: TextureLoader;
  [LOADER.GLTF]: GLTFLoader;
}

export interface LoadDescription {
  loader: LOADER;
  parse?: boolean;
  value: string | string[] | ArrayBuffer;
  id?: string;
  options?: Record<string, unknown>;
}
export interface SpriteLoadDescription extends LoadDescription {
  options: {
    density?: number;
    position: Vector2;
    dimension: Vector2;
  };
}

export default class AssetLoader {
  loaders: Loaders;
  subscription = new Subscription();

  addDescription$ = new ReplaySubject<{
    resolve: CallableFunction;
    reject: CallableFunction;
    description: LoadDescription;
  }>(0);

  private textures: Map<string, Promise<Texture | CubeTexture | GLTF>> =
    new Map();

  // has(id: LOADER | string) {
  //   return this.textures.has(id);
  // }

  // get<T = Texture | CubeTexture | GLTF>(id: string) {
  //   return this.textures.get(id) as Promise<T>;
  // }

  private createLoaders() {
    const loaderGltf = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      'https://www.gstatic.com/draco/versioned/decoders/1.5.7/'
    ); // oder '/draco/'

    loaderGltf.setDRACOLoader(dracoLoader);
    return {
      [LOADER.CUBE_TEXTURE]: new CubeTextureLoader(),
      [LOADER.TEXTURE]: new TextureLoader(),
      [LOADER.GLTF]: loaderGltf
    } as Loaders;
  }

  constructor() {
    this.loaders = this.createLoaders();
    this.subscription.add(
      this.addDescription$.pipe(loadTexture(this.loaders)).subscribe(void 0)
    );
  }

  add<
    T = Texture | CubeTexture | GLTF,
    L extends LoadDescription = LoadDescription
  >(description: L) {
    const cacheKey = JSON.stringify(description);
    if (this.textures.has(cacheKey)) {
      return this.textures.get(cacheKey) as Promise<T>;
    }
    const { promise, resolve, reject } = Promise.withResolvers<T>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.textures.set(cacheKey, promise as any);
    this.addDescription$.next({ resolve, reject, description });

    return promise;
  }
}
async function loadSpriteFromAtlas(
  url: string,
  sx: number,
  sy: number,
  sw: number,
  sh: number
) {
  const img = await new Promise<HTMLImageElement>(resolve => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.src = url;
  });

  const canvas = document.createElement('canvas');
  canvas.width = sw;
  canvas.height = sh;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

  const texture = new CanvasTexture(canvas);
  return texture;
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
          description
        }: {
          resolve: CallableFunction;
          reject: CallableFunction;
          description: LoadDescription;
        }) => {
          const { loader, value, id } = description;
          let result: Texture | CubeTexture | GLTF;
          switch (loader) {
            case LOADER.SPRITE:
              {
                const loadDescription: SpriteLoadDescription =
                  description as SpriteLoadDescription;
                result = await loadSpriteFromAtlas(
                  description.value as string,
                  ...loadDescription.options.position
                    .clone()
                    .multiplyScalar(loadDescription.options.density ?? 1)
                    .toArray(),
                  ...loadDescription.options.dimension
                    .clone()
                    .multiplyScalar(loadDescription.options.density ?? 1)
                    .toArray()
                );
              }
              break;
            case LOADER.GLTF:
              {
                if (description.parse) {
                  if (value instanceof ArrayBuffer) {
                    result = await loaders[LOADER.GLTF].parseAsync(
                      value as ArrayBuffer,
                      ''
                    );
                  } else {
                    throw new Error('GLTF parse requires ArrayBuffer as value');
                  }
                } else {
                  result = await loaders[LOADER.GLTF].loadAsync(
                    value as string
                  );
                }
              }
              break;
            case LOADER.CUBE_TEXTURE:
              {
                result = await loaders[LOADER.CUBE_TEXTURE].loadAsync(
                  value as string[]
                );
              }
              break;
            default: {
              result = await loaders[LOADER.TEXTURE].loadAsync(value as string);
            }
          }

          // if (result instanceof Texture || result instanceof CubeTexture) {
          //   result.colorSpace = SRGBColorSpace;
          //   result.minFilter = NearestFilter;
          //   result.magFilter = NearestFilter;
          // }
          resolve(result);
          return [id, result] as [string, Texture | CubeTexture];
        }
      )
    );
}
