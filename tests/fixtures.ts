import { test as baseTest, type Browser, type Page } from '@playwright/test';
import type { LoginPage } from '../pages/LoginPage';
import type { ProductsPage } from '../pages/ProductsPage';
import type { CartPage } from '../pages/CartPage';
import type { CheckoutPage } from '../pages/CheckoutPage';
import type { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import type { OrderConfirmationPage } from '../pages/OrderConfirmationPage';
import { PageObjectsFactory } from '../pages/PageObjectsFactory';
import { ApiUtils } from '../utils/ApiUtils';
import fs from 'node:fs';
import path from 'node:path';

type AppName = 'saucedemo' | 'rahulshettyacademy';

type PageObjects = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  orderConfirmationPage: OrderConfirmationPage;
};

type TestData = {
  username?: string;
  password?: string;
  productName?: string;
};

type TestFixtures = {
  pageObjects: PageObjects;
  rahulPageObjects: PageObjects;
  apiUtils: ApiUtils;
  testData: TestData;
  authenticatedPage: Page;
};

const loadTestData = (fileName: string): TestData => {
  const filePath = path.resolve(__dirname, '../test-data', fileName);
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as TestData;
};

export const test = baseTest.extend<TestFixtures>({
  pageObjects: async ({ page }, use) => {
    const factory = new PageObjectsFactory(page);
    await use(factory.createAllPages('saucedemo'));
  },

  rahulPageObjects: async ({ page }, use) => {
    const factory = new PageObjectsFactory(page);
    await use(factory.createAllPages('rahulshettyacademy'));
  },

  apiUtils: async ({ request }, use) => {
    const loginPayload = {
      userEmail: process.env.RAHUL_USER_EMAIL ?? 'anshika@gmail.com',
      userPassword: process.env.RAHUL_USER_PASSWORD ?? 'Iamking@000',
    };
    await use(new ApiUtils(request, loginPayload));
  },

  testData: async ({}, use) => {
    await use(loadTestData('login-data.json'));
  },

  authenticatedPage: async ({ browser }: { browser: Browser }, use) => {
    const storageStatePath = path.resolve(process.cwd(), 'sessionstate.json');
    const context = await browser.newContext({
      storageState: fs.existsSync(storageStatePath) ? storageStatePath : undefined,
    });
    const page = await context.newPage();

    await use(page);
    await context.close();
  },
});

export { expect } from '@playwright/test';