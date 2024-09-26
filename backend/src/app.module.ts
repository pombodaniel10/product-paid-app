import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './domain/entities/product.entity';
import { Customer } from './domain/entities/customer.entity';
import { Transaction } from './domain/entities/transaction.entity';
import { ProductModule } from './infrastructure/product/product.module';
import { PaymentModule } from './infrastructure/payment/payment.module';
import { TransactionModule } from './infrastructure/transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Product, Customer, Transaction],
      ssl: {
        rejectUnauthorized: false,  
      }
    }),
    TypeOrmModule.forFeature([Product, Customer, Transaction]),
    ProductModule,
    PaymentModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}