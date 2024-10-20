import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus, HttpException } from '@nestjs/common';
import request from 'supertest';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { AnyExceptionFilter } from '../../filters/any-exception.filter';

const mockCustomerService = {
  createAsync: jest.fn(),
  findAllAsync: jest.fn(),
  cleanSelectedAsync: jest.fn(),
  updateAsync: jest.fn(),
  removeAsync: jest.fn(),
};

describe('CustomerController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [{ provide: CustomerService, useValue: mockCustomerService }],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new AnyExceptionFilter()); // Aplica o filtro globalmente
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /customers', () => {
    it('should create a customer', async () => {
      const dto: CreateCustomerDto = {
        name: 'Fulano',
        salary: 5000,
        companyValue: 20000,
      };

      mockCustomerService.createAsync.mockResolvedValue({ id: '1', ...dto });

      const response = await request(app.getHttpServer())
        .post('/customers')
        .send(dto)
        .expect(HttpStatus.CREATED);

      expect(response.body).toEqual({ id: '1', ...dto });
    });

    it('should return 500 if service throws an error', async () => {
      mockCustomerService.createAsync.mockRejectedValue(
        new Error('Server error'),
      );

      const dto: CreateCustomerDto = {
        name: 'Fulano',
        salary: 5000,
        companyValue: 20000,
      };

      const response = await request(app.getHttpServer())
        .post('/customers')
        .send(dto)
        .expect(HttpStatus.INTERNAL_SERVER_ERROR);

      expect(response.body).toEqual({
        statusCode: 500,
        timestamp: expect.any(String),
        path: '/customers',
        message: 'Server error',
      });
    });
  });

  describe('GET /customers', () => {
    it('should return a list of customers', async () => {
      const mockResponse = {
        list: [{ id: '1', name: 'Fulano', salary: 5000, companyValue: 20000 }],
        totalCount: 1,
      };

      mockCustomerService.findAllAsync.mockResolvedValue(mockResponse);

      const response = await request(app.getHttpServer())
        .get('/customers?page=1&limit=10&onlySelected=false')
        .expect(HttpStatus.OK);

      expect(response.body).toEqual(mockResponse);
    });

    it('should return 500 if service throws an error', async () => {
      mockCustomerService.findAllAsync.mockRejectedValue(
        new Error('Database error'),
      );

      const response = await request(app.getHttpServer())
        .get('/customers?page=1&limit=10&onlySelected=false')
        .expect(HttpStatus.INTERNAL_SERVER_ERROR);

      expect(response.body).toEqual({
        statusCode: 500,
        timestamp: expect.any(String),
        path: '/customers?page=1&limit=10&onlySelected=false',
        message: 'Database error',
      });
    });
  });

  describe('PUT /customers/clean-selected', () => {
    it('should clean selected customers', async () => {
      mockCustomerService.cleanSelectedAsync.mockResolvedValue(undefined);

      await request(app.getHttpServer())
        .put('/customers/clean-selected')
        .expect(HttpStatus.OK);

      expect(mockCustomerService.cleanSelectedAsync).toHaveBeenCalled();
    });

    it('should return 500 if service throws an error', async () => {
      mockCustomerService.cleanSelectedAsync.mockRejectedValue(
        new Error('Service error'),
      );

      const response = await request(app.getHttpServer())
        .put('/customers/clean-selected')
        .expect(HttpStatus.INTERNAL_SERVER_ERROR);

      expect(response.body).toEqual({
        statusCode: 500,
        timestamp: expect.any(String),
        path: '/customers/clean-selected',
        message: 'Service error',
      });
    });
  });

  describe('DELETE /customers/:id', () => {
    it('should delete a customer', async () => {
      mockCustomerService.removeAsync.mockResolvedValue(undefined);

      await request(app.getHttpServer())
        .delete('/customers/1')
        .expect(HttpStatus.OK);

      expect(mockCustomerService.removeAsync).toHaveBeenCalledWith('1');
    });

    it('should return 404 if customer not found', async () => {
      mockCustomerService.removeAsync.mockRejectedValue(
        new HttpException('Customer not found', HttpStatus.NOT_FOUND),
      );

      const response = await request(app.getHttpServer())
        .delete('/customers/1')
        .expect(HttpStatus.NOT_FOUND);

      expect(response.body).toEqual({
        statusCode: 404,
        timestamp: expect.any(String),
        path: '/customers/1',
        message: 'Customer not found',
      });
    });
  });
});
