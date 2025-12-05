import type { Page, Locator } from '@playwright/test';

/**
 * Represents the products/inventory listing page.
 * Handles product browsing, filtering, and adding items to cart.
 */
export class ProductsPage {
  readonly page: Page;
  private readonly inventoryListLocator: Locator;
  private readonly cartLinkLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryListLocator = page.locator('.inventory_list');
    this.cartLinkLocator = page.locator('.shopping_cart_link');
  }

  /**
   * Get all product items currently visible on the page
   */
  getProductItems(): Locator {
    return this.page.locator('.inventory_item');
  }

  /**
   * Get a specific product by name
   */
  getProductByName(productName: string): Locator {
    return this.page.locator('.inventory_item_description').filter({ hasText: productName });
  }

  /**
   * Add a product to cart by product name
   */
  async addProductToCart(productName: string): Promise<void> {
    const product = this.getProductByName(productName);
    await product.getByRole('button', { name: /add to cart/i }).click();
  }

  /**
   * Remove a product from cart by product name
   */
  async removeProductFromCart(productName: string): Promise<void> {
    const product = this.getProductByName(productName);
    await product.getByRole('button', { name: /remove/i }).click();
  }

  /**
   * Get the count of items in the cart badge
   */
  async getCartItemCount(): Promise<number> {
    const badge = this.page.locator('.shopping_cart_badge');
    const count = await badge.textContent();
    return count ? parseInt(count, 10) : 0;
  }

  /**
   * Navigate to the shopping cart
   */
  async goToCart(): Promise<void> {
    await this.cartLinkLocator.click();
  }

  /**
   * Verify inventory list is visible
   */
  async isInventoryListVisible(): Promise<boolean> {
    return this.inventoryListLocator.isVisible();
  }

  /**
   * Get product price by name
   */
  async getProductPrice(productName: string): Promise<string> {
    const product = this.getProductByName(productName);
    const price = await product.locator('.inventory_item_price').textContent();
    return price || '';
  }

  /**
   * Sort products by option (e.g., 'Price (low to high)', 'Name (Z to A)')
   */
  async sortProductsBy(sortOption: string): Promise<void> {
    const sortDropdown = this.page.locator('[data-test="product_sort_container"]');
    await sortDropdown.selectOption(sortOption);
  }
}

export default ProductsPage;
