import { FindVehicleByDto } from '@application/dto/find-vehicle-by-filters.dto';
import { vehiclesList } from '@application/services/constants';
import { Vehicle } from '@domain/entities/vehicle.entity';
import { IVehicleRepository } from '@domain/repositories/vehicle.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MockVehicleRepository implements IVehicleRepository {
  private vehicles: Vehicle[] = vehiclesList;

  async create(vehicle: Vehicle): Promise<Vehicle> {
    this.vehicles.push(vehicle);
    return vehicle;
  }

  async findAll(params: FindVehicleByDto): Promise<Vehicle[]> {
    return this.vehicles.filter((vehicle) => {
      const validations = [];
      if (params?.year) validations.push(vehicle.year === Number(params.year));
      if (params?.brand) validations.push(vehicle.brand.includes(params.brand));
      if (params?.model) validations.push(vehicle.model.includes(params.model));
      if (params?.licensePlate)
        validations.push(vehicle.licensePlate === params.licensePlate);
      if (!validations.length) return true;
      return !validations.some((item) => !item);
    });
  }

  async findById(id: number): Promise<Vehicle | null> {
    return this.vehicles.find((vehicle) => vehicle.id === id) || null;
  }

  async update(id: number, vehicleData: Partial<Vehicle>): Promise<Vehicle> {
    const vehicle = await this.findById(id);
    if (!vehicle) throw new Error('Vehicle not found');
    Object.assign(vehicle, vehicleData);
    return vehicle;
  }

  async delete(id: number): Promise<void> {
    this.vehicles = this.vehicles.filter((vehicle) => vehicle.id !== id);
  }
}
