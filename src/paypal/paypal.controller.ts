import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePaypalOrderDto } from './dto/create-paypal-order.dto';
import { CapturePaypalOrderDto } from './dto/capture-paypal-order.dto';

@ApiTags('Paypal')
@Controller('paypal')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  @Post('create-order')
  @Roles('cliente', 'admin')
  @ApiOperation({ summary: 'Crear una orden de pago en PayPal' })
  @ApiResponse({ status: 201, description: 'Orden de PayPal creada correctamente' })
  async createOrder(@Body() data: CreatePaypalOrderDto) {
    return await this.paypalService.createOrder(data.amount);
  }

  @Post('capture-order')
  @Roles('cliente', 'admin')
  @ApiOperation({ summary: 'Capturar el pago de una orden de PayPal' })
  @ApiResponse({ status: 200, description: 'Pago realizado correctamente' })
  async captureOrder(@Body() data: CapturePaypalOrderDto) {
    return await this.paypalService.captureOrder(data.orderId);
  }
}
