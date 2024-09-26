import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../../domain/entities/customer.entity';
import { CustomerRepository } from './customer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomerRepository],
  exports: [CustomerRepository],
})

export class CustomerModule {}