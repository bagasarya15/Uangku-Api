import {
  Controller,
  // Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async create(@Body() body: LoginDto): Promise<any> {
    return this.authService.login(body);
  }

  @Post('authorize')
  async isAuthorize(@Body() body:any) : Promise<any> {
    return this.authService.isAuthorize(body);
  }
}
