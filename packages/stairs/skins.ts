import type { StairSkinItem } from '@cuby-world/app/lib/types/stair/catalog';

// const colors = [
//   0xffffff, 0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff,
//   0x000000, 0x808080, 0x800000, 0x808000, 0x008000, 0x800080, 0x008080, 0x000080
// ];
const skins: StairSkinItem[] = [
  {
    id: 'default_1x3_base',
    skin: 'default_1x3_base',
    name: 'Default',
    type: 'stair_default_1x3',
    options: {}
  },
  {
    id: 'default_1x1_base',
    skin: 'default_1x1_base',
    name: 'Default',
    type: 'stair_default_1x1',
    options: {}
  }
  // ...colors.map((color, index) => ({
  //   id: 'default_color_' + index,
  //   skin: 'default_color_' + index,
  //   name: 'Default ' + index,
  //   type: 'stair_default_1x3',
  //   options: {
  //     color
  //   }
  // }))
];

export default new Map(skins.map(s => [s.id, s]));
