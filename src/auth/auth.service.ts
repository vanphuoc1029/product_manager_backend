import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async isLogged(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      console.log(payload);
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
