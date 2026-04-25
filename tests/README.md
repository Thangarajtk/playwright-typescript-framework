# Playwright TypeScript Framework - Tests

This directory contains automated tests organized by website/application being tested.

## Test Organization

Tests are grouped into separate directories based on the automated websites:

### 1. **saucedemo/** - SauceDemo e-commerce application
   - Tests for login, product browsing, cart, and checkout workflows
   - Includes visual regression testing
   - See [saucedemo/README.md](./saucedemo/README.md)

### 2. **rahulshettyacademy/** - Rahul Shetty Academy QA Practice Platform
   - Tests for navigation, API interception, and security testing
   - Tests for authentication with APIs and session management
   - See [rahulshettyacademy/README.md](./rahulshettyacademy/README.md)

### 3. **playwrightdev/** - Playwright Documentation Website
   - Basic tests for website navigation and functionality
   - See [playwrightdev/README.md](./playwrightdev/README.md)

### 4. **todomvc/** - Playwright TodoMVC Demo Application
   - Comprehensive tests for todo list CRUD operations
   - Tests for filtering and batch operations
   - See [todomvc/README.md](./todomvc/README.md)

### Root Level Files

- **fixtures.ts** - Custom Playwright fixtures shared across all tests
- **example.spec.ts** - (Legacy) Example tests (moved to playwrightdev/)

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests for a specific website group
```bash
npm test -- tests/saucedemo
npm test -- tests/rahulshettyacademy
npm test -- tests/playwrightdev
npm test -- tests/todomvc
```

### Run a specific test file
```bash
npm test -- tests/saucedemo/placeorder.spec.ts
```

### Run tests in headed mode
```bash
npm test -- --headed
```

## Structure Benefits

- **Clear Organization**: Tests are grouped by the application they test
- **Easy Navigation**: Developers can quickly find tests for a specific website
- **Scalability**: New websites/applications can be easily added as new folders
- **Maintainability**: Each folder can have its own README and configuration
- **CI/CD Integration**: Easier to run specific test suites in pipeline

## Test Data & Configuration

- **fixtures.ts** - Defines custom fixtures for page objects, API utilities, and test data
- **../test-data/** - Contains JSON files with test data (e.g., login credentials)
- **../pages/** - Page Object Model implementations used across tests
- **../utils/** - Utility classes for API testing and other helpers
