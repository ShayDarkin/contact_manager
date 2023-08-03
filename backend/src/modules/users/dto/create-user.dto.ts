import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do Usuario',
    default: 'Shay Dan',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: 'Email do Usuario',
    default: 'shay_dan@mail.com',
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Senha do Usuario',
    default: '123456',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password: string;

  @ApiProperty({
    description: 'Numero do Usuario',
    default: '912345678',
    type: String,
  })
  @IsString()
  @MaxLength(14)
  @IsNotEmpty()
  telefone: string;
}
