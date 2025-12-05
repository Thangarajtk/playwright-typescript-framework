import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Security test request intercept', async ({ page }) => {
    // Use LoginPage helper to perform login
    const loginPage = new LoginPage(page, 'rahulshettyacademy');
    await loginPage.login('anshika@gmail.com', 'Iamking@000', '.card-body b');

   // Intercept the order details request to simulate unauthorized access
    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
    await page.locator("button:has-text('View')").first().click();
    
    // Verify that the unauthorized access message is displayed
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
})