import { Module } from '@nestjs/common';
import { Payment } from './payment.controller';
import { PaymentRepositoryAdapter } from '../adapters/payment-repository.adapter';
import { CheckInfo } from 'src/application/logic/check-info';
import { RequestPayment } from 'src/application/logic/request-transaction';

@Module({
  controllers: [Payment],
  providers: [
    {
      provide: 'PaymentInterface',
      useClass: PaymentRepositoryAdapter,
    },
    CheckInfo,
    RequestPayment
  ],
})
export class PaymentModule {}
