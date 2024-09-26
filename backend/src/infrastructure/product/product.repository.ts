import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../domain/entities/product.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findById(id: number): Promise<Product | null> {
    return this.productRepository.findOneBy({ id });
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async create(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  async update(productId: number, updateData: Partial<Product>): Promise<UpdateResult> {
    return this.productRepository.update(productId,updateData);
  }
}