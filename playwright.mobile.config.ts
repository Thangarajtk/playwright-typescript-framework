import { defineConfig, devices } from '@playwright/test';
import { PIXEL5_CONTEXT, IPHONE12_CONTEXT } from './configs/deviceContexts';

/**
 * Mobile-specific Playwright config.
 * Run with: npx playwright test -c playwright.mobile.config.ts
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },

  /* Mobile viewports / devices */
  projects: [
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'], ...PIXEL5_CONTEXT },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'], ...IPHONE12_CONTEXT },
    },
  ],
});
