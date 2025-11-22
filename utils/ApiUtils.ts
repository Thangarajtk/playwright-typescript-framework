import type { APIRequestContext } from '@playwright/test';

type Payload = Record<string, unknown>;

/**
 * Lightweight API helper for the sample e-commerce API.
 *
 * Responsibilities:
 * - Obtain an auth token using provided login payload
 * - Create an order and return token + orderId
 */
export class ApiUtils {
    private readonly apiContext: APIRequestContext;
    private readonly loginPayload: Payload;
    private readonly baseUrl: string;

    /**
     * @param apiContext Playwright APIRequestContext (usually `request` fixture)
     * @param loginPayload Body used for login request
     * @param baseUrl Optional base URL for API endpoints (defaults to rahulshettyacademy.com)
     */
    constructor(apiContext: APIRequestContext, loginPayload: Payload, baseUrl = 'https://rahulshettyacademy.com') {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
        this.baseUrl = baseUrl.replace(/\/+$/u, ''); // normalize trailing slash
    }

    /**
     * Fetches an authentication token.
     * @returns token string
     */
    async getToken(): Promise<string> {
        const loginResponse = await this.apiContext.post(`${this.baseUrl}/api/ecom/auth/login`, {
            data: this.loginPayload,
        });
        const loginResponseJson = await loginResponse.json();
        const token = String(loginResponseJson.token ?? '');
        // keep a debug log for visibility in tests
        // eslint-disable-next-line no-console
        console.debug('ApiUtils.getToken:', token);
        if (!token) throw new Error('Auth token not found in login response');
        return token;
    }

    /**
     * Creates an order using the provided payload.
     * Returns the token used and created orderId.
     */
    async createOrder(orderPayload: Payload): Promise<{ token: string; orderId: string }> {
        const token = await this.getToken();

        const orderResponse = await this.apiContext.post(`${this.baseUrl}/api/ecom/order/create-order`, {
            data: orderPayload,
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        });

        const orderResponseJson = await orderResponse.json();
        // eslint-disable-next-line no-console
        console.debug('ApiUtils.createOrder response:', orderResponseJson);

        const orderId = orderResponseJson?.orders?.[0];
        if (!orderId) throw new Error('orderId not found in createOrder response');

        return { token, orderId };
    }
}

export default ApiUtils;
