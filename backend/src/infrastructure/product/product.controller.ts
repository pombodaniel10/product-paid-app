import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { GetProduct } from '../../application/logic/get-product';

import { NotFoundException, HttpException, HttpStatus } from '@nestjs/common';

@Controller('products')
export class Product {
  constructor(
    private readonly getProduct: GetProduct,
  ) {}

  @Get('/:id')
  async getProductRequest(@Param('id') id: string) {

    try {
      const product = await this.getProduct.execute(id);
      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        'Internal server error occurred while fetching the product',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {cause: error}
      );
    }
  }

}
