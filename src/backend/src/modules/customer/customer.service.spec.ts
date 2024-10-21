import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

const mockCustomer: Customer = {
  id: '1',
  name: 'Fulano',
  salary: 5000,
  companyValue: 20000,
  selected: false,
  createdAt: new Date(),
};

const mockCustomerRepository = {
  save: jest.fn(),
  findAndCount: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useValue: mockCustomerRepository,
        },
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createAsync', () => {
    it('should create a new customer', async () => {
      mockCustomerRepository.save.mockResolvedValue(mockCustomer);

      const dto: CreateCustomerDto = {
        name: 'Fulano',
        salary: 5000,
        companyValue: 20000,
      };

      const result = await service.createAsync(dto);

      expect(result).toEqual(mockCustomer);
      expect(mockCustomerRepository.save).toHaveBeenCalledWith(dto);
    });

    it('should log an error if creation fails', async () => {
      mockCustomerRepository.save.mockRejectedValue(new Error('Save error'));

      const dto: CreateCustomerDto = {
        name: 'Fulano',
        salary: 5000,
        companyValue: 20000,
      };

      await expect(service.createAsync(dto)).rejects.toThrow('Save error');
    });
  });

  describe('findAllAsync', () => {
    it('should return a list of customers', async () => {
      mockCustomerRepository.findAndCount.mockResolvedValue([
        [mockCustomer],
        1,
      ]);

      const result = await service.findAllAsync(1, 10, false);

      expect(result).toEqual({ list: [mockCustomer], totalCount: 1 });
      expect(mockCustomerRepository.findAndCount).toHaveBeenCalledWith({
        where: {},
        take: 10,
        skip: 0,
        order: { createdAt: 'ASC' },
      });
    });

    it('should return only selected customers', async () => {
      mockCustomerRepository.findAndCount.mockResolvedValue([
        [mockCustomer],
        1,
      ]);

      const result = await service.findAllAsync(1, 10, true);

      expect(result).toEqual({ list: [mockCustomer], totalCount: 1 });
      expect(mockCustomerRepository.findAndCount).toHaveBeenCalledWith({
        where: { selected: true },
        take: 10,
        skip: 0,
        order: { createdAt: 'ASC' },
      });
    });
  });

  describe('findOneAsync', () => {
    it('should return a customer by id', async () => {
      mockCustomerRepository.findOne.mockResolvedValue(mockCustomer);

      const result = await service.findOneAsync('1');

      expect(result).toEqual(mockCustomer);
      expect(mockCustomerRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw an exception if customer not found', async () => {
      mockCustomerRepository.findOne.mockResolvedValue(null);

      await expect(service.findOneAsync('1')).rejects.toThrow(
        new HttpException('Customer not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('updateAsync', () => {
    it('should update a customer', async () => {
      mockCustomerRepository.findOne.mockResolvedValue(mockCustomer);

      const dto: UpdateCustomerDto = { name: 'Ciclano' };
      await service.updateAsync('1', dto);

      expect(mockCustomerRepository.update).toHaveBeenCalledWith('1', dto);
    });

    it('should throw an exception if customer not found', async () => {
      mockCustomerRepository.findOne.mockResolvedValue(null);

      await expect(
        service.updateAsync('1', { name: 'Ciclano' }),
      ).rejects.toThrow(
        new HttpException('Customer not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('removeAsync', () => {
    it('should remove a customer', async () => {
      mockCustomerRepository.findOne.mockResolvedValue(mockCustomer);

      await service.removeAsync('1');

      expect(mockCustomerRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw an exception if customer not found', async () => {
      mockCustomerRepository.findOne.mockResolvedValue(null);

      await expect(service.removeAsync('1')).rejects.toThrow(
        new HttpException('Customer not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('cleanSelectedAsync', () => {
    it('should unselect all selected customers', async () => {
      await service.cleanSelectedAsync();

      expect(mockCustomerRepository.update).toHaveBeenCalledWith(
        { selected: true },
        { selected: false },
      );
    });
  });
});
