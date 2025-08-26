import useFonts from '../composables/useFonts';

import OpenSansRegular from '../assets/fonts/open-sans-v43-latin/open-sans-v43-latin-regular.woff2';
import OpenSans700 from '../assets/fonts/open-sans-v43-latin/open-sans-v43-latin-700.woff2';

export default function setupFonts() {
  const { registerFont } = useFonts();

  registerFont([
    {
      fontFamily: 'Open Sans',
      fontVariant: 'normal',
      fontFeatureSettings: 'normal',
      fontStretch: 'normal',
      fontWeight: 400,
      fontStyle: 'normal',
      fontDisplay: 'swap',
      src: [OpenSansRegular, 'woff2']
    },
    {
      fontFamily: 'Open Sans',
      fontVariant: 'normal',
      fontFeatureSettings: 'normal',
      fontStretch: 'normal',
      fontWeight: 700,
      fontStyle: 'normal',
      fontDisplay: 'swap',
      src: [OpenSans700, 'woff2']
    }
  ]);
}
