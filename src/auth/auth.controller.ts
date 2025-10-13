import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Registro de usuarios
  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: 'admin' | 'cliente' = 'cliente',
  ) {
    return this.authService.register(email, password, role);
  }

  //Inicio de sesion
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,) 
    {
    return this.authService.login(email, password);
  }
}

// Endpoints protegidos por roles ---
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

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