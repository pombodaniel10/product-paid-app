import { Controller, Get, Param, Patch } from '@nestjs/common';
import { ProductService } from './product.service';
import { NotFoundException, HttpException, HttpStatus } from '@nestjs/common';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @Get('/:id')
  async getProductRequest(@Param('id') id: number) {
    try {
      const product = await this.productService.getProduct(id);
      return product;
    } catch (error) {
     console.error('Error fetching product:', error);
    }
  }

}
