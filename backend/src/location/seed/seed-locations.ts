import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { Location } from '../../location.entity';
import { ServiceUnit } from '../../service-unit.entity';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { getDataSourceToken } from '@nestjs/typeorm';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get<DataSource>(getDataSourceToken());

  const filePath = path.join(__dirname, 'locations.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const locations = JSON.parse(rawData);

  for (const loc of locations) {
    const location = new Location();
    location.name = loc.name;
    location.address = loc.address;
    location.latitude = parseFloat(loc.coordinates.y);
    location.longitude = parseFloat(loc.coordinates.x);
    location.openHours = loc.open_hours;
    location.maxHeight = loc.max_height;
    location.wheelWidth = loc.wheel_width;
    location.mirrorLength = loc.mirror_length;
    location.imageUrl = loc.image;
    location.url = loc.url;
    location.message = loc.message;
    location.hasAddons = loc.has_addons === '1';

    const serviceUnits: ServiceUnit[] = [];

    for (const type of Object.keys(loc.service_units)) {
      const unit = loc.service_units[type];
      if (unit.total_count > 0) {
        const su = new ServiceUnit();
        su.type = type;
        su.totalCount = unit.total_count;
        su.machineType = unit.machine_type ?? null;
        su.location = location;
        serviceUnits.push(su);
      }
    }

    location.serviceUnits = serviceUnits;

    await dataSource.manager.save(location);
    console.log(`✅ Saved: ${location.name}`);
  }

  await app.close();
  console.log('🌱 Seeding complete');
}

bootstrap().catch((err) => {
  console.error('❌ Seeding error:', err);
});
