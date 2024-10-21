import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @ApiProperty({
    example: true,
    description: 'Foi selecionado?',
    required: false,
  })
  selected?: boolean;
}
