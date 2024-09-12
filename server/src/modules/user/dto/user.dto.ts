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

  @Expose()
  phoneNumber: string;

  @Expose()
  address: string;

  @Expose()
  avatar: string;

  @Expose()
  role: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
