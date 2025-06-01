import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateServiceUnitDto } from '../../service-unit/dto/create-service-unit.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({ example: 'Aabenraa - Egevej' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Egevej 4, 6200 Aabenraa' })
  @IsString()
  address: string;

  @ApiProperty({ example: 55.065643 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: 9.36445 })
  @IsNumber()
  longitude: number;

  @ApiProperty({ example: '7-22' })
  @IsString()
  openHours: string;

  @ApiProperty({ example: '2,6' })
  @IsString()
  maxHeight: string;

  @ApiProperty({ example: '2,15' })
  @IsString()
  wheelWidth: string;

  @ApiProperty({ example: '2,55' })
  @IsString()
  mirrorLength: string;

  @ApiProperty({
    example:
      'https://washworld-wordpress-production.storage.googleapis.com/wp-content/uploads/2021/11/28140221/1-vaskehal.jpg.png',
  })
  @IsString()
  imageUrl: string;

  @ApiProperty({
    example: 'https://washworld.dk/find-wash-world-vaskehal/aabenraa-egevej',
  })
  @IsString()
  url: string;

  @ApiProperty({
    example:
      'Hal 1 er ude af drift. Tekniker er tilkaldt.; Hal 3 er ude af drift. Tekniker er tilkaldt.',
  })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  hasAddons: boolean;

  @ApiProperty({
    type: [CreateServiceUnitDto],
    example: [
      {
        type: 'hall',
        totalCount: 5,
        machineType: '2',
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateServiceUnitDto)
  serviceUnits: CreateServiceUnitDto[];
}
