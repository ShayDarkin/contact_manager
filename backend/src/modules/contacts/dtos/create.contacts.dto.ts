import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({
    description: 'Nome do Usuario',
    default: 'Daniel Willian',
    type: String,
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    description: 'Email do Usuario',
    default: 'shay@mail.com',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Telefone do Usuario',
    default: '987654321',
    type: String,
  })
  @IsString()
  @MaxLength(14)
  telefone: string;

  @ApiProperty({
    description: 'Id do Usuario',
    default: 'acf8y-adf8-assf9-assd8',
    type: String,
  })
  @IsString()
  userId: string;
}
