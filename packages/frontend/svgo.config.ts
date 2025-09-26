import type { Config } from 'svgo';
export default {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // removeViewBox: false
        }
      }
    },
    {
      name: 'prefixIds',
      params: {
        prefix: 'cuby-', // Präfix für IDs
        prefixIds: true,
        prefixClassNames: false,
        delim: '' // kein Delimiter zwischen Präfix und ID
      }
    },
    {
      name: 'removeDimensions',
      active: true
    }
  ]
} as Config;
