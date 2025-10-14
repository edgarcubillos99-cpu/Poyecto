import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Paypal')
@Controller('paypal')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  @Post('create-order')
  @Roles('cliente', 'admin') // ambos pueden pagar
  @ApiOperation({ summary: 'Crear una orden de pago en PayPal' })
  @ApiResponse({ status: 201, description: 'Orden de PayPal creada correctamente' })
  async createOrder(@Body('amount') amount: string) {
    return await this.paypalService.createOrder(amount);
  }

  @Post('capture-order')
  @Roles('cliente', 'admin')
  @ApiOperation({ summary: 'Capturar el pago de una orden de PayPal' })
  @ApiResponse({ status: 200, description: 'Pago realizado correctamente' })
  async captureOrder(@Body('orderId') orderId: string) {
    return await this.paypalService.captureOrder(orderId);
  }
}
