import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dto/createProduct.dto';
import { ListProductDTO } from './dto/listProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async listProducts() {
    const productSaved = await this.productRepository.find();
    return productSaved;
  }

  async createProduct(productEntity: ProductEntity) {
    await this.productRepository.save(productEntity);
  }
}
