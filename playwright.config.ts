import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  ...(process.env.CI ? { workers: 1 } : {}),

  reporter: 'html',

  projects: [
    {
      name: 'ui-tests',
      testDir: 'tests/ui-tests',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.BASE_URL || 'http://localhost:5173/login',
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
      },
    },

    {
      name: 'api-tests',
      testDir: 'tests/api-tests',
      use: {
        baseURL: process.env.API_BASE_URL || 'http://localhost:8000/docs',
      },
    },
  ],
});
