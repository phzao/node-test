import { Injectable } from '@nestjs/common';
import { IVehicleRepository } from '@domain/repositories/vehicle.repository.interface';
import { Vehicle } from '@domain/entities/vehicle.entity';
import { VehicleDto } from '@application/dto/vehicle.dto';
import { vehiclesList } from './constants';
import { FindVehicleByDto } from '@application/dto/find-vehicle-by-filters.dto';

@Injectable()
export class VehicleService {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  async create(vehicleData: VehicleDto): Promise<Vehicle> {
    const vehicleLength = vehiclesList.length;
    const vehicle = new Vehicle(
      vehicleLength + 1,
      vehicleData.licensePlate,
      vehicleData.chassis,
      vehicleData.renavam,
      vehicleData.model,
      vehicleData.brand,
      vehicleData.year,
    );
    return this.vehicleRepository.create(vehicle);
  }

  async findAll(params: FindVehicleByDto): Promise<Vehicle[]> {
    return this.vehicleRepository.findAll(params);
  }

  async findById(id: number): Promise<Vehicle | null> {
    return this.vehicleRepository.findById(id);
  }

  async update(id: number, vehicleData: Partial<VehicleDto>): Promise<Vehicle> {
    return this.vehicleRepository.update(id, vehicleData);
  }

  async delete(id: number): Promise<void> {
    await this.vehicleRepository.delete(id);
  }
}
