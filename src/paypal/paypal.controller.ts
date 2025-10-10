import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('paypal')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  @Post('create-order')
  @Roles('cliente', 'admin') // ambos pueden pagar
  async createOrder(@Body('amount') amount: string) {
    return await this.paypalService.createOrder(amount);
  }

  @Post('capture-order')
  @Roles('cliente', 'admin')
  async captureOrder(@Body('orderId') orderId: string) {
    return await this.paypalService.captureOrder(orderId);
  }
}
