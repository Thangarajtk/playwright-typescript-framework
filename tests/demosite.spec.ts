import { test, expect } from '@playwright/test';

test('demo site navigation and content verification', async ({ page }) => {
    // Navigate to the demo site homepage
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    // Verify the page title
    await expect(page).toHaveTitle('Practice Page');

    // Click the Hide button to hide the text box
    await page.click('#hide-textbox');

    // Check hidden elements are not visible
    const hiddenElement = page.locator('#displayed-text');
    await expect(hiddenElement).toBeHidden();

    // Click the 'Show' button to display the hidden element
    await page.click('#show-textbox');

    // Verify the hidden element is now visible
    await expect(hiddenElement).toBeVisible();

    // verify the iframe and its content
    const frameLocator = page.frameLocator('#courses-iframe');
    await expect(frameLocator.locator('a[href="#/learning-paths"]').first()
    .getByText('Learning Paths')).toBeVisible();
});