// src/paypal/dto/capture-paypal-order.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CapturePaypalOrderDto {
  @ApiProperty({
    example: '1AB23456CD7890123',
    description: 'Identificador de la orden de PayPal a capturar',
  })
  @IsNotEmpty({ message: 'El ID de la orden es obligatorio' })
  @IsString({ message: 'El ID de la orden debe ser una cadena de texto' })
  orderId: string;
}