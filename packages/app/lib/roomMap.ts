export const roomMap = Object.freeze({
  default: () => import('./rooms/default.json?url').then(m => m.default),
  'test-1': () => import('./rooms/test/test-1.json?url').then(m => m.default),
  'test-2': () => import('./rooms/test/test-2.json?url').then(m => m.default),
  'test-3': () => import('./rooms/test/test-3.json?url').then(m => m.default),
  'test-4': () => import('./rooms/test/test-4.json?url').then(m => m.default)
}) as unknown as {
  [key: string]: () => Promise<string>;
};
