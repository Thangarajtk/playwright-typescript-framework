// spec: sanity-check-demo-todo.plan.md
// seed: tests/seed-demo-todo.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Basic Functionality', () => {
  test('Clear all completed todos', async ({ page }) => {
    // 1. Add three todo items
    await page.goto('https://demo.playwright.dev/todomvc');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('buy some cheese');
    // Press Enter
    await page.keyboard.press('Enter');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('feed the cat');
    // Press Enter
    await page.keyboard.press('Enter');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('book a doctors appointment');
    // Press Enter
    await page.keyboard.press('Enter');
    // 2. Mark all as completed
    await page.getByRole('checkbox', { name: '❯Mark all as complete' }).click();
    // 3. Click the 'Clear completed' button
    await page.getByRole('button', { name: 'Clear completed' }).click();
    // Verify all completed todos are removed from the list
    await expect(page.getByText('buy some cheese')).not.toBeVisible();
    await expect(page.getByText('feed the cat')).not.toBeVisible();
    await expect(page.getByText('book a doctors appointment')).not.toBeVisible();
    // Active todos remain (none in this case)
  });
});
