import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity) private repo: Repository<UsersEntity>,
  ) {}

  async createUser(body: CreateUserDto) {
    const user = new UsersEntity();
    user.username = body.username;
    user.password = body.password;
    user.fullName = body.fullName;
    user.email = body.email;
    return await this.repo.save(user);
  }

  async getAllUsers() {
    return await this.repo.find();
  }

  async getUserById(id: number) {
    return await this.repo.findOne({ where: { id } });
  }

  async findByUsername(username: string) {
    return await this.repo.findOne({ where: { username } });
  }

  async updateUser(id: number, body: CreateUserDto) {
    const user = await this.repo.findOne({ where: { id } });
    user.username = body.username;
    user.password = body.password;
    user.fullName = body.fullName;
    user.email = body.email;
    return await this.repo.save(user);
  }
}
