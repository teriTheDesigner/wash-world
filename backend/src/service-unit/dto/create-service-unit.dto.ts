import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateServiceUnitDto {
  @IsString()
  type: string;

  @IsInt()
  totalCount: number;

  @IsString()
  @IsOptional()
  machineType?: string;
}
