import { test, expect } from '@playwright/test';

test('visual comparison of homepage', async ({ page }) => {
  // Navigate to the e-commerce homepage
  await page.goto('https://www.saucedemo.com/');

  // Take a screenshot of the homepage
  const screenshot = await page.screenshot();

  // Compare the screenshot with the baseline image
  expect(screenshot).toMatchSnapshot('homepage-baseline.png');
});
