import { test, expect, BrowserContext } from '@playwright/test';

let webContext: BrowserContext;

test.beforeAll(async ({ browser }) => {
    // Create a new browser context
    const context = await browser.newContext();
    const page = await context.newPage();
    // Navigate to the login page and perform login
    await page.goto('https://rahulshettyacademy.com/client');
    await page.fill('#userEmail', 'anshika@gmail.com');
    await page.fill('#userPassword', 'Iamking@000');
    await page.click('#login');
    await page.waitForLoadState('networkidle');

    // Save storage state to a file
    await context.storageState({ path: 'sessionstate.json' });
    webContext = await browser.newContext({storageState: 'sessionstate.json'});
});

test('navigate to products page with session state', async () => {
    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    // Verify successful login by checking the presence of the products page
    await expect(page.locator('.card-body').first()).toBeVisible();
});

