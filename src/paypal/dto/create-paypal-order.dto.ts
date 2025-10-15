// src/paypal/dto/create-paypal-order.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreatePaypalOrderDto {
  @ApiProperty({
    example: '49.99',
    description: 'Monto total a pagar en USD',
  })
  @IsNotEmpty({ message: 'El monto es obligatorio' })
  @IsString({ message: 'El monto debe ser una cadena' })
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'El monto debe tener formato numérico con hasta dos decimales',
  })
  amount: string;
}