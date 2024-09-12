import { IsNotEmpty } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  newPassword: string;

  @IsNotEmpty()
  curPassword: string;
}
