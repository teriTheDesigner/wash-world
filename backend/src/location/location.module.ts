import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from '../location.entity';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { ServiceUnit } from '../service-unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location, ServiceUnit])],
  providers: [LocationService],
  controllers: [LocationController],
  exports: [LocationService],
})
export class LocationModule {}
