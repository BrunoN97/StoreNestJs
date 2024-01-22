import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { UniqueEmail } from '../validators/email-unique.validator';

export class UpdateUserDTO {
  @IsNotEmpty({ message: 'O nome não pode ser nulo' })
  @IsOptional()
  name: string;

  @IsEmail(undefined, { message: 'O e-mail informado está invalido' })
  @UniqueEmail({ message: 'Já existe o e-mail informado' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'A senha precisa ter no mínimo 6 caracteres' })
  @IsOptional()
  password: string;
}
