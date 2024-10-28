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
  @Expose()
  email: string;
  @Expose()
  fullName: string;
}
