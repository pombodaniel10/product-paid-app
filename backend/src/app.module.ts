import { Module } from '@nestjs/common';
import { ProductModule } from './infrastructure/product/product.module';
import { PaymentModule } from './infrastructure/payment/payment.module';

@Module({
  imports: [
    ProductModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}