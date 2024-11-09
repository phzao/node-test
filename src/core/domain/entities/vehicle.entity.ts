import {
  IsString,
  IsInt,
  Length,
  Matches,
  Min,
  Max,
  IsNotEmpty,
} from 'class-validator';

export class Vehicle {
  @IsInt()
  public id: number;

  @IsNotEmpty()
  @IsString()
  @Length(7, 7, { message: 'License plate must be exactly 7 characters.' })
  @Matches(/^[A-Z0-9]+$/, { message: 'License plate must be alphanumeric.' })
  public licensePlate: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 50, { message: 'Chassis must be between 5 and 50 characters.' })
  public chassis: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 50, { message: 'RENAVAM must be between 5 and 50 characters.' })
  public renavam: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50, { message: 'Model must be at least 2 characters.' })
  public model: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50, { message: 'Brand must be at least 2 characters.' })
  public brand: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1886, { message: 'Year must be no earlier than 1886.' })
  @Max(new Date().getFullYear() + 1, {
    message: 'Year cannot be in the future.',
  })
  public year: number;

  constructor(
    id: number,
    licensePlate: string,
    chassis: string,
    renavam: string,
    model: string,
    brand: string,
    year: number,
  ) {
    this.id = id;
    this.licensePlate = licensePlate;
    this.chassis = chassis;
    this.renavam = renavam;
    this.model = model;
    this.brand = brand;
    this.year = year;
  }
}
