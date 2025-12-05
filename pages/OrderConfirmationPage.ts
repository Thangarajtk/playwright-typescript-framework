import type { Page, Locator } from '@playwright/test';

/**
 * Order confirmation/success page.
 * Displays successful order completion message and order details.
 */
export class OrderConfirmationPage {
  readonly page: Page;
  private readonly completeHeaderLocator: Locator;
  private readonly completeTextLocator: Locator;
  private readonly backHomeButtonLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeaderLocator = page.locator('.complete-header');
    this.completeTextLocator = page.locator('.complete-text');
    this.backHomeButtonLocator = page.locator('[data-test="back-to-products"]');
  }

  /**
   * Get the completion header message
   */
  async getCompletionMessage(): Promise<string> {
    return (await this.completeHeaderLocator.textContent()) || '';
  }

  /**
   * Get the completion text/description
   */
  async getCompletionText(): Promise<string> {
    return (await this.completeTextLocator.textContent()) || '';
  }

  /**
   * Verify order was completed successfully
   */
  async isOrderCompleted(): Promise<boolean> {
    return this.completeHeaderLocator.isVisible();
  }

  /**
   * Check if the success message contains specific text
   */
  async hasSuccessMessage(text: string): Promise<boolean> {
    const message = await this.getCompletionMessage();
    return message.includes(text);
  }

  /**
   * Get the order/packing information if available
   */
  async getOrderDetails(): Promise<string> {
    const details = await this.page.locator('.complete-text').textContent();
    return details || '';
  }

  /**
   * Get the packing list information
   */
  async getPackingSlip(): Promise<string> {
    const slip = await this.page.locator('.packing_slip').textContent();
    return slip || '';
  }

  /**
   * Return to products page
   */
  async backToHome(): Promise<void> {
    await this.backHomeButtonLocator.click();
  }

  /**
   * Check if confirmation page is displayed
   */
  async isConfirmationPageDisplayed(): Promise<boolean> {
    const headerVisible = await this.completeHeaderLocator.isVisible();
    const textVisible = await this.completeTextLocator.isVisible();
    return headerVisible && textVisible;
  }
}

export default OrderConfirmationPage;
