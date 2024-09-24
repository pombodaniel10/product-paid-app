import { Module } from '@nestjs/common';
import { Product } from './product.controller';
import { ProductRepositoryAdapter } from '../adapters/product-repository.adapter';
import { GetProduct } from '../../application/logic/get-product';

@Module({
  controllers: [Product],
  providers: [
    {
      provide: 'ProductInterface',
      useClass: ProductRepositoryAdapter,
    },
    GetProduct,
  ],
})
export class ProductModule {}