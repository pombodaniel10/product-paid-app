import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaymentRepository } from './payment.repository';
import { ProductModule } from '../product/product.module';
import { ProductRepository } from '../product/product.repository';
import { TransactionRepository } from '../transaction/transaction.repository';
import { TransactionModule } from '../transaction/transaction.module';
import { Product } from '../../domain/entities/product.entity';
import { Transaction } from '../../domain/entities/transaction.entity';
import { CustomerModule } from '../customer/customer.module';
import { CustomerRepository } from '../customer/customer.repository';
import { Customer } from 'src/domain/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product,Transaction,Customer]),ProductModule,TransactionModule, CustomerModule],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository, ProductRepository, TransactionRepository, CustomerRepository],
  exports: [PaymentService, PaymentRepository, ProductRepository, TransactionRepository, CustomerRepository],
})
export class PaymentModule {}