import { ApiProperty } from '@nestjs/swagger';

export class ProductoResponseDto {
  @ApiProperty({ example: 1, description: 'ID único del producto' })
  id: number;

  @ApiProperty({ example: 'Rines BYD', description: 'Nombre del producto' })
  nombre: string;

  @ApiProperty({
    example: 'Rines de lujo',
    description: 'Descripción del producto',
  })
  descripcion: string;

  @ApiProperty({ example: 3200000, description: 'Precio del producto en pesos colombianos' })
  precio: number;

  @ApiProperty({ example: 25, description: 'Cantidad disponible en inventario' })
  stock: number;

  @ApiProperty({ example: 'Accesorios', description: 'Categoría del producto' })
  categoria: string;

  @ApiProperty({ example: '2025-10-14T18:00:00.000Z', description: 'Fecha de creación del producto' })
  createdAt: Date;

  @ApiProperty({ example: '2025-10-14T18:05:00.000Z', description: 'Última fecha de actualización' })
  updatedAt: Date;
}
