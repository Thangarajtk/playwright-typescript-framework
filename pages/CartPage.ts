import type { Page, Locator } from '@playwright/test';

/**
 * Represents the shopping cart page.
 * Handles cart review, item management, and checkout initiation.
 */
export class CartPage {
  readonly page: Page;
  private readonly cartListLocator: Locator;
  private readonly checkoutButtonLocator: Locator;
  private readonly continueShoppingButtonLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartListLocator = page.locator('.cart_list');
    this.checkoutButtonLocator = page.locator('[data-test="checkout"]');
    this.continueShoppingButtonLocator = page.locator('[data-test="continue-shopping"]');
  }

  /**
   * Verify cart is visible
   */
  async isCartVisible(): Promise<boolean> {
    return this.cartListLocator.isVisible();
  }

  /**
   * Get all items in the cart
   */
  getCartItems(): Locator {
    return this.page.locator('.cart_item');
  }

  /**
   * Get the count of items in the cart
   */
  async getItemCount(): Promise<number> {
    const items = await this.getCartItems().count();
    return items;
  }

  /**
   * Get item by product name
   */
  getItemByName(productName: string): Locator {
    return this.page.locator(`.cart_item_label:has-text("${productName}")`);
  }

  /**
   * Remove an item from cart by product name
   */
  async removeItem(productName: string): Promise<void> {
    const item = this.getItemByName(productName);
    await item.locator('button:has-text("Remove")').click();
  }

  /**
   * Get item quantity
   */
  async getItemQuantity(productName: string): Promise<string> {
    const item = this.getItemByName(productName);
    const quantity = await item.locator('.cart_quantity').textContent();
    return quantity || '';
  }

  /**
   * Get item price by product name
   */
  async getItemPrice(productName: string): Promise<string> {
    const item = this.getItemByName(productName);
    const price = await item.locator('.inventory_item_price').textContent();
    return price || '';
  }

  /**
   * Get the subtotal amount
   */
  async getSubtotal(): Promise<string> {
    const subtotal = await this.page.locator('.summary_subtotal_label').textContent();
    return subtotal || '';
  }

  /**
   * Get the tax amount
   */
  async getTax(): Promise<string> {
    const tax = await this.page.locator('.summary_tax_label').textContent();
    return tax || '';
  }

  /**
   * Get the total amount
   */
  async getTotal(): Promise<string> {
    const total = await this.page.locator('.summary_total_label').textContent();
    return total || '';
  }

  /**
   * Proceed to checkout
   */
  async proceedToCheckout(): Promise<void> {
    await this.checkoutButtonLocator.click();
  }

  /**
   * Continue shopping (return to products)
   */
  async continueShopping(): Promise<void> {
    await this.continueShoppingButtonLocator.click();
  }
}

export default CartPage;
