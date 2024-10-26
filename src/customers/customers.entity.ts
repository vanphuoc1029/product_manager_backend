import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('customers')
export class CustomersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;
}
