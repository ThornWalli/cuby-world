/* eslint-disable complexity */
import { GROUND_GEOMETRY, type GroundGeometryMap } from './../types/ground';
import {
  ClampToEdgeWrapping,
  DoubleSide,
  LinearFilter,
  type Mesh,
  MeshPhongMaterial,
  SRGBColorSpace,
  type Texture,
  Vector3
} from 'three';
import type AssetLoader from './AssetLoader';
import type { GroundTextureMap } from '../types/ground';
import type {
  ExternalGroundSkinTexture,
  InternalGroundSkinTexture
} from '../types/ground/skins';
import { LOADER } from './AssetLoader';

export default class Ground {
  position: Vector3;
  type: GROUND_GEOMETRY = GROUND_GEOMETRY.MEDIUM;

  accessible: boolean = true;
  opacity: number = 1;

  color: string | number = '#cccccc';
  texture: ExternalGroundSkinTexture | InternalGroundSkinTexture | null = null;

  mesh?: Mesh;

  get identifier() {
    return `${this.type}_${this.color}_${(this.texture as InternalGroundSkinTexture)?.id || (this.texture as ExternalGroundSkinTexture)?.url}`;
  }

  constructor({
    accessible,
    position,
    type,
    color,
    opacity,
    texture
  }: {
    position?: Vector3;
    type?: GROUND_GEOMETRY;
    color?: string | number;
    opacity?: number;
    texture?: ExternalGroundSkinTexture | InternalGroundSkinTexture | null;
    accessible?: boolean;
  }) {
    this.accessible = accessible ?? this.accessible;
    this.position = position ?? new Vector3(0, 0, 0);
    this.type = type ?? this.type;
    this.color = color ?? this.color;
    this.opacity = opacity ?? this.opacity;
    this.texture = texture ?? this.texture;
  }

  createGeometry(geometryMap: GroundGeometryMap) {
    return geometryMap.get(this.type)!.clone()!;
  }

  // async createMaterial({
  //   assetLoader,
  //   textureMap
  // }: {
  //   assetLoader: AssetLoader;
  //   textureMap: GroundTextureMap;
  // }) {
  //   const opacity = this.opacity;
  //   let texture: Texture | null = null;
  //   let normalMap: Texture | null = null;
  //   let ambientMap: Texture | null = null;
  //   let displacementMap: Texture | null = null;
  //   let specularMap: Texture | null = null;

  //   if ((this.texture as InternalGroundSkinTexture)?.id) {
  //     const asset = textureMap.get(
  //       (this.texture as InternalGroundSkinTexture).id
  //     );
  //     if (!asset) {
  //       throw new Error(
  //         `Texture with id ${(this.texture as InternalGroundSkinTexture).id} not found in groundTextureMap`
  //       );
  //     }
  //     texture = await assetLoader.add<Texture>({
  //       loader: LOADER.TEXTURE,
  //       value:
  //         this.type === GROUND_GEOMETRY.SMALL
  //           ? asset.color.small
  //           : asset.color.medium,
  //       options: { density: 1 }
  //     });
  //     //#region normal
  //     if (asset.normal) {
  //       normalMap = await assetLoader.add<Texture>({
  //         loader: LOADER.TEXTURE,
  //         value:
  //           this.type === GROUND_GEOMETRY.SMALL
  //             ? asset.normal?.small
  //             : asset.normal?.medium,
  //         options: { density: 1 }
  //       });
  //     }
  //     //#endregion

  //     //#region ambient
  //     if (asset.ambient) {
  //       ambientMap = await assetLoader.add<Texture>({
  //         loader: LOADER.TEXTURE,
  //         value:
  //           this.type === GROUND_GEOMETRY.SMALL
  //             ? asset.ambient?.small
  //             : asset.ambient?.medium,
  //         options: { density: 1 }
  //       });
  //     }
  //     //#endregion

  //     //#region displacement
  //     if (asset.displacement) {
  //       displacementMap = await assetLoader.add<Texture>({
  //         loader: LOADER.TEXTURE,
  //         value:
  //           this.type === GROUND_GEOMETRY.SMALL
  //             ? asset.displacement?.small
  //             : asset.displacement?.medium,
  //         options: { density: 1 }
  //       });
  //     }
  //     //#endregion

  //     //#region specular
  //     if (asset.specular) {
  //       specularMap = await assetLoader.add<Texture>({
  //         loader: LOADER.TEXTURE,
  //         value:
  //           this.type === GROUND_GEOMETRY.SMALL
  //             ? asset.specular?.small
  //             : asset.specular?.medium,
  //         options: { density: 1 }
  //       });
  //     }
  //     //#endregion

  //     texture.flipY = false;
  //     texture.colorSpace = SRGBColorSpace;
  //   }
  //   return new MeshPhongMaterial({
  //     color: this.color,
  //     opacity,
  //     alphaTest: 0.1,
  //     transparent: opacity < 1,
  //     side: DoubleSide,
  //     map: texture ?? null,
  //     normalMap: normalMap,
  //     aoMap: ambientMap,
  //     displacementMap: displacementMap,
  //     specularMap: specularMap
  //   });
  // }
}

const cacheMap = new Map<string, MeshPhongMaterial>();

export async function createMaterial(
  groundTexture: ExternalGroundSkinTexture | InternalGroundSkinTexture | null,
  type: GROUND_GEOMETRY,
  color: string | number,
  opacity: number,
  {
    assetLoader,
    textureMap
  }: {
    assetLoader: AssetLoader;
    textureMap: GroundTextureMap;
  }
) {
  const key = `${type}_${color}_${(groundTexture as InternalGroundSkinTexture)?.id || (groundTexture as ExternalGroundSkinTexture)?.url}`;

  if (cacheMap.has(key)) {
    return cacheMap.get(key)!.clone();
  }

  let texture: Texture | null = null;
  let normalMap: Texture | null = null;
  let ambientMap: Texture | null = null;
  let displacementMap: Texture | null = null;
  let specularMap: Texture | null = null;

  if ((groundTexture as InternalGroundSkinTexture)?.id) {
    const asset = textureMap.get(
      (groundTexture as InternalGroundSkinTexture).id
    );
    if (!asset) {
      throw new Error(
        `Texture with id ${(groundTexture as InternalGroundSkinTexture).id} not found in groundTextureMap`
      );
    }
    texture = await assetLoader.add<Texture>({
      loader: LOADER.TEXTURE,
      value:
        type === GROUND_GEOMETRY.SMALL ? asset.color.small : asset.color.medium,
      options: { density: 1 }
    });
    //#region normal
    if (asset.normal) {
      normalMap = await assetLoader.add<Texture>({
        loader: LOADER.TEXTURE,
        value:
          type === GROUND_GEOMETRY.SMALL
            ? asset.normal?.small
            : asset.normal?.medium,
        options: { density: 1 }
      });
    }
    //#endregion

    //#region ambient
    if (asset.ambient) {
      ambientMap = await assetLoader.add<Texture>({
        loader: LOADER.TEXTURE,
        value:
          type === GROUND_GEOMETRY.SMALL
            ? asset.ambient?.small
            : asset.ambient?.medium,
        options: { density: 1 }
      });
    }
    //#endregion

    //#region displacement
    if (asset.displacement) {
      displacementMap = await assetLoader.add<Texture>({
        loader: LOADER.TEXTURE,
        value:
          type === GROUND_GEOMETRY.SMALL
            ? asset.displacement?.small
            : asset.displacement?.medium,
        options: { density: 1 }
      });
    }
    //#endregion

    //#region specular
    if (asset.specular) {
      specularMap = await assetLoader.add<Texture>({
        loader: LOADER.TEXTURE,
        value:
          type === GROUND_GEOMETRY.SMALL
            ? asset.specular?.small
            : asset.specular?.medium,
        options: { density: 1 }
      });
    }
    //#endregion
  }

  [texture, normalMap, ambientMap, displacementMap, specularMap]
    .filter(v => v !== null)
    .forEach(map => {
      map.flipY = false;
      map.wrapS = ClampToEdgeWrapping;
      map.wrapT = ClampToEdgeWrapping;
      map.minFilter = LinearFilter;
      map.magFilter = LinearFilter;
      map.colorSpace = SRGBColorSpace;
    });

  const material = new MeshPhongMaterial({
    color,
    opacity,
    alphaTest: 0.1,
    transparent: opacity < 1,
    side: DoubleSide,

    map: texture ?? null,
    normalMap: normalMap,
    aoMap: ambientMap,
    displacementMap: displacementMap,
    specularMap: specularMap
  });

  cacheMap.set(key, material);

  return material;
}
