import { Expose, Exclude } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;
  @Expose()
  username: string;
  @Exclude()
  password: string;
  @Expose()
  access_token: string;
}
