import {
  Controller,
  Post,
  Get,
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
    return await this.authService.signUp(body);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @Get('/?id')
  async getUserById(@Param() id: number) {
    return await this.userService.getUserById(id);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async updateUser(@Param() id: number, @Body() body: CreateUserDto) {
    return await this.userService.updateUser(id, body);
  }

  @Post('/login')
  async login(@Body() body) {
    const { username, password } = body;
    return await this.authService.signIn(username, password);
  }

  @UseGuards(AuthGuard)
  @Get('/getMyUser')
  async isLogged(@Headers() header) {
    const token = header.authorization.split(' ')[1];
    try {
      const { payload } = await this.authService.isLogged(token);
      const user = await this.userService.getUserById(payload.sub);
      return user;
    } catch (error) {
      return null;
    }
  }
}
