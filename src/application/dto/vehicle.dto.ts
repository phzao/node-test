import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class VehicleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  licensePlate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  chassis: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  renavam: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  brand: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  year: number;
}
