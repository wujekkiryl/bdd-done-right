import { defineConfig } from 'playwright/test';

export default defineConfig({
  retries: process.env.CI ? 2 : 0, // set to 2 when running on CI
  use: {
    baseURL: 'http://localhost',
    extraHTTPHeaders: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
    testIdAttribute: 'data-testid',
    trace: 'on-first-retry',
  },
});
