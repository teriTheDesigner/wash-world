import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('locations')
@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new location' })
  @UseGuards(AuthGuard)
  async create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }
  @Get()
  @ApiOperation({ summary: 'Get all locations' })
  @UseGuards(AuthGuard)
  findAll(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    const take = limit ? parseInt(limit, 10) : undefined;
    const skip = offset ? parseInt(offset, 10) : undefined;
    return this.locationService.findAll(take, skip);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get admin stats (total locations, etc.)' })
  @UseGuards(AuthGuard, AdminGuard)
  async getStats() {
    return this.locationService.getAdminStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a location by ID' })
  @UseGuards(AuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.locationService.findOne(id);
  }
}
