import { Vehicle } from '../entities/vehicle.entity';

export abstract class IVehicleRepository {
  abstract create(vehicle: Vehicle): Promise<Vehicle>;
  abstract findAll(): Promise<Vehicle[]>;
  abstract findById(id: string): Promise<Vehicle | null>;
  abstract update(id: string, vehicle: Partial<Vehicle>): Promise<Vehicle>;
  abstract delete(id: string): Promise<void>;
}
