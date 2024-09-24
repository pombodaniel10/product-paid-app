import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './infrastructure/product/product.module';
import { PaymentModule } from './infrastructure/payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ProductModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}