import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      {
        extends: './packages/app/vitest.config.ts',
        test: {
          name: 'app'
        }
      }
    ]
  }
});
