import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class CreateProductoDto {
  @ApiProperty({
    example: 'Rines BYD',
    description: 'Nombre del producto',
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    example: 'Rines de lujo color negro',
    description: 'Descripción detallada del producto',
  })
  @IsString()
  descripcion: string;

  @ApiProperty({
    example: 3200000,
    description: 'Precio del producto en pesos colombianos',
  })
  @IsNumber()
  @IsPositive()
  precio: number;

  @ApiProperty({
    example: 25,
    description: 'Cantidad disponible en inventario',
  })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({
    example: 'Accesorios',
    description: 'Categoría o tipo del producto',
    required: false,
  })
  @IsOptional()
  @IsString()
  categoria?: string;
}
