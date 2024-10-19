import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 7, scale: 2 })
  salary: number;

  @Column('decimal', { precision: 7, scale: 2 })
  companyValue: number;
}
