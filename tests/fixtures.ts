import { test as baseTest, Browser } from '@playwright/test';
import { PageObjectsFactory } from '../pages/PageObjectsFactory';
import { ApiUtils } from '../utils/ApiUtils';
import path from 'path';
import fs from 'fs';

// Define the fixtures interface
type TestFixtures = {
  pageObjects: ReturnType<PageObjectsFactory['createAllPages']>;
  rahulPageObjects: {
    loginPage: any;
    productsPage: any;
    cartPage: any;
    checkoutPage: any;
    checkoutOverviewPage: any;
    orderConfirmationPage: any;
  };
  apiUtils: ApiUtils;
  testData: any;
  authenticatedPage: any;
};

// Load test data
const loadTestData = (fileName: string) => {
  const filePath = path.join(__dirname, '../test-data', fileName);
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
  return {};
};

// Extend the base test with custom fixtures
export const test = baseTest.extend<TestFixtures>({
  // Page Objects Factory fixture for SauceDemo
  pageObjects: async ({ page }, use) => {
    const factory = new PageObjectsFactory(page);
    // Create page objects for SauceDemo by default (most tests use this)
    const pageObjects = {
      loginPage: factory.createLoginPage('saucedemo'),
      productsPage: factory.createProductsPage(),
      cartPage: factory.createCartPage(),
      checkoutPage: factory.createCheckoutPage(),
      checkoutOverviewPage: factory.createCheckoutOverviewPage(),
      orderConfirmationPage: factory.createOrderConfirmationPage(),
    };
    await use(pageObjects);
  },

  // Page Objects Factory fixture for Rahul Shetty Academy
  rahulPageObjects: async ({ page }, use) => {
    const factory = new PageObjectsFactory(page);
    const pageObjects = {
      loginPage: factory.createLoginPage('rahulshettyacademy'),
      productsPage: factory.createProductsPage(),
      cartPage: factory.createCartPage(),
      checkoutPage: factory.createCheckoutPage(),
      checkoutOverviewPage: factory.createCheckoutOverviewPage(),
      orderConfirmationPage: factory.createOrderConfirmationPage(),
    };
    await use(pageObjects);
  },

  // API Utils fixture
  apiUtils: async ({ request }, use) => {
    const loginPayload = { userEmail: 'anshika@gmail.com', userPassword: 'Iamking@000' };
    const apiUtils = new ApiUtils(request, loginPayload);
    await use(apiUtils);
  },

  // Test Data fixture
  testData: async ({}, use: any) => {
    const data = loadTestData('login-data.json');
    await use(data);
  },

  // Authenticated Page fixture
  authenticatedPage: async ({ browser }: { browser: Browser }, use: any) => {
    // Create a new context with stored session state
    const context = await browser.newContext({ storageState: 'sessionstate.json' });
    const page = await context.newPage();

    await use(page);

    // Cleanup
    await context.close();
  },
});

export { expect } from '@playwright/test';