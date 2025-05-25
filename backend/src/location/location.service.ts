import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Location } from '../location.entity';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const location = this.locationRepository.create(createLocationDto);
    return this.locationRepository.save(location);
  }

  // async findAll(): Promise<Location[]> {
  //   return this.locationRepository.find({ relations: ['serviceUnits'] });
  // }

  async findAll(limit?: number, offset?: number): Promise<Location[]> {
    const options: FindManyOptions<Location> = {
      relations: ['serviceUnits'],
    };

    if (limit !== undefined && offset !== undefined) {
      options.take = limit;
      options.skip = offset;
    }

    return this.locationRepository.find(options);
  }

  async findOne(id: number): Promise<Location> {
    const location = await this.locationRepository.findOne({
      where: { id },
      relations: ['serviceUnits'],
    });

    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    return location;
  }
}
