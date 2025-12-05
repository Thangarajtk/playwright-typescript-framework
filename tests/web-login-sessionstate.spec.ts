import { test, expect, BrowserContext } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

let webContext: BrowserContext;

test.beforeAll(async ({ browser }) => {
    // Create a new browser context
    const context = await browser.newContext();

    // Use the LoginPage helper to perform login and save storage state
    await LoginPage.loginAndSaveState(context, 'anshika@gmail.com', 'Iamking@000', 'sessionstate.json');

    webContext = await browser.newContext({ storageState: 'sessionstate.json' });
});

test('navigate to products page with session state', async () => {
    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    // Verify successful login by checking the presence of the products page
    await expect(page.locator('.card-body').first()).toBeVisible();
});

