import { Injectable } from '@nestjs/common';
import { IVehicleRepository } from '@domain/repositories/vehicle.repository.interface';
import { Vehicle } from '@domain/entities/vehicle.entity';
import { VehicleDto } from '@application/dto/vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  async create(vehicleData: VehicleDto): Promise<Vehicle> {
    const vehicle = new Vehicle(
      Date.now().toString(),
      vehicleData.licensePlate,
      vehicleData.chassis,
      vehicleData.renavam,
      vehicleData.model,
      vehicleData.brand,
      vehicleData.year,
    );
    return this.vehicleRepository.create(vehicle);
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.findAll();
  }

  async findById(id: string): Promise<Vehicle | null> {
    return this.vehicleRepository.findById(id);
  }

  async update(id: string, vehicleData: Partial<VehicleDto>): Promise<Vehicle> {
    return this.vehicleRepository.update(id, vehicleData);
  }

  async delete(id: string): Promise<void> {
    await this.vehicleRepository.delete(id);
  }
}
