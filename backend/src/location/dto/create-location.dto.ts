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

export class CreateLocationDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsString()
  openHours: string;

  @IsString()
  maxHeight: string;

  @IsString()
  wheelWidth: string;

  @IsString()
  mirrorLength: string;

  @IsString()
  imageUrl: string;

  @IsString()
  url: string;

  @IsString()
  @IsOptional()
  message?: string;

  @IsBoolean()
  hasAddons: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateServiceUnitDto)
  serviceUnits: CreateServiceUnitDto[];
}
