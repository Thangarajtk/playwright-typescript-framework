import type { Page, Locator } from '@playwright/test';

/**
 * Checkout information and billing details page.
 * Handles collection of customer information and order review.
 */
export class CheckoutPage {
  readonly page: Page;
  private readonly firstNameFieldLocator: Locator;
  private readonly lastNameFieldLocator: Locator;
  private readonly postalCodeFieldLocator: Locator;
  private readonly continueButtonLocator: Locator;
  private readonly cancelButtonLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameFieldLocator = page.locator('input[data-test="firstName"]');
    this.lastNameFieldLocator = page.locator('input[data-test="lastName"]');
    this.postalCodeFieldLocator = page.locator('input[data-test="postalCode"]');
    this.continueButtonLocator = page.locator('input[data-test="continue"]');
    this.cancelButtonLocator = page.locator('[data-test="cancel"]');
  }

  /**
   * Fill in first name
   */
  async fillFirstName(firstName: string): Promise<void> {
    await this.firstNameFieldLocator.fill(firstName);
  }

  /**
   * Fill in last name
   */
  async fillLastName(lastName: string): Promise<void> {
    await this.lastNameFieldLocator.fill(lastName);
  }

  /**
   * Fill in postal code
   */
  async fillPostalCode(postalCode: string): Promise<void> {
    await this.postalCodeFieldLocator.fill(postalCode);
  }

  /**
   * Fill all checkout information at once
   */
  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillPostalCode(postalCode);
  }

  /**
   * Get the value of first name field
   */
  async getFirstName(): Promise<string> {
    return (await this.firstNameFieldLocator.inputValue()) || '';
  }

  /**
   * Get the value of last name field
   */
  async getLastName(): Promise<string> {
    return (await this.lastNameFieldLocator.inputValue()) || '';
  }

  /**
   * Get the value of postal code field
   */
  async getPostalCode(): Promise<string> {
    return (await this.postalCodeFieldLocator.inputValue()) || '';
  }

  /**
   * Get payment information section (if present)
   */
  async getPaymentInfo(): Promise<string> {
    const paymentInfo = await this.page.locator('.summary_info_label').textContent();
    return paymentInfo || '';
  }

  /**
   * Get shipping information section
   */
  async getShippingInfo(): Promise<string> {
    const shippingInfo = await this.page.locator('.summary_shipping_label').textContent();
    return shippingInfo || '';
  }

  /**
   * Continue to next step
   */
  async continue(): Promise<void> {
    await this.continueButtonLocator.click();
  }

  /**
   * Cancel checkout and return to cart
   */
  async cancel(): Promise<void> {
    await this.cancelButtonLocator.click();
  }

  /**
   * Check if checkout form is visible
   */
  async isCheckoutFormVisible(): Promise<boolean> {
    return this.firstNameFieldLocator.isVisible();
  }

  /**
   * Verify all fields are visible
   */
  async areAllFieldsVisible(): Promise<boolean> {
    const firstNameVisible = await this.firstNameFieldLocator.isVisible();
    const lastNameVisible = await this.lastNameFieldLocator.isVisible();
    const postalCodeVisible = await this.postalCodeFieldLocator.isVisible();
    return firstNameVisible && lastNameVisible && postalCodeVisible;
  }

  /**
   * Get error message if validation fails
   */
  async getErrorMessage(): Promise<string> {
    const error = await this.page.locator('[data-test="error"]').textContent();
    return error || '';
  }
}

export default CheckoutPage;
