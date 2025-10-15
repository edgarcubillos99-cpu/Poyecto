import { ApiProperty } from '@nestjs/swagger';

export class DeleteProductoResponseDto {
  @ApiProperty({ example: true, description: 'Indica si el producto fue eliminado correctamente' })
  success: boolean;

  @ApiProperty({ example: 'Producto eliminado con éxito', description: 'Mensaje de confirmación' })
  message: string;
}
