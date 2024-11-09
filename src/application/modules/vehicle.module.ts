import { Module } from '@nestjs/common';
import { VehicleService } from '@application/services/vehicle.service';
import { VehicleController } from '@controllers/vehicle.controller';
import { MockVehicleRepository } from '@infrastructure/repositories/mock-vehicle.repository';
import { IVehicleRepository } from '@domain/repositories/vehicle.repository.interface';

@Module({
  controllers: [VehicleController],
  providers: [
    {
      provide: IVehicleRepository,
      useClass: MockVehicleRepository,
    },
    VehicleService,
  ],
  exports: [VehicleService],
})
export class VehicleModule {}
