import { ApiProperty } from '@nestjs/swagger';

export class ResponseListData<T> {
  @ApiProperty({
    isArray: true,
    description: 'Lista de clientes',
    example: [
      {
        id: '1',
        name: 'Fulano',
        salary: 5000,
        companyValue: 20000,
        selected: false,
        createdAt: '2024-10-20T10:20:30Z',
      },
    ],
  })
  list: T[];

  @ApiProperty({ description: 'Número total de itens' })
  totalCount: number;
}
