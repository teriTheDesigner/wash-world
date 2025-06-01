import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Jens Nielsen',
    description: 'Full name of the user',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  name: string;

  @ApiProperty({ example: 'jens@email.com', description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password: string;
}
