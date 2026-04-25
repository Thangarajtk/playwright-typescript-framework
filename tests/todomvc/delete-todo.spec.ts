// spec: sanity-check-demo-todo.plan.md
// seed: tests/seed-demo-todo.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Basic Functionality', () => {
  test('Delete a todo item', async ({ page }) => {
    // 1. Add a todo item 'buy some cheese'
    await page.goto('https://demo.playwright.dev/todomvc');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('buy some cheese');
    // Press Enter
    await page.keyboard.press('Enter');
    // 2. Click the '×' button next to the todo item
    await page.locator('.destroy').click();
    // Verify the todo is removed from the list
    await expect(page.getByText('buy some cheese')).not.toBeVisible();
    // Verify the counter updates accordingly
    await expect(page.getByText('item left')).not.toBeVisible();
  });
});
