// spec: sanity-check-demo-todo.plan.md
// seed: tests/seed-demo-todo.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Basic Functionality', () => {
  test('Add a new todo item', async ({ page }) => {
    // 1. Navigate to the demo TODO app
    await page.goto('https://demo.playwright.dev/todomvc');
    // 2. Type 'buy some cheese' in the 'What needs to be done?' input field
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('buy some cheese');
    // 3. Press Enter to submit the todo
    // Press Enter
    await page.keyboard.press('Enter');
    // Verify the todo 'buy some cheese' appears in the list
    await expect(page.getByText('buy some cheese')).toBeVisible();
    // Verify the input field is cleared
    await expect(page.getByRole('textbox', { name: 'What needs to be done?' })).toHaveValue('');
    // Verify the counter shows '1 item left'
    await expect(page.getByText('1 item left')).toBeVisible();
  });
});
