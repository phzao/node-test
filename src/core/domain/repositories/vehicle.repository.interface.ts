import { FindVehicleByDto } from '@application/dto/find-vehicle-by-filters.dto';
import { Vehicle } from '../entities/vehicle.entity';

export abstract class IVehicleRepository {
  abstract setInitialList(vehicles: Vehicle[]): void;
  abstract create(vehicle: Vehicle): Promise<Vehicle>;
  abstract findAll(params: FindVehicleByDto): Promise<Vehicle[]>;
  abstract findById(id: number): Promise<Vehicle | null>;
  abstract update(id: number, vehicle: Partial<Vehicle>): Promise<Vehicle>;
  abstract delete(id: number): Promise<void>;
}
