import type { Page, Locator } from '@playwright/test';

/**
 * Checkout overview/confirmation page.
 * Displays order summary and allows completion of purchase.
 */
export class CheckoutOverviewPage {
  readonly page: Page;
  private readonly finishButtonLocator: Locator;
  private readonly cancelButtonLocator: Locator;
  private readonly cartItemsLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.finishButtonLocator = page.locator('[data-test="finish"]');
    this.cancelButtonLocator = page.locator('[data-test="cancel"]');
    this.cartItemsLocator = page.locator('.cart_item');
  }

  /**
   * Get all items in the order overview
   */
  getOrderItems(): Locator {
    return this.cartItemsLocator;
  }

  /**
   * Get item count in order overview
   */
  async getItemCount(): Promise<number> {
    return await this.getOrderItems().count();
  }

  /**
   * Get item by name from order overview
   */
  getItemByName(productName: string): Locator {
    return this.page.locator(`.cart_item_label:has-text("${productName}")`);
  }

  /**
   * Get item quantity from overview
   */
  async getItemQuantity(productName: string): Promise<string> {
    const item = this.getItemByName(productName);
    const quantity = await item.locator('.cart_quantity').textContent();
    return quantity || '';
  }

  /**
   * Get item price from overview
   */
  async getItemPrice(productName: string): Promise<string> {
    const item = this.getItemByName(productName);
    const price = await item.locator('.inventory_item_price').textContent();
    return price || '';
  }

  /**
   * Get the subtotal
   */
  async getSubtotal(): Promise<string> {
    const subtotal = await this.page.locator('.summary_subtotal_label').textContent();
    return subtotal || '';
  }

  /**
   * Get the tax
   */
  async getTax(): Promise<string> {
    const tax = await this.page.locator('.summary_tax_label').textContent();
    return tax || '';
  }

  /**
   * Get the total
   */
  async getTotal(): Promise<string> {
    const total = await this.page.locator('.summary_total_label').textContent();
    return total || '';
  }

  /**
   * Get payment information
   */
  async getPaymentInfo(): Promise<string> {
    const info = await this.page.locator('.summary_info_label').textContent();
    return info || '';
  }

  /**
   * Get shipping information
   */
  async getShippingInfo(): Promise<string> {
    const info = await this.page.locator('.summary_shipping_label').textContent();
    return info || '';
  }

  /**
   * Complete the order
   */
  async finishOrder(): Promise<void> {
    await this.finishButtonLocator.click();
  }

  /**
   * Cancel order and return to products
   */
  async cancel(): Promise<void> {
    await this.cancelButtonLocator.click();
  }

  /**
   * Check if overview page is displayed
   */
  async isOverviewDisplayed(): Promise<boolean> {
    return this.finishButtonLocator.isVisible();
  }
}

export default CheckoutOverviewPage;
