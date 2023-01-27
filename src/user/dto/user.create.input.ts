import { InputType } from '@nestjs/graphql';

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class UserCreateInput {
  @IsString()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio.' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio.' })
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty({ message: 'Este campo não pode estar vazio.' })
  password: string;
}
