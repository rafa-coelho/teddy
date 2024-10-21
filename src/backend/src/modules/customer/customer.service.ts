import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseListData } from 'src/data/response-list.data';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async createAsync(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    try {
      this.logger.log('Creating a new customer');
      const customer = await this.customerRepository.save(createCustomerDto);
      this.logger.log(`Customer created with ID: ${customer.id}`);
      return customer;
    } catch (error) {
      this.logger.error('Failed to create customer', (error as Error).stack);
      throw error;
    }
  }

  async findAllAsync(
    page: number = 0,
    limit: number = 16,
    onlySelected: boolean = false,
  ): Promise<ResponseListData<Customer>> {
    try {
      this.logger.log(
        `Finding all customers: page=${page}, limit=${limit}, onlySelected=${onlySelected}`,
      );

      const [list, totalCount] = await this.customerRepository.findAndCount({
        where: onlySelected ? { selected: true } : {},
        take: limit,
        skip: (page - 1) * limit,
        order: { createdAt: 'ASC' },
      });

      this.logger.log(`Found ${totalCount} customers`);
      return { list, totalCount };
    } catch (error) {
      this.logger.error('Failed to find customers', (error as Error).stack);
      throw error;
    }
  }

  async findOneAsync(id: string): Promise<Customer> {
    try {
      this.logger.log(`Finding customer with ID: ${id}`);
      const customer = await this.customerRepository.findOne({ where: { id } });

      if (!customer) {
        this.logger.warn(`Customer with ID ${id} not found`);
        throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
      }

      this.logger.log(`Customer found: ${customer.name}`);
      return customer;
    } catch (error) {
      this.logger.error(
        `Failed to find customer with ID: ${id}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async updateAsync(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<void> {
    try {
      this.logger.log(`Updating customer with ID: ${id}`);
      await this.findOneAsync(id);
      await this.customerRepository.update(id, updateCustomerDto);
      this.logger.log(`Customer with ID: ${id} updated successfully`);
    } catch (error) {
      this.logger.error(
        `Failed to update customer with ID: ${id}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async removeAsync(id: string): Promise<void> {
    try {
      this.logger.log(`Removing customer with ID: ${id}`);
      await this.findOneAsync(id);
      await this.customerRepository.delete(id);
      this.logger.log(`Customer with ID: ${id} removed successfully`);
    } catch (error) {
      this.logger.error(
        `Failed to remove customer with ID: ${id}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async cleanSelectedAsync(): Promise<void> {
    try {
      this.logger.log('Cleaning selected customers');
      await this.customerRepository.update(
        { selected: true },
        { selected: false },
      );
      this.logger.log('All selected customers unselected successfully');
    } catch (error) {
      this.logger.error(
        'Failed to clean selected customers',
        (error as Error).stack,
      );
      throw error;
    }
  }
}
