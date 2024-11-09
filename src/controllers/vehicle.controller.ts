import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
} from '@nestjs/common';
import { VehicleService } from '../application/services/vehicle.service';
import { VehicleDto } from '../application/dto/vehicle.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FindVehicleByDto } from '@application/dto/find-vehicle-by-filters.dto';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @ApiOperation({ summary: 'Create a vehicle' })
  @Post()
  async create(@Body() vehicleDto: VehicleDto) {
    return this.vehicleService.create(vehicleDto);
  }

  @ApiOperation({ summary: 'Get all vehicles' })
  @Get()
  async findAll(@Query() params: FindVehicleByDto) {
    return this.vehicleService.findAll(params);
  }

  @ApiOperation({ summary: 'Get vehicle by ID' })
  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.vehicleService.findById(id);
  }

  @ApiOperation({ summary: 'Update a vehicle' })
  @Put(':id')
  @HttpCode(204)
  async update(
    @Param('id') id: number,
    @Body()
    vehicleDto: Partial<VehicleDto>,
  ) {
    return this.vehicleService.update(id, vehicleDto);
  }

  @ApiOperation({ summary: 'Delete a vehicle' })
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number): Promise<void> {
    await this.vehicleService.delete(id);
  }
}
