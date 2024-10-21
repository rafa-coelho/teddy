import { ApiProperty } from '@nestjs/swagger';

export class ResponseListData<T> {
  @ApiProperty({ description: 'Lista de itens', isArray: true })
  list: T[];

  @ApiProperty({ description: 'Número total de itens' })
  totalCount: number;
}
