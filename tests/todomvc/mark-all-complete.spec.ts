// spec: sanity-check-demo-todo.plan.md
// seed: tests/seed-demo-todo.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Basic Functionality', () => {
  test('Mark all todos as completed', async ({ page }) => {
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
    // 2. Click the 'Mark all as complete' checkbox
    await page.getByRole('checkbox', { name: '❯Mark all as complete' }).click();
    // Verify all todos are marked as completed
    await expect(page.getByRole('listitem').filter({ hasText: 'buy some cheese' }).getByLabel('Toggle Todo')).toBeChecked();
    // Verify the counter shows '0 items left'
    await expect(page.getByText('0 items left')).toBeVisible();
    // Verify 'Clear completed' button appears
    await expect(page.getByText('Clear completed')).toBeVisible();
  });
});
