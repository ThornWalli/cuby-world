import type { StairSkinItem } from '@cuby-world/app/lib/types/stair/catalog';

const skins: StairSkinItem[] = [
  {
    id: 'default_base',
    skin: 'default_base',
    name: 'Default',
    type: 'default',
    options: {}
  }
];

export default new Map(skins.map(s => [s.id, s]));
