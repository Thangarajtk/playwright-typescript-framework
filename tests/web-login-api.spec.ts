import { test, expect } from '@playwright/test';
import { ApiUtils } from '../utils/ApiUtils';

const loginPayload = { userEmail: 'anshika@gmail.com', userPassword: 'Iamking@000' };
const orderPayload = { orders: [{ country: 'Cuba', productOrderedId: '68a961459320a140fe1ca57a' }] };

let response: { token: string; orderId: string } | undefined;

test.beforeAll(async ({ request }) => {
    // Use Playwright's `request` fixture (APIRequestContext)
    const apiUtils = new ApiUtils(request, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

test('Place the order', async ({ page }) => {
    expect(response).toBeDefined();
    const { token, orderId } = response!;

    // Inject token into localStorage before navigation
    await page.addInitScript((value) => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator('tbody').waitFor();
    const rows = page.locator('tbody tr');

    for (let i = 0; i < (await rows.count()); ++i) {
        const rowOrderId = (await rows.nth(i).locator('th').textContent()) || '';
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }

    const orderIdDetails = (await page.locator('.col-text').textContent()) || '';
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});