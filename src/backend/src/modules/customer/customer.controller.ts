import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import ResponseListData from 'src/data/response-list.data';
import { Customer } from './entities/customer.entity';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customerService.createAsync(createCustomerDto);
  }

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('onlySelected') onlySelected: boolean,
  ): Promise<ResponseListData<Customer>> {
    return await this.customerService.findAllAsync(page, limit, onlySelected);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return await this.customerService.updateAsync(id, updateCustomerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.customerService.removeAsync(id);
  }

  @Put('unselect-multiple')
  async unselectMultiple(@Body() ids: string[]) {
    return await this.customerService.unselectMultipleAsync(ids);
  }
}
