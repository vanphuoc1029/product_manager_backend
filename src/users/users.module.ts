import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [UsersService, AuthService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
