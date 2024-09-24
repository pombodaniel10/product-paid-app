import { Inject, NotFoundException } from '@nestjs/common';
import { ProductInterface } from '../ports/product.interface';
import { Product } from '../../domain/entities/product.entity';

export class GetProduct {
  constructor(
    @Inject('ProductInterface')
    private readonly productRepository: ProductInterface,
  ) {}

  async execute(productId: string): Promise<Product | null> {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found.`);
    }
    return product;
  }
}