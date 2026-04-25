import { test, expect } from '../fixtures';

test('navigate to products page with session state', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('https://rahulshettyacademy.com/client');
    // Verify successful login by checking the presence of the products page
    await expect(authenticatedPage.locator('.card-body').first()).toBeVisible();
});
