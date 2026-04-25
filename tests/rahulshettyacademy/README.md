# Rahul Shetty Academy Tests

Tests for Rahul Shetty Academy (https://rahulshettyacademy.com/) - a QA automation practice platform.

## Test Files

- **demosite.spec.ts** - Navigation and content verification on the AutomationPractice page
- **networkinterceptor.spec.ts** - API request interception and network handling
- **networkinterceptor-security.spec.ts** - Security testing with request interception
- **web-login-api.spec.ts** - Login with API token injection via localStorage
- **web-login-sessionstate.spec.ts** - Login using stored session state

## What's tested

- Page navigation and element visibility
- API network request interception
- Security - unauthorized access attempts
- Authentication with API tokens
- Session state management
- Order management workflows

## Running tests

```bash
npm test -- tests/rahulshettyacademy
```
