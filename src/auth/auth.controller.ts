import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signin(@Body() body: SignInDto) {
    const { username, password } = body;
    return await this.authService.signIn(username, password);
  }
}
