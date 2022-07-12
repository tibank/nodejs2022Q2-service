import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  oldPassowrd: string;
  @IsNotEmpty()
  newPassword: string;
}
