import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateTeacherDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}
