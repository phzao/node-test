import { Vehicle } from '@domain/entities/vehicle.entity';

export const vehiclesList: Vehicle[] = [
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
];
