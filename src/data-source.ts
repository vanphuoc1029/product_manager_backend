import { DataSource } from 'typeorm';
import { CustomersEntity } from './customers/customers.entity';
import { ProductsEntity } from './products/products.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '18091996',
  database: 'QlyCongTy',
  synchronize: true,
  logging: true,
  entities: [CustomersEntity, ProductsEntity],
  subscribers: [],
  migrations: [],
});
