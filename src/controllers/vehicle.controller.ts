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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { FindVehicleByDto } from '@application/dto/find-vehicle-by-filters.dto';
import { Vehicle } from '@domain/entities/vehicle.entity';
import { SWAGGER_MESSAGE } from '@helpers/texts/swagger-messages';
import { VehicleService } from '../application/services/vehicle.service';
import { VehicleDto } from '../application/dto/vehicle.dto';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @ApiOperation({ summary: SWAGGER_MESSAGE.NEW_VEHICLE })
  @ApiBody({ type: VehicleDto })
  @ApiResponse({ status: 201, description: SWAGGER_MESSAGE.NEW_VEHICLE_201 })
  @ApiResponse({ status: 400, description: SWAGGER_MESSAGE.NEW_VEHICLE_400 })
  @Post()
  async create(@Body() vehicleDto: VehicleDto): Promise<Vehicle> {
    return await this.vehicleService.create(vehicleDto);
  }

  @ApiOperation({ summary: SWAGGER_MESSAGE.GET_ALL_VEHICLES })
  @ApiQuery({
    name: 'brand',
    required: false,
    description: SWAGGER_MESSAGE.GET_ALL_VEHICLES_BY_BRAND,
  })
  @ApiQuery({
    name: 'licensePlate',
    required: false,
    description: SWAGGER_MESSAGE.GET_ALL_VEHICLES_BY_LICENSE_PLATE,
  })
  @ApiQuery({
    name: 'model',
    required: false,
    description: SWAGGER_MESSAGE.GET_ALL_VEHICLES_BY_MODEL,
  })
  @ApiQuery({
    name: 'year',
    required: false,
    description: SWAGGER_MESSAGE.GET_ALL_VEHICLES_BY_YEAR,
  })
  @ApiResponse({
    status: 200,
    description: SWAGGER_MESSAGE.GET_ALL_VEHICLES,
    type: [VehicleDto],
  })
  @ApiResponse({
    status: 404,
    description: SWAGGER_MESSAGE.GET_ALL_VEHICLES_404,
  })
  @Get()
  async findAll(@Query() params: FindVehicleByDto): Promise<Vehicle[]> {
    return await this.vehicleService.findAll(params);
  }

  @ApiOperation({ summary: SWAGGER_MESSAGE.GET_ONE_VEHICLE })
  @ApiParam({ name: 'id', description: 'The ID of the vehicle to retrieve' })
  @ApiResponse({ status: 404, description: 'Vehicle not found.' })
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Vehicle> {
    return await this.vehicleService.findById(id);
  }

  @ApiOperation({ summary: SWAGGER_MESSAGE.UPDATE_VEHICLE })
  @Put(':id')
  @HttpCode(204)
  async update(
    @Param('id') id: number,
    @Body()
    vehicleDto: Partial<VehicleDto>,
  ) {
    return this.vehicleService.update(id, vehicleDto);
  }

  @ApiOperation({ summary: SWAGGER_MESSAGE.DELETE_VEHICLE })
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number): Promise<void> {
    await this.vehicleService.delete(id);
  }
}
