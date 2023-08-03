import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email do Usuario',
    default: 'shay_dan@mail.com',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do Usuario',
    default: '123456',
    type: String,
  })
  @IsString()
  password: string;
}
