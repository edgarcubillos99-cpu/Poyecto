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

@Controller('productos')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  //Cualquiera autenticado puede ver los productos
  @Get()
  findAll() {
    return this.productosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productosService.findOne(id);
  }

  // 🛠️ Solo el ADMIN puede crear, editar o eliminar
  @Post()
  @Roles('admin')
  create(@Body() data) {
    return this.productosService.create(data);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: number, @Body() data) {
    return this.productosService.update(id, data);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: number) {
    return this.productosService.remove(id);
  }
}
