import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { ProductosModule } from './productos/productos.module';
import { PaypalModule } from './paypal/paypal.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'carshop',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    ProductosModule,
    PaypalModule,
  ],
})
export class AppModule {}



