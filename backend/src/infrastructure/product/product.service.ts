import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/infrastructure/product/product.repository';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
  ) {}

  async getProduct(productId: number): Promise<Product | null> {
    const product = this.productRepository.findById(productId);
    return product;
  }
}