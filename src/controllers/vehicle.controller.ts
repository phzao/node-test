import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { VehicleService } from '../application/services/vehicle.service';
import { VehicleDto } from '../application/dto/vehicle.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

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
  async findAll() {
    return this.vehicleService.findAll();
  }

  @ApiOperation({ summary: 'Get vehicle by ID' })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.vehicleService.findById(id);
  }

  @ApiOperation({ summary: 'Update a vehicle' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() vehicleDto: Partial<VehicleDto>,
  ) {
    return this.vehicleService.update(id, vehicleDto);
  }

  @ApiOperation({ summary: 'Delete a vehicle' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.vehicleService.delete(id);
  }
}
