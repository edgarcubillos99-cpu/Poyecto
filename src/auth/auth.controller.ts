import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Registro de usuarios
  @Post('register')
  register(@Body() body: { email: string; password: string; role: 'admin' | 'cliente' }) {
    return this.authService.register(body.email, body.password);
  }

  //Inicio de sesion
  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
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