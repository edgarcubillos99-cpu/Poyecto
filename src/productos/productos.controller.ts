import { Controller, Get, Post, Body, Param, Delete, Patch,  UseGuards, } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ProductoResponseDto } from './dto/producto-response.dto';
import { DeleteProductoResponseDto } from './dto/delete-producto-response.dto';

@ApiBearerAuth('access-token')
@ApiTags('productos')
@Controller('productos')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  //Cualquiera autenticado puede ver los productos
  @Get()
  @ApiOperation({ summary: 'Listar todos los productos' })
  @ApiResponse({ status: 200, type: [ProductoResponseDto], description: 'Lista de productos obtenida correctamente' })
  findAll() {
    return this.productosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiResponse({ status: 200, type: ProductoResponseDto, description: 'Producto encontrado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  findOne(@Param('id') id: number) {
    return this.productosService.findOne(id);
  }

  // 🛠️ Solo el ADMIN puede crear, editar o eliminar
  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado correctamente' })
  create(@Body() data: CreateProductoDto) {
    return this.productosService.create(data);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizar un producto existente' })
  update(@Param('id') id: number, @Body() data: UpdateProductoDto) {
    return this.productosService.update(id, data);
  }
  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiResponse({ status: 200, type: DeleteProductoResponseDto, description: 'Producto eliminado correctamente' })
  remove(@Param('id') id: number) {
    return this.productosService.remove(id);
  }
}
