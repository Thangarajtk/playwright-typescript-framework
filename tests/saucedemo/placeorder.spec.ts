import { test, expect } from '../fixtures';

test('@web place an order successfully', async ({ page, pageObjects, testData }) => {
  const {
    loginPage,
    productsPage,
    cartPage,
    checkoutPage,
    checkoutOverviewPage,
    orderConfirmationPage,
  } = pageObjects;

  // Login to SauceDemo
  await loginPage.login(testData.username, testData.password, '.inventory_list');

  // Verify we're on the products page
  await expect(page).toHaveURL(/.*inventory/);
  expect(await productsPage.isInventoryListVisible()).toBe(true);

  // Add a product to the cart
  await productsPage.addProductToCart(testData.productName);

  // Navigate to cart
  await productsPage.goToCart();
  expect(await cartPage.isCartVisible()).toBe(true);

  // Verify product is in cart
  const itemCount = await cartPage.getItemCount();
  expect(itemCount).toBeGreaterThan(0);

  // Proceed to checkout
  await cartPage.proceedToCheckout();
  expect(await checkoutPage.isCheckoutFormVisible()).toBe(true);

  // Fill checkout information
  await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');

  // Verify information was filled
  expect(await checkoutPage.getFirstName()).toBe('John');
  expect(await checkoutPage.getLastName()).toBe('Doe');
  expect(await checkoutPage.getPostalCode()).toBe('12345');

  // Continue to order review
  await checkoutPage.continue();
  expect(await checkoutOverviewPage.isOverviewDisplayed()).toBe(true);

  // Verify order overview
  const overviewItemCount = await checkoutOverviewPage.getItemCount();
  expect(overviewItemCount).toBeGreaterThan(0);

  // Finish the order
  await checkoutOverviewPage.finishOrder();

  // Verify order completion
  expect(await orderConfirmationPage.isConfirmationPageDisplayed()).toBe(true);
  expect(await orderConfirmationPage.hasSuccessMessage('Thank you for your order')).toBe(true);
});
