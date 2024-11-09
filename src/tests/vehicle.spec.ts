import { expect } from 'chai';
import { VehicleService } from '../application/services/vehicle.service';
import { MockVehicleRepository } from '../infrastructure/repositories/mock-vehicle.repository';

describe('VehicleService', () => {
  let service: VehicleService;
  let repository: MockVehicleRepository;

  beforeEach(() => {
    repository = new MockVehicleRepository();
    service = new VehicleService(repository);
  });

  it('should create a vehicle', async () => {
    const vehicleDto = {
      licensePlate: 'XYZ1234',
      chassis: '123',
      renavam: '456',
      model: 'Model',
      brand: 'Brand',
      year: 2022,
    };
    const vehicle = await service.create(vehicleDto);
    expect(vehicle).to.include(vehicleDto);
  });

  // Outros testes para update, delete, e findById...
});
