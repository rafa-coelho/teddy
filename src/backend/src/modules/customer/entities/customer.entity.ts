import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 15, scale: 2 })
  salary: number;

  @Column('decimal', { precision: 15, scale: 2 })
  companyValue: number;

  @Column('boolean', { default: false })
  selected: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
