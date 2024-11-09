import { Module } from '@nestjs/common';
import { VehicleModule } from '@application/modules/vehicle.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [VehicleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
