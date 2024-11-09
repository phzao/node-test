import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';

describe('Vehicles Controller (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new vehicle', async () => {
    const response = await request(app.getHttpServer())
      .post('/vehicles')
      .send({
        licensePlate: 'ABC-1234',
        chassis: '12345678901234567',
        renavam: '9876543210',
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.licensePlate).toBe('ABC-1234');
    expect(response.body.chassis).toBe('12345678901234567');
    expect(response.body.renavam).toBe('9876543210');
  });

  it('should return the vehicle by ID', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/vehicles')
      .send({
        licensePlate: 'XYZ-1234',
        chassis: '98765432109876543',
        renavam: '1234567890',
      })
      .expect(201);

    const vehicleId = createResponse.body.id;

    const getResponse = await request(app.getHttpServer())
      .get(`/vehicles/${vehicleId}`)
      .expect(200);

    expect(getResponse.body.id).toBe(vehicleId);
    expect(getResponse.body.licensePlate).toBe('XYZ-1234');
    expect(getResponse.body.chassis).toBe('98765432109876543');
    expect(getResponse.body.renavam).toBe('1234567890');
  });

  it('should return 404 Not Found for a non-existent vehicle ID', async () => {
    const nonExistentId = 'nonexistentid';

    const response = await request(app.getHttpServer())
      .get(`/vehicles/${nonExistentId}`)
      .expect(404);

    expect(response.body.message).toBe('Vehicle not found');
  });

  it('should update a vehicle by ID', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/vehicles')
      .send({
        licensePlate: 'ABC-5678',
        chassis: '12345678901234567',
        renavam: '9876543210',
      })
      .expect(201);

    const vehicleId = createResponse.body.id;

    await request(app.getHttpServer())
      .put(`/vehicles/${vehicleId}`)
      .send({
        licensePlate: 'DEF-9876',
        chassis: '76543210987654321',
        renavam: '0123456789',
      })
      .expect(204);
  });

  it('should delete a vehicle by ID', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/vehicles')
      .send({
        licensePlate: 'XYZ-2234',
        chassis: '123990999',
        renavam: '45688',
        model: 'Model',
        brand: 'Yamaha',
        year: 2022,
      })
      .expect(201);

    const vehicleId = createResponse.body.id;

    await request(app.getHttpServer())
      .delete(`/vehicles/${vehicleId}`)
      .expect(204);
  });

  it('should return 404 Not Found for deleting a non-existent vehicle by ID', async () => {
    const nonExistentId = 'nonexistentid';

    const deleteResponse = await request(app.getHttpServer())
      .delete(`/vehicles/${nonExistentId}`)
      .expect(404);

    expect(deleteResponse.body.message).toEqual('Vehicle not found');
  });
});
