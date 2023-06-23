import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  Matches,
  IsOptional,
} from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  name: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
