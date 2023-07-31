import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do Usuario',
    default: 'Shay Dan',
    type: String,
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    description: 'Email do Usuario',
    default: 'shay_dan@mail.com',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Numero do Usuario',
    default: '912345678',
    type: String,
  })
  @IsString()
  @MaxLength(14)
  telefone: string;
}
