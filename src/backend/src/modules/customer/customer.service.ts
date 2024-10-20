import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ResponseListData from 'src/data/response-list.data';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async createAsync(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return await this.customerRepository.save(createCustomerDto);
  }

  async findAllAsync(
    page: number = 0,
    limit: number = 16,
    onlySelected: boolean = false,
  ): Promise<Promise<ResponseListData<Customer>>> {
    const [list, totalCount] = await this.customerRepository.findAndCount({
      where: onlySelected ? { selected: true } : {},
      take: limit,
      skip: (page - 1) * limit,
      order: { createdAt: 'ASC' },
    });
    return { list, totalCount };
  }

  async findOneAsync(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    return customer;
  }

  async updateAsync(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<void> {
    await this.findOneAsync(id);
    await this.customerRepository.update(id, updateCustomerDto);
  }

  async removeAsync(id: string): Promise<void> {
    await this.findOneAsync(id);
    await this.customerRepository.delete(id);
  }

  async unselectMultipleAsync(ids: string[]) {
    await this.customerRepository
      .createQueryBuilder()
      .update(Customer)
      .set({ selected: false })
      .whereInIds(ids)
      .execute();
  }
}
