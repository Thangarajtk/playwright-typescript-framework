// spec: sanity-check-demo-todo.plan.md
// seed: tests/seed-demo-todo.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Basic Functionality', () => {
  test('Mark a todo as completed', async ({ page }) => {
    // 1. Add a todo item 'buy some cheese'
    await page.goto('https://demo.playwright.dev/todomvc');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('buy some cheese');
    // Press Enter
    await page.keyboard.press('Enter');
    // 2. Click the checkbox next to the todo item
    await page.getByRole('checkbox', { name: 'Toggle Todo' }).click();
    // Verify the todo is marked as completed (visually indicated)
    await expect(page.getByRole('checkbox', { name: 'Toggle Todo' })).toBeChecked();
    // Verify the counter shows '0 items left'
    await expect(page.getByText('0 items left')).toBeVisible();
    // Switch to Completed filter to verify the todo appears there
    await page.getByRole('link', { name: 'Completed' }).click();
    // Verify the todo appears under the 'Completed' filter
    await expect(page.getByText('buy some cheese')).toBeVisible();
  });
});
