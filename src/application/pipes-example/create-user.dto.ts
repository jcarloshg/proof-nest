// DTO: API Contract for creating a user.
// - Validates incoming data shape and values.
// - Rejects any request not matching these constraints, preserving data integrity.

import { IsEmail, IsInt, Min, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsInt()
  @Min(18)
  age: number;

  @IsOptional()
  biography?: string;
}
