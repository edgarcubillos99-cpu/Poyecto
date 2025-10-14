import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Registro de usuarios
  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: 'admin' | 'cliente' = 'cliente',
  ) {
    return this.authService.register(email, password, role);
  }

  //Inicio de sesion
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso con JWT' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(
    @Body('email') email: string,
    @Body('password') password: string,) 
    {
    return this.authService.login(email, password);
  }
}

// Endpoints protegidos por roles ---
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ProtectedAuthController {
  @Get('admin')
  @Roles('admin')
  getAdminData() {
    return { message: 'Solo los administradores pueden ver esto' };
  }

  @Get('cliente')
  @Roles('cliente', 'admin')
  getClienteData() {
    return { message: 'Clientes y administradores pueden ver esto' };
  }
}