import { VehicleService } from '@application/services/vehicle.service';
import { MockVehicleRepository } from '@infrastructure/repositories/mock-vehicle.repository';

describe('VehicleService', () => {
  let service: VehicleService;
  let repository: MockVehicleRepository;

  beforeEach(() => {
    repository = new MockVehicleRepository();
    service = new VehicleService(repository);
    repository.setInitialList([
      {
        id: 1,
        licensePlate: 'ABC-1234',
        chassis: '1HGCM82633A123456',
        renavam: '12345678901',
        model: 'Corolla',
        brand: 'Toyota',
        year: 2020,
      },
      {
        id: 2,
        licensePlate: 'XYZ-5678',
        chassis: '2HGCM82633A654321',
        renavam: '10987654321',
        model: 'Civic',
        brand: 'Honda',
        year: 2019,
      },
      {
        id: 3,
        licensePlate: 'LMN-9101',
        chassis: '3HGCM82633A112233',
        renavam: '11223344556',
        model: 'Focus',
        brand: 'Ford',
        year: 2018,
      },
    ]);
  });

  it('should create a vehicle successfully', async () => {
    const vehicleDto = {
      licensePlate: 'XYZ1234',
      chassis: '123',
      renavam: '456',
      model: 'Model',
      brand: 'Brand',
      year: 2022,
    };
    const vehicle = await service.create(vehicleDto);
    expect(vehicle).toMatchObject(vehicleDto);
  });

  it('should update a vehicle successfully', async () => {
    const vehicleDto = {
      licensePlate: 'XYZ1234',
      chassis: '123',
      renavam: '456',
      model: 'Model',
      brand: 'Brand',
      year: 2022,
    };
    const createdVehicle = await service.create(vehicleDto);
    const updateDto = { ...createdVehicle, model: 'Updated Model' };
    const updatedVehicle = await service.update(createdVehicle.id, updateDto);
    expect(updatedVehicle.model).toBe('Updated Model');
  });

  it('should fail to update a non-existing vehicle', async () => {
    const updateDto = {
      licensePlate: 'NONEXIST',
      chassis: '123',
      renavam: '456',
      model: 'Updated Model',
      brand: 'Brand',
      year: 2022,
    };
    await expect(service.update(1000000000, updateDto)).rejects.toThrow(
      'Vehicle not found',
    );
  });

  it('should find vehicles with specific parameters and return none', async () => {
    const searchDto = {
      licensePlate: 'ABC0000',
      model: 'Unknown',
      brand: 'Unknown',
      year: 2000,
    };
    const vehicles = await service.findAll(searchDto);
    expect(vehicles).toHaveLength(0);
  });

  it('should find vehicles with specific parameters and return some', async () => {
    const vehicleDto = {
      licensePlate: 'XYZ1234',
      chassis: '123',
      renavam: '456',
      model: 'Model',
      brand: 'Brand',
      year: 2022,
    };
    await service.create(vehicleDto);
    const searchDto = {
      licensePlate: 'XYZ1234',
      model: 'Model',
      brand: 'Brand',
      year: 2022,
    };
    const vehicles = await service.findAll(searchDto);
    expect(vehicles).toHaveLength(1);
    expect(vehicles[0]).toMatchObject(vehicleDto);
  });

  it('should return an error when find operation fails', async () => {
    jest.spyOn(repository, 'findAll').mockImplementation(() => {
      throw new Error('Database error');
    });
    const searchDto = {
      licensePlate: 'XYZ1234',
      model: 'Model',
      brand: 'Brand',
      year: 2022,
    };
    await expect(service.findAll(searchDto)).rejects.toThrow('Database error');
  });

  it('should delete a vehicle successfully', async () => {
    const vehicleDto = {
      licensePlate: 'XYZ1234',
      chassis: '123',
      renavam: '456',
      model: 'Model',
      brand: 'Brand',
      year: 2022,
    };
    const createdVehicle = await service.create(vehicleDto);
    await expect(service.delete(createdVehicle.id)).resolves.not.toThrow();
  });

  it('should fail to delete a non-existing vehicle', async () => {
    await expect(service.delete(100000)).rejects.toThrow('Vehicle not found');
  });
});
