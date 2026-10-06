import type { APIRequestContext } from '@playwright/test';

type Payload = Record<string, unknown>;
type OrderResponse = {
  token?: string;
  orders?: Array<string | { _id?: string; orderId?: string }>;
};

export class ApiUtils {
  private readonly apiContext: APIRequestContext;
  private readonly loginPayload: Payload;
  private readonly baseUrl: string;

  constructor(apiContext: APIRequestContext, loginPayload: Payload, baseUrl = 'https://rahulshettyacademy.com') {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
    this.baseUrl = baseUrl.replace(/\/+$/u, '');
  }

  async getToken(): Promise<string> {
    const loginResponse = await this.apiContext.post(`${this.baseUrl}/api/ecom/auth/login`, {
      data: this.loginPayload,
    });

    if (!loginResponse.ok()) {
      throw new Error(`Login failed with status ${loginResponse.status()}`);
    }

    const loginResponseJson = (await loginResponse.json()) as OrderResponse;
    const token = typeof loginResponseJson.token === 'string' ? loginResponseJson.token : '';
    if (!token) {
      throw new Error('Auth token not found in login response');
    }

    return token;
  }

  async createOrder(orderPayload: Payload): Promise<{ token: string; orderId: string }> {
    const token = await this.getToken();

    const orderResponse = await this.apiContext.post(`${this.baseUrl}/api/ecom/order/create-order`, {
      data: orderPayload,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });

    if (!orderResponse.ok()) {
      throw new Error(`Order creation failed with status ${orderResponse.status()}`);
    }

    const orderResponseJson = (await orderResponse.json()) as OrderResponse;
    const orderId = this.extractOrderId(orderResponseJson);

    if (!orderId) {
      throw new Error('orderId not found in createOrder response');
    }

    return { token, orderId };
  }

  private extractOrderId(response: OrderResponse): string {
    const firstOrder = response.orders?.[0];
    if (typeof firstOrder === 'string') {
      return firstOrder;
    }

    if (typeof firstOrder === 'object' && firstOrder !== null) {
      if (typeof firstOrder.orderId === 'string') {
        return firstOrder.orderId;
      }

      if (typeof firstOrder._id === 'string') {
        return firstOrder._id;
      }
    }

    return '';
  }
}

export default ApiUtils;
