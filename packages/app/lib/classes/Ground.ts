import { GROUND_GEOMETRY, type GroundGeometryMap } from './../types/ground';
import {
  DoubleSide,
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

  createGeometry({
    groundGeometryMap
  }: {
    groundGeometryMap: GroundGeometryMap;
  }) {
    return groundGeometryMap.get(this.type)!.clone()!;
  }
  async createMaterial({
    assetLoader,
    groundTextureMap
  }: {
    assetLoader: AssetLoader;
    groundTextureMap: GroundTextureMap;
  }) {
    let texture: Texture | null = null;
    const opacity = this.opacity;
    if ((this.texture as InternalGroundSkinTexture)?.id) {
      const test = groundTextureMap.get(
        (this.texture as InternalGroundSkinTexture).id
      );
      if (!test) {
        throw new Error(
          `Texture with id ${(this.texture as InternalGroundSkinTexture).id} not found in groundTextureMap`
        );
      }
      texture = await assetLoader.add<Texture>({
        loader: LOADER.TEXTURE,
        url: this.type === GROUND_GEOMETRY.SMALL ? test?.small : test?.medium,
        options: { density: 1 }
      });
      texture.flipY = false;
      texture.colorSpace = SRGBColorSpace;
    }
    return new MeshPhongMaterial({
      color: this.color,
      opacity,
      alphaTest: 0.1,
      transparent: opacity < 1,
      side: DoubleSide,
      map: texture ?? null
    });
  }
}
