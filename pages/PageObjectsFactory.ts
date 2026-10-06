import type { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { ProductsPage } from './ProductsPage';
import { CartPage } from './CartPage';
import { CheckoutPage } from './CheckoutPage';
import { CheckoutOverviewPage } from './CheckoutOverviewPage';
import { OrderConfirmationPage } from './OrderConfirmationPage';

type SupportedAppName = 'saucedemo' | 'rahulshettyacademy';

export class PageObjectsFactory {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  createLoginPage(appName: SupportedAppName = 'saucedemo', customConfig?: Record<string, unknown>): LoginPage {
    return new LoginPage(this.page, appName, customConfig);
  }

  createProductsPage(): ProductsPage {
    return new ProductsPage(this.page);
  }

  createCartPage(): CartPage {
    return new CartPage(this.page);
  }

  createCheckoutPage(): CheckoutPage {
    return new CheckoutPage(this.page);
  }

  createCheckoutOverviewPage(): CheckoutOverviewPage {
    return new CheckoutOverviewPage(this.page);
  }

  createOrderConfirmationPage(): OrderConfirmationPage {
    return new OrderConfirmationPage(this.page);
  }

  createAllPages(appName: SupportedAppName = 'saucedemo') {
    return {
      loginPage: this.createLoginPage(appName),
      productsPage: this.createProductsPage(),
      cartPage: this.createCartPage(),
      checkoutPage: this.createCheckoutPage(),
      checkoutOverviewPage: this.createCheckoutOverviewPage(),
      orderConfirmationPage: this.createOrderConfirmationPage(),
    };
  }
}

export default PageObjectsFactory;
