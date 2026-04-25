# Playwright TypeScript Framework

A comprehensive, production-ready test automation framework built with Playwright and TypeScript for end-to-end testing of web applications.

## 📋 Overview

This framework provides a robust foundation for automated browser testing with:
- **Multiple Browser Support**: Chrome, Firefox, Safari
- **Page Object Model Architecture**: Clean, maintainable test code
- **Comprehensive Reporting**: HTML and Allure reports
- **Parallel Execution**: Efficient test run management
- **Multiple Test Sites**: Organized tests for different applications
- **Advanced Features**: API testing, network interception, visual regression, session management

## ✨ Key Features

### 🎯 Test Execution
- **Cross-browser Testing**: Automatic testing on Chromium, Firefox, and WebKit
- **Parallel Execution**: Run tests simultaneously for faster results
- **Multiple Run Modes**: Headed, headless, UI mode, and debug mode
- **Tagged Tests**: Run specific test suites using tags (e.g., `@web`, `@mobile`)
- **Trace Recording**: Automatic trace capture on test failures for debugging

### 📊 Reporting
- **HTML Reports**: Built-in detailed test reports with screenshots and videos
- **Allure Reports**: Professional test reports with analytics
- **Screenshots & Videos**: Visual evidence of test execution
- **Trace Viewer**: Deep dive into test execution timeline

### 🏗️ Architecture
- **Page Object Model (POM)**: Encapsulated page interactions for better maintainability
- **Custom Fixtures**: Reusable test utilities (API client, page objects, test data)
- **Modular Design**: Easy to extend and customize

### 🧪 Testing Capabilities
- **API Testing**: Make HTTP requests with the built-in API utilities
- **Network Interception**: Mock, intercept, and modify network requests
- **Visual Regression**: Screenshot comparison testing
- **Session Management**: Store and reuse authentication sessions
- **Mobile Testing**: Support for mobile device viewports (configurable)

### 📁 Test Organization
Tests are organized by tested website/application:
- **SauceDemo**: E-commerce application tests
- **Rahul Shetty Academy**: QA practice platform tests
- **Playwright.dev**: Official Playwright website tests
- **TodoMVC**: Todo application tests

## 🚀 Pre-requisites

[![NodeJs](https://img.shields.io/badge/-NodeJS%20v16%20OR%20later-%23339933?logo=npm)](https://nodejs.org/en/download/)
[![Java](https://img.shields.io/badge/-JDK%2011%20OR%20later-%23007396?logo=java&logoColor=black&)](https://www.oracle.com/java/technologies/downloads/)
[![VSCode](https://img.shields.io/badge/-Visual%20Studio%20Code-%233178C6?logo=visual-studio-code)](https://code.visualstudio.com/download)

- **Node.js 16+** - JavaScript runtime
- **Java 11+** - Required for Allure report generation
- **Visual Studio Code** - Recommended IDE
- **npm** - Node package manager

## 📦 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd playwright-typescript-framework
```

### 2. Install dependencies
```bash
npm install
```

This will install:
- `@playwright/test` - Playwright testing framework
- `allure-playwright` - Allure report integration
- `exceljs` - Excel file handling (if needed)
- All other dev dependencies

## ▶️ Getting Started

### 1. Run All Tests
```bash
npm test
```

### 2. Run Tests in Headed Mode (visible browser)
```bash
npm run test-headed
```

### 3. Run Tests in UI Mode (interactive mode)
```bash
npm run test-ui
```

### 4. Debug a Test
```bash
npm run debugtest
```

### 5. Run Tests by Browser
```bash
npm test tests/saucedemo/placeorder.spec.ts
npm run testOnWebkit
```

## 🏷️ Test Execution with Tags

Run tests marked with specific tags:
```bash
npm run test-web-tags              # Run @web tagged tests
npm run testWithAllureReport       # Run @web tests with Allure reporting
```

## 📊 Generate Test Reports

### HTML Report
Automatically generated after test run. View the latest:
```bash
npm run show-report
```

### Allure Report
Generate and view a comprehensive Allure report:
```bash
npm run generatereport
```

Or manually:
```bash
npm run allure:generate
npm run allure:open
```

## 📁 Project Structure

```
playwright-typescript-framework/
├── tests/                          # All test files
│   ├── saucedemo/                 # SauceDemo e-commerce tests
│   ├── rahulshettyacademy/        # Rahul Shetty Academy tests
│   ├── playwrightdev/             # Playwright website tests
│   ├── todomvc/                   # TodoMVC app tests
│   ├── sanity/                    # Legacy sanity tests
│   ├── fixtures.ts                # Custom Playwright fixtures
│   └── README.md                  # Test directory documentation
├── pages/                         # Page Object Model classes
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── OrderConfirmationPage.ts
│   ├── PageObjectsFactory.ts      # Factory pattern for POM
│   └── README.md
├── utils/                         # Utility classes
│   └── ApiUtils.ts                # API testing utilities
├── test-data/                     # Test data files
│   └── login-data.json
├── configs/                       # Configuration files
│   └── deviceContexts.ts          # Device configurations
├── playwright.config.ts           # Main test configuration
├── playwright.mobile.config.ts    # Mobile test configuration
├── package.json                   # Project dependencies
└── README.md                      # This file
```

## 🎯 Framework Features in Detail

### Page Object Model (POM)
Encapsulates page elements and actions in dedicated classes:
```typescript
// Example usage in tests
const { loginPage, productsPage } = pageObjects;
await loginPage.login(username, password);
await expect(productsPage.productList).toBeVisible();
```

### Custom Fixtures
Reusable test utilities injected into tests:
```typescript
test('example', async ({ page, pageObjects, apiUtils, testData }) => {
  // page: Playwright page instance
  // pageObjects: Factory-created POM instances
  // apiUtils: API testing utilities
  // testData: Loaded test data
});
```

### API Testing
Make HTTP requests using the built-in API utilities:
```typescript
const response = await apiUtils.createOrder(orderPayload);
const orders = await apiUtils.getOrders(token);
```

### Network Interception
Intercept and mock network requests:
```typescript
await page.route('**/api/endpoint', async route => {
  await route.fulfill({ body: mockedData });
});
```

### Trace Recording
Automatically captures on first failure:
```bash
npm run testWithTraceViewer
```

## 🧠 Best Practices

1. **Page Object Model**: Keep page interactions in dedicated classes
2. **Test Data**: Store test data in JSON files, not hard-coded
3. **Fixtures**: Use custom fixtures for reusable test setup
4. **Tags**: Organize tests with tags (e.g., `@web`, `@api`, `@regression`)
5. **Assertions**: Use explicit waits and assertions
6. **DRY Principle**: Avoid code duplication; extract common patterns
7. **Error Handling**: Add proper error messages in assertions
8. **Parallel Safety**: Ensure tests don't have side effects

## 🔧 Advanced Configuration

### Mobile Testing
Run tests on mobile viewports:
```bash
npm run test-mobile
```

Edit `playwright.mobile.config.ts` to configure devices and viewports.

### CI/CD Integration
The framework supports CI/CD with:
- Automatic retry on CI (2 retries)
- Trace recording on failures
- Parallel worker optimization
- Report generation

### Custom Configuration
Edit `playwright.config.ts` to:
- Change base URL
- Add/remove browser types
- Modify timeout values
- Configure reporters
- Set up custom hooks

## 📝 Writing Tests

### Basic Test Structure
```typescript
import { test, expect } from './fixtures';

test('should complete workflow', async ({ page, pageObjects }) => {
  const { loginPage, productsPage } = pageObjects;
  
  // Arrange
  await page.goto('https://example.com');
  
  // Act
  await loginPage.login('user', 'password');
  
  // Assert
  await expect(productsPage.productList).toBeVisible();
});
```

### With Tags
```typescript
test('@web @regression should place order', async ({ page, pageObjects }) => {
  // Test implementation
});
```

## 🐛 Troubleshooting

### Tests Timeout
- Increase timeout in `playwright.config.ts`
- Use explicit waits with `page.waitForSelector()`

### Flaky Tests
- Add proper waits before assertions
- Use `waitFor()` for dynamic elements
- Avoid hard-coded delays

### Port Already in Use
- Change the port in configuration or kill the process

### Trace Viewer Not Working
- Ensure Java is installed (required for Allure)
- Check trace recording is enabled

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-page)
- [Allure Documentation](https://docs.qameta.io/allure/)

## 👨‍💻 Author

Created and maintained by the QA automation team.

## 📄 License

ISC