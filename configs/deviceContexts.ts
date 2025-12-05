/**
 * Device-specific context settings for mobile test runs.
 * Keep device descriptors (geolocation, permissions, locale, timezoneId) here
 * so they can be reused across Playwright configurations.
 */
import type { BrowserContextOptions } from '@playwright/test';

export const PIXEL5_CONTEXT: Partial<BrowserContextOptions> = {
  // Emulate geolocation for Pixel 5 tests
  geolocation: { latitude: 37.7749, longitude: -122.4194 }, // San Francisco
  permissions: ['geolocation'],
  locale: 'en-US',
  timezoneId: 'America/Los_Angeles',
};

export const IPHONE12_CONTEXT: Partial<BrowserContextOptions> = {
  geolocation: { latitude: 51.5074, longitude: -0.1278 }, // London
  permissions: ['geolocation'],
  locale: 'en-GB',
  timezoneId: 'Europe/London',
};

export default {
  PIXEL5_CONTEXT,
  IPHONE12_CONTEXT,
};
