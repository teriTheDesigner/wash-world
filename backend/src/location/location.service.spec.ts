import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Location } from '../location.entity';
import { ServiceUnit } from '../service-unit.entity';
import { NotFoundException } from '@nestjs/common';

const mockLocationRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  count: jest.fn(),
};

const mockServiceUnitRepository = {
  count: jest.fn(),
  createQueryBuilder: jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    addSelect: jest.fn().mockReturnThis(),
    groupBy: jest.fn().mockReturnThis(),
    getRawMany: jest.fn(),
  })),
};

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationService,
        {
          provide: getRepositoryToken(Location),
          useValue: mockLocationRepository,
        },
        {
          provide: getRepositoryToken(ServiceUnit),
          useValue: mockServiceUnitRepository,
        },
      ],
    }).compile();

    service = module.get<LocationService>(LocationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a location', async () => {
    const dto = { name: 'New Location' };
    const created = { id: 1, ...dto };

    mockLocationRepository.create.mockReturnValue(created);
    mockLocationRepository.save.mockResolvedValue(created);

    const result = await service.create(dto as any);
    expect(result).toEqual(created);
    expect(mockLocationRepository.create).toHaveBeenCalledWith(dto);
    expect(mockLocationRepository.save).toHaveBeenCalledWith(created);
  });

  it('should return all locations', async () => {
    const locations = [{ id: 1 }, { id: 2 }];
    mockLocationRepository.find.mockResolvedValue(locations);

    const result = await service.findAll();
    expect(result).toEqual(locations);
    expect(mockLocationRepository.find).toHaveBeenCalledWith({
      relations: ['serviceUnits'],
    });
  });

  it('should return a location by ID', async () => {
    const location = { id: 1 };
    mockLocationRepository.findOne.mockResolvedValue(location);

    const result = await service.findOne(1);
    expect(result).toEqual(location);
    expect(mockLocationRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: ['serviceUnits'],
    });
  });

  it('should throw NotFoundException if location not found', async () => {
    mockLocationRepository.findOne.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });
});
