import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  Param,
  Headers,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return await this.userService.createUser(body);
  }

  @Get('/?id')
  async getUserById(@Param() id: number) {
    return await this.userService.getUserById(id);
  }

  @Patch('/:id')
  async updateUser(@Param() id: number, @Body() body: CreateUserDto) {
    return await this.userService.updateUser(id, body);
  }

  @Post('/login')
  async login(@Body() body) {
    const { username, password } = body;
    return await this.authService.signIn(username, password);
  }

  @Get('/getMyUser')
  @UseGuards(AuthGuard)
  async isLogged(@Headers() header) {
    const token = header.authorization.split(' ')[1];
    try {
      const payload = await this.authService.isLogged(token);
      const user = await this.userService.getUserById(payload.sub);
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
