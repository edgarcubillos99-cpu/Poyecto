import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class FindProductoParamsDto {
  @ApiPropertyOptional({ example: 'Electrónica', description: 'Filtrar por categoría' })
  @IsOptional()
  @IsString()
  categoria?: string;

  @ApiPropertyOptional({ example: 100000, description: 'Filtrar por precio mínimo' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrecio?: number;

  @ApiPropertyOptional({ example: 2000000, description: 'Filtrar por precio máximo' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPrecio?: number;
}
