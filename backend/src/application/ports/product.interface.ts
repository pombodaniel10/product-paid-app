import { Product } from '../../domain/entities/product.entity';

export interface ProductInterface {
  findById(productId: string): Promise<Product | null>;
}