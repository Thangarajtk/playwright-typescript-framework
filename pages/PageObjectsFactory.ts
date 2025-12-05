import type { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { ProductsPage } from './ProductsPage';
import { CartPage } from './CartPage';
import { CheckoutPage } from './CheckoutPage';
import { CheckoutOverviewPage } from './CheckoutOverviewPage';
import { OrderConfirmationPage } from './OrderConfirmationPage';

/**
 * Factory class for instantiating page objects.
 * Implements the Factory Design Pattern to centralize page object creation.
 *
 * Benefits:
 * - Single source of truth for page object instantiation
 * - Simplifies test code by reducing boilerplate
 * - Easier to add/modify page objects centrally
 * - Improves test maintainability and readability
 *
 * Usage:
 * ```
 * const factory = new PageObjectsFactory(page);
 * const loginPage = factory.createLoginPage('saucedemo');
 * const productsPage = factory.createProductsPage();
 * ```
 */
export class PageObjectsFactory {
  private readonly page: Page;

  /**
   * Initialize the factory with a Playwright Page instance
   * @param page Playwright Page instance
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Create and return a LoginPage instance
   * @param appName Application identifier (e.g., 'saucedemo', 'rahulshettyacademy')
   * @param customConfig Optional custom configuration for the app
   * @returns LoginPage instance
   */
  createLoginPage(appName?: string, customConfig?: Record<string, unknown>): LoginPage {
    return new LoginPage(this.page, appName, customConfig);
  }

  /**
   * Create and return a ProductsPage instance
   * @returns ProductsPage instance
   */
  createProductsPage(): ProductsPage {
    return new ProductsPage(this.page);
  }

  /**
   * Create and return a CartPage instance
   * @returns CartPage instance
   */
  createCartPage(): CartPage {
    return new CartPage(this.page);
  }

  /**
   * Create and return a CheckoutPage instance
   * @returns CheckoutPage instance
   */
  createCheckoutPage(): CheckoutPage {
    return new CheckoutPage(this.page);
  }

  /**
   * Create and return a CheckoutOverviewPage instance
   * @returns CheckoutOverviewPage instance
   */
  createCheckoutOverviewPage(): CheckoutOverviewPage {
    return new CheckoutOverviewPage(this.page);
  }

  /**
   * Create and return an OrderConfirmationPage instance
   * @returns OrderConfirmationPage instance
   */
  createOrderConfirmationPage(): OrderConfirmationPage {
    return new OrderConfirmationPage(this.page);
  }

  /**
   * Create all page objects at once (convenience method)
   * Useful for tests that need multiple page objects
   * @returns Object containing all page object instances
   */
  createAllPages() {
    return {
      loginPage: this.createLoginPage(),
      productsPage: this.createProductsPage(),
      cartPage: this.createCartPage(),
      checkoutPage: this.createCheckoutPage(),
      checkoutOverviewPage: this.createCheckoutOverviewPage(),
      orderConfirmationPage: this.createOrderConfirmationPage(),
    };
  }
}

export default PageObjectsFactory;
