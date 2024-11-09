import { Vehicle } from '@domain/entities/vehicle.entity';
import { IVehicleRepository } from '@domain/repositories/vehicle.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MockVehicleRepository implements IVehicleRepository {
  private vehicles: Vehicle[] = [];

  async create(vehicle: Vehicle): Promise<Vehicle> {
    this.vehicles.push(vehicle);
    return vehicle;
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicles;
  }

  async findById(id: string): Promise<Vehicle | null> {
    return this.vehicles.find((vehicle) => vehicle.id === id) || null;
  }

  async update(id: string, vehicleData: Partial<Vehicle>): Promise<Vehicle> {
    const vehicle = await this.findById(id);
    if (!vehicle) throw new Error('Vehicle not found');
    Object.assign(vehicle, vehicleData);
    return vehicle;
  }

  async delete(id: string): Promise<void> {
    this.vehicles = this.vehicles.filter((vehicle) => vehicle.id !== id);
  }
}
