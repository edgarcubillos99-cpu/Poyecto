import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,
  ) {}

  findAll() {
    return this.productoRepo.find();
  }

  findOne(id: number) {
    return this.productoRepo.findOne({ where: { id } });
  }

  create(data: Partial<Producto>) {
    const producto = this.productoRepo.create(data);
    return this.productoRepo.save(producto);
  }

  async update(id: number, data: Partial<Producto>) {
    await this.productoRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
  const producto = await this.findOne(id);
  if (!producto) {
    throw new Error(`Producto con id ${id} no encontrado`);
  }
  return this.productoRepo.remove(producto);
};
  }

