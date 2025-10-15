import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsIn } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'juan@example.com',
    description: 'Correo electrónico del usuario',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Contraseña del usuario (mínimo 6 caracteres)',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'cliente',
    description: 'Rol del usuario (admin o cliente)',
    enum: ['admin', 'cliente'],
  })
  @IsIn(['admin', 'cliente'])
  role: 'admin' | 'cliente';
}

