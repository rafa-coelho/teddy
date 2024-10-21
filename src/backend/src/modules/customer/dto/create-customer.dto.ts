import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Fulano', description: 'Nome do cliente' })
  name: string;

  @ApiProperty({ example: 5000, description: 'Salário do cliente' })
  salary: number;

  @ApiProperty({ example: 20000, description: 'Valor da empresa do cliente' })
  companyValue: number;
}
