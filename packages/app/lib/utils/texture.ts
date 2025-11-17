import type { Texture } from 'three';
import {
  CanvasTexture,
  ClampToEdgeWrapping,
  LinearFilter,
  NearestFilter,
  RepeatWrapping,
  SRGBColorSpace
} from 'three';
import { createCheckerboardCanvas } from './canvas';

export function checkerboardTexture(
  size: number,
  tileSize: number,
  color1: string,
  color2: string,
  repeatX = 4,
  repeatY = 4
) {
  const checkerboardCanvas = createCheckerboardCanvas(
    size,
    tileSize,
    color1,
    color2
  );
  const checkerboardTexture = new CanvasTexture(checkerboardCanvas);

  checkerboardTexture.wrapS = RepeatWrapping;
  checkerboardTexture.wrapT = RepeatWrapping;
  checkerboardTexture.repeat.set(repeatX, repeatY);
  return checkerboardTexture;
}

export function prepareTexture(
  texture: Texture,
  options: {
    pixelrated?: boolean;
    repeat?: boolean;
  } = {}
) {
  texture.colorSpace = SRGBColorSpace;
  texture.flipY = false;
  texture.generateMipmaps = true;
  if (options.pixelrated) {
    texture.minFilter = NearestFilter;
    texture.magFilter = NearestFilter;
  } else {
    texture.minFilter = LinearFilter;
    texture.magFilter = LinearFilter;
  }
  if (!options.repeat) {
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
  } else {
    texture.wrapS = ClampToEdgeWrapping;
    texture.wrapT = ClampToEdgeWrapping;
  }
  texture.needsUpdate = true;
  return texture;
}
