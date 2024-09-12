import { Exclude, Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  userId: string;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Exclude()
  password: string;
}
