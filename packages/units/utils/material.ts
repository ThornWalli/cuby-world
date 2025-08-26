import { checkerboardTexture } from '@cuby-world/app/lib/utils/texture';
import { MeshPhongMaterial } from 'three';

export function defaultMaterial() {
  const texture = checkerboardTexture(16, 8, '#ffffff', '#000000', 2, 2);
  return new MeshPhongMaterial({ map: texture });
}
