import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('productos')
@Controller('productos')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  //Cualquiera autenticado puede ver los productos
  @Get()
  @ApiOperation({ summary: 'Listar todos los productos' })
  @ApiResponse({ status: 200, description: 'Lista de productos obtenida correctamente' })
  findAll() {
    return this.productosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto encontrado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  findOne(@Param('id') id: number) {
    return this.productosService.findOne(id);
  }

  // 🛠️ Solo el ADMIN puede crear, editar o eliminar
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado correctamente' })
  @Roles('admin')
  create(@Body() data) {
    return this.productosService.create(data);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizar un producto existente' })
  update(@Param('id') id: number, @Body() data) {
    return this.productosService.update(id, data);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Eliminar un producto' })
  remove(@Param('id') id: number) {
    return this.productosService.remove(id);
  }
}
