import type { Page, BrowserContext, Locator } from '@playwright/test';

/**
 * Application-specific login configuration
 */
interface AppConfig {
  baseUrl: string;
  emailFieldLocator: string | ((page: Page) => Locator);
  passwordFieldLocator: string | ((page: Page) => Locator);
  submitButtonLocator: string | ((page: Page) => Locator);
}

/**
 * Predefined application configurations
 */
const APP_CONFIGS: Record<string, AppConfig> = {
  rahulshettyacademy: {
    baseUrl: 'https://rahulshettyacademy.com/client',
    emailFieldLocator: (page) => page.locator('input[id="userEmail"]'),
    passwordFieldLocator: (page) => page.locator('input[id="userPassword"]'),
    submitButtonLocator: (page) => page.locator('input[id="login"]'),
  },
  saucedemo: {
    baseUrl: 'https://www.saucedemo.com/',
    emailFieldLocator: (page) => page.locator('input[id="user-name"]'),
    passwordFieldLocator: (page) => page.locator('input[id="password"]'),
    submitButtonLocator: (page) => page.locator('input[id="login-button"]'),
  }
};

/**
 * User-centric LoginPage helper with support for multiple applications
 *
 * Responsibilities:
 * - Navigate to login page
 * - Fill email and password using user-centric locators
 * - Submit form and wait for page load
 * - Save session state for session reuse
 */
export class LoginPage {
  readonly page: Page;
  readonly config: AppConfig;

  /**
   * @param page Playwright Page instance
   * @param appName Application identifier (e.g., 'rahulshettyacademy'). Defaults to 'rahulshettyacademy'.
   * @param customConfig Optional custom config to override app-specific defaults
   */
  constructor(page: Page, appName = 'rahulshettyacademy', customConfig?: Partial<AppConfig>) {
    this.page = page;
    const baseConfig = APP_CONFIGS[appName];
    if (!baseConfig) {
      throw new Error(`Application "${appName}" not configured. Available apps: ${Object.keys(APP_CONFIGS).join(', ')}`);
    }
    this.config = { ...baseConfig, ...customConfig };
  }

  /**
   * Navigate to the login page
   */
  async goto(): Promise<void> {
    await this.page.goto(this.config.baseUrl);
  }

  /**
   * Get the email field locator (user-centric)
   */
  private getEmailField(): Locator {
    const locator = this.config.emailFieldLocator;
    return typeof locator === 'function' ? locator(this.page) : this.page.locator(locator);
  }

  /**
   * Get the password field locator (user-centric)
   */
  private getPasswordField(): Locator {
    const locator = this.config.passwordFieldLocator;
    return typeof locator === 'function' ? locator(this.page) : this.page.locator(locator);
  }

  /**
   * Get the submit button locator (user-centric)
   */
  private getSubmitButton(): Locator {
    const locator = this.config.submitButtonLocator;
    return typeof locator === 'function' ? locator(this.page) : this.page.locator(locator);
  }

  /**
   * Fill email field
   */
  async fillEmail(email: string): Promise<void> {
    await this.getEmailField().fill(email);
  }

  /**
   * Fill password field
   */
  async fillPassword(password: string): Promise<void> {
    await this.getPasswordField().fill(password);
  }

  /**
   * Click the submit button
   */
  async clickSubmit(): Promise<void> {
    await this.getSubmitButton().click();
  }

  /**
   * Perform login using provided credentials and wait for network idle
   * @param email User email/username
   * @param password User password
   * @param waitCondition Optional selector to wait for after login (indicates successful navigation)
   */
  async login(email: string, password: string, waitCondition?: string): Promise<void> {
    await this.goto();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSubmit();

    // Wait for page load
    await this.page.waitForLoadState('networkidle');

    // If a wait condition is provided, wait for it
    if (waitCondition) {
      await this.page.locator(waitCondition).waitFor({ state: 'visible' });
    }
  }

  /**
   * Convenience helper: login then save storage state to a file
   * @param context BrowserContext to use
   * @param email User email/username
   * @param password User password
   * @param path File path to save session state (default: 'sessionstate.json')
   * @param appName Application identifier (default: 'rahulshettyacademy')
   */
  static async loginAndSaveState(
    context: BrowserContext,
    email: string,
    password: string,
    path = 'sessionstate.json',
    appName = 'rahulshettyacademy',
  ): Promise<void> {
    const page = await context.newPage();
    const loginPage = new LoginPage(page, appName);
    await loginPage.login(email, password);
    await context.storageState({ path });
    await page.close();
  }

  /**
   * Verify user is logged in by checking for a visible element (e.g., dashboard indicator)
   */
  async isLoggedIn(selector: string): Promise<boolean> {
    try {
      await this.page.locator(selector).waitFor({ state: 'visible', timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Perform logout (application-specific; override or extend as needed)
   */
  async logout(): Promise<void> {
    // This is a placeholder — customize based on your app
    await this.page.locator('button:has-text("Logout"), a:has-text("Sign Out")').first().click();
    await this.page.waitForLoadState('networkidle');
  }
}

export default LoginPage;
