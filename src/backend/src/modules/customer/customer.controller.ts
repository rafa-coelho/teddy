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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { ResponseListData } from '../../data/response-list.data';

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo cliente' })
  @ApiResponse({
    status: 201,
    description: 'Cliente criado com sucesso.',
    type: Customer,
  })
  @ApiBody({
    type: CreateCustomerDto,
    description: 'Dados para criação do cliente',
  })
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customerService.createAsync(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os clientes' })
  @ApiQuery({ name: 'page', required: false, description: 'Número da página' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Número de itens por página',
  })
  @ApiQuery({
    name: 'onlySelected',
    required: false,
    description: 'Filtra apenas clientes selecionados',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes retornada com sucesso.',
    type: ResponseListData<Customer>,
  })
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('onlySelected') onlySelected: boolean,
  ): Promise<ResponseListData<Customer>> {
    return await this.customerService.findAllAsync(page, limit, onlySelected);
  }

  @Put('clean-selected')
  @ApiOperation({ summary: 'Remove a seleção de todos os clientes' })
  @ApiResponse({
    status: 200,
    description: 'Clientes desmarcados com sucesso.',
  })
  async unselectMultiple() {
    return await this.customerService.cleanSelectedAsync();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um cliente pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do cliente' })
  @ApiBody({ type: UpdateCustomerDto, description: 'Dados para atualização' })
  @ApiResponse({ status: 200, description: 'Cliente atualizado com sucesso.' })
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return await this.customerService.updateAsync(id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um cliente pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do cliente' })
  @ApiResponse({ status: 200, description: 'Cliente removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  async remove(@Param('id') id: string) {
    return await this.customerService.removeAsync(id);
  }
}
