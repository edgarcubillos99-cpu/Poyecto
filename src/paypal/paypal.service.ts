import { Injectable } from '@nestjs/common';
import * as paypal from '@paypal/checkout-server-sdk';

@Injectable()
export class PaypalService {
  private client: paypal.core.PayPalHttpClient;

  constructor() {
    const environment = new paypal.core.SandboxEnvironment(
      'AVYK7NxEE7uDA93WULGbVxG5DV9Pfmmi_B7-LBynrQLxJpNrB8Vf8K6vbIvib9YZUmN3MFpyq23KCjLG',
      'EEhq5o1onA9w1E27T_2z0perf5ivxpnk6tO2KtM__ABtjx3eFLN9LupMILodVZB5KHEHIi8aEdzyglrk',
    );
    this.client = new paypal.core.PayPalHttpClient(environment);
  }

  async createOrder(amount: string) {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: amount,
          },
        },
      ],
    });

    const response = await this.client.execute(request);
    return response.result;
  }

  async captureOrder(orderId: string) {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    const response = await this.client.execute(request);
    return response.result;
  }
}

