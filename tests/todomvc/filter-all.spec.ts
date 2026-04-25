// spec: sanity-check-demo-todo.plan.md
// seed: tests/seed-demo-todo.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Basic Functionality', () => {
  test('Filter to show all todos', async ({ page }) => {
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
    // 3. Click the 'All' filter link
    await page.getByRole('link', { name: 'All' }).click();
    // Verify all todos are displayed regardless of status
    await expect(page.getByText('buy some cheese')).toBeVisible();
    await expect(page.getByText('feed the cat')).toBeVisible();
  });
});
