import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateServiceUnitDto {
  @ApiProperty({ example: 'hall' })
  @IsString()
  type: string;

  @ApiProperty({ example: 5 })
  @IsInt()
  totalCount: number;

  @ApiProperty({ example: '2' })
  @IsString()
  @IsOptional()
  machineType?: string;
}
