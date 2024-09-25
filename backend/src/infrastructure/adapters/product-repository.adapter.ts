import { Product } from '../../domain/entities/product.entity';
import { ProductInterface } from '../../application/ports/product.interface';

// Simulamos una base de datos en memoria para este ejemplo
const productsDB: Product[] = [
  new Product('1', 'Product A', 'https://m.media-amazon.com/images/I/71TCyb382zL.jpg', 10, 50),
  new Product('2', 'Product B', 'https://m.media-amazon.com/images/I/71TCyb382zL.jpg', 5, 100),
];

export class ProductRepositoryAdapter implements ProductInterface {
  async findById(productId: string): Promise<Product> {
    const product = productsDB.find(p => p.id === productId);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async updateStock(productId: string, newStock: number): Promise<void> {
    const product = await this.findById(productId);
    product.stock = newStock;
  }

}
