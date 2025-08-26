import { CanvasTexture, RepeatWrapping } from 'three';
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
