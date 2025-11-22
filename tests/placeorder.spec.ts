import { test, expect } from '@playwright/test';

test('place an order successfully', async ({ page }) => {
  // Navigate to the e-commerce homepage
  await page.goto('https://www.saucedemo.com/');

  // Log in with valid credentials
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Verify successful login by checking the presence of the products page
    await expect(page.locator('.inventory_list')).toBeVisible();

    // Add a product to the cart
    await page.locator('.inventory_item_description').filter({ hasText: 'Sauce Labs Fleece Jacket' })
    .getByRole('button', { name: 'Add to cart' }).click();
    
    // Go to the cart
    await page.click('.shopping_cart_link');
    await expect(page.locator('.cart_list')).toBeVisible();

    // Proceed to checkout
    await page.click('text=Checkout');
    
    // Fill in checkout information
    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Doe');
    await page.fill('#postal-code', '12345');
    await page.click('#continue');

    // Finish the order
    await page.click('#finish');

    // Verify order completion
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});