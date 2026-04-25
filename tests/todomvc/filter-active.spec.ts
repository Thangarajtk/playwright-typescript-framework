// spec: sanity-check-demo-todo.plan.md
// seed: tests/seed-demo-todo.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Basic Functionality', () => {
  test('Filter to show only active todos', async ({ page }) => {
    // 1. Add two todo items
    await page.goto('https://demo.playwright.dev/todomvc');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('buy some cheese');
    // Press Enter
    await page.keyboard.press('Enter');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('feed the cat');
    // Press Enter
    await page.keyboard.press('Enter');
    // 2. Mark one as completed
    await page.getByRole('listitem').filter({ hasText: 'buy some cheese' }).getByLabel('Toggle Todo').click();
    // 3. Click the 'Active' filter link
    await page.getByRole('link', { name: 'Active' }).click();
    // Verify only active todos are displayed
    await expect(page.getByText('feed the cat')).toBeVisible();
    // Verify completed todos are hidden
    await expect(page.getByText('buy some cheese')).not.toBeVisible();
  });
});
